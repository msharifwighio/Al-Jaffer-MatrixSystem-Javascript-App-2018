/*
[[-------------------------------------------
 Script Author: Mohammad Sharif Wighio.
 Dated: 28 of Febuary 2018, Wed GD, 08:31 PM
 ------------------------------------------]]
 
 Project: Matrix System - Al Jaffer v1.0 (Beta)
 ==============================================
 Script: Implementations of Matrix Subtraction
 This script contains the mathematical/ implementations for Matrix Subtraction.
 
 *
  Binary Subtraction
  Scalar Subtraction
  Vector Subtraction
  Matrix Matrix Subtraction
 
*/

// Function
function sh_subtract_matrices(a,b, n)
{
	var m = null;
	var sc = 0;
	if(!n){n='X';}
	
	// Add two matrices
	if(a.typeMatrix && b.typeMatrix)
	{
		// Check the compability
		if(a.rows == b.rows && a.cols == b.cols)
		{
			m = new matrix_obj(n, a.rows, a.cols);
			for(row = 0; row < a.rows; row++)
			{
				for(col = 0; col < a.cols; col++)
				{
					m.indices[row][col] = parseInt(a.indices[row][col]) - parseInt( b.indices[row][col]);
					
				}
			}
		}else{
			cmlEditor.log('Matrices ' +a.Name + ' and ' + b.Name + ' are not compatible for Subtraction.','error');
			return null;
		}
		// End M x M
			
	}else{
		// Scalar Addition
		var M;
		var sn = 0;
		if(a.typeMatrix){M = a; sn = parseInt(b);}	else if(b.typeMatrix){ M = b; sn = parseInt(a);}else{return null;};
		
		var m = new matrix_obj(n, M.rows, M.cols);
		
		for(r=0; r<m.rows;r++){
			for(c=0; c<m.cols;c++){
				m.indices[r][c] = parseInt(M.indices[r][c]) - sn;
			}
		} // End
	}// End else block
	
	return m;
};
