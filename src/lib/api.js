const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

export async function predictRisk(patientData) {
  const payload = {
    age: parseInt(patientData.age),
    sex: patientData.sex,
    cp: parseInt(patientData.cp),
    trestbps: parseInt(patientData.trestbps),
    chol: parseInt(patientData.chol),
    fbs: patientData.fbs,
    restecg: parseInt(patientData.restecg),
    thalach: parseInt(patientData.thalach),
    exang: patientData.exang,
    oldpeak: parseFloat(patientData.oldpeak),
    slope: parseInt(patientData.slope),
    ca: parseInt(patientData.ca),
    thal: parseInt(patientData.thal),
  };

  const res = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `API error: ${res.status}`);
  }

  return res.json();
}

export async function getModelInfo() {
  const res = await fetch(`${API_BASE_URL}/model/info`);
  if (!res.ok) throw new Error('Failed to fetch model info');
  return res.json();
}

export async function getDatasetSample(n = 10) {
  const res = await fetch(`${API_BASE_URL}/dataset/sample?n=${n}`);
  if (!res.ok) throw new Error('Failed to fetch dataset sample');
  return res.json();
}

export async function healthCheck() {
  const res = await fetch(`${API_BASE_URL}/health`);
  if (!res.ok) throw new Error('Backend not available');
  return res.json();
}
