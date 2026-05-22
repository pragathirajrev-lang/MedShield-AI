Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  MedShield AI - Hackathon Demo Launcher" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

$BackendDir = Join-Path $PSScriptRoot "backend"
$FrontendDir = $PSScriptRoot

Write-Host "[1/3] Starting Backend API (FastAPI)..." -ForegroundColor Yellow
$backendJob = Start-Job -ScriptBlock {
    param($dir)
    Set-Location $dir
    python -m uvicorn api:app --host 0.0.0.0 --port 8000
} -ArgumentList $BackendDir

Start-Sleep -Seconds 3

Write-Host "[2/3] Backend running at http://localhost:8000" -ForegroundColor Green
Write-Host "      - Health: http://localhost:8000/health" -ForegroundColor DarkGray
Write-Host "      - Model Info: http://localhost:8000/model/info" -ForegroundColor DarkGray
Write-Host "      - Prediction: POST http://localhost:8000/predict" -ForegroundColor DarkGray
Write-Host "      - Dataset: http://localhost:8000/dataset/sample" -ForegroundColor DarkGray
Write-Host ""

Write-Host "[3/3] Starting Frontend (Next.js)..." -ForegroundColor Yellow
Write-Host ""
Write-Host "      Frontend will be at http://localhost:3000" -ForegroundColor Green
Write-Host ""

Set-Location $FrontendDir
npx next dev

Write-Host ""
Write-Host "Shutting down backend..." -ForegroundColor Red
Stop-Job $backendJob
Remove-Job $backendJob
Write-Host "Done." -ForegroundColor Cyan
