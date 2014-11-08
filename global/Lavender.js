function Lavender(){

}
Lavender.init = function( config, params ){
    Lavender.EventDispatcher = Lavender.EventDispatcherFactory.getInstance().getEventDispatcher( config, params );
    Lavender.Services = Lavender.ServiceFactory.getInstance().getService( config );
    Lavender.ServiceResultParser = Lavender.SerializeFactory.getInstance().getServiceResultParser( config );
    Lavender.ServiceExporter = Lavender.SerializeFactory.getInstance().getServiceExporter( config );
    Lavender.Model = Lavender.ModelLocator.getInstance();
}
