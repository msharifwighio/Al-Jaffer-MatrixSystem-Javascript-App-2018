/*
[[-------------------------------------------
 Script Author: Mohammad Sharif Wighio.
 Dated: 28 of Febuary 2018, Wed GD, 08:31 PM
 ------------------------------------------]]
 
 Project: Matrix System - Al Jaffer v1.0 (Beta)
 ==============================================
 Script: Implementations of Matrix Multiplication
 This script contains the mathematical/ implementations for Matrix Multiplication.
 
 *
  Binary x
  Scalar x
  Vector x
  Matrix Matrix x
 
*/

// Function
function sh_multiply_matrices(a,b, n)
{
	var m = null;
	var sc = 0;
	if(!n){n='X';}
	
	// Add two matrices
	if(a.typeMatrix && b.typeMatrix)
	{
		// Check the compability
		if(a.cols == b.rows)
		{
			m = new matrix_obj(n, a.rows, b.cols);
			
			for(row=0; row<m.rows; row++)
			{
				for(col = 0; col < m.cols; col++)
				{
					for(i=0; i< b.rows; i++)
					{
						m.indices[row][col] += a.indices[row][i] * b.indices[i][col];
						//cmlEditor.log('*' + row+',' + col + '=' + v);
					}
	
				}
				
			}
			
			
		}else{
			cmlEditor.log('Matrices ' +a.Name + ' and ' + b.Name + ' are not compatible for Multiplication.',CML_ERROR);
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
				m.indices[r][c] = parseInt(M.indices[r][c]) * sn;
			}
		} // End
	}// End else block
	
	return m;
};
