"use client";

import React from "react";
import { 
  Users, 
  Cpu, 
  Activity, 
  ShieldAlert, 
  HeartHandshake, 
  Clock, 
  TrendingUp,
  Brain,
  Shield,
  ArrowUpRight
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from "recharts";
import FederatedVisualizer from "./FederatedVisualizer";

const performanceData = [
  { round: "R10", globalAccuracy: 78, localAvgAccuracy: 74 },
  { round: "R15", globalAccuracy: 82, localAvgAccuracy: 78 },
  { round: "R20", globalAccuracy: 85, localAvgAccuracy: 81 },
  { round: "R25", globalAccuracy: 89, localAvgAccuracy: 84 },
  { round: "R30", globalAccuracy: 91, localAvgAccuracy: 87 },
  { round: "R35", globalAccuracy: 93, localAvgAccuracy: 89 },
  { round: "R40", globalAccuracy: 94.8, localAvgAccuracy: 91.2 },
  { round: "R42", globalAccuracy: 95.4, localAvgAccuracy: 91.8 }
];

export default function OverviewPanel({ onNavigate }) {
  
  const stats = [
    { id: "high-risk", label: "High Risk Patients", value: "24", subtext: "18.2% of registry", icon: Users, color: "text-rose-400 border-rose-500/20 bg-rose-500/5", tab: "patient-risk" },
    { id: "active-nodes", label: "Active Hospital Nodes", value: "4 / 4", subtext: "100% network sync", icon: HeartHandshake, color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5", tab: "collab" },
    { id: "model-accuracy", label: "Global Model Accuracy", value: "95.4%", subtext: "+0.6% this round", icon: Brain, color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5", tab: "architecture" },
    { id: "anomaly-alerts", label: "System Anomalies", value: "02", subtext: "Active node monitors", icon: ShieldAlert, color: "text-amber-400 border-amber-500/20 bg-amber-500/5", tab: "emergency" }
  ];

  return (
    <div className="space-y-6 text-left theme-text">
      
      {/* Dashboard Headline */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Healthcare Intelligence Overview
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Real-time status of distributed federated disease risk prediction pipelines.</p>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div 
              key={s.id}
              onClick={() => onNavigate(s.tab)}
              className={`glass-panel p-5 rounded-2xl border flex items-center justify-between transition-all duration-300 hover:scale-[1.01] hover:border-slate-700 cursor-pointer ${s.color}`}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">{s.label}</span>
                <div className="text-2xl font-extrabold tracking-tight text-slate-100 mt-1">{s.value}</div>
                <div className="text-[10px] text-slate-400 font-medium">{s.subtext}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-900 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Embedded Federated Visualizer Module */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Decentralized Training Simulation</h4>
          <button 
            onClick={() => onNavigate("collab")} 
            className="text-[10px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            Manage Nodes <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <FederatedVisualizer />
      </div>

      {/* Analytics Charts & Security Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Model Accuracy Convergence Curve */}
        <div className="lg:col-span-8 glass-panel p-5 rounded-2xl border-slate-800/60 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-200">Global Model Convergence Curve</h4>
            <p className="text-xs text-slate-500 mt-0.5">Model accuracy improves dynamically across secure validation benchmarks.</p>
          </div>
          
          <div className="w-full h-[220px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="globalAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F2FE" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#00F2FE" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="localAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                <XAxis dataKey="round" stroke="#64748B" fontSize={9} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#64748B" fontSize={9} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "rgba(8, 12, 25, 0.95)", borderColor: "rgba(255, 255, 255, 0.08)", borderRadius: "12px", fontSize: "10px" }} 
                  itemStyle={{ color: "#F1F5F9" }}
                />
                <Area type="monotone" dataKey="globalAccuracy" name="Global Collaborative Accuracy" stroke="#00F2FE" strokeWidth={2} fillOpacity={1} fill="url(#globalAcc)" />
                <Area type="monotone" dataKey="localAvgAccuracy" name="Individual Node Avg" stroke="#8B5CF6" strokeWidth={1.5} fillOpacity={1} fill="url(#localAvg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live System Predictions Ledger */}
        <div className="lg:col-span-4 glass-panel p-5 rounded-2xl border-slate-800/60 flex flex-col justify-between">
          <div className="border-b border-slate-900 pb-3">
            <h4 className="text-sm font-bold text-slate-200">Global Registry Sync Ledger</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Cryptographic logs of recent synchronized hospital risk weights.</p>
          </div>

          <div className="my-4 flex-grow overflow-y-auto space-y-2.5 max-h-[200px] font-mono text-[9px]">
            {[
              { node: "Node A", action: "Pushed updates", time: "16:48", hash: "4E2B1F" },
              { node: "Node C", action: "Differential noise scale", time: "16:45", hash: "D90C8A" },
              { node: "Central Srv", action: "FedAvg update executed", time: "16:42", hash: "88B4C2" },
              { node: "Node B", action: "Synchronized parameters", time: "16:38", hash: "FF7C90" },
              { node: "Node D", action: "Encrypted keys rotated", time: "16:35", hash: "A1D2B5" }
            ].map((log, idx) => (
              <div key={idx} className="p-2 rounded bg-slate-950/60 border border-slate-900 flex items-center justify-between">
                <div>
                  <span className="text-cyan-400 font-bold">[{log.node}]</span>
                  <span className="text-slate-400 ml-1.5">{log.action}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <span>{log.time}</span>
                  <span className="bg-slate-900 px-1 py-0.5 rounded border border-slate-800 text-[8px] text-indigo-400">{log.hash}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-900/40 border border-slate-800/60 rounded-xl flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className="text-[9px] text-slate-400 leading-relaxed font-semibold">Model auto-syncs every 600s with active clinics</span>
          </div>
        </div>
      </div>
    </div>
  );
}
