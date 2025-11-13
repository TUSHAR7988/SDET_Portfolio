# PowerShell Script to Stop Portfolio Server
Write-Host "====================================" -ForegroundColor Red
Write-Host "  Stopping Portfolio Server..." -ForegroundColor Red
Write-Host "====================================" -ForegroundColor Red
Write-Host ""

# Function to kill process on specific port
function Stop-Port {
    param([int]$Port)
    $processes = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
    foreach ($processId in $processes) {
        if ($processId) {
            Write-Host "Killing process on port $Port (PID: $processId)..." -ForegroundColor Yellow
            Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
        }
    }
}

# Stop processes on port 5500
Stop-Port -Port 5500

# Kill Node.js http-server processes
Get-Process node -ErrorAction SilentlyContinue | Where-Object {
    $_.MainWindowTitle -like "*Portfolio Server*" -or 
    $_.CommandLine -like "*http-server*"
} | Stop-Process -Force -ErrorAction SilentlyContinue

# Kill Python processes running http.server
Get-Process python -ErrorAction SilentlyContinue | ForEach-Object {
    $cmdLine = (Get-WmiObject Win32_Process -Filter "ProcessId = $($_.Id)").CommandLine
    if ($cmdLine -like "*http.server 5500*") {
        Write-Host "Killing Python server process (PID: $($_.Id))..." -ForegroundColor Yellow
        Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
    }
}

Write-Host ""
Write-Host "Server stopped successfully!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Red
Write-Host ""
Start-Sleep -Seconds 2

