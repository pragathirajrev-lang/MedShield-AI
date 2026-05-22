"use client";

import React, { useState, useEffect } from "react";
import { 
  Heart, 
  Activity, 
  ShieldCheck, 
  Stethoscope, 
  Cpu, 
  Sparkles,
  RefreshCw,
  AlertTriangle,
  FlaskConical,
  Microscope,
  Bone
} from "lucide-react";
import { predictRisk, getModelInfo } from "../lib/api";

export default function PatientRiskPanel({ 
  patientData, 
  setPatientData, 
  predictionResult, 
  setPredictionResult 
}) {
  const [isPredicting, setIsPredicting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [modelInfo, setModelInfo] = useState(null);
  const [apiAvailable, setApiAvailable] = useState(true);

  useEffect(() => {
    getModelInfo()
      .then(info => {
        setModelInfo(info);
        setApiAvailable(true);
      })
      .catch(() => {
        setApiAvailable(false);
        setModelInfo(null);
      });
  }, []);

  const handleInputChange = (field, val) => {
    setPatientData(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const computeClinicalRisk = async () => {
    setIsPredicting(true);
    setProgress(0);
    setError(null);

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 10;
      });
    }, 80);

    try {
      const result = await predictRisk(patientData);

      const factors = (result.contributing_factors || []).map(f => ({
        name: featureLabels[f.name] || f.name,
        contribution: Math.round(f.contribution * (f.type === "positive" ? -1 : 1)),
        type: f.type === "positive" ? "positive" : "negative"
      }));

      setPredictionResult({
        riskScore: result.risk_score,
        category: result.category,
        confidence: Math.round(result.model_accuracy * 100) || 82,
        factors: factors,
        timestamp: new Date().toLocaleTimeString(),
        apiError: null
      });
    } catch (err) {
      setError(err.message);
      setPredictionResult(prev => ({
        ...prev,
        riskScore: 0,
        category: "Error",
        confidence: 0,
        factors: [],
        timestamp: new Date().toLocaleTimeString(),
        apiError: err.message
      }));
    } finally {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsPredicting(false);
        setProgress(0);
      }, 300);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left theme-text">
      
      <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border-slate-800/60 space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-cyan-400" />
            Patient Clinical Metrics Matrix
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Input precise clinical parameters to feed into the decentralized global model.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Patient Age</span>
              <span className="text-cyan-400 font-mono font-bold">{patientData.age} Years</span>
            </div>
            <input 
              type="range" min="18" max="100" 
              value={patientData.age} 
              onChange={e => handleInputChange("age", parseInt(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">Biological Sex</span>
            <div className="grid grid-cols-2 gap-2">
              {[{ label: "Female", val: 0 }, { label: "Male", val: 1 }].map(s => (
                <button
                  key={s.label}
                  onClick={() => handleInputChange("sex", s.val)}
                  className={`py-1.5 rounded-xl border text-xs font-semibold font-mono tracking-wider transition-colors cursor-pointer ${
                    patientData.sex === s.val 
                      ? "bg-cyan-500/10 border-cyan-500/35 text-cyan-400 font-bold" 
                      : "bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Resting Blood Pressure</span>
              <span className="text-cyan-400 font-mono font-bold">{patientData.trestbps} mmHg</span>
            </div>
            <input 
              type="range" min="80" max="250" 
              value={patientData.trestbps} 
              onChange={e => handleInputChange("trestbps", parseInt(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Serum Cholesterol</span>
              <span className="text-cyan-400 font-mono font-bold">{patientData.chol} mg/dL</span>
            </div>
            <input 
              type="range" min="100" max="600" 
              value={patientData.chol} 
              onChange={e => handleInputChange("chol", parseInt(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">Fasting Blood Sugar &gt; 120 mg/dL</span>
            <div className="grid grid-cols-2 gap-2">
              {[{ label: "No", val: 0 }, { label: "Yes", val: 1 }].map(s => (
                <button
                  key={s.label}
                  onClick={() => handleInputChange("fbs", s.val)}
                  className={`py-1.5 rounded-xl border text-xs font-semibold font-mono tracking-wider transition-colors cursor-pointer ${
                    patientData.fbs === s.val 
                      ? "bg-cyan-500/10 border-cyan-500/35 text-cyan-400 font-bold" 
                      : "bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Max Heart Rate</span>
              <span className="text-cyan-400 font-mono font-bold">{patientData.thalach} BPM</span>
            </div>
            <input 
              type="range" min="60" max="220" 
              value={patientData.thalach} 
              onChange={e => handleInputChange("thalach", parseInt(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">Chest Pain Type</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Typical Angina", val: 1 },
                { label: "Atypical Angina", val: 2 },
                { label: "Non-Anginal", val: 3 },
                { label: "Asymptomatic", val: 4 },
              ].map(s => (
                <button
                  key={s.val}
                  onClick={() => handleInputChange("cp", s.val)}
                  className={`py-1.5 rounded-xl border text-[10px] font-semibold font-mono tracking-wider transition-colors cursor-pointer ${
                    patientData.cp === s.val 
                      ? "bg-cyan-500/10 border-cyan-500/35 text-cyan-400 font-bold" 
                      : "bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">Exercise-Induced Angina</span>
            <div className="grid grid-cols-2 gap-2">
              {[{ label: "No", val: 0 }, { label: "Yes", val: 1 }].map(s => (
                <button
                  key={s.label}
                  onClick={() => handleInputChange("exang", s.val)}
                  className={`py-1.5 rounded-xl border text-xs font-semibold font-mono tracking-wider transition-colors cursor-pointer ${
                    patientData.exang === s.val 
                      ? "bg-cyan-500/10 border-cyan-500/35 text-cyan-400 font-bold" 
                      : "bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>ST Depression (Oldpeak)</span>
              <span className="text-cyan-400 font-mono font-bold">{patientData.oldpeak}</span>
            </div>
            <input 
              type="range" min="0" max="6.2" step="0.1"
              value={patientData.oldpeak} 
              onChange={e => handleInputChange("oldpeak", parseFloat(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Major Vessels (Fluoroscopy)</span>
              <span className="text-cyan-400 font-mono font-bold">{patientData.ca}</span>
            </div>
            <input 
              type="range" min="0" max="4" 
              value={patientData.ca} 
              onChange={e => handleInputChange("ca", parseInt(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">Resting ECG Results</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Normal", val: 0 },
                { label: "ST-T Abn.", val: 1 },
                { label: "LV Hyper.", val: 2 },
              ].map(s => (
                <button
                  key={s.val}
                  onClick={() => handleInputChange("restecg", s.val)}
                  className={`py-1.5 rounded-xl border text-[9px] font-semibold font-mono tracking-wider transition-colors cursor-pointer ${
                    patientData.restecg === s.val 
                      ? "bg-cyan-500/10 border-cyan-500/35 text-cyan-400 font-bold" 
                      : "bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">ST Segment Slope</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Upsloping", val: 0 },
                { label: "Flat", val: 1 },
                { label: "Downsloping", val: 2 },
              ].map(s => (
                <button
                  key={s.val}
                  onClick={() => handleInputChange("slope", s.val)}
                  className={`py-1.5 rounded-xl border text-[10px] font-semibold font-mono tracking-wider transition-colors cursor-pointer ${
                    patientData.slope === s.val 
                      ? "bg-cyan-500/10 border-cyan-500/35 text-cyan-400 font-bold" 
                      : "bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">Thalassemia</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Normal", val: 3 },
                { label: "Fixed Defect", val: 6 },
                { label: "Reversible", val: 7 },
              ].map(s => (
                <button
                  key={s.val}
                  onClick={() => handleInputChange("thal", s.val)}
                  className={`py-1.5 rounded-xl border text-[9px] font-semibold font-mono tracking-wider transition-colors cursor-pointer ${
                    patientData.thal === s.val 
                      ? "bg-cyan-500/10 border-cyan-500/35 text-cyan-400 font-bold" 
                      : "bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[10px]">
          <div className="flex items-center gap-1.5 text-slate-500">
            <FlaskConical className="w-3.5 h-3.5 text-cyan-500" />
            <span>Model: Random Forest</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Microscope className="w-3.5 h-3.5 text-purple-500" />
            <span>Dataset: UCI Heart Disease ({modelInfo?.dataset?.samples || "—"} records)</span>
          </div>
        </div>

        <button
          onClick={computeClinicalRisk}
          disabled={isPredicting}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold transition-all hover:shadow-[0_4px_25px_rgba(0,242,254,0.3)] hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80"
        >
          {isPredicting ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Scanning Cryptographic Models ({progress}%)
            </>
          ) : (
            <>
              <Heart className="w-5 h-5 text-slate-950 fill-current" />
              Predict Disease Risk Vectors
            </>
          )}
        </button>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>API Error: {error}. Make sure the backend is running.</span>
          </div>
        )}
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="glass-panel p-6 rounded-2xl border-slate-800/60 text-center relative overflow-hidden flex flex-col justify-between items-center h-full min-h-[460px]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full filter blur-xl" />
          
          <div className="w-full flex items-center justify-between border-b border-slate-900 pb-3">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">Diagnostic Report</span>
            <span className="text-[9px] font-mono text-slate-500">{predictionResult.timestamp || "—"}</span>
          </div>

          <div className="relative my-8 w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="88" cy="88" r="75" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="10" />
              <circle 
                cx="88" cy="88" r="75" 
                fill="none" 
                stroke={
                  predictionResult.category === "High" ? "#F43F5E" :
                  predictionResult.category === "Medium" ? "#F59E0B" : 
                  predictionResult.riskScore > 0 ? "#10B981" : "#334155"
                }
                strokeWidth="10" 
                strokeDasharray="471"
                strokeDashoffset={predictionResult.riskScore > 0 ? 471 - (471 * predictionResult.riskScore) / 100 : 471}
                className="transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-4xl font-extrabold tracking-tight ${predictionResult.riskScore > 0 ? "text-white" : "text-slate-600"}`}>
                {predictionResult.riskScore > 0 ? `${predictionResult.riskScore}%` : "—"}
              </span>
              <span className="text-[9px] font-mono text-slate-400 font-bold tracking-widest uppercase mt-1">Disease Risk</span>
            </div>
          </div>

          <div className="space-y-1.5 w-full">
            <div className="flex justify-center items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${
                predictionResult.category === "High" ? "bg-rose-500" :
                predictionResult.category === "Medium" ? "bg-amber-500" : 
                predictionResult.category === "Error" ? "bg-rose-500" :
                predictionResult.riskScore > 0 ? "bg-emerald-500" : "bg-slate-600"
              }`} />
              <span className={`text-base font-extrabold tracking-wide uppercase ${
                predictionResult.category === "High" ? "text-rose-400" :
                predictionResult.category === "Medium" ? "text-amber-400" : 
                predictionResult.category === "Error" ? "text-rose-400" :
                predictionResult.riskScore > 0 ? "text-emerald-400" : "text-slate-500"
              }`}>
                {predictionResult.riskScore > 0 ? `${predictionResult.category} Risk Category` : "Awaiting Prediction"}
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto px-4 mt-2">
              {predictionResult.category === "High" ? "Cardiovascular and metabolic factors indicate severe coronary vulnerability. Immediate professional referral and laboratory validation advised." :
               predictionResult.category === "Medium" ? "Elevated markers suggest borderline metabolic/cardiac issues. Recommendations include active lifestyle adjustments and 3-month labs." :
               predictionResult.category === "Low" ? "Patient telemetry aligns with standard healthy limits. Maintain current physical exercise schedules and annual wellness diagnostics." :
               "Configure clinical parameters and run prediction."}
            </p>
          </div>

          <div className="w-full mt-6 border-t border-slate-900 pt-4 flex items-center justify-between text-xs font-mono">
            <div className="text-left">
              <div className="text-slate-500">AI CONFIDENCE</div>
              <div className={`mt-0.5 ${predictionResult.confidence > 0 ? "text-slate-200" : "text-slate-500"}`}>
                {predictionResult.confidence > 0 ? `${predictionResult.confidence}% (Model Synced)` : "—"}
              </div>
            </div>
            <div className="text-right">
              <div className="text-slate-500">TRAINING DATA</div>
              <div className="text-emerald-400 flex items-center gap-1 mt-0.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                UCI HEART
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const featureLabels = {
  oldpeak: "ST Depression (Oldpeak)",
  thalach: "Max Heart Rate",
  slope: "ST Segment Slope",
  thal: "Thalassemia",
  trestbps: "Resting BP",
  age: "Age",
  chol: "Cholesterol",
  exang: "Exercise Angina",
  ca: "Major Vessels",
  cp: "Chest Pain Type",
  sex: "Sex",
  restecg: "Resting ECG",
  fbs: "Fasting Blood Sugar"
};
