"use client";

import React from "react";
import DoctorDashboard from "./DoctorDashboard";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard({ role, onBackToLanding }) {
  if (role === "doctor") {
    return <DoctorDashboard onBackToLanding={onBackToLanding} />;
  }
  if (role === "admin") {
    return <AdminDashboard onBackToLanding={onBackToLanding} />;
  }
  return (
    <div className="flex h-screen items-center justify-center theme-bg-primary text-slate-400">
      <p className="text-lg">Select a role to continue</p>
    </div>
  );
}
