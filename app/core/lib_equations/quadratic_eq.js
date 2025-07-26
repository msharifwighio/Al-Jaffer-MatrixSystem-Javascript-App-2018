/*
[[-------------------------------------------
 Script Author: Mohammad Sharif Wighio.
 Dated: 28 of March 2018, Wed GD, 05:22 PM
 ------------------------------------------]]
 
 Project: Matrix System - Al Jaffer v1.0 (Beta)
 ==============================================
 Script: Equation Systems: Quadratic Equations
  This script contains the general & techincal
  methods of handling Quadratic Equations.
  
   QuadEQ -- OBJ Module
     createQuadBox -- function
   
 
*/

var QuadEq = {};
QuadEq.serial = 0; // detail attr



/*
 Function for creating a quadratic Equation
   Input Controll
   
   return html obj appendable
*/
QuadEq.createQuadBox = function()
{
	// Define the unique identifier for the quadbox
	var qid = QuadEq.serial++;
	
	// Create the visual box for quadbox
	var d = document.createElement('div');
	    d.className = 'quadbox';
		d.id = 'quadboxid'+qid;
		
		
	/* HTML quadbox model
	   This contains a html table,
	   contains the variable labels and input ./ controls.
	*/
	var t = "";
	
		      t += "<small style='padding:5pt;color:darkblue;'>Quadratic Solution:</small><img src='layout/img/x.png' id='quadbox_img_x' align='right' onclick='QuadEq.handleClickX("+qid+")'></img>";
		      t += "<table class='quadbox_tab'>";
		      t += "<tr>";
			  t += "<td width='30%'>a = </td>";
			  t += "<td width='70%'><input type = 'number' id='"+qid+"_a' onkeydown='QuadEq.handleKey(this)' ></td>";
			  t += "</tr>";
			
			  t += "<tr>";
			  t += "<td width='30%'>b = </td>";
			  t += "<td width='70%'><input type = 'number' id='"+qid+"_b' onkeydown='QuadEq.handleKey(this)' ></td>";
			  t += "</tr>";
			
			  t += "<tr>";
			  t += "<td width='30%'>c = </td>";
			  t += "<td width='40%'><input type = 'number' id='"+qid+"_c' onkeydown='QuadEq.handleKey(this)' ></td><td><input type = 'button' value='SOLVE' onclick='QuadEq.handleSolveClick("+qid+")' ></td>";
			  t += "";
			  t += "</tr>";
		      t += "</table>";
			  
			  t += "<p class='quadbox_result' id='"+qid+"_result'></p>";
			
			// Copy the html table data to the quadbox
			d.innerHTML = t;
		
		// Return the HTML appendable Object
		return d;
};

// Function to handle the key presses on input box
QuadEq.handleKey = function(o)
{
	if(o)
	{
		if(window.event.keyCode == 13){
			o.blur();
		}
	}
};

// Function to handle the close request
QuadEq.handleClickX = function(sid)
{
	var o = $id('quadboxid'+sid);
	if(o){
		o.innerHTML = "";
		o.style.display = 'none';
	}
};


// Function to solve the quadratic equation
// Quadraric Formula/Algorithm
QuadEq.handleSolveClick = function(sid)
{
	
	// Select values from input controlls.
	var a,b,c, stra, strb, strc;
	stra = $id(sid+'_a').value;
	strb = $id(sid+'_b').value;
	strc = $id(sid+'_c').value;
	
	// Parse and correct the input values.
	a = parseFloat(stra);
	if(!a) a = 1;
	if(stra.match(/\-/)){a *= -1;a*= -1;}
	
	
	b = parseFloat(strb);
	if(!b) b = 0;
	if(strb.match(/\-/)){b *= -1;b*=-1;}
	
	c = parseFloat(strc);
	if(!c) c = 0;
	if(strc.match(/\-/)){c *= -1;c*=-1;}
	
    // Solve/Implement the Quadratic Formula.
	/* Quadratic Formula:
	
	    x = -b +- √b^2 - 4ac / 2a
		         OR
	    x = -b +- √b*b - 4*a*c   / 2*a
		
		SPLIT THE FORMULA INTO SIMPLER IMPLEMENTABLE UNITS.
		
		outerb = -b OR (-1)*b
		
		sqrtermp = √b*b - 4*a*c;
		
		divisor OR d = 2*a;
	 
	*/
	
	// Evaluate the under-radical terms / sqrterm
	var sqrtermp = (b*b) - (4*a*c);
	
	
	// Detect for the negative under-root numbers and put iota for -ve number.
	var iota = '';
	if(sqrtermp < 0) iota = '<i>i</i>';
	
	// Find the square root of the sum/product of the terms.
	// Turn the under-root number into absolute numbers.
	// Discard - sign from the number becuase algorithm only supports square root of positive numbers.
	var sqrterm = Math.sqrt(Math.abs(sqrtermp));
	
	// Eval the divisor OR d
	var d = 2 * a;
	
	// Eval the outerb
	var outerb = (-1 * b);
		
	// Add the outerb with sqrterm to simplify.
	/*
	 Output Variables:
	  eq1 for positive root of outerb and sqrterm.
	  eq2 for negatove root of outerb and sqrterm.
	*/
	var eq1 = outerb + sqrterm;
	var eq2 = outerb - sqrterm;
	
	// Output Text Variable that will print text Ans. at the end right side of eq2.
	var strans= '&nbsp;&nbsp;<b style="color:darkblue">Ans.</b>';
	
	// Output Text variables to hold the html code for rendering.
	var r1 , r2;
	
	// Adjust the value as per experiment results.
	// This statement/implementaion is based on experimental corrections found while testing and debugging.
	b = b *-1;
	
	
	if(Math.isperfectsqr(eq1))
	{
		var root1 = Math.simplydivide(eq1,d);
		
		var strx = '';
		
		if(parseInt(root1.den) != 1){
			strx = '<u>' + root1.num + iota +'</u><br>'+ root1.den;
		}
		else{
			strx = root1.num + '' + iota;
		}
		
		r1 = '<table><tr><td>X1 = </td><td align="center" class="quadbox_p">' + strx +'</td></tr></table>';
		
	}else{
		r1 = '<table><tr><td>X1 = </td><td align="center" class="quadbox_p"><u>'+b + '+√'+Math.abs(sqrtermp) + iota + '</u><br>'+d +'</td></tr></table>';
	}
	
	
	// Check for the peefect sqr eq1
	if(Math.isperfectsqr(eq2))
	{
		var root1 = Math.simplydivide(eq2,d);
		
		var strx = '';
		
		if(parseInt(root1.den) != 1){
			strx = '<u>' + root1.num + iota +'</u><br>'+ root1.den;
		}else{
			strx = root1.num + '' + iota;
		}
		
		r2 = '<table><tr><td>X1 = </td><td align="center" class="quadbox_p">' + strx +'</td></tr></table>';
		
	}else{
		r2 = '<table><tr><td>X2 = </td><td align="center" class="quadbox_p"><u>'+b + '-√'+Math.abs(sqrtermp) + iota +'</u><br>'+d +'</td><td align="right">' + strans +'</td></tr></table>';
	}

	if(!strb.match(/\-/)) strb = '+' + strb;
	if(!strc.match(/\-/)) strc = '+' + strc;
	
	var streq = 'Eq: <code id="quadbox_eq" style="color:darkblue">'+stra+'x<sup>2</sup>' + strb + 'x' + strc + ' = 0</code><br><br><b>Roots:</b><br>';
	
	var ht = '';
	    ht += streq;
	    ht += r1;
		ht += r2;
	    
		// Update the visual layer.
		$id(sid+'_result').innerHTML = ht;
};



// Other Functions@@
Math.gcd= function(a, b){
    if(b) return Math.gcd(b, a%b);
    return Math.abs(a);
};

Math.simplydivide = function(a,b)
{
	  
	  var gcd = Math.gcd(a,b);
	  while(gcd > 1)
	  {
		  a = a /gcd;
		  b = b /gcd;
		  
		  gcd = Math.gcd(a,b);
	  }
	  
	  var frac = {};
      frac.num = a;
	  frac.den = b;
	  
	 return frac;
	  
};

Math.isperfectsqr = function(a)
{
	var r = Math.ceil(a);
	if(a*a == r * r)
	{
		return true;
	}
	return false;
};

