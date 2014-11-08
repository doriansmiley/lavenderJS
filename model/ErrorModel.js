/**
 * Created by dsmiley on 2/5/14.
 * This class is meant to be overriden. Error handling objects will be particular to the framework
 * Subclasses will abstract out the details of the frameworks error objects
 */
Lavender.ErrorModel = function() {
    var _appError = false;//Boolean
    var _errors = new Lavender.ArrayList();

    Lavender.Subject.prototype.constructor.call(this);

    this.addProperties({
        appError: {
            get: function () {
                return _appError;
            },
            set: function (val) {
                _appError = val;
                this.Notify(val, "appError");
            }
        },
        errors: {
            get: function () {
                return _errors;
            },
            set: function (val) {
                _errors = val;
                this.Notify(val, "errors");
            }
        }
    });
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.Subject, Lavender.ErrorModel);

Lavender.ErrorModel.prototype.getTitle = function(){
    var returnTitle = (this.errors.length() > 1 ) ? 'Multiple errors have occurred.\n' : 'The following error occurred.\n';
    return returnTitle;
}

Lavender.ErrorModel.prototype.getMessage = function(){
    var returnText = '';
    for( var errorIndex = 0; errorIndex < this.errors.length(); errorIndex++ ){
        returnText += 'Name: '+ this.errors.getItemAt(errorIndex).name + '\n';
        returnText += 'Message: '+ this.errors.getItemAt(errorIndex).message + '\n';
        returnText += '\n';
    }
    return returnText;
}

Lavender.ErrorModel.prototype.addError = function( error ){
    this.errors.addItem( error );
    this.appError = true;
}

Lavender.ErrorModel.prototype.clear = function(){
    this.errors.clear();
    this.appError = false;
}