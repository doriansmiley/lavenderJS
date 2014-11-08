/**
 * Created by dsmiley on 10/29/13.
 * @class
 */
Lavender.ModelLocator = function() {

    if (Lavender.ModelLocator.instance != null) {
        throw( "Singleton class has already been instantiated" );
    } else {
        Lavender.Subject.prototype.constructor.call(this);
        Lavender.ModelLocator.instance = this;
        // Private properties
        var _config = new Lavender.Config();
        var _errorModel = new Lavender.ErrorModel();
        var _asyncOperationModel = new Lavender.AsyncOperationModel();
        var _recordsetModel = new Lavender.RecordSetModel();

        // Define our getters and setters
        this.addProperties({
                recordsetModel: {
                    get: function () {
                        return _recordsetModel;
                    },
                    set: function (val) {
                        _recordsetModel = val;
                        this.Notify(val, "recordsetModel");
                    }
                },
                config: {
                    get: function () {
                        return _config;
                    },
                    set: function (val) {
                        _config = val;
                        this.Notify(val, "config");
                    }
                },
                errorModel: {
                    get: function () {
                        return _errorModel;
                    },
                    set: function (val) {
                        _errorModel = val;
                        this.Notify(val, "errorModel");
                    }
                },
                asyncOperationModel: {
                    get: function () {
                        return _asyncOperationModel;
                    },
                    set: function (val) {
                        _asyncOperationModel = val;
                        this.Notify(val, "asyncOperationModel");
                    }
                }
            }
        )
    }
};
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.Subject, Lavender.ModelLocator);

Lavender.ModelLocator.getInstance = function () {
    if (Lavender.ModelLocator.instance == null) {
        Lavender.ModelLocator.instance = new Lavender.ModelLocator();
    }
    return Lavender.ModelLocator.instance;
}

Lavender.ModelLocator.instance;