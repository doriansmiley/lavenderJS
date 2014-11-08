/**
 * Created by dsmiley on 2/10/14.
 */
Lavender.StringUtil = function () {

}
Lavender.StringUtil.substitute = function (str, rest) {
    if (str === null) {
        return '';
    }

    // Replace all of the parameters in the msg string.
    var len = rest.length;
    var args = [];
    if (len == 1 && rest[0] instanceof Array) {
        args = rest[0];
        len = args.length;
    }
    else {
        args = rest;
    }

    for (var i = 0; i < len; i++) {
        str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), args[i]);
    }

    return str;
};

/*Lavender.StringUtil.trim = function(str) {
    return str.replace(/^\s+|\s+$/g, '');
}*/

Lavender.StringUtil.compressSpaces = function(str) {
    return str.replace(/[\s\r\t\n]+/gm,' ');
}

Lavender.StringUtil.trim = function (str) {
    if (str == null) return '';

    var startIndex = 0;
    while (Lavender.StringUtil.isWhitespace(str.charAt(startIndex)))
        ++startIndex;

    var endIndex = str.length - 1;
    while (Lavender.StringUtil.isWhitespace(str.charAt(endIndex)))
        --endIndex;

    if (endIndex >= startIndex)
        return str.slice(startIndex, endIndex + 1);
    else
        return '';
}

Lavender.StringUtil.isWhitespace = function (character) {
    switch (character) {
        case ' ':
        case '\t':
        case '\r':
        case '\n':
        case '\f':
            return true;

        default:
            return false;
    }
}

Lavender.StringUtil.convertCharCodesToString = function ( codes ) {
    var charArray = codes.split('_');
    var returnValue = new String();
    //this first position in the array is the prefix spi_
    for( var i = 1; i < charArray.length; i++ ){
        returnValue += String.fromCharCode(charArray[i]);
    }
    return returnValue;
}

Lavender.StringUtil.convertStringToCharCodes = function ( string ) {
    var returnValue = new String();
    for( var i = 0; i < string.length; i++ ){
        returnValue += Lavender.StringUtil.fixedCharCodeAt( string, i ) + '_';
    }
    if( returnValue.length > 0 ){
        returnValue = returnValue.substring(0, returnValue.length - 1);//remove the trailing _
    }
    return 'spi_' + returnValue;
}

Lavender.StringUtil.fixedCharCodeAt = function (str, idx) {
    // ex. fixedCharCodeAt ('\uD800\uDC00', 0); // 65536
    // ex. fixedCharCodeAt ('\uD800\uDC00', 1); // false
    idx = idx || 0;
    var code = str.charCodeAt(idx);
    var hi, low;

    // High surrogate (could change last hex to 0xDB7F to treat high
    // private surrogates as single characters)
    if (0xD800 <= code && code <= 0xDBFF) {
        hi = code;
        low = str.charCodeAt(idx+1);
        if (isNaN(low)) {
            throw new Error('Lavender.StringUtil.fixedCharCodeAt: High surrogate not followed by low surrogate in fixedCharCodeAt()');
        }
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
        // We return false to allow loops to skip this iteration since should have
        // already handled high surrogate above in the previous iteration
        return false;
        /*hi = str.charCodeAt(idx-1);
         low = code;
         return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;*/
    }
    return code;
}