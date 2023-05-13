[CmdletBinding()]
param (
    [Parameter()]
    [string]$scriptToExecute,
    [switch]$debug_mode
)

if (-not $scriptToExecute) {
    .\frameworks\classic_framework.vbs --show-messagebox "Application file not founded!" 16 "Javhan Runtime Error"
    
    if ($debug_mode) {
        Write-Error "Application not founded!"
    }
    Exit 1
}

if (-not (Test-Path -Path $scriptToExecute)) {
    .\frameworks\classic_framework.vbs --show-messagebox "Application file not founded!" 16 "Error"
    
    if ($debug_mode) {
        Write-Error "Application not founded!"
    }
    Exit 1
}

$Script:DESTINATION = "$env:TEMP\" + (Get-Random -Minimum 1111111111 -Maximum 9999999999).ToString()

Expand-Archive -LiteralPath $scriptToExecute -DestinationPath $Script:DESTINATION

if (-not (Test-Path -Path "$Script:DESTINATION\.data\")) {

    .\frameworks\classic_framework.vbs --show-messagebox "$Script:DESTINATION\ ---------------------------------
	Folder '.data' doesn't founded.
	Please, Recompile the app." 16 "Javhan Compile Error"
    
    if ($debug_mode) {
        Write-Error "Invalid Application!: '.data' folder doesn't founded!"
    }
    Exit 1
}

if (-not (Test-Path -Path "$Script:DESTINATION\.data\MANIFEST.xml")) {
    .\frameworks\classic_framework.vbs --show-messagebox "$Script:DESTINATION\.data\ ---------------------------------
	Manifest File 'MANIFEST.xml' doesn't founded.
	Please, Recompile the app." 16 "Javhan Compile Error"
    
    if ($debug_mode) {
        Write-Error "Invalid Application!: '.data\MANIFEST.xml' file doesn't founded!"
    }
    Exit 1
}

[XML] $Script:MANIFEST = Get-Content -Path "$Script:DESTINATION\.data\MANIFEST.xml"
[string] $Script:MANIFEST_MAIN_PATH = $Script:MANIFEST.project[0]."main-class".classpath

$Script:MANIFEST_MAIN_PATH = $Script:DESTINATION + $Script:MANIFEST_MAIN_PATH.Replace(".", "\") + ".jah"

if ($debug_mode) {
    Write-Host "File to execute: $Script:MANIFEST_MAIN_PATH"
    Write-Host "Script Destination: $Script:DESTINATION"
}

$RuntimeCode = (C:\Windows\System32\CScript.exe .\meterpreters\classic_interpreter.vbs --app-location $Script:MANIFEST_MAIN_PATH //Nologo)
if ($RuntimeCode.Contains("%ERROR")) {
    .\frameworks\classic_framework.vbs --show-messagebox "$Script:MANIFEST_MAIN_PATH ---------------------------------
	Error on file
	Please, Check the syntax." 16 "Javhan Runtime Environment"


    if ($debug_mode) {
        Write-Error "Runtime Error: Error on syntax!"
    }
}