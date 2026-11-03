@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul || (echo Node.js 22.6+ is required. Install Node.js first.& pause & exit /b 1)
if not exist .env copy .env.example .env >nul
echo Running release checks...
call npm run check || (echo Checks failed.& pause & exit /b 1)
call npm test || (echo Tests failed.& pause & exit /b 1)
echo Starting Asmaron at http://localhost:3000
start "Asmaron Server" cmd /k node --env-file=.env server.js
timeout /t 2 /nobreak >nul
start "" http://localhost:3000
echo Asmaron server is running in the separate terminal window.
echo Close that server window to stop the local app.
