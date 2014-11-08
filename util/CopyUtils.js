/**
 * Created by dsmiley on 1/13/14.
 */
Lavender.CopyUtils = function(){

}

//overrites child values with parent values when child value is null or undefined
Lavender.CopyUtils.copyInhertiedValues = function ( child, parent ){
    for (var prop in parent ) {
        if( child.hasOwnProperty(prop) && ( child[prop] === undefined || child[prop] === null || child[prop] === ''|| child[prop] === NaN ) ){
            child[prop] = parent[prop];
        }
    };
}

//overrites child values with parent values
Lavender.CopyUtils.overwriteValues = function ( child, parent, excludeObjects ){
    if( excludeObjects == null || excludeObjects == undefined ){
        excludeObjects = {};//this is an optional param, set to default value if not defined
    }
    for (var prop in parent ) {
        if( child.hasOwnProperty(prop) ){ //As of jQuery 1.6, the .attr() method returns undefined for attributes that have not been set. null means it does not exist
            var value = ( excludeObjects.hasOwnProperty(prop) ) ? child[prop] : parent[prop];
            child[prop] = value;
        }
    }
}

Lavender.CopyUtils.concatObjects = function(){
    var ret = {};
    var len = arguments.length;
    for (var i=0; i<len; i++) {
        for (var p in arguments[i]) {
            if (arguments[i].hasOwnProperty(p)) {
                ret[p] = arguments[i][p];
            }
        }
    }
    return ret;
}
Lavender.CopyUtils.copyProperties = function ( target, source ){
    for (var prop in source ) {
        if (typeof source[prop] !== 'function') {
            target[prop] = source[prop];
        }
    };
}
