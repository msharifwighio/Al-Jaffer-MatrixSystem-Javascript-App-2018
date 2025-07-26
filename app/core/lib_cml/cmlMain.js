/*
[[-------------------------------------------
 Script Author: Mohammad Sharif Wighio.
 Dated: 26 of Febuary 2018, SMon GD, 04:27 PM
 ------------------------------------------]]
 
 Project: Matrix System - Al Jaffer v1.0 (Beta)
 ==============================================
 Script: cmlMain.
 Main Activity/Modules and Controll of the Editor System.
 
*/
var cmlEditor = {};
    cmlEditor.tbClogs = [];
	

/*
 Function: To Check the every input changes.
*/
cmlEditor.ListenInput = function()
{
    
};

cmlEditor.ListenInputChange = function()
{
    
};

cmlEditor.ListenKeyDown = function(e)
{
	var O =  $id(idEditorCommand);
	
    // Bound the Enter Key
    if(e.keyCode == 13)
    {
        var tbcommands = O.innerText.split('\n');
        if(tbcommands)
        {
            for(i=0; i < tbcommands.length; i++)
            {
                cmlCore.ProccessCommand(tbcommands[i], this);
                cmlEditor.tbClogs.push(tbcommands[i]);
                
            }
        }
	
    }
	
};


/*
 Function: To bound the Events to Command Editor
*/
cmlEditor.InitCommandEditor = function(o)
{
    if(o)
    {
        o.addEventListener('input', cmlEditor.ListenInput);
        o.addEventListener('change', cmlEditor.ListenInputChange);
        o.addEventListener('keyup', cmlEditor.ListenKeyDown);
        
    }
};


CML_ERROR   = 10;
CML_DEFAULT = 1;

cmlEditor.log = function(msg, type)
{
	if(!type)type=CML_DEFAULT;
	var t = "<div class='cmlEditor_logline'>";
	
	if(type==CML_ERROR){
		t += "<font color='red' size=2>"+msg+" </font>";
	}else{
		t += "<font color='green' size=2>"+msg+" </font>";
	}
	
	t += "</div>";
	
	var x = document.createElement('div');
	x.innerHTML = t;
	$id(idEditorTrack).appendChild(x);;
};

// Function the clear the screen
cmlEditor.clearAll = function()
{
    var track = $id(idEditorTrack);
    if(track) track.innerHTML = '';
    var edit = $id(idEditorCommand);
	setCookie('cmlcach','', 10);
	cmlEditor.log('Cleared.', CML_ERROR);
	
    if(edit) edit.innerText = ''; edit.focus();
};

cmlEditor.clearCommand = function()
{
    var edit = $id(idEditorCommand);
    if(edit) edit.innerText = ''; edit.focus();
    
};

cmlEditor.saveCommands = function()
{
	var t = getCookie('cmlcach');
	for(i=0; i < cmlEditor.tbClogs.length; i++)
	{
		var c = cmlEditor.tbClogs[i];
		if(c && c != ''){
			t += c + '&';
		}
	}
    
	setCookie('cmlcach', t, 10);
	var edit = $id(idEditorCommand);
	//cmlEditor.tbClogs = [];
	cmlEditor.log('Matrices saved.');
    if(edit) edit.innerText = ''; edit.focus();
	
};

/*
 CML Context Menu
*/
cmlEditor.showContextMenu = function(e)
{
    e.preventDefault();
    // list of the options
    var m = $id('cml_context_menu');
    if(m)
    {
        var menu = {};
            menu.x = e.pageX;
            menu.y = e.pageY;
            
            console.log(m.offsetWidth);
            
        if(menu.x + m.offsetWidth > window.outerWidth)
        {
            menu.x = window.outerWidth - m.offsetWidth - 20;
            console.log('sdave')
        }
        
        if(menu.y + m.offsetHeight > window.outerHeight)
        {
            menu.y = window.outerHeight - m.offsetHeight;
        }
            
        
        m.style.top =  menu.y + 'px';
        m.style.left = menu.x + 'px';
        m.style.display = 'block';      
        
    }
}

window.addEventListener('contextmenu', cmlEditor.showContextMenu)



