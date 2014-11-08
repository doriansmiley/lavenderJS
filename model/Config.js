
/**
 * Created by dsmiley on 10/29/13.
 * @class
 */
Lavender.Config = function(){

    var _eventDispatcherCode = 'jquery';
    var _baseUrl;//String
    var _sessionId;//String
    var _httpServiceCode = 'jquery';
    var _useLocalHostProxy = false;
    var _cacheServiceResults = false;
    var _localProxyBaseUrl;
    var _webRoot = '';//default to empty string

    Lavender.Subject.prototype.constructor.call(this);

    // Define our getters and setters
    this.addProperties({
            webRoot: {
                get: function() {
                    return _webRoot;
                },
                set: function(val) {
                    _webRoot = val;
                    this.Notify( val, 'webRoot' );
                }
            },
            localProxyBaseUrl: {
                get: function() {
                    return _localProxyBaseUrl;
                },
                set: function(val) {
                    _localProxyBaseUrl = val;
                    this.Notify( val, 'localProxyBaseUrl' );
                }
            },
            cacheServiceResults: {
                get: function() {
                    return _cacheServiceResults;
                },
                set: function(val) {
                    _cacheServiceResults = val;
                    this.Notify( val, 'cacheServiceResults' );
                }
            },
            useLocalHostProxy: {
                get: function() {
                    return _useLocalHostProxy;
                },
                set: function(val) {
                    _useLocalHostProxy = val;
                    this.Notify( val, 'useLocalHostProxy' );
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
