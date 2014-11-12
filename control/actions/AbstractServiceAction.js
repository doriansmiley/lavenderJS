/**
 * Created by dsmiley on 2/26/14.
 */
Lavender.AbstractServiceAction = function (service, opModel, parser) {
    this.service = service;//DAO;
    this.opModel = opModel;//OperationModel;
    this.parser = parser;//ServiceResultParser;

    Lavender.Subject.prototype.constructor.call(this);

    Lavender.ObjectUtils.mixin(Lavender.AbstractEventDispatcher, Lavender.AbstractServiceAction, this);

}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.Subject, Lavender.AbstractServiceAction);

Lavender.AbstractServiceAction.prototype.execute = function () {
    if (this.service === null || this.service === undefined || this.opModel === null || this.opModel === undefined || this.parser === null || this.parser === undefined) {
        this.executionError();
    }

    this.opModel.asyncOperationComplete = false;
    this.opModel.asyncOperationCount += 1;

    return this.executeDAOMethod();
}

//abstract method for override
Lavender.AbstractServiceAction.prototype.parseResponse = function (result) {
    return result;
}

//abstract method for override
Lavender.AbstractServiceAction.prototype.executeDAOMethod = function () {
    return null;
}

Lavender.AbstractServiceAction.prototype.dispatchSuccess = function (parsedResult) {
    //notify listeners and include all known values
    var doneEvent = new Lavender.ActionSuccessEvent(Lavender.ActionSuccessEvent.SUCCESS,{result:parsedResult});
    Lavender.EventDispatcher.dispatch(doneEvent);
}

Lavender.AbstractServiceAction.prototype.success = function (result) {
    try {
        //result is instance of Lavender.HttpSuccess
        var parsedResult = this.parseResponse(result);
        this.dispatchSuccess(parsedResult);
    } catch (e) {
        var errorMessage = this.getErrorMessage() + "\n" + e.message + "\n" + e.stack;
        var errorEvent = new Lavender.ActionErrorEvent(Lavender.ActionErrorEvent.ERROR, {message:errorMessage});
        Lavender.EventDispatcher.dispatch(errorEvent);
        var error = {name: 'error', message: errorMessage};
        Lavender.Model.errorModel.errors.addItem(error);
        Lavender.Model.errorModel.appError = true;
    } finally {
        this.opModel.asyncOperationCount -= 1;
        if (this.opModel.asyncOperationCount == 0) {
            this.opModel.asyncOperationComplete = true;
        }
        this.tearDown();
    }
}

Lavender.AbstractServiceAction.prototype.fault = function (fault) {
    //fault is an instance of Lavender.HttpFault
    this.opModel.asyncOperationCount -= 1;
    if (this.opModel.asyncOperationCount == 0) {
        this.opModel.asyncOperationComplete = true;
    }
    var errorMessage = this.getFaultString() + fault.message;
    var errorEvent = new Lavender.ActionErrorEvent(Lavender.ActionErrorEvent.ERROR, {message:errorMessage});
    Lavender.EventDispatcher.dispatch(errorEvent);
    var error = {name: fault.status, message: errorMessage};
    Lavender.Model.errorModel.errors.addItem(error);
    Lavender.Model.errorModel.appError = true;
    this.tearDown();
}

//abstract method for override
Lavender.AbstractServiceAction.prototype.getFaultString = function () {
    return null;
}

//abstract method for override
Lavender.AbstractServiceAction.prototype.getErrorMessage = function () {
    return null;
}

Lavender.AbstractServiceAction.prototype.executionError = function () {
    // These properties weren't injected or supplied in the constructor or manually.
    // They are needed so we throw an error.
    var msg = this.getExecErrorString();
    if (this.service === null || this.service === undefined) {
        msg += " service";
    }
    if (this.opModel === null || this.opModel) {
        msg += ", opModel";
    }
    if (this.parser === null || this.parser === undefined) {
        msg += ", parser";
    }

    msg += ".";

    throw new Error(msg);
}

//abstract method for override
Lavender.AbstractServiceAction.prototype.getExecErrorString = function (msg) {
    return 'Lavender.AbstractServiceAction.prototype.executionError: the following are required: ';
}

Lavender.AbstractServiceAction.prototype.tearDown = function () {
    this.opModel = null;
    this.service = null;
    this.parser = null;
}