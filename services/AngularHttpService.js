/**
 * Created by dsmiley on 2/6/14.
 */
Lavender.AngularHttpService = function(){
    Lavender.AbstractHttpService.prototype.constructor.call(this);
    var $injector = angular.injector(['ng']);
    this.http = $injector.get('$http');
    /*
     method – {string} – HTTP method (e.g. 'GET', 'POST', etc)
     url – {string} – Absolute or relative URL of the resource that is being requested.
     params – {Object.<string|Object>} – Map of strings or objects which will be turned to ?key1=value1&key2=value2 after the url. If the value is not a string, it will be JSONified.
     data – {string|Object} – Data to be sent as the request message data.
     headers – {Object} – Map of strings or functions which return strings representing HTTP headers to send to the server. If the return value of a function is null, the header will not be sent.
     xsrfHeaderName – {string} – Name of HTTP header to populate with the XSRF token.
     xsrfCookieName – {string} – Name of cookie containing the XSRF token.
     transformRequest – {function(data, headersGetter)|Array.<function(data, headersGetter)>} – transform function or an array of such functions. The transform function takes the http request body and headers and returns its transformed (typically serialized) version.
     transformResponse – {function(data, headersGetter)|Array.<function(data, headersGetter)>} – transform function or an array of such functions. The transform function takes the http response body and headers and returns its transformed (typically deserialized) version.
     cache – {boolean|Cache} – If true, a default $http cache will be used to cache the GET request, otherwise if a cache instance built with $cacheFactory, this cache will be used for caching.
     timeout – {number|Promise} – timeout in milliseconds, or promise that should abort the request when resolved.
     withCredentials - {boolean} - whether to to set the withCredentials flag on the XHR object. See requests with credentials for more information.
     responseType - {string} - see requestType.
     */
    this.requestObject = {
        method: undefined,
        url: undefined,
        params: undefined,
        data: undefined,
        headers: undefined,
        xsrfHeaderName: undefined,
        xsrfCookieName: undefined,
        transformRequest: undefined,
        cache: false,
        timeout: 60000,
        withCredentials: false,
        responseType: undefined
    };
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.AbstractHttpService, Lavender.AngularHttpService);

//Abstract method, must be overriden by subclass
Lavender.AngularHttpService.prototype.success = function( data, status, headers, config ){
    //introspect the result for the result flag
    var resultStatus = angular.element(data).find('result').attr('status');
    //Our services typically do not send back response code on anything other than 200, even when an error occurs. So we have to test for that here
    if (resultStatus != '0') {
        this.fault(data, status, 'An error occured on the server');
        return;
    }
    var sucessObj = new Lavender.HttpSuccess(angular.element(data), status, this.requestId);
    for (var responderIndex = 0; responderIndex < this.responders.length(); responderIndex++) {
        var responder = this.responders.getItemAt(responderIndex);
        responder.success(sucessObj);
    }

}

//Abstract method, must be overriden by subclass
Lavender.AngularHttpService.prototype.fault = function( data, status, headers, config ){
    if( status === null || status === undefined ){
        status = '500';//status comes back null when OPTIONS requests are made and fail
    }
    var errorObj = new Lavender.HttpFault(angular.element(data), status, 'An Error Occured', this.requestId );
    for (var responderIndex = 0; responderIndex < this.responders.length(); responderIndex++) {
        var responder = this.responders.getItemAt(responderIndex);
        responder.fault(errorObj);
    }
}

//Abstract method, must be overriden by subclass
Lavender.AngularHttpService.prototype.send = function( type, url, data, contentType, dataType, cache ){
    this.requestObject.method = type;
    this.requestObject.url = url;
    this.requestObject.data = data;
    this.requestObject.responseType = contentType;
    this.requestObject.cache = cache;
    this.http(this.requestObject).
        success(angular.bind(this, this.success )).
        error(angular.bind(this, this.fault ));
    return Lavender.AbstractHttpService.prototype.send.call(this);
}

//Abstract method, must be overriden by subclass
Lavender.AngularHttpService.prototype.destroy = function(){
    Lavender.AbstractHttpService.prototype.destroy.call(this);
}