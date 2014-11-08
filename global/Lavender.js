function Lavender(){

}
Lavender.init = function( config, params ){
    Lavender.EventDispatcher = Lavender.EventDispatcherFactory.getInstance().getEventDispatcher( config, params );
    Lavender.Services = Lavender.ServiceFactory.getInstance().getService( config );
    Lavender.Model = Lavender.ModelLocator.getInstance();
}
