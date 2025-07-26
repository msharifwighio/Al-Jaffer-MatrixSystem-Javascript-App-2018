/*
[[-------------------------------------------
 Script Author: Mohammad Sharif Wighio.
 Dated: 28 of Febuary 2018, Wed GD, 08:31 PM
 ------------------------------------------]]
 
 Project: Matrix System - Al Jaffer v1.0 (Beta)
 ==============================================
 Script: Implementations of Matrix Transposition
 This script contains the mathematical/ implementations for Matrix Transposition.
 
 *
 Transpose Matrix
 
*/

// Function
function sh_transpose_matrix(a)
{
	var m;
	if(a && a.typeMatrix)
	{
		// Do the exchange
		var r = a.rows;
		var c = a.cols;
		
		m = new matrix_obj(a.Name, c, r);
		
		for(row = 0; row<a.rows; row++)
		{
			for(col=0; col<a.cols; col++)
			{
				m.indices[col][row] = a.indices[row][col];
			}
		}
		
	}else{
		cmlEditor.log('Matrix is not defined.', 'error');
	}
	
	return m;
};
