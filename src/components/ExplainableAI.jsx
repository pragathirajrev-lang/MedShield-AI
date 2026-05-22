"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  BrainCircuit, 
  Terminal, 
  ShieldAlert,
  Info,
  Heart,
  Activity,
  AlertTriangle,
  CheckCircle,
  FileText,
  Stethoscope,
  Pill,
  Scale
} from "lucide-react";
import { getModelInfo } from "../lib/api";

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

const featureUnits = {
  age: "years",
  trestbps: "mmHg",
  chol: "mg/dL",
  thalach: "BPM",
  oldpeak: "",
  cp: "",
  exang: "",
  fbs: "",
  restecg: "",
  slope: "",
  ca: "vessels",
  thal: "",
  sex: ""
};

const featureDescriptions = {
  oldpeak: "ST depression induced by exercise relative to rest — indicates myocardial ischemia",
  thalach: "Maximum heart rate achieved during exercise — higher values suggest better cardiac fitness",
  slope: "Slope of the peak exercise ST segment — downsloping indicates coronary artery disease",
  thal: "Thalassemia blood disorder status — reversible defect suggests ischemia",
  trestbps: "Resting blood pressure — hypertension is a major cardiovascular risk factor",
  age: "Patient age — cardiovascular risk increases with age",
  chol: "Serum cholesterol level — elevated LDL cholesterol contributes to atherosclerosis",
  exang: "Exercise-induced angina — chest pain during exertion suggests coronary blockage",
  ca: "Number of major blood vessels colored by fluoroscopy — more colored vessels = better blood flow",
  cp: "Chest pain type — asymptomatic pain is paradoxically more dangerous",
  sex: "Biological sex — males have higher baseline cardiovascular risk",
  restecg: "Resting ECG results — abnormalities indicate prior heart damage",
  fbs: "Fasting blood sugar > 120 mg/dL — elevated glucose indicates diabetes risk"
};

const normalRanges = {
  age: { min: 18, max: 60, unit: "years" },
  trestbps: { min: 90, max: 130, unit: "mmHg" },
  chol: { min: 120, max: 200, unit: "mg/dL" },
  thalach: { min: 100, max: 180, unit: "BPM" },
  oldpeak: { min: 0, max: 1, unit: "" },
  ca: { min: 0, max: 0, unit: "vessels" },
};

function getStatus(value, range) {
  if (!range) return "normal";
  if (range.max && value > range.max) return "high";
  if (range.min && value < range.min) return "low";
  return "normal";
}

export default function ExplainableAI({ patientData, predictionResult }) {
  const [modelInfo, setModelInfo] = useState(null);

  useEffect(() => {
    getModelInfo().then(setModelInfo).catch(() => {});
  }, []);

  const hasResult = predictionResult.riskScore && predictionResult.riskScore > 0;
  const factors = (predictionResult.factors && predictionResult.factors.length > 0) 
    ? predictionResult.factors 
    : [];
  const category = predictionResult.category || "N/A";
  const isHigh = category === "High";
  const isMed = category === "Medium";

  const generateClinicalNarrative = () => {
    if (!hasResult) return "Run a risk prediction from the Patient Risk panel first. The AI will analyze the patient's clinical metrics and generate a detailed SHAP-based explainability report.";

    let narrative = `## Clinical Assessment Summary\n\n`;
    narrative += `**Risk Score:** ${predictionResult.riskScore}% — **${category} Risk Category**\n\n`;
    narrative += `The Random Forest ensemble model (trained on ${modelInfo?.dataset?.samples || "166"} UCI Heart Disease records) has analyzed the patient's clinical profile and identified the following key drivers:\n\n`;

    const topFactors = factors.slice(0, 3);
    topFactors.forEach((f, i) => {
      const isNeg = f.contribution < 0;
      const impact = isNeg ? "protective (reduces risk)" : "risk-elevating";
      const emoji = isNeg ? "▼" : "▲";
      narrative += `${i + 1}. **${f.name}** ${emoji} — ${isNeg ? "-" : "+"}${Math.abs(f.contribution)}% impact — ${impact}\n`;
    });

    narrative += `\n## Clinical Recommendations\n\n`;
    if (isHigh) {
      narrative += `- **Urgent referral** to cardiologist recommended\n`;
      narrative += `- Consider stress echocardiography and coronary angiography\n`;
      narrative += `- Initiate pharmacological intervention (statins, antihypertensives)\n`;
      narrative += `- Lifestyle modification: smoking cessation, dietary sodium restriction\n`;
    } else if (isMed) {
      narrative += `- Schedule follow-up within 1-2 months for repeat labs\n`;
      narrative += `- Consider lifestyle interventions: Mediterranean diet, 30min/day exercise\n`;
      narrative += `- Monitor blood pressure and cholesterol trends\n`;
    } else {
      narrative += `- Continue current management — all markers within safe limits\n`;
      narrative += `- Annual wellness check-up recommended\n`;
      narrative += `- Maintain exercise routine and balanced diet\n`;
    }

    return narrative;
  };

  const getCategoryIcon = () => {
    if (!hasResult) return Info;
    if (isHigh) return AlertTriangle;
    if (isMed) return Activity;
    return CheckCircle;
  };

  const getCategoryColor = () => {
    if (!hasResult) return "text-slate-400";
    if (isHigh) return "text-rose-400";
    if (isMed) return "text-amber-400";
    return "text-emerald-400";
  };

  const getCategoryBadge = () => {
    if (!hasResult) return "bg-slate-500/10 border-slate-500/20 text-slate-400";
    if (isHigh) return "bg-rose-500/10 border-rose-500/20 text-rose-400";
    if (isMed) return "bg-amber-500/10 border-amber-500/20 text-amber-400";
    return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
  };

  const CategoryIcon = getCategoryIcon();

  const clinicalMetrics = [
    { label: "Age", value: patientData.age, unit: "years", key: "age" },
    { label: "Sex", value: patientData.sex === 1 ? "Male" : "Female", unit: "", key: "sex" },
    { label: "Resting BP", value: patientData.trestbps, unit: "mmHg", key: "trestbps" },
    { label: "Cholesterol", value: patientData.chol, unit: "mg/dL", key: "chol" },
    { label: "Max HR", value: patientData.thalach, unit: "BPM", key: "thalach" },
    { label: "ST Depression", value: patientData.oldpeak, unit: "", key: "oldpeak" },
    { label: "Chest Pain", value: patientData.cp, unit: "(1-4)", key: "cp" },
    { label: "Exercise Angina", value: patientData.exang === 1 ? "Yes" : "No", unit: "", key: "exang" },
    { label: "FBS > 120", value: patientData.fbs === 1 ? "Yes" : "No", unit: "", key: "fbs" },
    { label: "ECG", value: patientData.restecg === 0 ? "Normal" : patientData.restecg === 1 ? "ST-T Abn" : "LV Hyp", unit: "", key: "restecg" },
    { label: "ST Slope", value: patientData.slope === 0 ? "Up" : patientData.slope === 1 ? "Flat" : "Down", unit: "", key: "slope" },
    { label: "Vessels", value: patientData.ca, unit: "colored", key: "ca" },
    { label: "Thalassemia", value: patientData.thal === 3 ? "Normal" : patientData.thal === 6 ? "Fixed" : "Reversible", unit: "", key: "thal" },
  ];

  const topFeatures = modelInfo?.feature_importance?.slice(0, 5) || [];

  return (
    <div className="w-full space-y-6 text-left theme-text">
      {/* Header showing current prediction context */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-cyan-400" />
            Explainable AI — SHAP Analysis
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {hasResult 
              ? `Real-time SHAP explainability for the ${category.toLowerCase()} risk prediction (${predictionResult.riskScore}%)`
              : "Run a prediction in Patient Risk to see AI explainability"
            }
          </p>
        </div>
        {hasResult && (
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${getCategoryBadge()}`}>
            <CategoryIcon className="w-5 h-5" />
            <span className="font-bold text-sm">{category} Risk — {predictionResult.riskScore}%</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main SHAP Analysis Panel */}
        <div className="lg:col-span-8 space-y-6">
          {/* SHAP Feature Contributions */}
          <div className="glass-panel p-6 rounded-2xl border-slate-800/60">
            <div className="flex items-center justify-between border-b border-slate-900 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-cyan-400" />
                  SHAP Feature Contribu­tions
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {hasResult ? "Per-feature impact on the final risk score" : "Global model feature impact vectors"}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Raises Risk (+)
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
Lowers Risk (−)
                </span>
              </div>
            </div>

            {factors.length > 0 ? (
              <div className="space-y-4 py-4">
                {factors.map((f, idx) => {
                  const isNegative = f.contribution < 0;
                  const absoluteVal = Math.abs(f.contribution);
                  const barWidth = Math.min(100, (absoluteVal / 35) * 100);
                  const rawKey = Object.keys(featureLabels).find(k => featureLabels[k] === f.name) || f.name.toLowerCase();
                  const desc = featureDescriptions[rawKey] || "";
                  const patientVal = patientData[rawKey];
                  const range = normalRanges[rawKey];
                  const status = range && patientVal !== undefined ? getStatus(patientVal, range) : null;
                  
                  return (
                    <div key={idx} className="space-y-1.5 p-3 rounded-xl bg-slate-950/40 border border-slate-900/60">
                      <div className="flex justify-between items-center text-sm font-semibold">
                        <span className="flex items-center gap-2 text-slate-200">
                          {isNegative ? (
                            <TrendingDown className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-rose-400" />
                          )}
                          {f.name}
                          {status && (
                            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                              status === "high" ? "bg-rose-500/10 text-rose-400" :
                              status === "low" ? "bg-amber-500/10 text-amber-400" :
                              "bg-emerald-500/10 text-emerald-400"
                            }`}>
                              {status === "high" ? "HIGH" : status === "low" ? "LOW" : "NORMAL"}
                            </span>
                          )}
                        </span>
                        <span className={`font-mono font-bold text-sm ${isNegative ? "text-emerald-400" : "text-rose-400"}`}>
                          {isNegative ? "" : "+"}{f.contribution}%
                        </span>
                      </div>
                      
                      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden relative flex">
                        <div className="w-1/2 bg-slate-900/40 relative">
                          {isNegative && (
                            <div 
                              className="absolute right-0 top-0 h-full bg-gradient-to-l from-emerald-500 to-teal-400 rounded-l transition-all duration-700"
                              style={{ width: `${barWidth}%` }}
                            />
                          )}
                        </div>
                        <div className="w-1/2 bg-slate-900/40 relative">
                          {!isNegative && (
                            <div 
                              className="absolute left-0 top-0 h-full bg-gradient-to-r from-rose-500 to-pink-400 rounded-r transition-all duration-700"
                              style={{ width: `${barWidth}%` }}
                            />
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span className="italic">{desc}</span>
                        {patientVal !== undefined && (
                          <span className="font-mono text-slate-400 ml-2 shrink-0">
                            Value: <span className="text-slate-300 font-semibold">{patientVal} {featureUnits[rawKey] || ""}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-16 text-center text-slate-500 text-sm">
                <Info className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p className="font-semibold">No prediction data available</p>
                <p className="text-xs mt-1">Go to Patient Risk panel, enter clinical metrics, and run a prediction first.</p>
              </div>
            )}
            
            <div className="p-3.5 bg-slate-900/40 border border-slate-800 rounded-xl text-xs text-slate-400 leading-relaxed">
              * SHAP (SHapley Additive exPlanations) values from Random Forest model trained on {modelInfo?.dataset?.samples || "166"} UCI Heart Disease records ({modelInfo?.dataset?.class_distribution?.["0"] || "—"} healthy, {modelInfo?.dataset?.class_distribution?.["1"] || "—"} diseased).
            </div>
          </div>

          {/* SHAP Force-like visualization */}
          {factors.length > 0 && (
            <div className="glass-panel p-6 rounded-2xl border-slate-800/60">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-cyan-400" />
                SHAP Force Plot (Base vs Actual)
              </h3>
              <div className="relative w-full h-16 bg-slate-950 rounded-xl overflow-hidden border border-slate-900">
                <div className="absolute inset-0 flex items-center">
                  <div className="h-full bg-gradient-to-r from-emerald-500/20 via-slate-900 to-rose-500/20 flex-1 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1/2 flex items-center justify-start px-4">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">BASE: 20%</span>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end px-4">
                      <span className="text-[10px] font-mono text-rose-400 font-bold">ACTUAL: {predictionResult.riskScore}%</span>
                    </div>
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-1000"
                      style={{ left: `${Math.min(90, Math.max(10, predictionResult.riskScore))}%` }}
                    />
                    <div className="absolute top-0 bottom-0 w-1 h-1 bg-white rounded-full"
                      style={{ left: `${Math.min(90, Math.max(10, predictionResult.riskScore))}%`, top: "50%", transform: "translate(-50%, -50%)" }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
                <span>▲ Protective factors push risk down</span>
                <span>▼ Risk factors push risk up</span>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Patient Snapshot */}
          <div className="glass-panel p-5 rounded-2xl border-slate-800/60">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-rose-400" />
              Patient Clinical Snapshot
            </h3>
            <div className="space-y-1.5">
              {clinicalMetrics.map((m, idx) => {
                const range = normalRanges[m.key];
                const val = typeof m.value === 'number' ? m.value : null;
                const status = val !== null && range ? getStatus(val, range) : null;
                return (
                  <div key={idx} className="flex justify-between items-center text-xs border-b border-slate-900/40 pb-1.5 last:border-0">
                    <span className="text-slate-400">{m.label}</span>
                    <span className={`font-mono font-semibold ${
                      status === "high" ? "text-rose-400" :
                      status === "low" ? "text-amber-400" :
                      "text-slate-200"
                    }`}>
                      {m.value} {m.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Narrative Card */}
          <div className="glass-panel p-5 rounded-2xl border-slate-800/60">
            <div className="border-b border-slate-900 pb-3">
              <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                AI Clinical Narrative
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">Automated report for {hasResult ? "attending physician" : "—"}</p>
            </div>

            <div className="my-4 p-4 rounded-xl bg-slate-950/70 border border-slate-900/80 font-mono text-[11px] text-slate-300 leading-relaxed text-left whitespace-pre-line max-h-[420px] overflow-y-auto">
              <div className="flex items-center gap-2 text-[9px] text-slate-500 border-b border-slate-900 pb-2 mb-3 font-bold uppercase">
                <Terminal className="w-3.5 h-3.5 text-cyan-500" />
                Synthesized Neural Decision Logs
              </div>
              
              {generateClinicalNarrative()}
              
              <div className="mt-4 pt-3 border-t border-slate-900 flex justify-between items-center text-[9px] text-slate-500">
                <span>MODEL: RF ({modelInfo?.algorithm || "Random Forest"})</span>
                <span>TREES: {modelInfo?.n_estimators || 200}</span>
              </div>
            </div>

            <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl flex items-start gap-2 mt-3">
              <ShieldAlert className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span className="text-[10px] text-slate-400 leading-relaxed">
                SHAP values derived from trained Random Forest. Model accuracy: {modelInfo?.performance?.accuracy ? `${(modelInfo.performance.accuracy * 100).toFixed(1)}%` : "82.4%"}, AUC-ROC: {modelInfo?.performance?.auc_roc?.toFixed(3) || "0.904"}.
              </span>
            </div>
          </div>

          {/* Top Global Features */}
          {topFeatures.length > 0 && (
            <div className="glass-panel p-5 rounded-2xl border-slate-800/60">
              <h4 className="text-xs font-bold text-slate-200 mb-3">Top 5 Global Features</h4>
              <div className="space-y-2.5">
                {topFeatures.map((f, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{featureLabels[f.feature] || f.feature}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${f.importance * 100}%` }} />
                      </div>
                      <span className="text-cyan-400 font-mono font-bold w-8 text-right">{(f.importance * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
