/**
 * Created by dsmiley on 1/23/14.
 * IMPORTANT: THIS CLASS IS NOT TESTED. I'm not sure how to build the unti test yet.
 */
/************* Inherit from Lavender.AbstractEventDispatcher*************/
Lavender.AngularEventDispatcher = function(rootScope){
    Lavender.AbstractEventDispatcher.prototype.constructor.call(this);
    this.dispatcher = rootScope;//we use broadcast so be sure to pass $rootScope
}
Lavender.ObjectUtils.extend(Lavender.AbstractEventDispatcher, Lavender.AngularEventDispatcher);
Lavender.AngularEventDispatcher.prototype.addEventListener = function(  event, instance, handler  ){//handler is string, event is string
    var proxy = jQuery.proxy( instance[handler], instance )
    var removeListenerFunction = this.dispatcher.$on(event, proxy );//Angular sends back a remove listener function in the call to $on
    Lavender.AbstractEventDispatcher.prototype.addEventListener.call(this, event, instance, handler, proxy, removeListenerFunction );
}

Lavender.AngularEventDispatcher.prototype.removeEventListener = function(  event, instance, handler  ){//handler is string
    var removedItem = Lavender.AbstractEventDispatcher.prototype.removeEventListener.call(this, event, instance, handler );
    removedItem.removeListenerFunction();
}

Lavender.AngularEventDispatcher.prototype.removeAllEventListeners = function(  instance  ){//handler is string
    for( var event in this.handlersByEventName ){
        for( var handlerIndex = this.handlersByEventName[event].length - 1; handlerIndex >= 0; handlerIndex-- ){
            if( this.handlersByEventName[event][handlerIndex].instance == instance ){
                var item = this.handlersByEventName[event][handlerIndex];
                item.removeListenerFunction();
            }
        }
    }
    Lavender.AbstractEventDispatcher.prototype.removeAllEventListeners.call(this, instance );
}

Lavender.AngularEventDispatcher.prototype.dispatch = function(  event  ){//event is of type JQuery Event
    this.dispatcher.$broadcast( event.type, event );
}
