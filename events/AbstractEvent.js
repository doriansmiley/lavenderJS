/**
 * Created by dsmiley on 1/24/14.
 */
Lavender.AbstractEvent = function( eventType, payload ){
    jQuery.Event.call( this, eventType );
    this.payload = payload;
}
//Extend the core jQuery event object.
Lavender.AbstractEvent.prototype = new $.Event( "" );
