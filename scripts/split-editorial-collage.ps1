# Découpe le collage direction artistique (1024×576) en visuels éditoriaux.
# Source : assets/…collage-reference ou collage-reference.png dans public/images/editorial

param(
  [string]$Source = "$PSScriptRoot\..\public\images\editorial\collage-reference.png"
)

$outDir = Join-Path $PSScriptRoot "..\public\images\editorial"
if (-not (Test-Path $Source)) {
  Write-Error "Source introuvable : $Source"
  exit 1
}
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
Add-Type -AssemblyName System.Drawing

function Save-Crop($name, $x, $y, $w, $h) {
  $img = [System.Drawing.Image]::FromFile($Source)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $w, $h), (New-Object System.Drawing.Rectangle $x, $y, $w, $h), [System.Drawing.GraphicsUnit]::Pixel)
  $path = Join-Path $outDir "$name.jpg"
  $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 88
  $bmp.Save($path, $enc, $ep)
  $g.Dispose()
  $bmp.Dispose()
  $img.Dispose()
  Write-Host "OK $path"
}

# Grille : bandeau haut 264px ; deux rangées de 156px ; trois colonnes
Save-Crop "hero-boardroom" 0 0 1024 264
Save-Crop "detail-lamp" 0 264 341 156
Save-Crop "detail-writing" 341 264 341 156
Save-Crop "detail-texture" 682 264 342 156
Save-Crop "mandate-window" 0 420 341 156
Save-Crop "detail-stationery" 341 420 341 156
Save-Crop "detail-corridor" 682 420 342 156
