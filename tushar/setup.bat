@echo off
setlocal
title Setup Portfolio Server
color 0E
cls

echo ====================================
echo   SDET Portfolio - Setup
echo   Installing Dependencies
echo ====================================
echo.

REM Ensure we are running from the project directory
cd /d "%~dp0"

REM -----------------------------------------------------------------
REM Install Node.js dependencies when Node/npm are available
REM -----------------------------------------------------------------
where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [✓] Node.js detected.
    call npm --version >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        if not exist "node_modules\http-server\package.json" (
            echo Installing npm dependencies...
            call npm install
            if %ERRORLEVEL% EQU 0 (
                echo [✓] npm dependencies installed successfully!
            ) else (
                echo [✗] npm install failed. Review the output above.
            )
        ) else (
            echo npm dependencies already installed.
        )
    ) else (
        echo [✗] npm command not available even though Node.js was detected.
        echo Please ensure Node.js installation is complete and npm is on PATH.
    )
) else (
    echo [✗] Node.js not found.
    echo Install Node.js for auto-reload features: https://nodejs.org/
)
echo.

REM -----------------------------------------------------------------
REM Install Python dependencies (watchdog) when Python is available
REM -----------------------------------------------------------------
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [✓] Python detected.
    python -m pip --version >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo Installing Python dependencies (optional for auto-reload fallback)...
        python -m pip install --quiet --disable-pip-version-check -r requirements.txt
        if %ERRORLEVEL% EQU 0 (
            echo [✓] Python dependencies checked/installed.
        ) else (
            echo [✗] Failed to install Python dependencies. Review errors above.
        )
    ) else (
        echo [✗] pip not available. Install Python with pip or add pip to PATH.
    )
) else (
    echo [✗] Python not found.
    echo Install Python for the standard server: https://www.python.org/downloads/
)
echo.

echo ====================================
echo   Setup Complete!
echo ====================================
echo.
echo Next steps:
echo   - Use START-HERE.bat for a quick preview.
echo   - Use START-HERE-WITH-RELOAD.bat for auto-reload.
echo   - Or run "npm start" / "npm run watch" from a terminal.
echo.
pause
endlocal
