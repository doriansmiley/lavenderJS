/**
 * Created by dsmiley on 2/6/14.
 */
Lavender.HttpSuccess = function( resultObj, status, requestId ){
    if( resultObj === null || resultObj === undefined ){
        throw new Error('resultObj is required');
    }
    if( status === null || status === undefined ){
        throw new Error('status is required');
    }
    this.resultObj = resultObj;
    this.status = status;
    this.requestId = requestId;
}