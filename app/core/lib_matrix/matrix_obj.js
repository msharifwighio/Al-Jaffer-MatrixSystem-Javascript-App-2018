// Matrix Object

var matrix_obj = function(name,rows,cols, type, scaler)
{
	
    // Matrix Dimensions
    this.rows = rows > 0?rows:1;
    this.cols = cols > 0?cols:1;
    this.type = type?type: '';
    this.scaler = scaler > 1?scaler:2;
    
	
    MatrixCore.idMatrices++;
    MatrixCore.numMatrices++;
    
    // Matrix Technical
    this.Name = name && name !=''?name: 'X';
    this.ID = 'matrixob_' + MatrixCore.idMatrices + '_' + this.Name;
    //this.ID = 'matrixob_' + this.Name;
	this.typeMatrix = true;
    this.adjucate = false;
    this.transpose = false;
    
    // Matrix Entries
    this.indices = [];
    
    // Init indices
    for(row=0;row<this.rows;row++)
    {
        this.indices[row] = [];
        for(col=0;col<this.cols;col++){
            this.indices[row][col] = 0;
            if(this.type=='UNIT' && row == col)
            {
                this.indices[row][col] = 1;
            }else if(this.type == 'SCALAR' && row == col)
            {
                this.indices[row][col] = parseInt(this.scaler);
            }else if(type == 'FILL'){
				this.indices[row][col] = parseInt(this.scaler);
			}
        }
    }
    // Matrix Init End
    return this;
};
