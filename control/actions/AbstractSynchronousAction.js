/**
 * Created by dsmiley on 2/26/14.
 */
Lavender.AbstractSynchronousAction = function (errorModel) {
    this.errorModel = errorModel;//Lavender.ErrorModel
    Lavender.Subject.prototype.constructor.call(this);

    Lavender.ObjectUtils.mixin(Lavender.AbstractEventDispatcher, Lavender.AbstractSynchronousAction, this);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.Subject, Lavender.AbstractSynchronousAction);

Lavender.AbstractSynchronousAction.prototype.execute = function () {
    try {
        //result is instance of Lavender.HttpSuccess
        this.executeServiceMethod();
        this.dispatchSuccess(this.getResultObj());
    } catch (e) {
        var errorMessage = this.getErrorMessage() + "\n" + e.message + "\n" + e.stack;
        var errorEvent = new Lavender.ActionErrorEvent(Lavender.ActionErrorEvent.ERROR, {message:errorMessage});
        this.dispatch(errorEvent);
        var error = {name: 'error', message: errorMessage};
        this.errorModel.errors.addItem(error);
        this.errorModel.appError = true;
    } finally {
        this.tearDown();
    }
}

//stub for override
Lavender.AbstractSynchronousAction.prototype.getResultObj = function (result) {
    return {};
}

Lavender.AbstractSynchronousAction.prototype.dispatchSuccess = function (result) {
    //notify listeners and include all known values
    var doneEvent = new Lavender.ActionSuccessEvent(Lavender.ActionSuccessEvent.SUCCESS,{result:result});
    this.dispatch(doneEvent);
}

//abstract method for override
Lavender.AbstractSynchronousAction.prototype.executeServiceMethod = function () {

}

//abstract method for override
Lavender.AbstractSynchronousAction.prototype.getErrorMessage = function () {
    return null;
}

//abstract method for override
Lavender.AbstractSynchronousAction.prototype.getExecErrorString = function (msg) {
    return msg;
}

Lavender.AbstractSynchronousAction.prototype.executionError = function () {
    // These properties weren't injected or supplied in the constructor or manually.
    // They are needed so we throw an error.
    throw new Error(this.getExecErrorString());
}

Lavender.AbstractSynchronousAction.prototype.tearDown = function () {
    this.service = null;
    this.parser = null;
}