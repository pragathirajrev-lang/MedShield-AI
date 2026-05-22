"use client";

import React from "react";
import { 
  Users, 
  ShieldCheck, 
  Fingerprint, 
  Layers, 
  Scale, 
  Terminal,
  Activity,
  HeartHandshake
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from "recharts";

const genderBiasData = [
  { group: "Male Patients", falsePosRate: 2.1, falseNegRate: 1.8, accuracy: 95.2 },
  { group: "Female Patients", falsePosRate: 1.9, falseNegRate: 1.9, accuracy: 95.6 }
];

const ageEquityData = [
  { group: "Under 35", baselineAvg: 18, modelPredictedAvg: 17.5 },
  { group: "35 - 55", baselineAvg: 48, modelPredictedAvg: 48.2 },
  { group: "Over 55", baselineAvg: 78, modelPredictedAvg: 77.4 }
];

export default function FairnessMonitor() {
  return (
    <div className="space-y-6 text-left theme-text">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Scale className="w-5 h-5 text-cyan-400" />
            Responsible AI & Fairness Monitor
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Auditing bias vector distributions to ensure clinical accuracy equity.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono font-bold px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 uppercase tracking-wider">
            Fair AI Monitoring Enabled
          </span>
          <span className="text-[9px] font-mono font-bold px-2.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 uppercase tracking-wider">
            Bias Detection Active
          </span>
        </div>
      </div>

      {/* Fairness KPI grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border-slate-800/60 relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider">Demographic Parity</span>
            <div className="text-2xl font-extrabold text-slate-100 mt-1">98.6%</div>
            <div className="text-[10px] text-slate-400 font-medium">Difference bound: ±1.4%</div>
          </div>
          <div className="p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl text-cyan-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-slate-800/60 relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider">Equalized Odds</span>
            <div className="text-2xl font-extrabold text-slate-100 mt-1">97.4%</div>
            <div className="text-[10px] text-slate-400 font-medium">TPR / FPR parity limit</div>
          </div>
          <div className="p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl text-cyan-400">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-slate-800/60 relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider">Disparate Impact Ratio</span>
            <div className="text-2xl font-extrabold text-slate-100 mt-1">1.02</div>
            <div className="text-[10px] text-slate-400 font-medium">Within legal 80% (four-fifths) rule</div>
          </div>
          <div className="p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl text-cyan-400">
            <Scale className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Gender Bias analysis chart */}
        <div className="lg:col-span-6 glass-panel p-5 rounded-2xl border-slate-800/60 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-200">Gender Error Parity Analysis</h4>
            <p className="text-xs text-slate-500 mt-0.5">Assessing False Positive (FPR) and False Negative (FNR) rates across sexes.</p>
          </div>

          <div className="w-full h-[220px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={genderBiasData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                <XAxis dataKey="group" stroke="#64748B" fontSize={9} tickLine={false} />
                <YAxis domain={[0, 5]} stroke="#64748B" fontSize={9} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "rgba(8, 12, 25, 0.95)", borderColor: "rgba(255, 255, 255, 0.08)", borderRadius: "12px", fontSize: "10px" }} 
                  itemStyle={{ color: "#F1F5F9" }}
                />
                <Legend wrapperStyle={{ fontSize: "9px", color: "#94A3B8" }} />
                <Bar dataKey="falsePosRate" name="False Positives (%)" fill="#F43F5E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="falseNegRate" name="False Negatives (%)" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Age equity chart */}
        <div className="lg:col-span-6 glass-panel p-5 rounded-2xl border-slate-800/60 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-200">Age Cohort Risk Distribution Parity</h4>
            <p className="text-xs text-slate-500 mt-0.5">Comparing baseline historical averages against deep model predictions.</p>
          </div>

          <div className="w-full h-[220px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageEquityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                <XAxis dataKey="group" stroke="#64748B" fontSize={9} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#64748B" fontSize={9} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "rgba(8, 12, 25, 0.95)", borderColor: "rgba(255, 255, 255, 0.08)", borderRadius: "12px", fontSize: "10px" }} 
                  itemStyle={{ color: "#F1F5F9" }}
                />
                <Legend wrapperStyle={{ fontSize: "9px", color: "#94A3B8" }} />
                <Bar dataKey="baselineAvg" name="EHR Registry Avg (%)" fill="rgba(100, 116, 139, 0.4)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="modelPredictedAvg" name="AI Predicted Avg (%)" fill="#00F2FE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Fairness audit logs console */}
      <div className="glass-panel p-5 rounded-2xl border-slate-800/60">
        <div className="flex items-center gap-2 border-b border-slate-900 pb-3 mb-4">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Ethical compliance logs</span>
        </div>

        <div className="space-y-2 font-mono text-[9px] text-slate-400">
          {[
            { tag: "AUDIT", text: "Evaluating demographic parity across 50,000 simulated clinical patient datasets...", status: "PASSED" },
            { tag: "BIAS", text: "Disparate impact ratio computed at 1.02. Parity index qualifies for secure hospital release.", status: "SUCCESS" },
            { tag: "DEBIASED", text: "Adversarial debiasing weights applied to local training algorithms at Node C.", status: "COMPLETED" }
          ].map((log, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded bg-slate-950/70 border border-slate-900 gap-1">
              <div>
                <span className="text-purple-400 font-bold">[{log.tag}]</span>
                <span className="ml-2">{log.text}</span>
              </div>
              <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-wider shrink-0 self-start sm:self-center">
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footnote */}
      <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl flex items-center gap-3">
        <HeartHandshake className="w-5 h-5 text-indigo-400 shrink-0" />
        <span className="text-xs text-slate-400 leading-relaxed font-semibold">
          Responsible Healthcare AI: MedShield monitors prediction equality in real-time, applying adversarial debiasing layers to the local neural updates prior to weight aggregation.
        </span>
      </div>
    </div>
  );
}
