/**
 * Created by dsmiley on 2/6/14.
 */
Lavender.AbstractHttpService = function(){
    this.responders = new Lavender.ArrayList();
    this.requestId = undefined;
}

Lavender.AbstractHttpService.prototype.addResponder = function( responder ){
    if( responder.fault === null || responder.fault ===undefined || responder.success === null || responder.success === undefined ){
        throw new Error('responder must define fault and success methods');
    }
    this.responders.addItem(responder);
}

//Abstract method, must be overriden by subclass
Lavender.AbstractHttpService.prototype.success = function( result ){
    //introspect the result for the result flag
}

//Abstract method, must be overriden by subclass
Lavender.AbstractHttpService.prototype.fault = function( fault ){

}

//Abstract method, must be overriden by subclass
Lavender.AbstractHttpService.prototype.send = function( requestObject ){
    this.requestId = Math.random();
    return this.requestId;
}

//Abstract method, must be overriden by subclass
Lavender.AbstractHttpService.prototype.destroy = function(){
    this.responders.clear();
    this.responders = null;
}