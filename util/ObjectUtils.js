/**
 * Created by dsmiley on 11/4/13.
 * @class
 */
Lavender.ObjectUtils = function(){

}
Lavender.ObjectUtils.extend = function(base, sub) {
    // Avoid instantiating the base class just to setup inheritance
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
    sub.prototype = Object.create(base.prototype);
    // Remember the constructor property was set wrong, let's fix it
    sub.prototype.constructor = sub;
}
Lavender.ObjectUtils.mixin = function(base, sub, subInstance, overwriteInstanceVariables) {
    if( overwriteInstanceVariables === null || overwriteInstanceVariables === undefined ){
        overwriteInstanceVariables = false;
    }
    var objectToExtend = new base();
    //Grab methods and properties defined through prototypal inheritance
    for (var prop in base.prototype) {
        if (base.prototype.hasOwnProperty(prop)) {
            sub.prototype[prop] = base.prototype[prop];
        }
    }
    //grab instance variables and function
    for (var prop in objectToExtend) {
        if (objectToExtend.hasOwnProperty(prop)) {
            //if an object defines an instance variable or function we don't want to overwrite it unless specified
            if( subInstance[prop] !== null && subInstance[prop] !== undefined && !overwriteInstanceVariables ){
                continue;
            }
            subInstance[prop] = objectToExtend[prop];
        }
    }
    return subInstance;
}

Lavender.ObjectUtils.hasFunction = function(obj, prop) {
    return (obj && typeof obj[prop] === 'function');
}

Lavender.ObjectUtils.copy = function(obj) {
    return jQuery.extend(true, {}, obj);
}

Lavender.ObjectUtils.getBooleanAttr = function(elem, attr) {
    var value = elem.attr(attr);

    if (value == null || value == undefined) {
        return value;
    }

    return Boolean((elem.attr(attr) == 'true' ) ? true : false);
}

Lavender.ObjectUtils.plugInJQuery = function( $, pluginName, functionConstructor){
    //IMPORTANT: This function needs to be altered to protect the jQuery namespace at some point
    //add aurgument validation
    //register the object as a jQuery plugin
    $.fn[pluginName] = function( options ){
        var jQueryInstance = this;//this is used to expose plugin functions on the jQuery instance
        return this.each(function() {
            new functionConstructor(this, options, jQueryInstance);
        });
    }
    $.fn[pluginName].Constructor = functionConstructor;
    $[functionConstructor] = functionConstructor;
}

Lavender.ObjectUtils.isPropDefined = function(obj, prop) {
    if (obj && obj.hasOwnProperty(prop) && obj[prop] != undefined && obj[prop] != null && obj[prop] != NaN) {
        return true;
    }

    return false;
}
