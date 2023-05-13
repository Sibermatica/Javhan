If (WScript.Arguments.Count < 0) Then
    MsgBox "Error loading null graphics!", vbCritical
    WScript.Quit
End If

For i = 0 To WScript.Arguments.Count Step 1
    Argument = WScript.Arguments.item(i)
    Select Case Argument
        Case "--show-messagebox"
            MsgBox WScript.Arguments.item(i + 1), WScript.Arguments.item(i + 2), WScript.Arguments.item(i + 3)
            i = i + 4
        Case "--show-inputbox"
            output = InputBox(WScript.Arguments.item(i + 1), WScript.Arguments.item(i + 2), WScript.Arguments.item(i + 3))
            WScript.StdOut.WriteLine(output)
            i = i + 4
        Case Else
            MsgBox "Unrecognized argument: " + Argument
            WScript.Quit
    End Select
Next