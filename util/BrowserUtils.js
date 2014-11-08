Lavender.BrowserUtils = function(){
}

Lavender.BrowserUtils.uaMatch = function( ua ) {
    ua = ua.toLowerCase();
    var match = /(ipad).*(?:safari)[ \/]([\w.]+)/.exec( ua ) ||
                /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
                /(safari)[ \/]([\w.]+)/.exec( ua ) ||
                /(firefox)[ \/]([\w.]+)/.exec( ua ) ||
                /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
                /(msie) ([\w.]+)/.exec( ua ) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
            [];

    return {
            browser: match[ 1 ] || "",
            version: match[ 2 ] || "0"
    };
};

Lavender.BrowserUtils.getBrowser = function() {
    return Lavender.BrowserUtils.uaMatch(navigator.userAgent);
};
