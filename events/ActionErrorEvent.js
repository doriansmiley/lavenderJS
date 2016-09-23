/**
 * Created by dsmiley on 1/24/14.
 */
Lavender.ActionErrorEvent = function( eventType, payload ){
    /*
     payload can contain
     message:String;
     subject:String;
     details:String;
     code:int;
     */
    if( payload.message === null || payload.message === undefined ){
        throw new Error('Lavender.ActionErrorEvent: payload.message is required');
    }
    Lavender.AbstractEvent.prototype.constructor.call(this, eventType, payload);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend( Lavender.AbstractEvent, Lavender.ActionErrorEvent );

Lavender.ActionErrorEvent.prototype.clone = function(){
    return new Lavender.ActionErrorEvent( this.type, this.payload)
}

Lavender.ActionErrorEvent.ERROR = "actionError";