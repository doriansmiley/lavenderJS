/**
 * Created by dsmiley on 1/24/14.
 */
Lavender.CollectionEvent = function( eventType, payload ){
    /*
     payload can contain
     nothing
     */
     //Important, because we have to set the AbstractEvent prototype to a new jQuery even instance we can't use prototype.constructor.call as it will call the $.Event constructor.
     Lavender.AbstractEvent.call(this, eventType, payload);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend( Lavender.AbstractEvent, Lavender.CollectionEvent );

Lavender.CollectionEvent.prototype.clone = function(){
    return new Lavender.CollectionEvent( this.type, this.payload)
}

Lavender.CollectionEvent.COLLECTION_CHANGE = 'collectionChange';