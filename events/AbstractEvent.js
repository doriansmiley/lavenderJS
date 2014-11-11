/**
 * Created by dsmiley on 1/24/14.
 * we should support cancellable and bubbles at some point
 */
Lavender.AbstractEvent = function( eventType, payload ){
    this.type = eventType;
    this.payload = payload;
}
