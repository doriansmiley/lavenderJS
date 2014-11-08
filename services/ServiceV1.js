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

Lavender.ServiceV1.prototype.clearLayoutNumber = function(layoutNum, instanceId, responder, format, contentType, localRequest, cache){
    instanceId = ( instanceId === null ||  instanceId === undefined ) ? this.config.instanceId : instanceId;
    return this.sendXMLRequest(true, responder, 'clearLayoutNumber', null, [instanceId, layoutNum.toString()], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.createImageAsset = function(bytes, fileName, ownerID, category, responder, format, contentType,  localRequest,  cache) {
    if( bytes.length <= 0 ){
        throw( new Error( 'Byte array is empty' ) );
    }

    var params =
    {
        'fileName'	: fileName,
        'content'	: window.btoa( bytes ),
        'owner'		: ownerID,
        'category'	: category ? category.name : null
    };
    return this.sendXMLRequest(true, responder, 'createImageAsset', params, null, format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.createImageAssetFromURL = function(printUrl, webUrl, thumbUrl, fileName, ownerID, category, responder, format, contentType, localRequest, cache) {
    var params =
    {
        'fileName'	: fileName,
        'uriPath'	: printUrl,
        'owner'		: ownerID,
        'category'	: category ? category.name : null
    };
    return this.sendXMLRequest(true, responder, 'createImageAssetFromURL', params, null, format, contentType, localRequest, cache );
}

Lavender.ServiceV1.prototype.createInstance = function(templateId, variableData, responder, format, contentType, localRequest, cache) {
    var params =
    {
        'template'	: templateId,
        'variables'	: variableData
    };
    if( this.config.ruleCode ) {
        params.ruleCode = this.config.ruleCode;
    }

    return this.sendXMLRequest(true, responder, 'createInstance', params, null, format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.createLayoutNumber = function(layoutID, instanceId, responder, format, contentType,  localRequest,  cache) {
    instanceId = ( instanceId === undefined || instanceId === null ) ? this.config.instanceId : instanceId;
    var params =
    {
        'layout' : layoutID
    };

    return this.sendXMLRequest(true, responder, 'createLayoutNumber', params, [instanceId], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.createSDSession = function(context, userID, password, responder, format, contentType, localRequest, cache) {
    var params =
    {
        'context'	: this.config.context,
        'user'		: this.config.user,
        'password'	: this.config.password
    };

    return this.sendXMLRequest(true, responder, 'createSDSession', params, null, format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.getTemplates = function(responder, format, contentType,  localRequest,  cache)
{
    return this.sendXMLRequest(false, responder, 'getTemplates', null, null, format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.deleteImageAsset = function(assetID, responder, format, contentType,  localRequest,  cache) {
    return this.sendXMLRequest(true, responder, 'deleteImageAsset', null, [assetID], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.hideShowImageAsset = function(assetID, visible, responder, format, contentType, localRequest, cache) {
    var params =
    {
        'visible'	: visible
    };
    return this.sendXMLRequest(true, responder, 'hideImageAsset', params, [assetID], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.deleteLayoutNumber = function(layoutNum, instanceId, responder, format, contentType,  localRequest,  cache) {
    instanceId = ( instanceId === undefined || instanceId === null ) ? this.config.instanceId : instanceId;
    return this.sendXMLRequest(true, responder, 'deleteLayoutNumber', null, [instanceId, layoutNum.toString()], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.deleteSDSession = function(sdSessionID, responder, format, contentType,  localRequest,  cache) {
    return this.sendXMLRequest(true, responder, 'deleteSDSession', null, null, format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.fillAssets = function(imagesXML, instanceId, responder, format, contentType,  localRequest,  cache) {
    instanceId = ( instanceId === undefined || instanceId === null ) ? this.config.instanceId : instanceId;
    var params =
    {
        'content'	: imagesXML
    };
    return this.sendXMLRequest(true, responder, 'fillAssets', params, [instanceId], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.fillVariableData = function(variableData, instanceId, responder, format, contentType,  localRequest,  cache) {
    instanceId = ( instanceId === undefined || instanceId === null ) ? this.config.instanceId : instanceId;
    var params =
    {
        'content'	: this.getVariableDataXML(variableData)
    };
    return this.sendXMLRequest(true, responder, 'fillVariableData', params, [instanceId], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.generatePDF = function( instanceId, sessionId, responder, format, contentType,  localRequest,  cache) {
    var url = ( localRequest == true ) ? this.config.getURL('generatePDF') : this.config.baseUrlWithSessionID;
    window.open( url + "instance/" + instanceId + "/output/pdf/?random="+ Math.random() );
}

Lavender.ServiceV1.prototype.generateThumbnail = function(layoutNum, instanceId, responder, format, contentType,  localRequest,  cache) {
    instanceId = ( instanceId === undefined || instanceId === null ) ? this.config.instanceId : instanceId;
    //TODO Auto-generated method stub
    return null;
}

Lavender.ServiceV1.prototype.getContext = function(contextID, responder, format, contentType,  localRequest,  cache) {
    return this.sendXMLRequest(false, responder, 'getContext', null, [contextID], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.getImageAsset = function(assetID, responder, format, contentType,  localRequest,  cache) {
    return this.sendXMLRequest(false, responder, 'getImageAsset', null, [assetID], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.getLayoutNumber = function(layoutNum, instanceId, responder, format, contentType,  localRequest,  cache) {
    instanceId = ( instanceId === undefined || instanceId === null ) ? config.instanceId : instanceId;
    return this.sendXMLRequest(false, responder, 'getLayoutNumber', null, [instanceId, layoutNum.toString()], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.readImageAssets = function(owner, spiVar, responder, format, contentType,  localRequest,  cache){
    var params =
    {
        'owner'	: owner,
        'visible': true, //this is to filter images deleted by the user
        'spi_var' : ( spiVar !== null && spiVar !== undefined ) ? spiVar.value : null
    };
    return this.sendXMLRequest(true, responder, 'readImageAssets', params, null, format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.getInstance = function(instanceId, responder, format, contentType,  localRequest,  cache) {
    return this.sendXMLRequest(false, responder, 'getInstance', null, [instanceId], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.getSDSession = function(sdSessionID, responder, format, contentType,  localRequest,  cache) {
    return this.sendXMLRequest(false, responder, 'getSDSession', null, [sdSessionID], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.imageAssetOutput = function(assetID, outputDefinition, responder, format, contentType,  localRequest,  cache) {
    return this.sendXMLRequest(false, responder, 'imageAssetOutput', null, [assetID, outputDefinition], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.insertLayout = function(layoutNum, count, layoutID, instanceId, responder, format, contentType,  localRequest,  cache) {
    instanceId = ( instanceId === undefined || instanceId === null ) ? this.config.instanceId : instanceId;
    // TODO Should we allow for a default layoutID to be the current one?
    var params =
    {
        'layoutNumber'	: layoutNum.toString(),
        'layout'		: layoutID,
        'count'			: count.toString()
    };
    return this.sendXMLRequest(true, responder, 'insertLayout', params, [instanceId], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.instanceOutput = function(outputDefinition, instanceId, responder, format, contentType,  localRequest,  cache) {
    instanceId = ( instanceId === undefined || instanceId === null ) ? this.config.instanceId : instanceId;
    //TODO Auto-generated method stub
    return null;
}

Lavender.ServiceV1.prototype.layoutNumberOutput = function(layoutNum, outputDefinition, instanceId, responder, format, contentType,  localRequest,  cache) {
    // This is handled in LoadLayoutOutputAction as it requires separate URLLoader for getting binary data from the server
    return null;
}

Lavender.ServiceV1.prototype.moveLayout = function(layoutNum, newLayoutNum, instanceId, responder, format, contentType,  localRequest,  cache) {
    instanceId = ( instanceId === undefined || instanceId === null ) ? this.config.instanceId : instanceId;
    var params =
    {
        'layoutNumber'		: layoutNum.toString(),
        'newLayoutNumber'	: newLayoutNum.toString()
    };
    return this.sendXMLRequest(true, responder, 'moveLayout', params, [instanceId], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.replaceLayoutNumber = function(layoutNum, layoutID, instanceId, responder, format, contentType,  localRequest,  cache) {
    instanceId = ( instanceId === undefined || instanceId === null ) ? this.config.instanceId : instanceId;
    var params =
    {
        'layout' : layoutID
    };
    return this.sendXMLRequest(true, responder, 'replaceLayoutNumber', params, [instanceId, layoutNum.toString()], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.replaceTemplate = function(templateId, instanceId, responder, format, contentType,  localRequest,  cache) {
    instanceId = ( instanceId === undefined || instanceId === null ) ? this.config.instanceId : instanceId;
    var params =
    {
        'template' : templateId
    };
    return this.sendXMLRequest(true, responder, 'replaceTemplate', params, [instanceId], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.resetLayoutNumber = function(layoutNum, instanceId, responder, format, contentType,  localRequest,  cache) {
    instanceId = ( instanceId === undefined || instanceId === null ) ? this.config.instanceId : instanceId;
    return this.sendXMLRequest(true, responder, 'resetLayoutNumber', null, [instanceId, layoutNum.toString()], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.swapLayout = function(layoutNumX, layoutNumY, instanceId, responder, format, contentType,  localRequest,  cache) {
    instanceId = ( instanceId === undefined || instanceId === null ) ? this.config.instanceId : instanceId;
    var params =
    {
        'layoutNumberX'	: layoutNumX.toString(),
        'layoutNumberY'	: layoutNumY.toString()
    };
    return this.sendXMLRequest(true, responder, 'swapLayout', params, [instanceId], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.updateImageAsset = function(bytes, assetID, responder, format, contentType,  localRequest,  cache) {
    //TODO Auto-generated method stub
    return null;
}

Lavender.ServiceV1.prototype.updateLayoutNumber = function(layoutNum, output, instanceId, responder, format, contentType,  localRequest, cache) {
    instanceId = ( instanceId === undefined || instanceId === null ) ? this.config.instanceId : instanceId;
    var params =
    {
        'content' : output
    };
    return this.sendXMLRequest(true, responder, 'updateLayoutNumber', params, [instanceId, layoutNum.toString()], format, contentType, localRequest, cache);
}

Lavender.ServiceV1.prototype.loadColorThemes = function(responder, format, contentType,  localRequest, cache)
{
    return null;
    //this operation is not implemented yet on silpub
//			var documentID:String = model.state.documentID;
//			return sendXMLRequest(true, responder, "loadColorThemes", null, null, format, contentType,  localRequest,  cache);
}

Lavender.ServiceV1.prototype.loadSwatches = function(responder, format, contentType,  localRequest, cache)
{
    return null;
    //this operation seems to be having issues on silpub. At the moment it just return a guid in the result. I thought it used to be working.
//			var documentID:String = model.state.documentID;
//			return sendXMLRequest(true, responder, "loadSwatches", null, null, format, contentType,  localRequest,  cache);
}

Lavender.ServiceV1.prototype.loadFontAssets = function( responder, format, contentType,  localRequest,  cache )
{
    return null;
}

Lavender.ServiceV1.prototype.loadGlobalFontMap = function(responder, format, contentType, localRequest, cache)
{
    return this.sendRequest(true, responder, this.config.globalFontMapPath, null, format, contentType, cache);
}

// Typical request should be sent via this method, sendRequest() is only used for custom requests
Lavender.ServiceV1.prototype.sendXMLRequest = function(isPostRequest, responder, urlKey, paramObj, urlParams, format, contentType, localRequest, cache, externalApiUrl)
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

    var url = null;

    if( externalApiUrl !== null && externalApiUrl !== undefined ){
        //Important: this is a special case which allows us to proxy external API requests during testing
        url = ( localRequest == true ) ? this.config.getExternalApiProxyUrl(externalApiUrl) : externalApiUrl;
    }else{
        var getURLFunc = ( localRequest == true ) ? this.config.getURL : this.config.getAbsoluteURL;
        var getURLWithParamsFunc = ( localRequest == true ) ? this.config.getURLWithParams : this.config.getAbsoluteURLWithParams;
        // If cache == false, core adds random string to the url: http://dev.silpub.com/session/jksdhkjh/layoutnumber/1?_34767664
        // It causes server issues. To prevent them we have to add '/' to the end, like this: http://dev.silpub.com/session/jksdhkjh/layoutnumber/1/?_34767664
        url = (( urlParams !== null &&  urlParams !== undefined ) ? getURLWithParamsFunc.call(this.config, urlKey, urlParams) : getURLFunc.call(this.config, urlKey)) + '/';
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
