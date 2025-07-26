/*
 Script Anchor: Mohammad Sharif Wighio
 Dated: 9 Nov 2017, 09:23 PM Thu
 Cookie Functions: 
    Courtesy of W3Schools.org
*/
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getAllCookies()
{
	var pairs = document.cookie.split(';');
	var cookies = {};
	
	for(i=0; i < pairs.length; i++)
	{
		var pair = pairs[i];
		    pair = pair.split('=');
		var key = pair[0];
		var val = unescape(pair[1]);
		cookies[key] = val;
	}

	return cookies;
	
};