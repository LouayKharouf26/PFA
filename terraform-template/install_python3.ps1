# Download the Python 3 installer
$pythonInstallerUrl = "https://www.python.org/ftp/python/3.9.7/python-3.9.7-amd64.exe"
$pythonInstallerPath = "$env:TEMP\pythoninstaller.exe"
Invoke-WebRequest -Uri $pythonInstallerUrl -OutFile $pythonInstallerPath

# Install Python 3
Start-Process -FilePath $pythonInstallerPath -ArgumentList "/quiet", "InstallAllUsers=1", "PrependPath=1" -Wait

# Remove the Python 3 installer
Remove-Item -Path $pythonInstallerPath

# Enable Developer Mode to allow installation of OpenSSH
Set-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock" -Name "AllowDevelopmentWithoutDevLicense" -Value 1

# Install the OpenSSH Server and Client components
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
# Start the OpenSSH Server service and set it to start automatically
Start-Service sshd
Set-Service -Name sshd -StartupType 'Automatic'