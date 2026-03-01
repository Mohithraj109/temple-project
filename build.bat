@echo off
echo ========================================
echo Temple Ticket Counter - Build Desktop App
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b
)

echo Installing dependencies...
call npm install

echo.
echo Building Windows application...
call npm run build

echo.
echo ========================================
echo BUILD COMPLETE!
echo ========================================
echo.
echo Your .exe file is in the "dist" folder
echo.
pause
