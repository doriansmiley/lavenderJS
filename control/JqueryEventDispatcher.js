/**
 * Created by dsmiley on 1/23/14.
 */
/************* Inherit from Lavender.AbstractEventDispatcher*************/
Lavender.JqueryEventDispatcher = function (){
    Lavender.AbstractEventDispatcher.prototype.constructor.call(this);
    this.dispatcher = $(this);
}
Lavender.ObjectUtils.extend(Lavender.AbstractEventDispatcher, Lavender.JqueryEventDispatcher);
Lavender.JqueryEventDispatcher.prototype.addEventListener = function(  event, instance, handler  ){//handler is string
    var proxy = jQuery.proxy( instance[handler], instance )
    this.dispatcher.on(event, proxy );
    Lavender.AbstractEventDispatcher.prototype.addEventListener.call(this, event, instance, handler, proxy );
}

Lavender.JqueryEventDispatcher.prototype.removeEventListener = function(  event, instance, handler  ){//handler is string
    var removedItem = Lavender.AbstractEventDispatcher.prototype.removeEventListener.call(this, event, instance, handler );
    this.dispatcher.off( event, removedItem.proxy );
}

Lavender.JqueryEventDispatcher.prototype.removeAllEventListeners = function(  instance  ){//handler is string
    for( var event in this.handlersByEventName ){
        for( var handlerIndex = this.handlersByEventName[event].length - 1; handlerIndex >= 0; handlerIndex-- ){
            if( this.handlersByEventName[event][handlerIndex].instance == instance ){
                var item = this.handlersByEventName[event][handlerIndex];
                this.dispatcher.off( item.event, item.proxy );
            }
        }
    }
    Lavender.AbstractEventDispatcher.prototype.removeAllEventListeners.call(this, instance );
}

Lavender.JqueryEventDispatcher.prototype.dispatch = function(  event  ){//event is of type JQuery Event
    this.dispatcher.trigger( event );
}
