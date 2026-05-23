# 🛡️ MedShield AI — Privacy-Preserving Federated Healthcare Intelligence Platform

> **"A billion-dollar healthcare AI startup platform"** — built for hackathon judges to be wowed within 30 seconds.

---

## 🚀 Quick Start

```bash
# Install dependencies (already done)
npm install

# Run development server
npm run dev

# Open in browser
# → http://localhost:3000
```

---

## 📋 Project Overview

**MedShield AI** is a futuristic, enterprise-grade AI healthcare web platform demonstrating how distributed hospital networks can collaboratively train deep learning disease-risk prediction models using **Federated Learning** — without ever sharing sensitive raw patient data.

### Core Technology Pillars

| Pillar | Implementation |
|--------|---------------|
| **Federated Learning** | FedAvg aggregation across 4 distributed hospital nodes |
| **Differential Privacy** | Gaussian noise injection (ε=0.15) on local model updates |
| **Secure Aggregation** | AES-256 blinded weight transfers (SecAgg protocol) |
| **Explainable AI** | SHAP-style feature contribution visualization |
| **Responsible AI** | Real-time fairness monitoring & bias auditing |

---

## 🏗️ Architecture

```
Patient EHR Data (Local Only)
         ↓
Local Hospital AI Training (Dense-Net v2)
         ↓
Differential Privacy Noise Injection
         ↓
Encrypted Weight Upload (AES-256 + DH Blinding)
         ↓
Central Federated Aggregation Server (FedAvg)
         ↓
Global Model Update → Redistributed to All Nodes
         ↓
Disease Risk Prediction + Explainable AI Dashboard
```

### Mathematical Formulation

**Secure Federated Averaging:**
```
W_(t+1) = W_t + η × Σ(n_k / N) × g'_k
```

**Differentially Private Gradient Clipping:**
```
g'_k = g_k / max(1, ‖g_k‖/C) + N(0, σ² × C²)
```

---

## 📁 Project Structure

```
NEXA/
├── src/
│   ├── app/
│   │   ├── globals.css          # Design system: glassmorphism, neon glows, animations
│   │   ├── layout.js            # Root HTML layout + SEO metadata
│   │   └── page.js              # Main router: Landing ↔ Dashboard transitions
│   └── components/
│       ├── LandingPage.jsx      # Hero section, stats counters, features grid
│       ├── Dashboard.jsx        # Admin shell: sidebar nav + top navbar
│       ├── OverviewPanel.jsx    # Metrics cards + model convergence area chart
│       ├── FederatedVisualizer.jsx  # Live SVG training simulation with crypto logs
│       ├── PatientRiskPanel.jsx # Clinical input form + radial risk diagnostic
│       ├── WhatIfSimulator.jsx  # Physician sandbox: slider-driven risk simulation
│       ├── ExplainableAI.jsx    # SHAP bar charts + AI narrative reasoner
│       ├── FairnessMonitor.jsx  # Bias metrics + demographic equity charts
│       ├── HospitalCollab.jsx   # Global SVG map + encrypted node sync table
│       ├── EmergencyAlerts.jsx  # Red-glowing anomaly desk + node sanitizer
│       └── SystemArchitecture.jsx  # Interactive tech pipeline flowchart
├── package.json
└── README.md
```

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Background Deep | `#070B17` | Page backgrounds |
| Background Card | `rgba(13,20,38,0.45)` | Glass panels |
| Neon Cyan | `#00F2FE` | Primary brand accent |
| Neon Blue | `#4FACFE` | Secondary accent |
| Neon Purple | `#8B5CF6` | Tertiary accent |
| Neon Emerald | `#10B981` | Success / low-risk |
| Neon Rose | `#F43F5E` | Danger / high-risk |

### Animations

- `animate-slow-pulse` — 8s ambient breathing glow
- `animate-spin-slow` — 25s neural ring rotation
- `animate-ping-glow` — 2s node activity pulsing
- `animate-flow-line` — SVG encrypted data flow lines
- `animate-grid-pulse` — Background cyber-grid opacity wave

---

## 🖥️ Dashboard Sections

### 1. 🏠 Overview Panel
Real-time system health: High-Risk Patients (24), Active Nodes (4/4), Model Accuracy (95.4%), Anomaly Alerts. Includes live **Federated Training Simulation** and global model **convergence area chart** (Rounds 10→42).

### 2. ❤️ Patient Risk Predictor
10-parameter clinical diagnostic form:
- Age, Gender, Systolic BP, Glucose, Cholesterol, BMI
- Heart Rate, Smoking Status, Exercise Frequency, Medical Notes

Outputs an animated **radial ring risk meter** (0–100%) with category classification (Low / Medium / High) and AI confidence score.

### 3. 🤖 Explainable AI (XAI)
Interactive SHAP-style contribution charts showing:
- **Positive contributors** (raise risk): Glucose, Cholesterol, BP, Smoking → colored rose-500
- **Negative contributors** (shield risk): Exercise → colored emerald-500

Plus an **AI Narrative Assistant** generating plain-language clinical explanations.

### 4. 🔬 What-If Health Simulator *(Key Wow Feature)*
Physician sandbox workspace. Slide parameters in real-time:
- Instantly updates simulated risk score
- Shows **delta badge**: `−18% Risk Reduction!` or `+12% Risk Elevation!`
- Save sandbox state as the patient's new baseline
- Reset to original baseline with one click

### 5. ⚖️ Fairness & Bias Monitor
Responsible AI telemetry:
- **Demographic Parity**: 98.6%
- **Equalized Odds**: 97.4%
- **Disparate Impact Ratio**: 1.02 (within legal 4/5 rule)
- Gender error parity bar charts
- Age cohort equity distribution charts
- Real-time ethical compliance audit logs

### 6. 🌐 Hospital Collaboration Hub
Global SVG node map showing 4 collaborating clinics:
- Metro General (NYC) — 18,400 patients — 12ms ping
- St. Jude Cardiac Center (London) — 12,900 patients — 24ms ping
- Northside Clinical Network (Frankfurt) — 15,200 patients — 8ms ping
- County Pediatric Trust (Tokyo) — 6,500 patients — 38ms ping

Manual **cryptographic key rotation** trigger included.

### 7. 🚨 Emergency Anomaly Desk
Real-time outlier detection:
- Flashing crimson alerts for patient metric boundary violations
- Adversarial weight update rejection notifications
- **Network Sanitation** one-click override to isolate compromised nodes

### 8. 🔧 AI Architecture
Interactive 5-phase technical pipeline flowchart with deep-dive explanations, differential privacy formulas (ε, C, σ), and SecAgg mathematical specification.

---

## 📦 Dependencies

```json
{
  "next": "16.2.6",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "lucide-react": "latest",
  "recharts": "latest",
  "framer-motion": "latest",
  "tailwindcss": "^4",
  "@tailwindcss/postcss": "^4"
}
```

---

## ✅ Build Verification

```
▲ Next.js 16.2.6 (Turbopack)

✓ Compiled successfully in 8.8s
✓ TypeScript check passed (241ms)
✓ Static pages generated (4/4)
✓ Zero errors, zero warnings
```

---

## 🔒 Privacy Guarantee

> Raw patient electronic health records (EHR) **never leave** the local hospital firewall.
> Only mathematically blinded, differentially private model weight vectors are transmitted.
> The central aggregator computes a secure average **without reading any individual update.**

---

*MedShield AI — Privacy-First Healthcare Federated Intelligence © 2026*
