/**
 * Created by dsmiley on 2/6/14.
 */
Lavender.JqueryHttpService = function () {
    Lavender.AbstractHttpService.prototype.constructor.call(this);
    this.requestObj = {
        type: undefined,
        url: undefined,
        data: undefined,
        contentType: undefined,
        dataType: undefined,
        cache: false,
        error: this.fault,
        success: this.success,
        context: this
    };

}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.AbstractHttpService, Lavender.JqueryHttpService);

Lavender.JqueryHttpService.prototype.success = function (data, textStatus, jqXHR) {
    //introspect the result for the result flag
    var resultStatus = $(data).find('result').attr('status');
    //Our services typically do not send back response code on anything other than 200, even when an error occurs. So we have to test for that here
    if (resultStatus != '0') {
        this.fault(data, textStatus, 'An error occured on the server');
        return;
    }
    var sucessObj = new Lavender.HttpSuccess(data, textStatus, this.requestId);
    for (var responderIndex = 0; responderIndex < this.responders.length(); responderIndex++) {
        var responder = this.responders.getItemAt(responderIndex);
        responder.success(sucessObj);
    }
}

Lavender.JqueryHttpService.prototype.fault = function (jqXHR, textStatus, errorThrown) {
    var errorObj = new Lavender.HttpFault(jqXHR, textStatus, errorThrown, this.requestId);
    for (var responderIndex = 0; responderIndex < this.responders.length(); responderIndex++) {
        var responder = this.responders.getItemAt(responderIndex);
        responder.fault(errorObj);
    }
}

Lavender.JqueryHttpService.prototype.send = function ( type, url, data, contentType, dataType, cache ) {
    this.requestObj.type = type;
    this.requestObj.url = url;
    this.requestObj.data = data;
    this.requestObj.contentType = contentType;
    this.requestObj.dataType = dataType;
    this.requestObj.cache = cache;
    $.ajax(this.requestObj);
    return Lavender.AbstractHttpService.prototype.send.call(this);
}

Lavender.JqueryHttpService.prototype.destroy = function () {
    this.requestObj = null;
    Lavender.AbstractHttpService.prototype.destroy.call(this);
}