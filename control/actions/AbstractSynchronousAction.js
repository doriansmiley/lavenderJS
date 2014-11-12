/**
 * Created by dsmiley on 2/26/14.
 */
Lavender.AbstractSynchronousAction = function () {
    Lavender.Subject.prototype.constructor.call(this);

    Lavender.ObjectUtils.mixin(Lavender.AbstractEventDispatcher, Lavender.AbstractSynchronousAction, this);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.Subject, Lavender.AbstractSynchronousAction);

Lavender.AbstractSynchronousAction.prototype.execute = function () {
    try {
        //result is instance of Lavender.HttpSuccess
        this.executeDAOMethod();
        this.dispatchSuccess(this.getResultObj());
    } catch (e) {
        var errorMessage = this.getErrorMessage() + "\n" + e.message + "\n" + e.stack;
        var errorEvent = new Lavender.ActionErrorEvent(Lavender.ActionErrorEvent.ERROR, {message:errorMessage});
        Lavender.EventDispatcher.dispatch(errorEvent);
        var error = {name: 'error', message: errorMessage};
        Lavender.Model.errorModel.errors.addItem(error);
        Lavender.Model.errorModel.appError = true;
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
    Lavender.EventDispatcher.dispatch(doneEvent);
}

//abstract method for override
Lavender.AbstractSynchronousAction.prototype.executeDAOMethod = function () {

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