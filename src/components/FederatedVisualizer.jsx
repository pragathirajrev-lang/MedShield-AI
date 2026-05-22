"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Server, 
  Database, 
  Lock, 
  Play, 
  Pause, 
  RotateCcw, 
  Terminal, 
  CheckCircle2, 
  ShieldAlert,
  Cpu,
  RefreshCw,
  Key
} from "lucide-react";

export default function FederatedVisualizer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1); // 1x, 2x, 4x
  const [currentRound, setCurrentRound] = useState(41);
  const [currentPhase, setCurrentPhase] = useState("local_training"); // local_training, uploading, aggregating, distributing
  const [localProgress, setLocalProgress] = useState({ A: 0, B: 0, C: 0, D: 0 });
  const [logs, setLogs] = useState([]);
  
  // Ref for logging scroll
  const logEndRef = useRef(null);

  const addLog = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    const hash = Math.random().toString(16).substring(2, 10).toUpperCase();
    setLogs(prev => [...prev.slice(-15), { timestamp, message, type, hash }]);
  };

  useEffect(() => {
    const id = setTimeout(() => {
      setLogs([
        { timestamp: new Date().toLocaleTimeString(), message: "Federated learning engine initialized.", type: "success", hash: Math.random().toString(16).substring(2, 10).toUpperCase() },
        { timestamp: new Date().toLocaleTimeString(), message: "Node connections secure. Protocols: Differential Privacy + SecAgg.", type: "info", hash: Math.random().toString(16).substring(2, 10).toUpperCase() }
      ]);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Main simulation timer
  useEffect(() => {
    if (!isPlaying) return;

    const baseDuration = 1000 / speed;
    let timer;

    if (currentPhase === "local_training") {
      timer = setInterval(() => {
        setLocalProgress(prev => {
          const next = { ...prev };
          let allDone = true;
          
          Object.keys(next).forEach(k => {
            const step = Math.floor(Math.random() * 20) + 10;
            if (next[k] < 100) {
              next[k] = Math.min(100, next[k] + step);
              allDone = false;
            }
          });

          if (allDone) {
            clearInterval(timer);
            setTimeout(() => {
              setCurrentPhase("uploading");
              addLog("Local epochs finished. Generating encrypted updates...", "success");
              addLog("Node C generated differential noise scale: b=0.045", "info");
            }, 800 / speed);
          }
          return next;
        });
      }, 350 / speed);
    } else if (currentPhase === "uploading") {
      timer = setTimeout(() => {
        setLogs(prev => [...prev.slice(-15), { timestamp: new Date().toLocaleTimeString(), message: "Uploading model parameters. Raw medical records isolated locally.", type: "warning", hash: Math.random().toString(16).substring(2, 10).toUpperCase() }]);
        timer = setTimeout(() => {
          setCurrentPhase("aggregating");
          setLogs(prev => [...prev.slice(-15), { timestamp: new Date().toLocaleTimeString(), message: "Applying Secure Aggregation (FedAvg) on central server...", type: "info", hash: Math.random().toString(16).substring(2, 10).toUpperCase() }]);
        }, 3000 / speed);
      }, 50);
    } else if (currentPhase === "aggregating") {
      timer = setTimeout(() => {
        setCurrentPhase("distributing");
        addLog(`Global Model Refined for Round ${currentRound + 1}. Redistributing parameters.`, "success");
      }, 2500 / speed);
    } else if (currentPhase === "distributing") {
      timer = setTimeout(() => {
        setCurrentRound(r => r + 1);
        setLocalProgress({ A: 0, B: 0, C: 0, D: 0 });
        setCurrentPhase("local_training");
        addLog("New global parameters integrated. Resuming next training round.", "info");
      }, 2500 / speed);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(timer);
    };
  }, [currentPhase, currentRound, isPlaying, speed]);

  const handleManualSync = () => {
    setLocalProgress({ A: 0, B: 0, C: 0, D: 0 });
    setCurrentPhase("local_training");
    setIsPlaying(true);
    addLog("Manual aggregation round triggered.", "warning");
  };

  const hospitals = [
    { id: "A", name: "Metro General Hospital", records: "18,400 Patients", coords: { x: 50, y: 50 }, color: "from-cyan-500 to-blue-500", ping: "12ms" },
    { id: "B", name: "St. Jude Cardiac Center", records: "12,900 Patients", coords: { x: 550, y: 50 }, color: "from-purple-500 to-indigo-500", ping: "24ms" },
    { id: "C", name: "Northside Clinical Network", records: "15,200 Patients", coords: { x: 50, y: 350 }, color: "from-emerald-500 to-teal-500", ping: "8ms" },
    { id: "D", name: "County Pediatric Trust", records: "6,500 Patients", coords: { x: 550, y: 350 }, color: "from-rose-500 to-pink-500", ping: "38ms" }
  ];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch theme-text">
      {/* Visualization Canvas Grid Area */}
      <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border-slate-800/60 flex flex-col justify-between relative overflow-hidden">
        {/* Glow ball */}
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[250px] h-[250px] bg-cyan-500/5 rounded-full blur-[80px]" />
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4 z-10">
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400 animate-spin-slow" />
              Federated Training Network Core
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Secure Multi-Party Parameter Sync (SecAgg + DP)</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 font-bold uppercase">
              ROUND {currentRound}
            </span>
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-semibold uppercase">
              PHASE: {currentPhase.replace("_", " ")}
            </span>
          </div>
        </div>

        {/* The Animated SVG Map Representation */}
        <div className="relative my-8 aspect-[1.7] w-full border border-slate-900 rounded-xl bg-slate-950/40 p-4 overflow-hidden z-10 flex items-center justify-center">
          <svg viewBox="0 0 700 450" className="w-full h-full">
            {/* Animated network streams */}
            {hospitals.map(h => {
              const isUpload = currentPhase === "uploading";
              const isDownload = currentPhase === "distributing";
              const isTraining = currentPhase === "local_training";
              
              return (
                <g key={h.id}>
                  {/* Static connection path */}
                  <line 
                    x1={h.coords.x + 50} y1={h.coords.y + 40} 
                    x2={350} y2={225} 
                    stroke="rgba(99, 102, 241, 0.15)" 
                    strokeWidth="2" 
                    strokeDasharray="5,5"
                  />
                  
                  {/* Glowing data flowing */}
                  {(isUpload || isDownload) && (
                    <line 
                      x1={isUpload ? h.coords.x + 50 : 350} 
                      y1={isUpload ? h.coords.y + 40 : 225} 
                      x2={isUpload ? 350 : h.coords.x + 50} 
                      y2={isUpload ? 225 : h.coords.y + 40} 
                      stroke={isUpload ? "#00F2FE" : "#8B5CF6"} 
                      strokeWidth="2.5" 
                      className="animate-flow-line"
                    />
                  )}
                  
                  {/* Encrypted package floating */}
                  {isUpload && (
                    <g className="animate-pulse">
                      <circle cx={(h.coords.x + 50 + 350) / 2} cy={(h.coords.y + 40 + 225) / 2} r="12" fill="rgba(8, 12, 25, 0.9)" stroke="#00F2FE" strokeWidth="1" />
                      <path 
                        d="M0 0 L4 0 L4 4 L0 4 Z" 
                        transform={`translate(${(h.coords.x + 50 + 350) / 2 - 2}, ${(h.coords.y + 40 + 225) / 2 - 2})`}
                        fill="#00F2FE"
                      />
                    </g>
                  )}
                </g>
              );
            })}

            {/* Central Aggregator Node (Server) */}
            <g transform="translate(310, 185)">
              {/* Outer pulsing ring */}
              <circle 
                cx="40" cy="40" r="50" 
                fill="none" 
                stroke={currentPhase === "aggregating" ? "#00F2FE" : "rgba(99,102,241,0.2)"} 
                strokeWidth="1.5" 
                className={currentPhase === "aggregating" ? "animate-pulse" : "animate-slow-pulse"}
              />
              
              {/* Node Card */}
              <rect x="0" y="0" width="80" height="80" rx="16" fill="rgba(8, 12, 25, 0.9)" stroke="#4FACFE" strokeWidth="2" className="shadow-lg" />
              <foreignObject x="0" y="0" width="80" height="80" className="flex items-center justify-center p-4">
                <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                  <Server className={`w-7 h-7 ${currentPhase === "aggregating" ? "text-cyan-400 animate-bounce" : "text-slate-400"}`} />
                  <span className="text-[9px] font-mono font-bold text-slate-300">FED_SRV</span>
                </div>
              </foreignObject>
            </g>

            {/* Hospital Nodes */}
            {hospitals.map(h => (
              <g key={h.id} transform={`translate(${h.coords.x}, ${h.coords.y})`}>
                <rect x="0" y="0" width="100" height="80" rx="12" fill="rgba(8, 12, 25, 0.9)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                
                {/* Active glow tag based on state */}
                {currentPhase === "local_training" && localProgress[h.id] < 100 && (
                  <circle cx="88" cy="12" r="3" fill="#6366F1" className="animate-ping-glow" />
                )}
                {localProgress[h.id] === 100 && (
                  <circle cx="88" cy="12" r="3" fill="#10B981" />
                )}

                <foreignObject x="0" y="0" width="100" height="80" className="p-2 flex flex-col justify-between">
                  <div className="text-left">
                    <div className="text-[10px] font-bold text-slate-200 truncate">{h.name}</div>
                    <div className="text-[8px] text-slate-500 font-mono mt-0.5">{h.records}</div>
                  </div>
                  
                  {/* Progress bar inside hospital node */}
                  <div className="w-full mt-1.5">
                    <div className="flex justify-between items-center text-[7px] font-mono text-slate-400 mb-0.5">
                      <span>EPOCH TRAIN</span>
                      <span>{localProgress[h.id]}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${h.color} transition-all duration-300`} 
                        style={{ width: `${localProgress[h.id]}%` }}
                      />
                    </div>
                  </div>
                </foreignObject>
              </g>
            ))}
          </svg>

          {/* Secure Aggregation Math Label */}
          {currentPhase === "aggregating" && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[100px] glass-panel bg-slate-950/95 border border-cyan-400 px-4 py-2 rounded-xl text-center shadow-lg animate-bounce max-w-[240px]">
              <div className="text-[10px] font-bold text-cyan-400 tracking-wider font-mono">FEDERATED SECURE AGGREGATION</div>
              <code className="text-[9px] text-slate-300 font-mono mt-0.5 block">W_new = Σ(n_k / N) * W_k</code>
            </div>
          )}
        </div>

        {/* Dashboard Control Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-800/60 z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-white transition-colors cursor-pointer"
              title={isPlaying ? "Pause Training Simulation" : "Resume Training Simulation"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-cyan-400" />}
            </button>
            <button 
              onClick={handleManualSync}
              className="p-2.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-white transition-colors cursor-pointer"
              title="Re-Initialize Synchronization Cycle"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            
            <div className="h-6 w-[1px] bg-slate-800" />
            
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase mr-1">SIM_SPEED</span>
              {[1, 2, 4].map(s => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`text-[9px] font-mono px-2 py-1 rounded border transition-colors font-bold ${
                    speed === s 
                      ? "bg-cyan-500/25 border-cyan-400/80 text-cyan-400" 
                      : "bg-slate-900/40 border-slate-800/60 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleManualSync}
            className="px-4 py-2 bg-indigo-600/90 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-indigo-400/20"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Trigger Aggregation Round
          </button>
        </div>
      </div>

      {/* Cyber Cryptographic Audit Logs Sidebar */}
      <div className="lg:col-span-4 glass-panel p-5 rounded-2xl border-slate-800/60 flex flex-col justify-between max-h-[500px] lg:max-h-full">
        <div className="flex items-center gap-2 border-b border-slate-800/60 pb-3">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Secure Audit Console</span>
        </div>

        {/* Logs Feed Container */}
        <div className="my-4 flex-grow overflow-y-auto pr-1 space-y-2 h-[220px] lg:h-[350px] font-mono text-[9px] text-left">
          {logs.map((log, idx) => (
            <div key={idx} className="p-2 rounded bg-slate-950/70 border border-slate-900 flex flex-col gap-1">
              <div className="flex items-center justify-between text-slate-500 font-semibold">
                <span>[{log.timestamp}]</span>
                <span className="text-[8px] bg-slate-900 border border-slate-800 px-1 py-0.5 rounded text-indigo-400">HASH: {log.hash}</span>
              </div>
              <div className="flex items-start gap-1.5 mt-0.5">
                {log.type === "success" && <span className="text-emerald-400">✓</span>}
                {log.type === "warning" && <span className="text-amber-400">▲</span>}
                {log.type === "info" && <span className="text-cyan-400">i</span>}
                <span className={`${
                  log.type === "success" ? "text-emerald-300" :
                  log.type === "warning" ? "text-amber-300" : "text-slate-300"
                } leading-relaxed`}>
                  {log.message}
                </span>
              </div>
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

        {/* Quick Audit Cryptographic Badge */}
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Lock className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-slate-200">SecAgg + SHA-256</div>
            <div className="text-[8px] text-slate-500 font-mono mt-0.5">Weights randomized via Diffie-Hellman blinding</div>
          </div>
        </div>
      </div>
    </div>
  );
}
