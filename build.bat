@echo off
echo Building Wall Clock Card for Home Assistant...
npm install
npm run build
echo Build complete! The component is available in the dist folder.
echo.
echo To install:
echo 1. Copy dist\wall-clock-card.js to your Home Assistant www\wall-clock-card directory
echo 2. Add the card to your Lovelace dashboard
echo 3. Restart Home Assistant if needed
echo.
pause
