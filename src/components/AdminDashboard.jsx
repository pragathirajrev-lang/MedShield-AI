"use client";

import React, { useState } from "react";
import {
  Shield,
  BarChart3,
  TrendingUp,
  Globe,
  ShieldAlert,
  Layers,
  Users,
  LogOut,
  Bell,
  Search
} from "lucide-react";
import OverviewPanel from "./OverviewPanel";
import RealTimeAnalytics from "./RealTimeAnalytics";
import HospitalCollab from "./HospitalCollab";
import EmergencyAlerts from "./EmergencyAlerts";
import SystemArchitecture from "./SystemArchitecture";
import FairnessMonitor from "./FairnessMonitor";
import ThemeToggle from "./ThemeToggle";

export default function AdminDashboard({ onBackToLanding }) {
  const [activeTab, setActiveTab] = useState("overview");

  const menuItems = [
    { id: "overview", label: "Dashboard", icon: BarChart3 },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "collab", label: "Hospital Network", icon: Globe },
    { id: "emergency", label: "Emergency Alerts", icon: ShieldAlert },
    { id: "fairness", label: "Bias Monitor", icon: Users },
    { id: "architecture", label: "AI Architecture", icon: Layers },
  ];

  const renderPanel = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewPanel onNavigate={setActiveTab} />;
      case "analytics":
        return <RealTimeAnalytics />;
      case "collab":
        return <HospitalCollab />;
      case "emergency":
        return <EmergencyAlerts />;
      case "fairness":
        return <FairnessMonitor />;
      case "architecture":
        return <SystemArchitecture />;
      default:
        return <OverviewPanel onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen theme-bg-primary text-slate-200 overflow-hidden font-sans">
      <div className="glow-orb w-[400px] h-[400px] bg-purple-500/5 top-[-10%] left-[-10%]" />
      <div className="glow-orb w-[500px] h-[500px] bg-indigo-500/5 bottom-[-10%] right-[-10%]" />

      <aside className="w-64 border-r border-slate-900 theme-bg-sidebar backdrop-blur-xl flex flex-col justify-between z-10 shrink-0 select-none">
        <div>
          <div className="p-6 flex items-center gap-3 border-b border-slate-900/60">
            <div className="relative bg-slate-900 border border-purple-400 p-2 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold tracking-wider text-slate-100">MEDSHIELD</div>
              <div className="text-[10px] text-purple-400 font-bold uppercase tracking-widest font-mono">ADMIN PORTAL</div>
            </div>
          </div>

          <div className="px-4 pt-3 pb-2">
            <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white font-mono">AD</div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-200">System Admin</div>
                <div className="text-[9px] text-purple-400 font-mono">Network Operations</div>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1.5">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all cursor-pointer ${
                    isActive
                      ? "bg-purple-500/10 border border-purple-500/25 text-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.05)] font-bold"
                      : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-purple-400" : "text-slate-500"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-900/60 space-y-4">
          <div className="p-3 bg-slate-900/40 border border-slate-800/80 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 font-bold">
              <span>NETWORK STATUS</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping-glow" />
                ALL NODES ONLINE
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              4 hospitals synced · 0 anomalies
            </div>
          </div>

          <button
            onClick={onBackToLanding}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Switch Role
          </button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col min-w-0 z-10">
        <header className="h-16 border-b border-slate-900 theme-bg-header backdrop-blur-md px-6 flex items-center justify-between shrink-0">
          <div className="relative w-72 hidden md:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search network or system logs..."
              className="w-full pl-10 pr-4 py-1.5 bg-slate-900/40 border border-slate-800 rounded-xl text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4 text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                <span>SYSTEM: OPERATIONAL</span>
              </div>
              <div className="h-3 w-[1px] bg-slate-800" />
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>HOSPITALS: 4/4</span>
              </div>
            </div>

            <ThemeToggle />

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg border border-slate-900 hover:border-slate-800 text-slate-400 hover:text-slate-200 transition-colors relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping-glow" />
              </button>

              <div className="h-6 w-[1px] bg-slate-800" />

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white font-mono shadow-[0_0_10px_rgba(139,92,246,0.15)]">
                  AD
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-slate-200">System Admin</div>
                  <div className="text-[9px] text-slate-500 font-mono mt-0.5">ADMIN-NETOPS</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="flex-grow p-6 overflow-y-auto relative">
          {renderPanel()}
        </section>
      </main>
    </div>
  );
}
