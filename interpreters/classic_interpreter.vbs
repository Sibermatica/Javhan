MsgBox "You are running a beta software." & vbCRLF & _
    "Therefore, you can't interpret any code (0x0a)", vbCritical, "Javhan Runtime Enviroment"

WScript.Quit() ' F

Sub assert(condition, line, column)
	If (Not Condition) Then
		HandleError(line, column)
	End If
End Sub

Sub HandleError(line, column)
	WScript.StdOut.WriteLine("%ERROR~" + line + ":" + column + "%")
	WScript.Quit
End Sub

If (WScript.Arguments.Count < 0) Then
    MsgBox "Error loading null graphics!", vbCritical
    WScript.Quit
End If

For i = 0 To WScript.Arguments.Count Step 1
    Argument = WScript.Arguments.Item(i)
    Select Case Argument
        Case "--app-location"
            With(CreateObject("Scripting.FileSystemObject").OpenTextFile(WScript.Arguments.Item(i + 1), 1, -1))
                Interpret(.ReadAll())
            End With
            i = i + 1
        Case Else
            WScript.StdOut.WriteLine("%UNRN~" + i + "%")
            WScript.Quit
    End Select
Next

Function Interpret(Code)
    ' Interpret the code...
    ' You can help with the program develop
    ' Contributing in >> GitHub
    assert(False)

End Function