/**
 * Created by dsmiley on 5/18/17.
 */

export class BrowserInfo {
    public browser:string;
    public version:string;

    constructor(browser?:string, version?:string) {
        this.browser = browser;
        this.version = version;
    }
}

export class BrowserUtils {
    static uaMatch(ua):BrowserInfo {
        ua = ua.toLowerCase();
        let match = /(ipad).*(?:safari)[ \/]([\w.]+)/.exec( ua ) ||
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

        let browser = match[1] || "";
        let version = match[2] || "0";
        return new BrowserInfo(browser, version);
    }

    static getBrowser():BrowserInfo {
        let returnValue:BrowserInfo = new BrowserInfo('nodeJS', 'nodeJS')
        try{
            if(navigator){
                returnValue = BrowserUtils.uaMatch(navigator.userAgent);
            }
        }catch(e){
            console.log(e.stack);
        }
        return returnValue;
    }
}