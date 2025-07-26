/*
[[-------------------------------------------
 Script Author: Mohammad Sharif Wighio.
 Dated: 25 of Febuary 2018, Sun GD, 12:45 PM
 ------------------------------------------]]
 
 Project: Matrix System - Al Jaffer v1.0 (Beta)
 ==============================================
 Script: MainActivity.
 Main Activity and Controll of the System.
 
*/

 /* Main will be executed when the page starts. */
 function main()
 {
    cmlEditor.InitCommandEditor($id(idEditorCommand));
    oEditorTrack = $id(idEditorTrack);
	oEditorCommand= $id(idEditorCommand);
	
    // Restore the status
	var cach = getCookie('cmlcach');
        cach = cach.split('&');
        for(i=0; i < cach.length; i++)
        {  
            cmlCore.ProccessCommand(cach[i], oEditorCommand, oEditorTrack);
        }
	
	
 }
 
 /* Dispatch the main function on the start/load of the page. */
 window.addEventListener('load',main);
 
 
 window.onerror = function(message, url, lineNo)
 {
	cmlEditor.log('Debugger: ' + message + '<br>File: ' + url + '<br>At line: ' + lineNo, 'error');
 };
