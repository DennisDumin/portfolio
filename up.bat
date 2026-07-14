@echo off
setlocal

cd /d "%~dp0"

if not exist "package.json" goto :missing_project

where node.exe >nul 2>&1
if errorlevel 1 goto :missing_node

where npm.cmd >nul 2>&1
if errorlevel 1 goto :missing_npm

for /f "delims=" %%V in ('node -p "process.versions.node"') do set "NODE_VERSION=%%V"
for /f "tokens=1 delims=." %%V in ("%NODE_VERSION%") do set "NODE_MAJOR=%%V"

if %NODE_MAJOR% GTR 22 (
    echo [WARNING] Node.js %NODE_VERSION% is newer than the versions supported by Angular 19.
    echo           Use Node.js 22 LTS if the development server behaves unexpectedly.
    echo.
)

if exist "node_modules\" goto :start

echo Installing dependencies with npm ci...
call npm.cmd ci
if errorlevel 1 goto :install_failed

:start
echo Starting the portfolio development server...
echo Open http://localhost:4200/ in your browser.
echo.
call npm.cmd start -- %*
exit /b %errorlevel%

:missing_project
echo [ERROR] package.json was not found next to up.bat.
goto :failed

:missing_node
echo [ERROR] Node.js is not installed or is not available in PATH.
goto :failed

:missing_npm
echo [ERROR] npm is not installed or is not available in PATH.
goto :failed

:install_failed
echo [ERROR] npm ci failed.

:failed
echo.
pause
exit /b 1
