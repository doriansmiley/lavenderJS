/**
 * Created by dsmiley on 11/5/13.
 * Define stub methods and signatures
 * user generic built in ajax support
 */
Lavender.ServiceV1 = function( config ){
    var _config;//IContextConfigModel
    
    Lavender.Subject.prototype.constructor.call(this);
    this.config = config;
}
Lavender.ObjectUtils.extend( Lavender.Subject, Lavender.ServiceV1);

Lavender.ServiceV1.prototype.createSDSession = function(context, userID, password, url, responder, format, contentType, localRequest, cache) {
    var params =
    {
        'context'	: this.config.context,
        'user'		: this.config.user,
        'password'	: this.config.password
    };

    return this.sendXMLRequest(true, responder, url, params, null, format, contentType, localRequest, cache);
}

// Typical request should be sent via this method, sendRequest() is only used for custom requests
Lavender.ServiceV1.prototype.sendXMLRequest = function(isPostRequest, responder, url, paramObj, urlParams, format, contentType, localRequest, cache, externalApiUrl)
{
    var paramsXML = null;

    if (paramObj && isPostRequest)
    {
        paramsXML = '<request>';
        for (var key in paramObj)
        {
            if(paramObj[key] === null || paramObj[key] === undefined ){
                continue;
            }
            paramsXML += '<'+key+'>';
            paramsXML += paramObj[key];
            paramsXML += '</'+key+'>';
        }
        paramsXML += '</request>';
    }

    return this.sendRequest(isPostRequest, responder, url, paramsXML, format, contentType, cache);
}


Lavender.ServiceV1.prototype.sendRequest = function( isPostRequest, responder, url, params, dataType, contentType, cache )
{
    if( cache === null || cache === undefined ){
        cache = false;
    }
    if( contentType === null || contentType === undefined ){
        contentType = 'text/xml'
    }
    if( dataType === null || dataType === undefined ){
        dataType = 'xml'
    }
    var httpRequestInstance = Lavender.HttpServiceFactory.getInstance().getHttpService(this.config);
    httpRequestInstance.addResponder(responder);
    var requestType = (isPostRequest) ? 'POST' : 'GET';
    return httpRequestInstance.send(requestType, url, params, contentType, dataType, cache);

}
