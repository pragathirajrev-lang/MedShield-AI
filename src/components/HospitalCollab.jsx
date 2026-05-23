"use client";

import React, { useState } from "react";
import { 
  Globe, 
  Database, 
  ShieldCheck, 
  Activity, 
  RefreshCw, 
  Key, 
  Wifi, 
  Clock 
} from "lucide-react";

export default function HospitalCollab() {
  const [rotatedKeys, setRotatedKeys] = useState(false);
  const [rotating, setRotating] = useState(false);

  const triggerKeyRotation = () => {
    setRotating(true);
    setTimeout(() => {
      setRotating(false);
      setRotatedKeys(true);
      setTimeout(() => setRotatedKeys(false), 3000);
    }, 1500);
  };

  const hospitalNodes = [
    { name: "Metro General Hospital", location: "New York, USA", ping: "12ms", records: "42 Patients", status: "Online", keys: "E4B2-74F9" },
    { name: "St. Jude Cardiac Center", location: "London, UK", ping: "24ms", records: "42 Patients", status: "Online", keys: "F9C3-D80A" },
    { name: "Northside Clinical Network", location: "Frankfurt, GER", ping: "8ms", records: "41 Patients", status: "Online", keys: "A2C1-FF7C" },
    { name: "County Pediatric Trust", location: "Tokyo, JPN", ping: "38ms", records: "41 Patients", status: "Online", keys: "88B4-FF90" }
  ];

  return (
    <div className="space-y-6 text-left theme-text">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            Hospital Collaboration Hub
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">Distributed network nodes securely synchronizing predictive AI parameters.</p>
        </div>
        <button
          onClick={triggerKeyRotation}
          disabled={rotating}
          className="px-5 py-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-200 hover:text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
        >
          <Key className={`w-5 h-5 ${rotating ? "animate-spin text-cyan-400" : "text-slate-400"}`} />
          {rotatedKeys ? "Keys Rotated!" : "Rotate Secure Keys"}
        </button>
      </div>

      {/* SVG Global Network Map */}
      <div className="glass-panel p-6 rounded-2xl border-slate-800/60 flex flex-col justify-between relative overflow-hidden h-[300px] items-center justify-center">
        {/* Glow ball */}
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[90px]" />
        
        {/* Animated Cyber SVG World Grid */}
        <svg viewBox="0 0 1000 400" className="w-full h-full opacity-70 z-10">
          {/* Static vector grid lines */}
          <path d="M 0,200 L 1000,200 M 500,0 L 500,400" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          
          {/* World map stylized coordinates dots */}
          <circle cx="200" cy="150" r="1.5" fill="rgba(255,255,255,0.15)" />
          <circle cx="250" cy="180" r="2" fill="rgba(255,255,255,0.1)" />
          <circle cx="700" cy="220" r="1.5" fill="rgba(255,255,255,0.1)" />
          
          {/* Active collaborating Hospital Nodes */}
          {/* NY Node */}
          <g transform="translate(250, 130)">
            <circle cx="0" cy="0" r="10" fill="none" stroke="#00F2FE" strokeWidth="1.5" className="animate-ping-glow" />
            <circle cx="0" cy="0" r="4" fill="#00F2FE" />
            <text x="14" y="5" fill="#94A3B8" fontSize="11" fontFamily="monospace" fontWeight="bold">Metro Gen (NYC)</text>
          </g>

          {/* London Node */}
          <g transform="translate(480, 110)">
            <circle cx="0" cy="0" r="10" fill="none" stroke="#8B5CF6" strokeWidth="1.5" className="animate-ping-glow" />
            <circle cx="0" cy="0" r="4" fill="#8B5CF6" />
            <text x="14" y="5" fill="#94A3B8" fontSize="11" fontFamily="monospace" fontWeight="bold">St. Jude (LDN)</text>
          </g>

          {/* Frankfurt Node */}
          <g transform="translate(520, 120)">
            <circle cx="0" cy="0" r="8" fill="none" stroke="#10B981" strokeWidth="1.5" className="animate-ping-glow" />
            <circle cx="0" cy="0" r="3.5" fill="#10B981" />
            <text x="14" y="5" fill="#94A3B8" fontSize="11" fontFamily="monospace" fontWeight="bold">Northside (GER)</text>
          </g>

          {/* Tokyo Node */}
          <g transform="translate(820, 160)">
            <circle cx="0" cy="0" r="10" fill="none" stroke="#F43F5E" strokeWidth="1.5" className="animate-ping-glow" />
            <circle cx="0" cy="0" r="4" fill="#F43F5E" />
            <text x="-90" y="5" fill="#94A3B8" fontSize="11" fontFamily="monospace" fontWeight="bold">Pediatric Trust (TYO)</text>
          </g>

          {/* Connected flow paths to the center (Aggregator Server) */}
          <g transform="translate(500, 200)">
            <circle cx="0" cy="0" r="6" fill="#F1F5F9" className="animate-pulse" />
            <text x="-45" y="22" fill="#E2E8F0" fontSize="12" fontWeight="bold">Central Aggregator</text>
          </g>

          {/* NY flow */}
          <line x1="250" y1="130" x2="500" y2="200" stroke="rgba(0, 242, 254, 0.2)" strokeWidth="1.5" className="animate-flow-line" />
          {/* London flow */}
          <line x1="480" y1="110" x2="500" y2="200" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1.5" className="animate-flow-line" />
          {/* Frankfurt flow */}
          <line x1="520" y1="120" x2="500" y2="200" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1.5" className="animate-flow-line" />
          {/* Tokyo flow */}
          <line x1="820" y1="160" x2="500" y2="200" stroke="rgba(244, 63, 94, 0.2)" strokeWidth="1.5" className="animate-flow-line" />
        </svg>
      </div>

      {/* Nodes Connection Status Table */}
      <div className="glass-panel rounded-2xl border-slate-800/60 overflow-hidden">
        <table className="w-full text-sm text-slate-300 font-mono">
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-900 text-slate-400 font-bold uppercase text-xs tracking-wider text-left">
              <th className="p-4">Hospital Node Clinic</th>
              <th className="p-4">EHR Registry Size</th>
              <th className="p-4">Secure Link Ping</th>
              <th className="p-4">Rotated Validation Key</th>
              <th className="p-4 text-right">Tunnel Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900/60">
            {hospitalNodes.map((h, idx) => (
              <tr key={idx} className="hover:bg-slate-900/20 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <Database className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-200 text-base">{h.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{h.location}</div>
                  </div>
                </td>
                <td className="p-4 text-slate-300 font-semibold">{h.records}</td>
                <td className="p-4 text-slate-300 font-semibold flex items-center gap-1.5 mt-2.5">
                  <Clock className="w-4 h-4 text-slate-500" />
                  {h.ping}
                </td>
                <td className="p-4 text-indigo-400 font-bold">
                  {rotating ? (
                    <span className="text-xs text-slate-500 animate-pulse">generating...</span>
                  ) : rotatedKeys ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" />
                      NEW KEY
                    </span>
                  ) : (
                    h.keys
                  )}
                </td>
                <td className="p-4 text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wide">
                    <Wifi className="w-4 h-4 text-emerald-400" />
                    ONLINE
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
