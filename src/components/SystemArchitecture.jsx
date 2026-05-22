"use client";

import React, { useState } from "react";
import { 
  Layers, 
  Database, 
  Cpu, 
  Lock, 
  Server, 
  Sparkles, 
  Terminal,
  Activity,
  ShieldAlert
} from "lucide-react";

export default function SystemArchitecture() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Raw Patient telemetries (EHR)",
      desc: "Patient blood pressure, glucose, BMI, and cholesterol are logged. Files remain exclusively on-premise inside secure hospital SQL/EHR systems, locked from external access.",
      icon: Database,
      badge: "HIPAA Compliant",
      color: "border-cyan-500/20 text-cyan-400 bg-cyan-500/5"
    },
    {
      id: 1,
      title: "Localized AI Model Training",
      desc: "A local instance of deep neural networks (Dense-Net v2) executes training rounds on local GPU resources. No central access or file sharing takes place.",
      icon: Cpu,
      badge: "PyTorch Core",
      color: "border-indigo-500/20 text-indigo-400 bg-indigo-500/5"
    },
    {
      id: 2,
      title: "Secure Parameter Encryption",
      desc: "Differential noise algorithms randomized weights to block reverse engineering. Updates are blinding via cryptographical keys before leaving hospital firewalls.",
      icon: Lock,
      badge: "AES-256 Blinding",
      color: "border-purple-500/20 text-purple-400 bg-purple-500/5"
    },
    {
      id: 3,
      title: "Federated Weight Aggregation",
      desc: "Central aggregator averages coefficients from all hospitals (FedAvg). Cryptographic proof blocks unauthorized interceptors.",
      icon: Server,
      badge: "SecAgg Average",
      color: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5"
    },
    {
      id: 4,
      title: "Global Model Update",
      desc: "Refined models are broadcast back to participating clinics. Clinicians can load the explainability dashboard to query risk metrics immediately.",
      icon: Sparkles,
      badge: "SHAP Explainability",
      color: "border-rose-500/20 text-rose-400 bg-rose-500/5"
    }
  ];

  return (
    <div className="space-y-6 text-left theme-text">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Platform Core Architecture
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Comprehensive schematic workflow detailing data privacy and decentralized parameter sync.</p>
        </div>
      </div>

      {/* Interactive Flowchart Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Step Flow List */}
        <div className="lg:col-span-6 space-y-3.5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`glass-panel p-4 rounded-xl border-slate-800/80 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isActive 
                    ? "bg-cyan-500/10 border-cyan-500/35 shadow-[0_0_15px_rgba(0,242,254,0.04)]" 
                    : "hover:bg-slate-900/40"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-lg border flex items-center justify-center ${
                    isActive ? "bg-slate-950 border-cyan-400/50 text-cyan-400" : "bg-slate-900/60 border-slate-800 text-slate-500"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{step.title}</h4>
                    <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest">{step.badge}</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-600">PHASE 0{idx + 1}</div>
              </div>
            );
          })}
        </div>

        {/* Selected Step Explanation Detail Card */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border-slate-800/60 flex flex-col justify-between items-start text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full filter blur-xl" />
          
          <div className="w-full">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-6">
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">Architectural Deep Dive</span>
              <span className="text-[9px] font-mono text-slate-500">SECURE PIPELINE LAYER</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {React.createElement(steps[activeStep].icon, { className: "w-6 h-6 text-cyan-400" })}
                <h3 className="text-base font-extrabold text-slate-200">{steps[activeStep].title}</h3>
              </div>
              
              <p className="text-xs text-slate-400 leading-relaxed pt-2">
                {steps[activeStep].desc}
              </p>
            </div>
          </div>

          <div className="w-full mt-8 pt-4 border-t border-slate-900 flex flex-col sm:flex-row gap-4 sm:items-center justify-between text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5 font-bold text-slate-400">
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-500" />
              Differential Privacy Scale: ε=0.15
            </span>
            <span>SECURE CRYPTO HOOK</span>
          </div>
        </div>
      </div>

      {/* High-level cryptographic parameter audit info */}
      <div className="glass-panel p-5 rounded-2xl border-slate-800/60">
        <div className="flex items-center gap-2 border-b border-slate-900 pb-3 mb-4">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Secure Multi-Party Math Specification</span>
        </div>

        <div className="space-y-3 font-mono text-[10px] text-slate-400 leading-relaxed">
          <p>
            1. **Decentralized Updates**: Local gradients computed per hospital node: 
            <code className="text-cyan-400 font-bold ml-1.5">g_k = ∇L(W_t; X_k)</code>
          </p>
          <p>
            2. **Differentially Private Bounds**: Local update blinding bounds clipping with Laplacian/Gaussian noise integration:
            <code className="text-cyan-400 font-bold ml-1.5">g&apos;_k = g_k / max(1, ||g_k||/C) + N(0, σ^2 * C^2)</code>
          </p>
          <p>
            3. **Secure Average (SecAgg)**: Server averages update without reading isolated inputs: 
            <code className="text-cyan-400 font-bold ml-1.5">W_(t+1) = W_t + η * Σ(n_k / N) * g&apos;_k</code>
          </p>
        </div>
      </div>
    </div>
  );
}
