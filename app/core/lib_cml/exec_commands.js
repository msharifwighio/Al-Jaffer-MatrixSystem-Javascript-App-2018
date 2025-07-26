
 cmlExec = {};
 
 cmlExec.cShowMatrix = function(strName)
 {
   var m = MatrixCore.GetMatrixByName(strName);
    if(m.typeMatrix == true)
    {
        var htm = MatrixCore.GetMatrixHTMLObject(m,{showfull:1, readonly:1});
        oEditorTrack.appendChild(htm);
        
    }else{
        cmlEditor.log('Matrix ' + strName + ' is not defined.', CML_ERROR);
    }
    
    return true;
    
 };
 
 
 
 
 cmlExec.cCreateNewMatrix = function(strName, rows, cols, type, typep)
 {
    strName = strName.toUCFirst();
    
    var matrix = new matrix_obj(strName, rows, cols, type, typep);
    
    // Clear the old occurence of the matrix
    var old = MatrixCore.GetMatrixByName(strName);
    if(old.typeMatrix == true){MatrixCore.tbMatrices[matrix.Name] = null;}
    
    // Register the matrix to enviroment
    MatrixCore.SaveMatrixByName(strName, matrix);
    
    // Status
    cmlEditor.log('Matrix ' + strName + ' of ' + rows + ' x ' + cols + ' is created.');
    
    // Show the matrix to track
    var htmo = MatrixCore.GetMatrixHTMLObject(matrix,{showfull:1});
    $id(idEditorTrack).appendChild(htmo);
    
    cmlEditor.clearCommand();
    
	var id = matrix.Name + '_0_0';
	$id(id).focus();
    
    return true;
 };
 
 
 
 cmlExec.cAssignMatrix = function(a,b)
 {
    
    
    var B = MatrixCore.GetMatrixByName(b);
    if(B && B.typeMatrix)
    {
        var M = new matrix_obj(a.toUCFirst(), B.rows, B.cols, B.type, B.scaler);
        MatrixCore.SaveMatrixByName(M.Name, M);
        cmlEditor.log(M.Name + ' is copied from ' + B.Name + '.');
        
        
    }else{
        cmlEditor.log('Matrix ' + a.toUCFirst() + ' is not defined.', CML_ERROR);
    }
    
    
    return true;
 };
 
 
 cmlExec.cMatrixOperation = function(c)
 {
    // Simplify the operations
    c = c.toUpperCase().replace('  ',' ');
	c = c.trim();
    
    // Split the command
    var x = c.split('=');
    var LHS = '';
    var RHS = '';
    
    if(x && x.length == 2)
    {
      LHS = x[0].replace(' ','');
      RHS = x[1].replace(/ x /gi, '*');
      RHS = RHS.replace(/ /gi,'');
      
      var stack = [];
      var cstack = 0;
      var R = null;   // It will hold the result of the sum/subtraction / stack results
      var sign = false; // false for Addition and true for subraction
      
      var terms = RHS.split(/(\+|\-)/ig);
      for(l = 0; l < terms.length; l++)
      { 
       var term = terms[l];
       var nfactor = null;
       
       if(term.match(/(\*)/) != null)
       {
      
           var product = {}; // Resultant Matrixs
           // factorise
           var factors = term.split('*');
           if(factors)
            {
                
               for(j=0; j<factors.length-1; j++)
               {
                 var factor = factors[j];
                 
                 var b = factors[j+1];
				 //if(!b) break;
				 b = parseInt(b);
                 
                 if(j==0)
                 {
                 var a = parseInt(factor);
                 if(!a){
                    a = MatrixCore.GetMatrixByName(factor);
                    if(!a || !a.typeMatrix){
                        cmlEditor.log('Matrix ' + factor + ' is not defined.', CML_ERROR);
                        return null;
                    }
                 }
                 }else{
                    a = product;
                 }
                 
                 if(!b){
                    b = MatrixCore.GetMatrixByName(factors[j+1]);
                    if(!b || !b.typeMatrix){
                        cmlEditor.log('Matrix ' + factors[j+1] + ' is not defined.', CML_ERROR);
                        return null;
                    }
                 }
                 
                 var n = '';
                 if(a.Name) {n += a.Name + ' x ';}else{n += a + ' x ';}
                 if(b.Name) {n += b.Name;}else{n += b;}
                 
                 // Get the product
                 product = sh_multiply_matrices(a,b,n);
                 //console.log(product);
                
                 
                 
               } // End loop factors
              
            }
            // End chk factors
         
         // Save Terms to the stack
         tmp = [];
		 tmp[0] = product;
		 tmp[1] = sign;
		 
         //console.log(tmp);
		 // Save to the stack
		 stack[cstack++] = tmp;
         
		// MatrixCore.SaveMatrixByName('Z', product);
        
       }else if(term == '+'){
        sign = false;
       }else if(term == '-')
       {
        sign = true;
       }else{
          
          if(parseInt(term))
               {nfactor = parseInt(term);}
          else{
            nfactor = MatrixCore.GetMatrixByName(term);
            if(!nfactor || !nfactor.typeMatrix)
            {
                cmlEditor.log('Matrix ' + term + ' is not defined.', CML_ERROR);
                return null;
            }
          }
          
         // Save Terms to the stack
         tmp = [];
		 tmp[0] = nfactor;
		 tmp[1] = sign;
		 
         
         //console.log(tmp);
		 // Save to the stack
		 stack[cstack++] = tmp;
        
       } // End Chk Term 
      } // End the terms loop
	  
      
	  /////////////////////////////
	  // Addition and Subtraction Routine
	  // R is the Result variable
      
      R = stack[0][0];
      
	  for(i = 1; i < stack.length; i++)
      {    
       // Check the bool case true for sub and false for add
       if(stack[i][1] == true){
        R = sh_subtract_matrices(R, stack[i][0]);
       }else{
        R = sh_add_matrices(R, stack[i][0]);
       }
        
      }// End stack loop
      
      // Now the expression is simplified to R
      // Save the Resultant Matrix
      
      // Chkpont
      if(R && R.typeMatrix)
      {
        R.Name = LHS;
        MatrixCore.SaveMatrixByName(LHS, R);
      
        // Status
        cmlEditor.log('<b>' + c.replace(/ X /gim,'x') + ', Done.</b>');
      
        // Show the new matrix
        var htmo = MatrixCore.GetMatrixHTMLObject(R,{showfull:1, readonly:1});
        $id(idEditorTrack).appendChild(htmo);
      }else{
        cmlEditor.log('<b>' + c + ', Failed</b>', CML_ERROR);
      }
      
      
      
      
      
    }
    
  
    
    return true;
 };
 
 
cmlExec.cTranspose = function(a, b, show)
{
	// ck b
	b = MatrixCore.GetMatrixByName(b);
	if(b && b.typeMatrix)
	{
		var tmp = sh_transpose_matrix(b);
		tmp.Name = a;
		MatrixCore.SaveMatrixByName(a, tmp);
		cmlEditor.log('<b>' + a + ' = Transpose of  ' + b.Name+' , Done.</b>');
		
		if(show)
		{
			var ht = MatrixCore.GetMatrixHTMLObject(tmp,{readonly:1});
			oEditorTrack.appendChild(ht);
		}
		
	}else{
		cmlEditor.log('Error in Transposition of ' + b + '.', CML_ERROR);
	}
	
	return true;
};



// Quadratic Equation Solver
cmlExec.cCreateQuad = function()
{
	// Quadratic Equation Solution
	//cmlEditor.log('Quadratic Solution:');
	
	// Input Objects
	var d = QuadEq.createQuadBox();
	oEditorTrack.appendChild(d);
	
	
	
};
 
 
