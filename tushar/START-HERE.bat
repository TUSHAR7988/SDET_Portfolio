@echo off
setlocal
title START PORTFOLIO SERVER
color 0B
cls

echo.
echo  ========================================
echo    PORTFOLIO SERVER - ONE CLICK START
echo  ========================================
echo.
echo  Starting local server...
echo  Opening browser automatically...
echo.
echo  Server: http://localhost:5500
echo  File: index.html
echo.
echo  For auto-reload feature, use: START-HERE-WITH-RELOAD.bat
echo.
echo  ========================================
echo.

REM Change to script directory
cd /d "%~dp0"

REM Prefer Python simple server for zero-dependency start
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo  [✓] Python detected. Starting built-in HTTP server...
    start "Portfolio Server" cmd /k "python -m http.server 5500"
    goto :open_browser
)

REM Fallback to Node.js http-server if Python is unavailable
where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo  [!] Python not found. Falling back to Node.js http-server...
    if not exist "node_modules\http-server\package.json" (
        echo  Installing npm dependencies...
        call npm install
        if %ERRORLEVEL% NEQ 0 (
            echo.
            echo  [✗] npm install failed. Cannot start server.
            goto :fail
        )
    ) else (
        echo  npm dependencies already installed.
    )
    start "Portfolio Server" cmd /k "npx http-server . -p 5500"
    goto :open_browser
)

echo  [✗] Neither Python nor Node.js was detected.
echo  Please install one of them and re-run this script.
echo  Python : https://www.python.org/downloads/
echo  Node.js: https://nodejs.org/
goto :end

:open_browser
timeout /t 2 /nobreak >nul
start "" http://localhost:5500/index.html
echo.
echo  Server started successfully!
echo  Browser should open automatically.
echo.
echo  To stop the server, close the server window or run: stop-server.bat
goto :end

:fail
echo.
echo  Server could not be started. See messages above for details.

:end
echo.
pause
endlocal
