/**
 * Created by dsmiley on 2/10/14.
 */
Lavender.HttpServiceFactory = function(){

}

Lavender.HttpServiceFactory.getInstance = function(){
    if (Lavender.HttpServiceFactory.instance == null) {
        Lavender.HttpServiceFactory.instance = new Lavender.HttpServiceFactory();
    }
    return Lavender.HttpServiceFactory.instance;
}

Lavender.HttpServiceFactory.instance;

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
