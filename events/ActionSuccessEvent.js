/**
 * Created by dsmiley on 1/24/14.
 */
Lavender.ActionSuccessEvent = function( eventType, payload ){
    /*
     payload can contain
     message:String;
     subject:String;
     details:String;
     code:int;
     */
    if( payload === null || payload === undefined ){
        throw new Error('Lavender.ActionSuccessEvent: payload is required');
    }
    Lavender.AbstractEvent.prototype.constructor.call(this, eventType, payload);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend( Lavender.AbstractEvent, Lavender.ActionSuccessEvent );

Lavender.ActionSuccessEvent.prototype.clone = function(){
    return new Lavender.ActionSuccessEvent( this.type, this.payload)
}

Lavender.ActionSuccessEvent.SUCCESS = "actionSuccess";