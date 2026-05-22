import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
import shap
import os
import warnings
warnings.filterwarnings('ignore')

os.chdir(os.path.dirname(os.path.abspath(__file__)))

print("[TRAIN] Loading Heart Disease dataset...")
df = pd.read_csv("heart_disease.csv")

feature_cols = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']
X = df[feature_cols].copy()
y = df['target'].copy()

print(f"[TRAIN] Dataset shape: {X.shape}")
print(f"[TRAIN] Class distribution:\n{y.value_counts().to_string()}")

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("[TRAIN] Training Random Forest model...")
model = RandomForestClassifier(n_estimators=200, max_depth=12, random_state=42, class_weight='balanced')
model.fit(X_train_scaled, y_train)

y_pred = model.predict(X_test_scaled)
y_prob = model.predict_proba(X_test_scaled)[:, 1]

acc = accuracy_score(y_test, y_pred)
prec = precision_score(y_test, y_pred)
rec = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
auc = roc_auc_score(y_test, y_prob)

print(f"[TRAIN] Model Performance:")
print(f"  Accuracy:  {acc:.3f}")
print(f"  Precision: {prec:.3f}")
print(f"  Recall:    {rec:.3f}")
print(f"  F1 Score:  {f1:.3f}")
print(f"  AUC-ROC:   {auc:.3f}")

feature_importance = pd.DataFrame({
    'feature': feature_cols,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)
print(f"\n[TRAIN] Feature Importances:\n{feature_importance.to_string(index=False)}")

print("[TRAIN] Creating SHAP TreeExplainer for per-instance explanations...")
background = X_train_scaled[:50]
explainer = shap.TreeExplainer(model, background)
expected_value = explainer.expected_value

if isinstance(expected_value, (list, np.ndarray)) and len(expected_value) == 2:
    ev = float(expected_value[1])
elif isinstance(expected_value, np.ndarray):
    ev = float(expected_value)
else:
    ev = float(expected_value)
print(f"[TRAIN] SHAP explainer ready. Expected value (base risk): {ev:.4f}")

artifacts = {
    'model': model,
    'scaler': scaler,
    'features': feature_cols,
    'feature_importance': feature_importance,
    'train_accuracy': round(acc, 4),
    'train_precision': round(prec, 4),
    'train_recall': round(rec, 4),
    'train_f1': round(f1, 4),
    'train_auc': round(auc, 4),
    'n_samples': len(df),
    'class_distribution': y.value_counts().to_dict(),
    'explainer': explainer,
    'expected_value': float(expected_value[1]) if isinstance(expected_value, (list, np.ndarray)) and len(expected_value) == 2 else float(expected_value)
}

joblib.dump(artifacts, 'model_artifacts.pkl')
print("\n[TRAIN] Model artifacts saved to model_artifacts.pkl (includes SHAP explainer)")
print("[TRAIN] Training complete!")
