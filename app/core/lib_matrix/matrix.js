/*
[[-------------------------------------------
 Script Author: Mohammad Sharif Wighio.
 Dated: 26 of Febuary 2018, Mon GD, 05:04 PM
 ------------------------------------------]]
 
 Project: Matrix System - Al Jaffer v1.0 (Beta)
 ==============================================
 Script: Matrix Class.
 Matrix Main Functions.
   This class contains:
    - Basic Matrix Model Management
    - Matrix Runtime Storage
    - Matrix Runtime Evaluaiton/Simplifaction
    - Order of Operation Module
    
    
 @Functions:
   1. MatrixCore.GetMatrixHTML(Matrix m)
   2. 
 
*/
var MatrixCore = {
    
    // Associative Array that will hold the Matrices indexed by matrix Name
    tbMatrices: [],
    numMatrices: 0,
    idMatrices: 0,
     
    
};

/*
 Function: Get the HTML version of the matrix
*/
MatrixCore.GetMatrixHTMLObject = function(m, attrs)
{
    // Make the object box
    var matrix_box = document.createElement('div');
	    matrix_box.className = 'matrix_track_box';
		matrix_box.ontouchmove = function(e){
			e.cancelBubble = true;
			var mv1 = 0;
			var mv2 = 0;
			
			// Check the touches
			if(e.touches.length == 2){
				mv1 = e.touches[1].screenX - e.touches[0].screenX;
				mv2 = e.touches[1].screenY - e.touches[0].screenY;
				
				var scale = 100;
				var aspect = Math.abs(mv1) + Math.abs(mv2);
				    aspect = Math.ceil(aspect/2);
				this.style.zoom =  aspect + '%';
			}
		};
		
    
    var matrix_outer_tab;
    var matrix_outer_tab_tr;
    var matrix_outer_tab_td_name;
    var matrix_outer_tab_td_matrix;
    
    var matrix_object_tab;
    
    
    // Make the Table object for holding the matrix

    // Main outer table
    matrix_outer_tab = document.createElement('table');
	matrix_outer_tab.className = cMatrixObjectOuterTable;
    matrix_outer_tab_tr = document.createElement('tr');
        
    // TD for the Matrix Name
    matrix_outer_tab_td_name = document.createElement('td');
    matrix_outer_tab_td_name.className = 'matrix_object_td_name';
    matrix_outer_tab_td_name.innerHTML = m.Name + ' = ';  
         
    // TD for the sub table matrix entries - Actual matrix   
    matrix_outer_tab_td_matrix = document.createElement('td');  
    
    
    // Matrix
    matrix_object_tab = document.createElement('table');
    matrix_object_tab.className = cMatrixObjectTable;
    matrix_object_tab.id = m.ID;
     
     // Matrix rows and cols
     for(row = 0; row < m.rows; row++)
     {
        var row_tr = document.createElement('tr');
        
        for(col = 0; col < m.cols; col++)
        {
            var col_td = document.createElement('td');
			   // col_td.className = 'matrix_object_td';
            var entry = document.createElement('input');
                entry.type = 'number';
                entry.className = 'matrix_obj_entry_input';
                
                if(attrs.readonly)
                {
                    entry.className = 'matrix_obj_entry_input_dis';
                    entry.disabled = true;
                }
                
                entry.value = m.indices[row][col];
                entry.id = m.Name + '_' + row + '_' + col;
                entry.drow = row;
                entry.dcol = col;
                entry.dname = m.Name;
                
            // Bind the events to the entry
            entry.addEventListener('focus', MatrixCore.handleEntryFocus,false);
            entry.addEventListener('blur', MatrixCore.handleEntryBlur, false);
            entry.addEventListener('change', MatrixCore.handleEntryChange, false);
			entry.addEventListener('input', MatrixCore.handleEntryInput, false);
            entry.addEventListener('keydown', MatrixCore.handleEntryKeyDown);
            
            
            // Append the entry input to the col
            col_td.appendChild(entry);
            
            // Append the col entry to the row
            row_tr.appendChild(col_td);
        }
        // Append the full row to the matrix object
        matrix_object_tab.appendChild(row_tr);
     }
      
    // Append the elems
    // Check for the full
    if(attrs && attrs.showfull == 1)  // TD TD
    {matrix_outer_tab_tr.appendChild(matrix_outer_tab_td_name);}
    
     matrix_outer_tab_td_matrix.appendChild(matrix_object_tab);
    
     matrix_outer_tab_tr.appendChild(matrix_outer_tab_td_matrix);
     matrix_outer_tab.appendChild(matrix_outer_tab_tr);
    
     matrix_box.appendChild(matrix_outer_tab);
	 return matrix_box;
	
    
    
};
// Function get matrix html end
//------------------------------------------------------------------------------

// Function get matrix
MatrixCore.GetMatrixByName = function(strName)
{
    var tmp = MatrixCore.tbMatrices[strName.toUCFirst()];
    if(tmp){
        return tmp;
    }
    return {typeMatrix: false};
};

MatrixCore.SaveMatrixByName = function(strName, matrix)
{
    if(matrix && matrix.typeMatrix == true)
    {
        MatrixCore.tbMatrices[strName.toUCFirst()] = matrix;
    }
};



/*
 Functions: Event Handlers of the matrix object
*/

// Handle focus
MatrixCore.handleEntryFocus = function(e)
{
    if(this && this.value == 0)
    {
        this.value = '';
    }
}; // === End
MatrixCore.handleEntryBlur = function()
{
    if(this)
    {
        var val = this.value;
        if(!val || val == ''){
            this.value = 0;
        }
    }
};


// Handle Input Change
MatrixCore.handleEntryChange = function()
{
    var o = this;
    var pr = o.id.toString().split('_');
    
    var matrix_name = pr[0];
    var row = parseInt(pr[1]);
    var col = parseInt(pr[2]);
    
    
    if(o && matrix_name)
    {
        row = row?row:0;
        col = col?col:0;
        
        var val = parseInt(o.value); if(!val) val = 0;
        
        var matrix = MatrixCore.tbMatrices[matrix_name];
        if(matrix)
        {
            matrix.indices[row][col] = val;
			cmlEditor.tbClogs.push('setm ' + matrix_name + ' ' + row + ' ' + col + ' ' + val);
			//alert(cmlEditor.tbClogs[cmlEditor.tbClogs.length-1]);
            
        }
		
        
    }
};

// On each Input
MatrixCore.handleEntryInput = function()
{
	var val = parseInt(this.value);
	var d = this.value.length;
	
	if(d > 3){
		this.style.width = (d * 10) +'px';
	}else{
		this.style.width = '30px';
	}
};


//
MatrixCore.handleEntryKeyDown = function(e)
{
 //m.Name + '_' + row + '_' + col;
   
   var k = e.keyCode;
   var id = '';
   var move = true;
   
   if(k > 36 && k < 41) e.preventDefault();
   
   if(k==37 && this.dcol > 0)
   {id = this.dname + '_' + this.drow + '_' + (this.dcol -1);}
   else if(k==38 && this.drow > 0)
   {id = this.dname + '_' + (this.drow - 1) + '_' + this.dcol;}
   else if(k == 39)
   {id = this.dname + '_' + this.drow + '_' + (this.dcol +1);}
   else if(k == 40)
   {id = this.dname + '_' + (this.drow + 1) + '_' + this.dcol;}
   else{move = false;}
   
   if(move){
    var o = $id(id);
    if(o) o.focus();
   }
    
    
};

MatrixCore.setMatrixValue = function(m, r, c, v)
{
	var n = m.replace(' ','');
	    n = n.toUCFirst();
	var matrix = MatrixCore.tbMatrices[n];
	
	// chk if
	if(matrix && matrix.typeMatrix){
		// Set the update now
		MatrixCore.tbMatrices[n].indices[r][c] = v;
		var id = m + '_' + r + '_' + c;
		var o = $id(id);
		if(o){
			o.value = parseInt(v);
		}
		
	};
};
