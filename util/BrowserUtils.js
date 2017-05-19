Lavender.BrowserUtils = function(){
}

Lavender.BrowserUtils.uaMatch = function( ua ) {
    ua = ua.toLowerCase();
    var match = /(ipad).*(?:safari)[ \/]([\w.]+)/.exec( ua ) ||
        /(android)[ chrome\/]([\w.]+)/.exec( ua ) ||//MUST BE BEFORE CHROME
        /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(safari)[ \/]([\w.]+)/.exec( ua ) ||
        /(firefox)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        /trident.*rv[ :]*[1-9]\d\./.exec( ua.toLowerCase() ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];
    //IE 11+ changed user agents, AWESOME!!! More info here: http://stackoverflow.com/questions/17447373/how-can-i-target-only-internet-explorer-11-with-javascript
    //We need to reset to the expected id forIE
    if( /trident.*rv[ :]*[1-9]\d\./.exec( ua.toLowerCase() ) ){
        match[ 1 ] = 'msie';//reset to msie
        match[ 2 ] = /[1-9]\d\./.exec( ua );
    }

    return {
            browser: match[ 1 ] || "",
            version: match[ 2 ] || "0"
    };
};

Lavender.BrowserUtils.getBrowser = function() {
    return Lavender.BrowserUtils.uaMatch(navigator.userAgent);
};
