/**
 * Created by dsmiley on 2/10/14.
 */
Lavender.HttpServiceFactory = function(){
    if (Lavender.HttpServiceFactory.instance != null) {
        throw( 'Lavender.EventDispatcherFactory.instance: Singleton class has already been instantiated' );
    } else {
        //perform any required object set up
    }
}

Lavender.HttpServiceFactory.getInstance = function(){
    if (Lavender.HttpServiceFactory.instance == null) {
        Lavender.HttpServiceFactory.instance = new Lavender.HttpServiceFactory();
    }
    return Lavender.HttpServiceFactory.instance;
}

Lavender.HttpServiceFactory.instance = null;

Lavender.HttpServiceFactory.prototype.getHttpService = function( config ){
    var httpService;
    switch( config.httpServiceCode ){
        case "angular":
            httpService = new Lavender.AngularHttpService();
            break;
        case "jquery":
        default:
            httpService = new Lavender.JqueryHttpService();
            break;
    }
    return httpService;
}
