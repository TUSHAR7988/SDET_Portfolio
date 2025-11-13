# PowerShell Script to Start Portfolio Server
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Starting Portfolio Server..." -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Server will start on: http://localhost:5500" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Change to script directory
Set-Location $PSScriptRoot

# Start Python HTTP Server
python -m http.server 5500

