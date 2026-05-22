import os
import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
from pathlib import Path
import warnings
warnings.filterwarnings('ignore')

os.chdir(os.path.dirname(os.path.abspath(__file__)))

app = FastAPI(
    title="MedShield AI Risk Prediction API",
    version="2.0.0",
    description="Real-time cardiovascular disease risk prediction with SHAP explainability."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

artifacts_path = Path("model_artifacts.pkl")
if not artifacts_path.exists():
    print("[API] ERROR: model_artifacts.pkl not found. Run train_model.py first.")
    model = None
    scaler = None
    feature_cols = []
    explainer = None
    expected_value = 0.0
    model_info = {"error": "Model not trained yet"}
else:
    artifacts = joblib.load("model_artifacts.pkl")
    model = artifacts['model']
    scaler = artifacts['scaler']
    feature_cols = artifacts['features']
    explainer = artifacts.get('explainer', None)
    expected_value = artifacts.get('expected_value', 0.0)
    model_info = {
        "algorithm": "Random Forest",
        "n_estimators": model.n_estimators,
        "max_depth": model.max_depth,
        "features": feature_cols,
        "feature_importance": artifacts['feature_importance'].to_dict('records'),
        "performance": {
            "accuracy": artifacts['train_accuracy'],
            "precision": artifacts['train_precision'],
            "recall": artifacts['train_recall'],
            "f1_score": artifacts['train_f1'],
            "auc_roc": artifacts['train_auc']
        },
        "dataset": {
            "name": "UCI Heart Disease (Cleveland)",
            "samples": artifacts['n_samples'],
            "class_distribution": artifacts['class_distribution']
        }
    }
    print(f"[API] Model + SHAP explainer loaded! Base risk (expected value): {expected_value:.4f}")

NORMAL_RANGES = {
    'age': {'min': 18, 'max': 55},
    'trestbps': {'min': 90, 'max': 130},
    'chol': {'min': 120, 'max': 200},
    'thalach': {'min': 100, 'max': 180},
    'oldpeak': {'min': 0, 'max': 1},
    'ca': {'min': 0, 'max': 0},
}

FEATURE_DIRECTIONS = {
    'age': 'negative', 'trestbps': 'negative', 'chol': 'negative',
    'fbs': 'negative', 'restecg': 'negative', 'exang': 'negative',
    'oldpeak': 'negative', 'ca': 'negative', 'cp': 'negative',
    'sex': 'negative', 'slope': 'negative', 'thal': 'negative',
    'thalach': 'positive',
}

class PatientInput(BaseModel):
    age: int = Field(ge=18, le=100)
    sex: int = Field(0, ge=0, le=1)
    cp: int = Field(1, ge=1, le=4)
    trestbps: int = Field(90, ge=80, le=250)
    chol: int = Field(120, ge=100, le=600)
    fbs: int = Field(0, ge=0, le=1)
    restecg: int = Field(0, ge=0, le=2)
    thalach: int = Field(150, ge=60, le=220)
    exang: int = Field(0, ge=0, le=1)
    oldpeak: float = Field(0.0, ge=0.0, le=10.0)
    slope: int = Field(1, ge=0, le=3)
    ca: int = Field(0, ge=0, le=4)
    thal: int = Field(3, ge=0, le=7)

    @field_validator('sex', 'fbs', 'exang')
    def validate_binary(cls, v):
        if v not in (0, 1):
            raise ValueError('Must be 0 or 1')
        return v

@app.get("/")
def read_root():
    return {
        "service": "MedShield AI - Risk Prediction API",
        "status": "operational",
        "model_loaded": model is not None,
        "shap_ready": explainer is not None,
    }

@app.get("/health")
def health_check():
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    return {"status": "healthy", "model_loaded": True, "shap_ready": explainer is not None}

@app.get("/model/info")
def get_model_info():
    if model is None:
        raise HTTPException(status_code=503, detail="Model not trained yet")
    return model_info

@app.post("/predict")
def predict_risk(patient: PatientInput):
    if model is None or scaler is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Train the model first.")

    input_dict = patient.model_dump()
    input_df = pd.DataFrame([input_dict])

    missing_cols = [c for c in feature_cols if c not in input_df.columns]
    if missing_cols:
        raise HTTPException(status_code=400, detail=f"Missing features: {missing_cols}")

    input_df = input_df[feature_cols]
    input_scaled = scaler.transform(input_df)

    probability = float(model.predict_proba(input_scaled)[0, 1])
    prediction = int(model.predict(input_scaled)[0])
    risk_score = round(probability * 100, 1)

    category = "Low"
    if risk_score >= 70:
        category = "High"
    elif risk_score >= 40:
        category = "Medium"

    contributions = []
    if explainer is not None:
        shap_values = explainer.shap_values(input_scaled)
        if isinstance(shap_values, list):
            shap_values = shap_values[1]
        shap_flat = np.asarray(shap_values).ravel()

        for i, col in enumerate(feature_cols):
            raw_shap = float(shap_flat[i])
            direction = FEATURE_DIRECTIONS.get(col, 'negative')
            if raw_shap < 0:
                direction = "positive" if FEATURE_DIRECTIONS.get(col, 'negative') == 'negative' else "negative"

            scaled_contrib = round(abs(raw_shap) * 500, 1)
            contributions.append({
                "name": col,
                "value": input_dict[col],
                "shap_value": round(raw_shap, 4),
                "contribution": scaled_contrib,
                "type": direction
            })
    else:
        feature_imp = model.feature_importances_
        for i, col in enumerate(feature_cols):
            val = input_dict[col]
            raw_contrib = feature_imp[i] * val / 100
            direction = FEATURE_DIRECTIONS.get(col, 'negative')
            scaled_contrib = round(abs(raw_contrib) * 500, 1)
            contributions.append({
                "name": col,
                "value": val,
                "shap_value": round(raw_contrib, 4),
                "contribution": scaled_contrib,
                "type": direction
            })

    contributions.sort(key=lambda x: x['contribution'], reverse=True)

    return {
        "prediction": prediction,
        "risk_score": risk_score,
        "category": category,
        "probability": probability,
        "expected_value": round(expected_value, 4),
        "contributing_factors": contributions,
        "timestamp": pd.Timestamp.now().isoformat(),
        "model_accuracy": model_info.get("performance", {}).get("accuracy", 0)
    }

@app.get("/dataset/sample")
def get_dataset_sample(n: int = 10):
    df = pd.read_csv("heart_disease.csv")
    sample = df.sample(n=min(n, len(df))).to_dict(orient="records")
    return {
        "total_records": len(df),
        "columns": list(df.columns),
        "sample": sample
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
