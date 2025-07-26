/*
[[-------------------------------------------
 Script Author: Mohammad Sharif Wighio.
 Dated: 26 of Febuary 2018, Mon GD, 04:27 PM
 ------------------------------------------]]
 
 Project: Matrix System - Al Jaffer v1.0 (Beta)
 ==============================================
 Script: cmlCore.
 Core Functions of the cml Editor
 
*/
var cmlCore = {};

/*
Function: Process command,
This function process the individial command and executes the functions and
   implementations.
   
   Command Patterns:
     
     -> Single:
         cls => clear the screen
     
     -> Show Matrix:
              X = ?
     -> Simple Assignment of one matrix to another:
              X = X
              
     
   
   
*/
cmlCore.ProccessCommand = function(c, oeditor, otrack)
{
   
   // Trim the void chars
   var command = c.trim();
       
       // Make String adjustments
       command = command.replace('  ',' ');
       command = command.replace(/(\+|\-\.|\*)/gim, ' $1 ');
       command = command.replace(/\,/g,' ');
       
   
   // Get the command line parameters
   var x = command.split(' ');
   var len = x.length;
   var R = false;
   
     if(x)
     {
		 
		 var sc = x[0].toUpperCase();
        // Check for the single line commands
        if(sc == 'CLS'){cmlEditor.clearAll(); return true;}
		else if(sc == 'SAVE'){cmlEditor.saveCommands(); return true;}
		
		// Make quadratic Eq.
		else if(sc == 'QUAD:' || sc=='QUADRATIC:' || sc=='QUAD')
		{
			cmlExec.cCreateQuad();
			cmlEditor.clearCommand();
			return true;
		}
		
		else if(sc== 'TRANS'){cmlExec.cTranspose(x[1]+'<sup>T</sup>', x[1], true); return true;}
		else if(sc.match(/^\/\//)){
			cmlEditor.log('<i>'+c+'</i>');
			cmlEditor.clearCommand();
			return true;
		}
		
        // X = X
        // Assignment single command of len 3
        if(len == 3)
        {
            if(x[1] && x[1] == '=' && x[2] == '?')
            {
                // Show matrix X = ?
                R = cmlExec.cShowMatrix(x[0]);
         
            }else if (x[1] && x[1] == '=' && x[2] != '')
            {
                R = cmlExec.cAssignMatrix(x[0], x[2]);
            }
        } // End chk len 3
		
		else if(len == 4 || len == 5 && x[1] == '=' && x[2].toUpperCase() == 'TRANS')
		{
			R = cmlExec.cTranspose(sc, x[3]);
			if(R){
			  var show = x[4];
			  if(show)
			  {
				  cmlCore.ProccessCommand(sc+' = ?', oEditorCommand, oEditorTrack);
			  }
			}
		}
        
        
        else if(len > 3 && command.match(/ (x|\*|\+|\-) /gi))
        {
            R = cmlExec.cMatrixOperation(command);
        }
        
        
        // len 7 commands - New matrix command
        else if(len >= 5)
        {
         if(!x[5]) x[5] = 'NULL';
         if(!x[6]) x[6] = 0;
         
         // Check 2
         // New Matrix command
         if(x[1] == '=' && x[2].match(/matrix|mat|\?|(\[\])/gi))
         {
           R = cmlExec.cCreateNewMatrix(x[0], parseInt(x[3]), parseInt(x[4]), x[5].toUpperCase(), parseInt(x[6]));
         
         }// alternate
		 else if(sc=='MATRIX' || sc=='MAT'){
			  R = cmlExec.cCreateNewMatrix(x[1], parseInt(x[2]), parseInt(x[3]), x[4].toUpperCase(), parseInt(x[5]));
		 }
		 
		 
		 else if(sc=='SETM'){
			 var m = x[1];
			 var r = x[2];
			 var c = x[3];
			 var v = x[4];
			 MatrixCore.setMatrixValue(m, r, c, v);
		 }
         
        }
        // End len 5 commands
        
        
        
     } // End Chk x
	
       cmlEditor.clearCommand();
};
