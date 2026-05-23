"use client";

import React, { useEffect, useState } from "react";
import { 
  Shield, 
  Activity, 
  Cpu, 
  Lock, 
  ChevronRight, 
  Server, 
  Globe, 
  Database, 
  Heart,
  TrendingUp,
  AlertTriangle,
  Layers
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function LandingPage({ onSelectRole }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [stats, setStats] = useState({
    accuracy: 91,
    privacy: 100,
    records: 166,
    hospitals: 4
  });

  // Animated ticking stats on load
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        if (prev.accuracy >= 95 && prev.records >= 166 && prev.hospitals >= 4) {
          clearInterval(interval);
        }
        return {
          accuracy: 95,
          privacy: 100,
          records: 166,
          hospitals: 4
        };
      });
    }, 15);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen text-slate-100 overflow-hidden theme-bg-primary">
      {/* Ambient background glows */}
      <div className="glow-orb w-[500px] h-[500px] bg-indigo-500/10 top-[-10%] left-[-10%]" />
      <div className="glow-orb w-[600px] h-[600px] bg-cyan-500/10 bottom-[-10%] right-[-10%]" />
      <div className="glow-orb w-[400px] h-[400px] bg-purple-500/5 top-[30%] left-[40%]" />
      
      {/* Cyber Grid overlay */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-50 z-0" />

      {/* Floating Canvas Neural Stream Overlay (SVG for high fidelity performance) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <svg className="w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
          {/* Animated floating data streams */}
          <line x1="5%" y1="20%" x2="95%" y2="80%" stroke="rgba(0, 242, 254, 0.08)" strokeWidth="1" className="animate-flow-line" />
          <line x1="90%" y1="10%" x2="10%" y2="90%" stroke="rgba(139, 92, 246, 0.06)" strokeWidth="1.5" className="animate-flow-line" />
          
          {/* Pulsing nodes */}
          <circle cx="15%" cy="30%" r="6" fill="#00F2FE" className="animate-slow-pulse" />
          <circle cx="85%" cy="25%" r="8" fill="#8B5CF6" className="animate-slow-pulse" />
          <circle cx="75%" cy="75%" r="5" fill="#4FACFE" className="animate-slow-pulse" />
          <circle cx="25%" cy="80%" r="7" fill="#10B981" className="animate-slow-pulse" />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/40 blur-md rounded-lg animate-pulse" />
            <div className="relative bg-slate-900 border border-cyan-400 p-2.5 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">MEDSHIELD</span>
            <span className="ml-1 text-xs px-2 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 font-semibold font-mono tracking-widest uppercase">AI</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-slate-300 hover:text-cyan-400 transition-colors">Features</a>
          <a href="#federated" className="text-sm text-slate-300 hover:text-cyan-400 transition-colors">Federated Flow</a>
          <a href="#about" className="text-sm text-slate-300 hover:text-cyan-400 transition-colors">Security Core</a>
        </div>

        <ThemeToggle />

        <div className="flex items-center gap-2">
          <button 
            onClick={() => onSelectRole("doctor")}
            className="px-4 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            👨‍⚕️ Doctor
          </button>
          <button 
            onClick={() => onSelectRole("admin")}
            className="px-4 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            🏢 Admin
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/30 text-indigo-300 text-xs font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping-glow" />
            Empowering Collaborative Healthcare Intelligence
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Privacy-Preserving AI for <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent text-glow-cyan">
              Smarter Healthcare
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed">
            MedShield AI enables distributed hospital systems to collaboratively train state-of-the-art disease prediction models without ever sharing sensitive, raw patient telemetry.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <button 
              onClick={() => onSelectRole("doctor")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition-all shadow-[0_4px_20px_rgba(0,242,254,0.3)] hover:shadow-[0_4px_25px_rgba(0,242,254,0.45)] hover:scale-[1.02] flex items-center justify-center gap-3 cursor-pointer flex-1"
            >
              <Activity className="w-6 h-6 text-slate-950" />
              <div className="text-left">
                <div className="text-base">Enter as Doctor</div>
                <div className="text-[10px] font-normal text-slate-800/80">Patient Risk · XAI · What-If Simulator</div>
              </div>
            </button>
            
            <button 
              onClick={() => onSelectRole("admin")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold transition-all shadow-[0_4px_20px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.45)] hover:scale-[1.02] flex items-center justify-center gap-3 cursor-pointer flex-1"
            >
              <Layers className="w-6 h-6 text-white" />
              <div className="text-left">
                <div className="text-base">Enter as Administrator</div>
                <div className="text-[10px] font-normal text-white/70">Analytics · Network · Emergency</div>
              </div>
            </button>
          </div>

          {/* Core Telemetry Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-10 border-t border-slate-800/50">
            <div className="glass-panel p-4 rounded-xl border-slate-800/60 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-12 h-12 bg-cyan-500/5 rounded-full filter blur-md" />
              <div className="text-3xl font-extrabold text-cyan-400 tracking-tight">{stats.accuracy}%</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Prediction Accuracy</div>
            </div>

            <div className="glass-panel p-4 rounded-xl border-slate-800/60 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-500/5 rounded-full filter blur-md" />
              <div className="text-3xl font-extrabold text-indigo-400 tracking-tight">{stats.privacy}%</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Patient Privacy</div>
            </div>

            <div className="glass-panel p-4 rounded-xl border-slate-800/60 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-12 h-12 bg-purple-500/5 rounded-full filter blur-md" />
              <div className="text-3xl font-extrabold text-purple-400 tracking-tight">{stats.records}</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Patient Records</div>
            </div>

            <div className="glass-panel p-4 rounded-xl border-slate-800/60 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/5 rounded-full filter blur-md" />
              <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">{stats.hospitals}+</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Connected Hospitals</div>
            </div>
          </div>
        </div>

        {/* Hero Interactive Illustration Mock */}
        <div className="lg:col-span-5 relative w-full flex justify-center items-center">
          <div className="relative w-full max-w-[420px] aspect-square rounded-2xl glass-panel border-cyan-500/20 p-6 flex flex-col justify-between overflow-hidden shadow-[0_10px_40px_rgba(0,242,254,0.06)] animate-slow-pulse">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/10 via-indigo-950/20 to-purple-950/10 pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping-glow" />
                <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider">LIVE FEDERATED AGGREGATION</span>
              </div>
              <div className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400 font-semibold uppercase">
                ROUND 42
              </div>
            </div>

            {/* Neural network nodes visualization sketch */}
            <div className="my-6 relative flex-grow flex items-center justify-center">
              <div className="absolute w-[200px] h-[200px] rounded-full border border-dashed border-cyan-500/20 animate-spin-slow" />
              <div className="absolute w-[120px] h-[120px] rounded-full border border-dotted border-indigo-500/30 animate-spin" />
              
              {/* Central Server node */}
              <div className="absolute z-10 w-16 h-16 rounded-full glass-panel border-cyan-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(0,242,254,0.2)]">
                <Server className="w-7 h-7 text-cyan-400" />
              </div>

              {/* Distributed hospital nodes */}
              <div className="absolute top-[10%] left-[10%] w-10 h-10 rounded-xl glass-panel border-indigo-400/40 flex items-center justify-center">
                <Database className="w-5 h-5 text-indigo-300" />
              </div>
              <div className="absolute top-[10%] right-[10%] w-10 h-10 rounded-xl glass-panel border-indigo-400/40 flex items-center justify-center">
                <Database className="w-5 h-5 text-indigo-300" />
              </div>
              <div className="absolute bottom-[10%] left-[15%] w-10 h-10 rounded-xl glass-panel border-indigo-400/40 flex items-center justify-center">
                <Database className="w-5 h-5 text-indigo-300" />
              </div>
              <div className="absolute bottom-[10%] right-[15%] w-10 h-10 rounded-xl glass-panel border-indigo-400/40 flex items-center justify-center">
                <Database className="w-5 h-5 text-indigo-300" />
              </div>
            </div>

            <div className="glass-panel border-slate-800 p-3.5 rounded-xl bg-slate-950/60 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Lock className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-slate-200">Zero Patient Leaks</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Model weights encrypted with differential noise</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-900 bg-slate-950/20">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">Enterprise Platform Features</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Advanced Privacy-Preserving Infrastructure</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Constructed to meet rigorous global clinical compliance standpoints (HIPAA, GDPR) while accelerating healthcare AI precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel-interactive p-8 rounded-2xl flex flex-col items-start text-left space-y-4">
            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">Differential Privacy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Injects mathematical noise into model update vectors to structurally prevent memorization or reverse-engineering of patient telemetry files.
            </p>
          </div>

          <div className="glass-panel-interactive p-8 rounded-2xl flex flex-col items-start text-left space-y-4">
            <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">Decentralized Storage</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Maintains raw electronic health records (EHR) locally behind each hospital&apos;s private firewall, eliminating data consolidation risks.
            </p>
          </div>

          <div className="glass-panel-interactive p-8 rounded-2xl flex flex-col items-start text-left space-y-4">
            <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">Explainable Clinical Insights</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Incorporates explainable AI metrics (SHAP and What-If models) to give physicians readable, auditable explanations for risk assessments.
            </p>
          </div>
        </div>
      </section>

      {/* Federated Learning Visualization Section */}
      <section id="federated" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-900 bg-slate-950/20">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">Core Technology</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Federated Learning Flow</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Hospitals collaboratively train a shared model while keeping patient data completely isolated and private.
          </p>
        </div>

        {/* Visualization Diagram */}
        <div className="glass-panel p-6 md:p-10 rounded-2xl border-slate-800/60 relative overflow-hidden">
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Hospitals Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Hospital A", sub: "Metro General", records: "42 Patients", color: "from-cyan-500 to-blue-600" },
                { name: "Hospital B", sub: "St. Jude Cardiac", records: "42 Patients", color: "from-purple-500 to-indigo-600" },
                { name: "Hospital C", sub: "Northside Network", records: "41 Patients", color: "from-emerald-500 to-teal-600" },
                { name: "Hospital D", sub: "Pediatric Trust", records: "41 Patients", color: "from-rose-500 to-pink-600" }
              ].map((h, idx) => (
                <div key={idx} className="glass-panel p-4 rounded-xl border-slate-800/60 text-center group hover:border-cyan-500/20 transition-all">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${h.color} mx-auto flex items-center justify-center font-bold text-sm text-white shadow-lg`}>
                    {h.name.charAt(h.name.length - 1)}
                  </div>
                  <div className="mt-2 text-xs font-bold text-slate-200">{h.name}</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">{h.sub}</div>
                  <div className="mt-2 flex items-center justify-center gap-1 text-[8px] font-mono text-emerald-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Training Locally
                  </div>
                </div>
              ))}
            </div>

            {/* Central FL Server */}
            <div className="flex flex-col items-center gap-4">
              {/* Animated Arrow Lines */}
              <div className="hidden lg:flex flex-col items-center gap-2 text-[10px] font-mono text-cyan-400">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-8 bg-gradient-to-b from-cyan-500/40 to-transparent" />
                  <span className="text-[8px]">▲</span>
                </div>
                <span>Encrypted Weights</span>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full animate-pulse" />
                <div className="relative w-24 h-24 rounded-2xl bg-slate-950 border-2 border-cyan-400/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,242,254,0.15)]">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-5 h-5 rounded-full bg-cyan-400 animate-ping-glow absolute" />
                    <span className="text-2xl font-bold text-cyan-400 z-10">FL</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm font-bold text-slate-200">Federated Server</div>
                <div className="text-[10px] text-slate-400 mt-1">FedAvg + SecAgg</div>
              </div>

              <div className="hidden lg:flex flex-col items-center gap-2 text-[10px] font-mono text-purple-400">
                <span>Updated Model</span>
                <div className="flex items-center gap-1">
                  <span className="text-[8px]">▼</span>
                  <div className="w-1 h-8 bg-gradient-to-t from-purple-500/40 to-transparent" />
                </div>
              </div>
            </div>

            {/* Security Badges */}
            <div className="flex flex-col gap-4">
              <div className="glass-panel p-5 rounded-xl border-emerald-500/20 bg-emerald-500/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Lock className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">Raw Data Never Leaves</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">Patient records stay behind hospital firewalls</div>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-xl border-indigo-500/20 bg-indigo-500/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <Cpu className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">Model Updates Only</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">Encrypted weight gradients are shared</div>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-xl border-purple-500/20 bg-purple-500/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <Shield className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">Differential Privacy</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">ε=0.15 noise injection active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Core/About Section */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">Security & Team</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Built on Trust</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            MedShield AI is engineered by a distributed team of AI researchers, healthcare security architects, and clinical domain experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel-interactive p-8 rounded-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 mx-auto flex items-center justify-center text-xl font-bold text-white shadow-lg">
              DR
            </div>
            <h3 className="text-base font-bold text-slate-200 mt-4">Dr. Sarah Chen</h3>
            <p className="text-[10px] text-cyan-400 font-mono font-bold mt-1">CHIEF AI RESEARCHER</p>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Former Stanford ML Health lead. Pioneered differentially private clinical neural networks.
            </p>
          </div>

          <div className="glass-panel-interactive p-8 rounded-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 mx-auto flex items-center justify-center text-xl font-bold text-white shadow-lg">
              MK
            </div>
            <h3 className="text-base font-bold text-slate-200 mt-4">Marcus Kline</h3>
            <p className="text-[10px] text-cyan-400 font-mono font-bold mt-1">SECURITY ARCHITECT</p>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Cryptographic systems engineer. Designed secure aggregation protocol for clinical data.
            </p>
          </div>

          <div className="glass-panel-interactive p-8 rounded-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 mx-auto flex items-center justify-center text-xl font-bold text-white shadow-lg">
              AL
            </div>
            <h3 className="text-base font-bold text-slate-200 mt-4">Dr. Amara Lopez</h3>
            <p className="text-[10px] text-cyan-400 font-mono font-bold mt-1">CLINICAL DIRECTOR</p>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Board-certified cardiologist. Ensures clinical validity and explainability of AI predictions.
            </p>
          </div>
        </div>

        {/* Security Certifications */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { label: "HIPAA Compliant", desc: "Full regulatory alignment" },
            { label: "GDPR Ready", desc: "European data protection" },
            { label: "SOC 2 Type II", desc: "Security controls audited" },
            { label: "AES-256-GCM", desc: "Military-grade encryption" }
          ].map((cert, idx) => (
            <div key={idx} className="glass-panel p-4 rounded-xl border-slate-800/60 text-center">
              <div className="text-xs font-bold text-cyan-400">{cert.label}</div>
              <div className="text-[9px] text-slate-500 mt-1">{cert.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mini FAQ section to provide depth */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            {
              q: "How does Federated Learning maintain absolute data privacy?",
              a: "In traditional AI, hospital data is centralized on a single cloud server, exposing patients to leak vectors. With Federated Learning, MedShield AI ships the deep neural network directly to local hospital environments. The hospitals train the AI locally on private records, and only upload secure, encrypted mathematical parameters (model weights) to a secure aggregator. No patient records are ever transmitted."
            },
            {
              q: "Is there any accuracy loss when training in a federated system?",
              a: "Virtually none. Because MedShield AI uses Federated Averaging (FedAvg) and secure aggregation weight corrections, the global collaborative model converges to an accuracy rating within 0.8% of central server training models, while maintaining absolute localized isolation."
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel rounded-xl overflow-hidden">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-900/40 transition-colors"
              >
                <span className="text-sm font-semibold text-slate-200">{item.q}</span>
                <span className="text-cyan-400 text-lg font-bold">{activeFaq === idx ? "−" : "+"}</span>
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-900/60 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-slate-900 bg-slate-950/80 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-slate-900 border border-cyan-400/40">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-sm font-bold tracking-wider text-slate-200">MEDSHIELD AI</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Privacy-First Healthcare Intelligence Platform. Enabling collaborative disease prediction without compromising patient confidentiality.
            </p>
            <div className="flex items-center gap-3 text-slate-500">
              <span className="text-[11px]">© 2026 MedShield AI</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">Platform</h4>
            <div className="flex flex-col gap-2">
              <a href="#features" className="text-xs text-slate-400 hover:text-cyan-400 transition-colors">Features</a>
              <a href="#federated" className="text-xs text-slate-400 hover:text-cyan-400 transition-colors">Federated Flow</a>
              <a href="#about" className="text-xs text-slate-400 hover:text-cyan-400 transition-colors">Security Core</a>
              <a href="#" className="text-xs text-slate-400 hover:text-cyan-400 transition-colors">Documentation</a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">Compliance</h4>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-slate-400">HIPAA Compliant</span>
              <span className="text-xs text-slate-400">GDPR Ready</span>
              <span className="text-xs text-slate-400">SOC 2 Type II</span>
              <span className="text-xs text-slate-400">AES-256-GCM</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">Contact</h4>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-slate-400">hello@medshield.ai</span>
              <span className="text-xs text-slate-400">+1 (555) 923-8472</span>
              <span className="text-xs text-slate-400">San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:border-cyan-500/30 hover:text-cyan-400 transition-all cursor-pointer text-xs font-bold">GH</div>
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:border-cyan-500/30 hover:text-cyan-400 transition-all cursor-pointer text-xs font-bold">LI</div>
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:border-cyan-500/30 hover:text-cyan-400 transition-all cursor-pointer text-xs font-bold">X</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[10px] text-slate-600 font-mono">
            Privacy-First Healthcare Federated Intelligence
          </div>
          <div className="flex items-center gap-4 text-[10px] text-slate-600 font-mono">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>AI Ethics</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
