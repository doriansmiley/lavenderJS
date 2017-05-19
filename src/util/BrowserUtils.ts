/**
 * Created by dsmiley on 5/18/17.
 */

export class BrowserInfo {
    public browser:string;
    public version:string;

    constructor(browser, version) {
        this.browser = browser;
        this.version = version;
    }
}

export class BrowserUtils {
    static uaMatch(ua):BrowserInfo {
        ua = ua.toLowerCase();
        let match = /(ipad).*(?:safari)[ \/]([\w.]+)/.exec(ua) ||
            /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(safari)[ \/]([\w.]+)/.exec(ua) ||
            /(firefox)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];
        let browser = match[1] || "";
        let version = match[2] || "0";
        return new BrowserInfo(browser, version);
    }

    static getBrowser():BrowserInfo {
        return BrowserUtils.uaMatch(navigator.userAgent);
    }
}