"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  RefreshCw,
  Clock,
  ArrowUpRight,
  Database,
  Cpu,
  Globe
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
  LineChart as ReLineChart,
  Line
} from "recharts";

const diseaseTrendData = [
  { month: "Jan", cardiac: 42, respiratory: 28, diabetes: 35, renal: 18 },
  { month: "Feb", cardiac: 45, respiratory: 30, diabetes: 33, renal: 20 },
  { month: "Mar", cardiac: 48, respiratory: 25, diabetes: 38, renal: 22 },
  { month: "Apr", cardiac: 44, respiratory: 32, diabetes: 36, renal: 19 },
  { month: "May", cardiac: 50, respiratory: 28, diabetes: 40, renal: 24 },
  { month: "Jun", cardiac: 47, respiratory: 35, diabetes: 37, renal: 21 }
];

const riskDistributionData = [
  { name: "Low Risk", value: 42, color: "#10B981" },
  { name: "Medium Risk", value: 35, color: "#F59E0B" },
  { name: "High Risk", value: 23, color: "#F43F5E" }
];

const hospitalPredictionData = [
  { hospital: "Metro Gen", predictions: 2840, accuracy: 96.2 },
  { hospital: "St. Jude", predictions: 1950, accuracy: 94.8 },
  { hospital: "Northside", predictions: 2320, accuracy: 95.5 },
  { hospital: "Pediatric", predictions: 980, accuracy: 93.1 }
];

const flPerformanceData = [
  { round: "R10", global: 78, local: 74, loss: 0.45 },
  { round: "R15", global: 82, local: 78, loss: 0.38 },
  { round: "R20", global: 85, local: 81, loss: 0.32 },
  { round: "R25", global: 89, local: 84, loss: 0.26 },
  { round: "R30", global: 91, local: 87, loss: 0.21 },
  { round: "R35", global: 93, local: 89, loss: 0.17 },
  { round: "R40", global: 94.8, local: 91.2, loss: 0.14 },
  { round: "R42", global: 95.4, local: 91.8, loss: 0.12 }
];

export default function RealTimeAnalytics() {
  const [counters, setCounters] = useState({
    totalPredictions: 0,
    activeModels: 0,
    dataPoints: 0,
    federatedRounds: 0
  });

  useEffect(() => {
    const target = { totalPredictions: 28450, activeModels: 4, dataPoints: 1890000, federatedRounds: 42 };
    const interval = setInterval(() => {
      setCounters(prev => {
        const next = { ...prev };
        if (prev.totalPredictions < target.totalPredictions) next.totalPredictions = Math.min(target.totalPredictions, prev.totalPredictions + 427);
        if (prev.activeModels < target.activeModels) next.activeModels = Math.min(target.activeModels, prev.activeModels + 1);
        if (prev.dataPoints < target.dataPoints) next.dataPoints = Math.min(target.dataPoints, prev.dataPoints + 28350);
        if (prev.federatedRounds < target.federatedRounds) next.federatedRounds = Math.min(target.federatedRounds, prev.federatedRounds + 1);
        if (next.totalPredictions >= target.totalPredictions && next.dataPoints >= target.dataPoints && next.federatedRounds >= target.federatedRounds) {
          clearInterval(interval);
        }
        return next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 text-left theme-text">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Real-Time Healthcare Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Live federated intelligence metrics across distributed clinical network.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Updated live every 30s</span>
        </div>
      </div>

      {/* Animated Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border-slate-800/60">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider">Total AI Predictions</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-cyan-400 mt-2">{counters.totalPredictions.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 mt-1">+12.4% this quarter</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-slate-800/60">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider">Active Models</span>
            <Cpu className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-400 mt-2">{counters.activeModels}</div>
          <div className="text-[10px] text-slate-400 mt-1">Dense-Net v2 deployed</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-slate-800/60">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider">Data Points Analyzed</span>
            <Database className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-purple-400 mt-2">{(counters.dataPoints / 1000000).toFixed(1)}M</div>
          <div className="text-[10px] text-slate-400 mt-1">Across 4 secure nodes</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-slate-800/60">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider">Federated Rounds</span>
            <Globe className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-2">{counters.federatedRounds}</div>
          <div className="text-[10px] text-slate-400 mt-1">Secure aggregations completed</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Disease Trends */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border-slate-800/60">
          <h4 className="text-sm font-bold text-slate-200">Disease Trend Analysis</h4>
          <p className="text-xs text-slate-500 mt-0.5 mb-4">Monthly distribution of predicted disease categories across network.</p>
          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={diseaseTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="cardiac" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#F43F5E" stopOpacity={0.25}/><stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/></linearGradient>
                  <linearGradient id="respiratory" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/><stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/></linearGradient>
                  <linearGradient id="diabetes" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#00F2FE" stopOpacity={0.2}/><stop offset="95%" stopColor="#00F2FE" stopOpacity={0}/></linearGradient>
                  <linearGradient id="renal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2}/><stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={9} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "rgba(8, 12, 25, 0.95)", borderColor: "rgba(255, 255, 255, 0.08)", borderRadius: "12px", fontSize: "10px" }} itemStyle={{ color: "#F1F5F9" }} />
                <Legend wrapperStyle={{ fontSize: "9px", color: "#94A3B8" }} />
                <Area type="monotone" dataKey="cardiac" name="Cardiac" stroke="#F43F5E" strokeWidth={2} fill="url(#cardiac)" />
                <Area type="monotone" dataKey="respiratory" name="Respiratory" stroke="#8B5CF6" strokeWidth={2} fill="url(#respiratory)" />
                <Area type="monotone" dataKey="diabetes" name="Diabetes" stroke="#00F2FE" strokeWidth={2} fill="url(#diabetes)" />
                <Area type="monotone" dataKey="renal" name="Renal" stroke="#F59E0B" strokeWidth={2} fill="url(#renal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution Pie */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border-slate-800/60">
          <h4 className="text-sm font-bold text-slate-200">Risk Distribution</h4>
          <p className="text-xs text-slate-500 mt-0.5 mb-4">Patient risk category breakdown across all hospital nodes.</p>
          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} stroke="rgba(255,255,255,0.05)" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "rgba(8, 12, 25, 0.95)", borderColor: "rgba(255, 255, 255, 0.08)", borderRadius: "12px", fontSize: "10px" }} itemStyle={{ color: "#F1F5F9" }} />
                <Legend wrapperStyle={{ fontSize: "9px", color: "#94A3B8" }} />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Hospital Predictions & FL Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hospital-wise Predictions */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border-slate-800/60">
          <h4 className="text-sm font-bold text-slate-200">Hospital Predictions Volume</h4>
          <p className="text-xs text-slate-500 mt-0.5 mb-4">Total AI predictions generated per collaborating hospital node.</p>
          <div className="w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hospitalPredictionData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                <XAxis dataKey="hospital" stroke="#64748B" fontSize={9} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "rgba(8, 12, 25, 0.95)", borderColor: "rgba(255, 255, 255, 0.08)", borderRadius: "12px", fontSize: "10px" }} itemStyle={{ color: "#F1F5F9" }} />
                <Bar dataKey="predictions" name="Predictions" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* FL Performance */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border-slate-800/60">
          <h4 className="text-sm font-bold text-slate-200">Federated Learning Performance</h4>
          <p className="text-xs text-slate-500 mt-0.5 mb-4">Global vs local model accuracy convergence and training loss.</p>
          <div className="w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <ReLineChart data={flPerformanceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                <XAxis dataKey="round" stroke="#64748B" fontSize={9} tickLine={false} />
                <YAxis yAxisId="left" domain={[50, 100]} stroke="#64748B" fontSize={9} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 0.5]} stroke="#64748B" fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "rgba(8, 12, 25, 0.95)", borderColor: "rgba(255, 255, 255, 0.08)", borderRadius: "12px", fontSize: "10px" }} itemStyle={{ color: "#F1F5F9" }} />
                <Legend wrapperStyle={{ fontSize: "9px", color: "#94A3B8" }} />
                <Line yAxisId="left" type="monotone" dataKey="global" name="Global Accuracy" stroke="#00F2FE" strokeWidth={2} dot={{ fill: "#00F2FE", r: 3 }} />
                <Line yAxisId="left" type="monotone" dataKey="local" name="Local Avg Accuracy" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: "#8B5CF6", r: 3 }} />
                <Line yAxisId="right" type="monotone" dataKey="loss" name="Loss" stroke="#F43F5E" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </ReLineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Accuracy by hospital bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12 glass-panel p-5 rounded-2xl border-slate-800/60">
          <h4 className="text-sm font-bold text-slate-200">Model Accuracy by Hospital Node</h4>
          <p className="text-xs text-slate-500 mt-0.5 mb-4">Per-node validation accuracy with global federated benchmark.</p>
          <div className="w-full h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hospitalPredictionData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                <XAxis type="number" domain={[90, 100]} stroke="#64748B" fontSize={9} tickLine={false} />
                <YAxis type="category" dataKey="hospital" stroke="#64748B" fontSize={9} tickLine={false} width={80} />
                <Tooltip contentStyle={{ backgroundColor: "rgba(8, 12, 25, 0.95)", borderColor: "rgba(255, 255, 255, 0.08)", borderRadius: "12px", fontSize: "10px" }} itemStyle={{ color: "#F1F5F9" }} />
                <Bar dataKey="accuracy" name="Accuracy (%)" fill="#00F2FE" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
