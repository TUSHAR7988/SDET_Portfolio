@echo off
title Stop Portfolio Server
color 0C
cls

echo ====================================
echo   Stopping Portfolio Server...
echo ====================================
echo.

REM Kill Python HTTP Server on port 5500
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5500 ^| findstr LISTENING') do (
    echo Killing process on port 5500...
    taskkill /F /PID %%a >nul 2>&1
)

REM Kill Node.js http-server processes
taskkill /F /IM node.exe /FI "WINDOWTITLE eq Portfolio Server*" >nul 2>&1

REM Kill any Python processes running http.server
for /f "tokens=2" %%a in ('tasklist /FI "IMAGENAME eq python.exe" /FO LIST ^| findstr /C:"PID:"') do (
    wmic process where processid=%%a get commandline 2>nul | findstr /C:"http.server 5500" >nul && (
        echo Killing Python server process...
        taskkill /F /PID %%a >nul 2>&1
    )
)

echo.
echo Server stopped successfully!
echo ====================================
echo.
timeout /t 3 >nul

