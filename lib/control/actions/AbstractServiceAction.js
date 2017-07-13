"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("../../model/observable/Subject");
var AbstractEventDispatcher_1 = require("../../control/AbstractEventDispatcher");
var ObjectUtils_1 = require("../../util/ObjectUtils");
var ActionSuccessEvent_1 = require("../../events/ActionSuccessEvent");
var ActionErrorEvent_1 = require("../../events/ActionErrorEvent");
var AbstractServiceAction = (function (_super) {
    __extends(AbstractServiceAction, _super);
    function AbstractServiceAction(service, opModel, parser, errorModel) {
        var _this = _super.call(this) || this;
        _this.service = service;
        _this.opModel = opModel;
        _this.parser = parser;
        _this.errorModel = errorModel;
        ObjectUtils_1.ObjectUtils.mixin(AbstractEventDispatcher_1.AbstractEventDispatcher, AbstractServiceAction, _this);
        return _this;
    }
    AbstractServiceAction.prototype.execute = function () {
        if (this.service === null || this.service === undefined || this.opModel === null || this.opModel === undefined || this.parser === null || this.parser === undefined) {
            this.executionError();
        }
        this.opModel.asyncOperationComplete = false;
        this.opModel.asyncOperationCount += 1;
        this.service.addResponder(this);
        return this.executeServiceMethod();
    };
    //method must return a requestID
    //Override this method in subclasses
    AbstractServiceAction.prototype.executeServiceMethod = function () {
        return null;
    };
    //Override this method in subclasses
    //it should parse the result and return the resulting Object tree
    AbstractServiceAction.prototype.parseResponse = function (result) {
        return null;
    };
    AbstractServiceAction.prototype.dispatchSuccess = function (parsedResult) {
        var doneEvent = new ActionSuccessEvent_1.ActionSuccessEvent(ActionSuccessEvent_1.ActionSuccessEvent.SUCCESS, { result: parsedResult });
        this.dispatch(doneEvent);
    };
    AbstractServiceAction.prototype.success = function (result) {
        try {
            //result is instance of Lavender.HttpSuccess
            var parsedResult = this.parseResponse(result);
            this.dispatchSuccess(parsedResult);
        }
        catch (e) {
            var errorMessage = this.getErrorMessage() + "\n" + e.message + "\n" + e.stack;
            var errorEvent = new ActionErrorEvent_1.ActionErrorEvent(ActionErrorEvent_1.ActionErrorEvent.ERROR, { message: errorMessage });
            this.dispatch(errorEvent);
            var error = { name: 'error', message: errorMessage };
            this.errorModel.errors.addItem(error);
            this.errorModel.appError = true;
        }
        finally {
            this.opModel.asyncOperationCount -= 1;
            if (this.opModel.asyncOperationCount == 0) {
                this.opModel.asyncOperationComplete = true;
            }
            this.tearDown();
        }
    };
    AbstractServiceAction.prototype.fault = function (fault) {
        //fault is an instance of Lavender.HttpFault
        this.opModel.asyncOperationCount -= 1;
        if (this.opModel.asyncOperationCount == 0) {
            this.opModel.asyncOperationComplete = true;
        }
        var errorMessage = this.getFaultString() + fault.message;
        var errorEvent = new ActionErrorEvent_1.ActionErrorEvent(ActionErrorEvent_1.ActionErrorEvent.ERROR, { message: errorMessage });
        this.dispatch(errorEvent);
        var error = { name: fault.status, message: errorMessage };
        this.errorModel.errors.addItem(error);
        this.errorModel.appError = true;
        this.tearDown();
    };
    //Override this method in subclasses
    AbstractServiceAction.prototype.onProgress = function (progress) {
    };
    //Override this method in subclasses
    AbstractServiceAction.prototype.getFaultString = function () {
        return null;
    };
    //Override this method in subclasses
    AbstractServiceAction.prototype.getErrorMessage = function () {
        return null;
    };
    AbstractServiceAction.prototype.executionError = function () {
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
    };
    //Override this method in subclasses
    AbstractServiceAction.prototype.getExecErrorString = function () {
        return 'Lavender.AbstractServiceAction.prototype.executionError: the following are required: ';
    };
    AbstractServiceAction.prototype.tearDown = function () {
        this.opModel = null;
        this.service = null;
        this.parser = null;
        this.errorModel = null;
        this.binder.unbindAll();
    };
    return AbstractServiceAction;
}(Subject_1.Subject));
exports.AbstractServiceAction = AbstractServiceAction;
//# sourceMappingURL=AbstractServiceAction.js.map