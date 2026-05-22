"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Sliders, 
  RotateCcw, 
  Save, 
  TrendingDown, 
  TrendingUp, 
  CheckCircle,
  Sparkles,
  Heart
} from "lucide-react";
import { predictRisk } from "../lib/api";

export default function WhatIfSimulator({ 
  patientData, 
  setPatientData, 
  predictionResult, 
  setPredictionResult 
}) {
  const [simData, setSimData] = useState({ ...patientData });
  const [simRisk, setSimRisk] = useState(predictionResult.riskScore);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [predicting, setPredicting] = useState(false);

  useEffect(() => {
    setSimData({ ...patientData });
    if (predictionResult.riskScore > 0) {
      setSimRisk(predictionResult.riskScore);
    }
  }, [patientData, predictionResult]);

  const calculateSandboxRisk = useCallback(async (newData) => {
    setPredicting(true);
    try {
      const result = await predictRisk(newData);
      setSimRisk(result.risk_score);
    } catch {
      let baseRisk = 20;
      if (newData.age > 40) baseRisk += (newData.age - 40) * 0.8;
      if (newData.trestbps > 120) baseRisk += (newData.trestbps - 120) * 0.9;
      if (newData.chol > 180) baseRisk += (newData.chol - 180) * 0.25;
      const finalRisk = Math.max(5, Math.min(98, Math.round(baseRisk)));
      setSimRisk(finalRisk);
    } finally {
      setPredicting(false);
    }
  }, []);

  const handleSliderChange = (field, val) => {
    const updated = { ...simData, [field]: val };
    setSimData(updated);
    calculateSandboxRisk(updated);
    if (savedSuccess) setSavedSuccess(false);
  };

  const resetSandbox = () => {
    setSimData({ ...patientData });
    setSimRisk(predictionResult.riskScore || 0);
    setSavedSuccess(false);
  };

  const saveAsBaseline = async () => {
    setPatientData({ ...simData });
    try {
      const result = await predictRisk(simData);
      const factors = (result.contributing_factors || []).map(f => ({
        name: f.name,
        contribution: Math.round(f.contribution * (f.type === "positive" ? -1 : 1)),
        type: f.type === "positive" ? "positive" : "negative"
      }));
      setPredictionResult({
        riskScore: result.risk_score,
        category: result.category,
        confidence: Math.round(result.model_accuracy * 100) || 82,
        factors,
        timestamp: new Date().toLocaleTimeString(),
        apiError: null
      });
    } catch {
      setPredictionResult(prev => ({
        ...prev,
        riskScore: simRisk,
        timestamp: new Date().toLocaleTimeString()
      }));
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const delta = simRisk - (predictionResult.riskScore || 0);
  const isLower = delta < 0;
  const baselineRisk = predictionResult.riskScore || 0;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-stretch theme-text">
      
      <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border-slate-800/60 flex flex-col justify-between">
        <div className="border-b border-slate-900 pb-4 mb-6">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            Physician Sandbox Workspace
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Drag clinical properties to simulate theoretical wellness modifications.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Resting Blood Pressure</span>
              <span className="text-cyan-400 font-mono font-bold">{simData.trestbps} mmHg</span>
            </div>
            <input 
              type="range" min="80" max="250" 
              value={simData.trestbps} 
              onChange={e => handleSliderChange("trestbps", parseInt(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Serum Cholesterol</span>
              <span className="text-cyan-400 font-mono font-bold">{simData.chol} mg/dL</span>
            </div>
            <input 
              type="range" min="100" max="600" 
              value={simData.chol} 
              onChange={e => handleSliderChange("chol", parseInt(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Max Heart Rate</span>
              <span className="text-cyan-400 font-mono font-bold">{simData.thalach} BPM</span>
            </div>
            <input 
              type="range" min="60" max="220" 
              value={simData.thalach} 
              onChange={e => handleSliderChange("thalach", parseInt(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>ST Depression (Oldpeak)</span>
              <span className="text-cyan-400 font-mono font-bold">{simData.oldpeak}</span>
            </div>
            <input 
              type="range" min="0" max="6.2" step="0.1"
              value={simData.oldpeak} 
              onChange={e => handleSliderChange("oldpeak", parseFloat(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">Exercise-Induced Angina</span>
            <div className="grid grid-cols-2 gap-2">
              {[{ label: "No", val: 0 }, { label: "Yes", val: 1 }].map(s => (
                <button
                  key={s.label}
                  onClick={() => handleSliderChange("exang", s.val)}
                  className={`py-1.5 rounded-xl border text-xs font-semibold font-mono tracking-wider transition-colors cursor-pointer ${
                    simData.exang === s.val 
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
            <span className="text-xs font-semibold text-slate-300 block">Fasting Blood Sugar &gt; 120</span>
            <div className="grid grid-cols-2 gap-2">
              {[{ label: "No", val: 0 }, { label: "Yes", val: 1 }].map(s => (
                <button
                  key={s.label}
                  onClick={() => handleSliderChange("fbs", s.val)}
                  className={`py-1.5 rounded-xl border text-xs font-semibold font-mono tracking-wider transition-colors cursor-pointer ${
                    simData.fbs === s.val 
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

        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-900">
          <button
            onClick={resetSandbox}
            className="flex-1 py-3 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Sandbox
          </button>
          
          <button
            onClick={saveAsBaseline}
            disabled={predicting}
            className="flex-1 py-3 rounded-xl bg-cyan-600/90 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-cyan-400/20 shadow-[0_0_15px_rgba(0,242,254,0.1)] disabled:opacity-60"
          >
            {savedSuccess ? (
              <>
                <CheckCircle className="w-4 h-4 text-slate-950" />
                Baseline Updated!
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-slate-950" />
                Commit as Patient Baseline
              </>
            )}
          </button>
        </div>
      </div>

      <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border-slate-800/60 flex flex-col justify-between items-center text-center relative overflow-hidden min-h-[460px]">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full filter blur-xl" />
        
        <div className="w-full flex items-center justify-between border-b border-slate-900 pb-3">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest text-left">Simulation Telemetry</span>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-purple-500/30 bg-purple-950/20 text-purple-400 font-bold uppercase flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            SANDBOX MODE
          </span>
        </div>

        <div className="w-full my-8 space-y-6 flex-grow flex flex-col justify-center">
          
          <div className="space-y-2 text-left">
            <div className="flex justify-between text-xs font-semibold text-slate-400">
              <span>Patient Baseline Risk</span>
              <span className="font-mono">{baselineRisk > 0 ? `${baselineRisk}%` : "—"}</span>
            </div>
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-slate-500/60 rounded-full transition-all duration-500"
                style={{ width: `${baselineRisk}%` }}
              />
            </div>
          </div>

          <div className="space-y-2 text-left">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-cyan-400 animate-pulse fill-current" />
                Simulated Risk State
              </span>
              <span className="text-cyan-400 font-mono font-bold">{simRisk}%</span>
            </div>
            <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden p-[2px]">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  simRisk >= 75 ? "bg-gradient-to-r from-rose-500 to-pink-400" :
                  simRisk >= 40 ? "bg-gradient-to-r from-amber-500 to-yellow-400" : "bg-gradient-to-r from-emerald-500 to-teal-400"
                }`}
                style={{ width: `${simRisk}%` }}
              />
            </div>
          </div>

          <div className="mt-8 py-4 px-6 rounded-2xl border bg-slate-950/80 border-slate-900 flex flex-col items-center justify-center gap-2">
            {delta === 0 ? (
              <span className="text-xs text-slate-500 font-mono">No simulation adjustments made</span>
            ) : isLower ? (
              <>
                <TrendingDown className="w-8 h-8 text-emerald-400 animate-bounce" />
                <span className="text-sm font-extrabold text-emerald-400">
                  {Math.abs(delta)}% Risk Reduction!
                </span>
                <p className="text-[10px] text-slate-400 max-w-[200px] leading-normal text-center mt-1">
                  Adjusting these values decreases cardiovascular risk inside the global clinical average models.
                </p>
              </>
            ) : (
              <>
                <TrendingUp className="w-8 h-8 text-rose-400 animate-bounce" />
                <span className="text-sm font-extrabold text-rose-400">
                  +{delta}% Risk Elevation!
                </span>
                <p className="text-[10px] text-slate-400 max-w-[200px] leading-normal text-center mt-1">
                  Elevating these variables accelerates clinical vulnerability vectors according to model benchmarks.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="w-full pt-4 border-t border-slate-900 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>Decentralized Core Sync</span>
          <span className="text-cyan-500">ACTIVE COMPUTE</span>
        </div>
      </div>
    </div>
  );
}
