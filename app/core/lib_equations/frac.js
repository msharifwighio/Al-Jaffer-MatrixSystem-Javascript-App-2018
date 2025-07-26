Math.gcd= function(a, b){
    if(b) return Math.gcd(b, a%b);
    return Math.abs(a);
};
Math.fraction= function(n, prec, up){
    var s= String(n), 
    p= s.indexOf('.');
    if(p== -1) return s;

    var i= Math.floor(n) || '', 
    dec= s.substring(p), 
    m= prec || Math.pow(10, dec.length-1), 
    num= up=== 1? Math.ceil(dec*m): Math.round(dec*m), 
    den= m, 
    g= Math.gcd(num, den);

    if(den/g==1) return String(i+(num/g));

    if(i) i= i+' and  ';
    return i+ String(num/g)+'/'+String(den/g);
};
