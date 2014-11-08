/**
 * Created by dsmiley on 2/6/14.
 */
Lavender.HttpFault = function( errorObj, status, message, requestId ){
    if( errorObj === null || errorObj === undefined ){
        throw new Error('errorObj is required');
    }
    if( status === null || status === undefined ){
        throw new Error('status is required');
    }
    if( message === null || message === undefined ){
        throw new Error('message is required');
    }
    this.errorObj = errorObj;
    this.status = status;
    this.message = message;
    this.requestId = requestId;
}