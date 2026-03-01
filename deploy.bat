@echo off
echo ========================================
echo Temple Ticket Counter - GitHub Deploy
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b
)

echo Enter your GitHub repository URL:
echo Example: https://github.com/username/temple-ticket.git
set /p REPO_URL="Repository URL: "

if "%REPO_URL%"=="" (
    echo ERROR: Repository URL cannot be empty!
    pause
    exit /b
)

echo.
echo Initializing git repository...
git init

echo.
echo Adding all files...
git add .

echo.
echo Committing files...
git commit -m "Initial commit - Temple Ticket Counter PWA"

echo.
echo Adding remote repository...
git remote add origin %REPO_URL%

echo.
echo Setting branch to main...
git branch -M main

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Next steps:
echo 1. Go to your GitHub repository
echo 2. Click Settings
echo 3. Click Pages (left sidebar)
echo 4. Under Source, select: Branch: main, Folder: / (root)
echo 5. Click Save
echo.
echo Your site will be live at:
echo https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
echo.
pause
