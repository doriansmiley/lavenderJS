/**
 * Created by dsmiley on 11/5/13.
 */

Lavender.ServiceFactory = function(){

}

Lavender.ServiceFactory.getInstance = function(){
    if (Lavender.ServiceFactory.instance == null) {
        Lavender.ServiceFactory.instance = new Lavender.ServiceFactory();
    }
    return Lavender.ServiceFactory.instance;
}

Lavender.ServiceFactory.instance;

Lavender.ServiceFactory.prototype.getService = function( config ){
    var dao;
    switch( config.daoCode ){
        case "1.0":
        case '1.1':
        case "2.50.4878.21250":
        default:
            dao = new Lavender.ServiceV1( config );
    }
    return dao;
}
