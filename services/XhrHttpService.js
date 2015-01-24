/**
 * Created by dsmiley on 2/6/14.
 */
Lavender.XhrHttpService = function ( async, notifyOnProgress ) {
    Lavender.AbstractHttpService.prototype.constructor.call(this);
    this.xhrRequest = null;
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
}

Lavender.XhrHttpService.prototype.fault = function (event) {
    var errorObj = new Lavender.HttpFault(this.xhrRequest, this.xhrRequest.statusText, this.xhrRequest.status, this.requestId);
    for (var responderIndex = 0; responderIndex < this.responders.length(); responderIndex++) {
        var responder = this.responders.getItemAt(responderIndex);
        responder.fault(errorObj);
    }
}

// progress on transfers from the server to the client (downloads)
Lavender.XhrHttpService.prototype.updateProgress = function (oEvent) {
    if (oEvent.lengthComputable) {
        var percentComplete = oEvent.loaded / oEvent.total;
        for (var responderIndex = 0; responderIndex < this.responders.length(); responderIndex++) {
            var responder = this.responders.getItemAt(responderIndex);
            responder.onProgress( percentComplete, this.requestId );
        }
    }
}

Lavender.XhrHttpService.prototype.send = function ( type, url, data, contentType, dataType, cache ) {
    this.xhrRequest = new XMLHttpRequest();

    if( this.notifyOnProgress ){
        this.xhrRequest.addEventListener("progress", this.updateProgress, false);
    }
    this.xhrRequest.addEventListener("load", this.success.bind(this), false);
    this.xhrRequest.addEventListener("error", this.fault.bind(this), false);
    this.xhrRequest.addEventListener("abort", this.fault.bind(this), false);
    this.xhrRequest.open( type, url, this.async );
    this.xhrRequest.responseType = dataType;
    this.xhrRequest.setRequestHeader("Content-Type", contentType);
    this.xhrRequest.send( data );

    return Lavender.AbstractHttpService.prototype.send.call(this);
}

Lavender.XhrHttpService.prototype.destroy = function () {
    this.requestObj = null;
    Lavender.AbstractHttpService.prototype.destroy.call(this);
}