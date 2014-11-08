/**
 * Created by dsmiley on 1/10/14.
 */
Lavender.SerializeFactory = function(){

}

/*
* Stub for override, this method is just an example of how this factory can be used
* */
Lavender.SerializeFactory.prototype.getServiceResultParser = function(config)
{
    var parser;
    switch( config.parserCode ){
        case 'local':
        case 'remote':
        default:
            parser = {};
            break;
    }
    return parser;
}

/*
 * Stub for override, this method is just an example of how this factory can be used
 * */
Lavender.SerializeFactory.prototype.getServiceExporter = function(config)
{
    var exporter;
    //we resuse parserCode which should really probably be called serializationCode
    switch( config.exporterCode ){
        case 'local':
        case 'remote':
        default:
            exporter = {};
            break;
    }
    return exporter;
}

Lavender.SerializeFactory.getInstance = function(){
    if (Lavender.SerializeFactory.instance == null) {
        Lavender.SerializeFactory.instance = new Lavender.SerializeFactory();
    }
    return Lavender.SerializeFactory.instance;
}

Lavender.SerializeFactory.instance;
