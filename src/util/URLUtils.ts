/**
 * Created by dsmiley on 7/11/17.
 */
export class URLUtils{
    constructor(){

    }

    public static getQuerystring(location:string, key:string, defaultValue:any):any{
        key = key.toLowerCase();
        if ( defaultValue===null || defaultValue===undefined){
            defaultValue='';
        }
        key = key.replace(/[\[]/,'\\\[').replace(/[\]]/,'\\\]');
        var regex = new RegExp('[\\?&]'+key+'=([^&#]*)');
        var qs = regex.exec(location.toLowerCase());//usually window.location.href.toLowerCase()
        if(qs == null){
            return defaultValue;
        }else{
            return qs[1];
        }
    }
}