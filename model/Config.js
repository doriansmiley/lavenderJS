
/**
 * Created by dsmiley on 10/29/13.
 * @class
 */
Lavender.Config = function(){

    var _eventDispatcherCode = 'jquery';
    var _baseUrl;//String
    var _sessionId;//String
    var _serviceCode;//String
    var _httpServiceCode = 'jquery';
    var _webRoot = '';//default to empty string
    var _parserCode = undefined;
    var _exporterCode = undefined;

    Lavender.Subject.prototype.constructor.call(this);

    // Define our getters and setters
    this.addProperties({
            serviceCode: {
                get: function() {
                    return _serviceCode;
                },
                set: function(val) {
                    _serviceCode = val;
                    this.Notify( val, 'serviceCode' );
                }
            },exporterCode: {
                get: function() {
                    return _exporterCode;
                },
                set: function(val) {
                    _exporterCode = val;
                    this.Notify( val, 'exporterCode' );
                }
            },
            parserCode: {
                get: function() {
                    return _parserCode;
                },
                set: function(val) {
                    _parserCode = val;
                    this.Notify( val, 'parserCode' );
                }
            },
            webRoot: {
                get: function() {
                    return _webRoot;
                },
                set: function(val) {
                    _webRoot = val;
                    this.Notify( val, 'webRoot' );
                }
            },
            httpServiceCode: {
                get: function() {
                    return _httpServiceCode;
                },
                set: function(val) {
                    _httpServiceCode = val;
                    this.Notify( val, 'httpServiceCode' );
                }
            },
            sessionId: {
                get: function() {
                    return _sessionId;
                },
                set: function(val) {
                    _sessionId = val;
                    this.Notify( val, 'sessionId' );
                }
            },
            baseUrl: {
                get: function() {
                    return _baseUrl;
                },
                set: function(val) {
                    _baseUrl = val;
                    this.Notify( val, 'baseUrl' );
                }
            },
            eventDispatcherCode: {
                get: function() {
                    return _eventDispatcherCode;
                },
                set: function(val) {
                    _eventDispatcherCode = val;
                    this.Notify( val, 'eventDispatcherCode' );
                }
            }
        }
    )
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend( Lavender.Subject, Lavender.Config );
