Start-Process powershell -Verb RunAs
$url = "https://www.python.org/ftp/python/3.10.2/python-3.10.2-amd64.exe"
$output = "C:\Python\python-3.10.2-amd64.exe"

Invoke-WebRequest -Uri $url -OutFile $output
$pythonInstaller = "C:\Python\python-3.10.2-amd64.msi"
$installPath = "C:\Python\Python310"
$installArgs = "/qn ADDLOCAL=ALL"

Start-Process -FilePath msiexec -ArgumentList "/i $pythonInstaller TARGETDIR=$installPath $installArgs" -Wait