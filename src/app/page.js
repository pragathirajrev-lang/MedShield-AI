"use client";

import React, { useState } from "react";
import LandingPage from "../components/LandingPage";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const [viewState, setViewState] = useState("landing");
  const [userRole, setUserRole] = useState(null);

  const handleSelectRole = (role) => {
    setUserRole(role);
    setViewState("dashboard");
  };

  const handleBackToLanding = () => {
    setViewState("landing");
    setUserRole(null);
  };

  return (
    <div className="flex-1 flex flex-col h-full min-h-screen">
      {viewState === "landing" ? (
        <LandingPage onSelectRole={handleSelectRole} />
      ) : (
        <Dashboard role={userRole} onBackToLanding={handleBackToLanding} />
      )}
    </div>
  );
}
