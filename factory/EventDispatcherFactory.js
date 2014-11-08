/**
 * Created by dsmiley on 11/5/13.
 */
Lavender.EventDispatcherFactory = function(){
    Lavender.Subject.prototype.constructor.call(this);
}

Lavender.ObjectUtils.extend( Lavender.Subject, Lavender.EventDispatcherFactory);

Lavender.EventDispatcherFactory.getInstance = function(){
    if (Lavender.EventDispatcherFactory.instance == null) {
        Lavender.EventDispatcherFactory.instance = new Lavender.EventDispatcherFactory();
    }
    return Lavender.EventDispatcherFactory.instance;
}

Lavender.EventDispatcherFactory.instance;

Lavender.EventDispatcherFactory.prototype.getEventDispatcher = function( config, params ){
    var dispatcher;
    //config.daoCode defaults to jquery
    switch( config.eventDispatcherCode ){
        case "jquery":
            dispatcher = new JqueryEventDispatcher();
            break;
        case "angular":
            dispatcher = new AngularEventDispatcher(params);
            break;
        case "abstract":
        default:
            dispatcher = new Lavender.AbstractEventDispatcher();
    }
    return dispatcher;
}
