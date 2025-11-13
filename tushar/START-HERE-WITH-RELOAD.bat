@echo off
setlocal
title Portfolio Server (Auto-Reload) - Tushar Sharma
color 0B
cls

echo ====================================
echo   SDET Portfolio Server
echo   With Auto-Reload Feature
echo   Tushar Sharma
echo ====================================
echo.
echo Starting server with auto-reload...
echo Server: http://localhost:5500
echo.
echo Features:
echo   - Auto-reload on file changes
echo   - Browser opens automatically
echo   - Live updates without refresh
echo.
echo Press Ctrl+C to stop the server
echo ====================================
echo.

REM Change to script directory
cd /d "%~dp0"

REM Prefer Node.js http-server when available
where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [✓] Node.js detected.
    if not exist "node_modules\http-server\package.json" (
        echo Installing npm dependencies...
        call npm install
        if %ERRORLEVEL% NEQ 0 (
            echo.
            echo [✗] npm install failed. Falling back to Python if available.
            goto :try_python
        )
    ) else (
        echo npm dependencies already installed.
    )
    echo.
    echo Starting Node.js auto-reload server...
    start "Portfolio Server (Auto-Reload)" cmd /k "npm run watch"
    goto :open_browser
)

:try_python
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [!] Using Python fallback with auto-reload.
    python -c "import watchdog" >nul 2>&1
    if %ERRORLEVEL% NEQ 0 (
        echo Installing Python dependencies...
        python -m pip install --quiet --disable-pip-version-check -r requirements.txt
        if %ERRORLEVEL% NEQ 0 (
            echo.
            echo [✗] Failed to install Python dependencies. Cannot start server.
            goto :fail
        )
    )
    echo.
    echo Starting Python auto-reload server...
    start "Portfolio Server (Auto-Reload)" cmd /k "python server-with-reload.py"
    goto :open_browser
)

echo [✗] Neither Node.js nor Python was detected.
echo Please install one of them and re-run this script.
echo Node.js: https://nodejs.org/
echo Python : https://www.python.org/downloads/
goto :end

:open_browser
timeout /t 3 /nobreak >nul
start "" http://localhost:5500/index.html
echo.
echo Server started! Browser should open automatically.
echo Close this window or press Ctrl+C inside the server window to stop.
echo.
goto :end

:fail
echo.
echo Auto-reload server could not be started.
echo Review the messages above for details.
goto :end

:end
echo.
pause
endlocal
