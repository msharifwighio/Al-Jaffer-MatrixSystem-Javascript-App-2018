// MSUI
// Script Author: Mohammad Sharif
// Dated: 10 Dec 2016 3:37PM GD

var d=document;
function $id(a){if(a){var a = d.getElementById(a);if(a){return a;}}else{return null;}}
function $fileContents(filepath){
	// Chk the filepath
	if (filepath==null)
		{
			return "";
		}
		
		// open the file
		var file = new XMLHttpRequest();
		file.open("GET", filepath, false);
		file.send();
		
		// Chk wether the file is found
		if (file.status!=200)
		{
			"";
		}else{
			
			return file.responseText;
		}
		return "";
	
}
// Function for formating a String
// First, checks if it isn't implemented yet.
if (!String.prototype.ff) {
  String.prototype.ff = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}
//

// Functions for getting all matches from a string
function getAllMatches(str, regex) {
    var res = [];
    var m;
    if (regex.global) {
        while (m = regex.exec(str)) {
            res.push(m[1]);
        }
    } else {
        if (m = regex.exec(str)) {
            res.push(m[1]);
        }
    }
    return res;
}

//
function empty(arg){
	if(arg == ""|| arg==null|| arg=="undefined"){
		return true;
	}else{
		return false;
	}
}

if (!String.prototype.toUCFirst) {
  String.prototype.toUCFirst = function() {
	  
	  var str = this.toString();
	  var fc = str.charAt(0).toUpperCase();
	  var oc = str.slice(1).toLowerCase();
	  return fc + oc;
  };
};

// Check wether the text is eng
if(!String.prototype.isEng){
	String.prototype.isEng = function()
	{if(/^[a-z]|^[0-9]/i.test(this.toString())){return true;}else{return false;}};
}

if(!String.prototype.proper){
	String.prototype.proper=function(){
		var x = this.toString().split(" ");
		var n = "";
		for(i=0;i<x.length;i++){
			n += x[i].toUCFirst();
			n += " ";
		}
		return n;
	};
}
//
function getOffsetPosition(A){ var X=0; var Y=0;  while(A){X+=parseInt(A.offsetLeft-A.scrollLeft+A.clientLeft);  Y+=parseInt(A.offsetTop-A.scrollTop+A.clientTop); A=A.offsetParent; }return{X:X,Y:Y} }

function cleanWilds(str){
	
	var w = new Array(".","*","?","^","$");
	for(var i=0;i<w.length;i++){
		str = str.replace(w[i],"");
	}
	
	return str;
}


function strProperDate(d, s){
	if(!s){s="/";}
	var r = "";
	var x = d.split(s);
	for(i=0; i<x.length;i++){
		var t = parseInt(x[i]);
	  if(t>0){
		if(t<10){r+="0";}
		r += t;
		if(i!= x.length-1){
			r += s;
		}
	  }
	}
	return r;
}


function pow(a,b){
	var v=1;
	for(i=0;i<b;i++){
		v *= a;
	};
	return v;
}

