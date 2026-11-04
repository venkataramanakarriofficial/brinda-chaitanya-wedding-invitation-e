$ErrorActionPreference = 'Stop'
$projectRoot = $PSScriptRoot
$node = Get-Command node -ErrorAction Stop
$launcher = Join-Path $projectRoot 'dev-launcher.mjs'
$next = Join-Path $projectRoot 'node_modules\next\dist\bin\next'
if (-not (Test-Path -LiteralPath $next) -or -not (Test-Path -LiteralPath $launcher)) {
  throw 'Next.js dependencies are missing. Run npm install in the project folder first.'
}
Start-Process -FilePath $node.Source -ArgumentList @($launcher) -WorkingDirectory $projectRoot -WindowStyle Hidden
