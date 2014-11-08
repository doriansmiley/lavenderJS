/**
 * Created by dsmiley on 2/13/14.
 */
Lavender.URLUtils = function () {

}

Lavender.URLUtils.getQuerystring = function(location, key, defaultValue) {
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