"use client";

import React, { useState } from "react";
import { 
  ShieldAlert, 
  Terminal, 
  Activity, 
  WifiOff, 
  Play, 
  AlertOctagon, 
  ShieldX, 
  CheckCircle,
  RefreshCw
} from "lucide-react";

export default function EmergencyAlerts() {
  const [sanitizing, setSanitizing] = useState(false);
  const [sanitized, setSanitized] = useState(false);
  const [alerts, setAlerts] = useState([
    { id: 1, node: "Node B", title: "Sudden Cardiac Metric Outlier", desc: "Patient telemetry logs BP at 198 mmHg systolic, exceeding critical threshold limits. Model auto-flagged.", severity: "critical", time: "16:48" },
    { id: 2, node: "Node A", title: "Adversarial Weight Update Blocked", desc: "Encrypted parameters departed from convergence boundaries by 4.2x. Secure Outlier Rejection active.", severity: "warning", time: "16:32" },
    { id: 3, node: "Node D", title: "Glucose Anomaly Recorded", desc: "Telemetry spike at 245 mg/dL Fasting Sugar flagged. Local differential privacy bounds corrected.", severity: "info", time: "16:11" }
  ]);

  const triggerSanitation = () => {
    setSanitizing(true);
    setTimeout(() => {
      setSanitizing(false);
      setSanitized(true);
      setAlerts(prev => prev.filter(a => a.severity !== "critical"));
      setTimeout(() => setSanitized(false), 3000);
    }, 1500);
  };

  const handleMute = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6 text-left theme-text">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />
            Emergency Anomaly Desk
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Real-time surveillance of outlier telemetry and adversarial neural update vector attacks.</p>
        </div>
        
        <button
          onClick={triggerSanitation}
          disabled={sanitizing}
          className="px-4 py-2 bg-rose-600/90 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${sanitizing ? "animate-spin" : ""}`} />
          {sanitized ? "Network Sanitized!" : "Run Network Sanitation"}
        </button>
      </div>

      {/* Crimson Warning Banner */}
      {alerts.some(a => a.severity === "critical") && (
        <div className="relative overflow-hidden rounded-2xl border border-rose-500/20 bg-rose-950/20 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full filter blur-xl animate-pulse" />
          
          <div className="flex items-center gap-4 z-10">
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <AlertOctagon className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-200">Critical Patient Outlier telemetries Synced</h4>
              <p className="text-xs text-rose-400/80 leading-normal max-w-xl mt-1">
                Node B has recorded a patient metric boundary violation. Aggregated model parameters have automatically decoupled Node B from general updates until sanity audit passes.
              </p>
            </div>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-rose-500 bg-rose-950/30 text-rose-400 font-extrabold uppercase shrink-0">
            Node isolated
          </span>
        </div>
      )}

      {/* Alerts Feed */}
      <div className="grid grid-cols-1 gap-4">
        {alerts.map(a => (
          <div 
            key={a.id}
            className={`glass-panel p-5 rounded-2xl border relative overflow-hidden flex flex-col justify-between ${
              a.severity === "critical" ? "border-rose-500/20 bg-rose-500/5 shadow-[0_0_15px_rgba(244,63,94,0.02)]" :
              a.severity === "warning" ? "border-amber-500/20 bg-amber-500/5" : "border-slate-800 bg-slate-900/10"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-900/60 pb-3">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  a.severity === "critical" ? "bg-rose-500 animate-ping-glow" :
                  a.severity === "warning" ? "bg-amber-500" : "bg-cyan-500"
                }`} />
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  [{a.node}] — {a.title}
                </span>
              </div>
              <span className="text-[9px] font-mono text-slate-500">{a.time}</span>
            </div>

            <div className="my-4 text-xs text-slate-300 leading-relaxed text-left">
              {a.desc}
            </div>

            <div className="flex items-center justify-between border-t border-slate-900/60 pt-3 text-[10px] font-mono">
              <span className={`font-bold ${
                a.severity === "critical" ? "text-rose-400" :
                a.severity === "warning" ? "text-amber-400" : "text-cyan-400"
              }`}>
                SEVERITY: {a.severity.toUpperCase()}
              </span>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleMute(a.id)}
                  className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-900 border border-slate-900 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="glass-panel p-12 rounded-2xl border-slate-800 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-slate-200">Zero active system anomalies</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              All collaborating clinics, data nodes, and aggregated update streams conform structurally to validation rules.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
