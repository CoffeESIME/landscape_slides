Set-Location -LiteralPath $PSScriptRoot
if (-not (Test-Path -LiteralPath 'dist/index.html')) { Write-Host 'Primero ejecuta npm install y npm run build.'; exit 1 }
Write-Host 'Abre http://127.0.0.1:4173 en tu navegador. Para detener: Ctrl+C.'
node scripts/serve.mjs
