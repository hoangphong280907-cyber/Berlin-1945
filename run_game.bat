@echo off
setlocal
cd /d "%~dp0"

where py >nul 2>nul
if %errorlevel%==0 (
  start "Berlin 1945" http://localhost:8000
  py -m http.server 8000
  goto :eof
)

where python >nul 2>nul
if %errorlevel%==0 (
  start "Berlin 1945" http://localhost:8000
  python -m http.server 8000
  goto :eof
)

echo Python was not found. Install Python or run this folder with VS Code Live Server.
pause
