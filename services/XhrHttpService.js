/**
 * Created by dsmiley on 2/6/14.
 */
Lavender.XhrHttpService = function ( async, notifyOnProgress ) {
    Lavender.AbstractHttpService.prototype.constructor.call(this);
    this.xhrRequest = null;
    this.loadProxy = this.load.bind(this);
    this.faultProxy = this.fault.bind(this);
    this.progressProxy = this.updateProgress.bind(this);
    this.async = ( async !== null &&  async !== undefined ) ? async : true;
    this.notifyOnProgress = ( notifyOnProgress !== null &&  notifyOnProgress !== undefined ) ? notifyOnProgress : false;
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.AbstractHttpService, Lavender.XhrHttpService);

Lavender.XhrHttpService.prototype.success = function (event) {
    var sucessObj = new Lavender.HttpSuccess(this.xhrRequest.response, this.xhrRequest.statusText, this.requestId);
    if( this.xhrRequest.status != 200 ){
        this.fault(sucessObj);
        return;
    }
    for (var responderIndex = 0; responderIndex < this.responders.length(); responderIndex++) {
        var responder = this.responders.getItemAt(responderIndex);
        responder.success(sucessObj);
    }
    this.destroy();
}

Lavender.XhrHttpService.prototype.fault = function (event) {
    var errorObj = new Lavender.HttpFault(this.xhrRequest, this.xhrRequest.statusText, this.xhrRequest.status, this.requestId);
    for (var responderIndex = 0; responderIndex < this.responders.length(); responderIndex++) {
        var responder = this.responders.getItemAt(responderIndex);
        responder.fault(errorObj);
    }
    this.destroy();
}

Lavender.XhrHttpService.prototype.load = function (event) {
    if( this.notifyOnProgress ){
        for (var responderIndex = 0; responderIndex < this.responders.length(); responderIndex++) {
            var responder = this.responders.getItemAt(responderIndex);
            responder.onProgress( 100, this.requestId );
        }
    }
}

// progress on transfers from the server to the client (downloads)
Lavender.XhrHttpService.prototype.updateProgress = function (oEvent) {
    //oEvent.lengthComputable seems to always be false, this might be because the service is not sending back progress events though
    //so I've commented it our for now
    //if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / ((oEvent.total > 0) ? oEvent.total : oEvent.loaded); //prevent division by zero when !oEvent.lengthComputable
    for (var responderIndex = 0; responderIndex < this.responders.length(); responderIndex++) {
        var responder = this.responders.getItemAt(responderIndex);
        responder.onProgress( percentComplete, this.requestId );
    }
    //}
}

Lavender.XhrHttpService.prototype.send = function ( type, url, data, contentType, dataType, cache ) {
    this.xhrRequest = new XMLHttpRequest();
    this.addEventListeners();
    this.xhrRequest.onreadystatechange = function( event ){
        if( this.xhrRequest.readyState == 4 ){
            this.success(this.xhrRequest.response);
        }
    }.bind(this);
    this.xhrRequest.open( type, url, this.async );
    if( dataType !== null ){
        this.xhrRequest.responseType = dataType;
    }
    if( contentType !== null ){
        this.xhrRequest.setRequestHeader("Content-Type", contentType);
    }
    this.xhrRequest.send( data );

    return Lavender.AbstractHttpService.prototype.send.call(this);
}

Lavender.XhrHttpService.prototype.addEventListeners = function(){
    if( this.notifyOnProgress ){
        this.xhrRequest.addEventListener("progress", this.progressProxy, false);
    }
    this.xhrRequest.addEventListener("load", this.loadProxy, false);
    this.xhrRequest.addEventListener("error", this.faultProxy, false);
}

Lavender.XhrHttpService.prototype.removeEventListeners = function(){
    this.xhrRequest.removeEventListener("load", this.loadProxy, false);
    this.xhrRequest.removeEventListener("error", this.faultProxy, false);
    this.xhrRequest.removeEventListener("progress", this.progressProxy, false);
}

Lavender.XhrHttpService.prototype.abort = function(){
    this.xhrRequest.onreadystatechange = null;
    this.removeEventListeners();
    this.xhrRequest.abort();
    this.destroy();
}

Lavender.XhrHttpService.prototype.destroy = function () {
    this.removeEventListeners();
    this.loadProxy = null;
    this.faultProxy = null;
    this.progressProxy = null;
    this.xhrRequest.onreadystatechange = null;
    this.xhrRequest = null;
    this.requestObj = null;
    Lavender.AbstractHttpService.prototype.destroy.call(this);
}