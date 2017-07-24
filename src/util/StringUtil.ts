export class StringUtil {
	public static substitute(str: string, rest: any[]): string {
		if (str === null) {
	        return '';
	    }

	    // Replace all of the parameters in the msg string.
	    let len = rest.length;
	    let args = [];
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
	}
	
	public static compressSpaces(str: string): string {
		return str.replace(/[\s\r\t\n]+/gm,' ');
	}
	
	public static trim(str: string): string {
		if (str == null) return '';

	    let startIndex = 0;
	    while (StringUtil.isWhitespace(str.charAt(startIndex)))
	        ++startIndex;

	    let endIndex = str.length - 1;
	    while (StringUtil.isWhitespace(str.charAt(endIndex)))
	        --endIndex;

	    if (endIndex >= startIndex)
	        return str.slice(startIndex, endIndex + 1);
	    else
	        return '';
	}
	
	public static isWhitespace(character: string): boolean {
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
	
	public static convertCharCodesToString(codes: string): String {
		let charArray = codes.split('_');
	    let returnValue = new String();
	    //this first position in the array is the prefix spi_
	    for( let i = 1; i < charArray.length; i++ ){
	        returnValue += String.fromCharCode(parseInt(charArray[i], 10));
	    }
	    return returnValue;
	}
	
	public static fixedCharCodeAt(str: string, idx: number) {
		// ex. fixedCharCodeAt ('\uD800\uDC00', 0); // 65536
	    // ex. fixedCharCodeAt ('\uD800\uDC00', 1); // false
	    idx = idx || 0;
	    let code = str.charCodeAt(idx);
	    let hi, low;

	    // High surrogate (could change last hex to 0xDB7F to treat high
	    // private surrogates as single characters)
	    if (0xD800 <= code && code <= 0xDBFF) {
	        hi = code;
	        low = str.charCodeAt(idx+1);
	        if (isNaN(low)) {
	            throw new Error('StringUtil.fixedCharCodeAt: High surrogate not followed by low surrogate in fixedCharCodeAt()');
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
}