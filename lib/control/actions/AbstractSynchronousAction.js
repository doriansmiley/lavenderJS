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
var UuidUtils_1 = require("../../util/UuidUtils");
var AbstractSynchronousAction = (function (_super) {
    __extends(AbstractSynchronousAction, _super);
    function AbstractSynchronousAction(errorModel) {
        var _this = _super.call(this) || this;
        _this.errorModel = errorModel;
        ObjectUtils_1.ObjectUtils.mixin(AbstractEventDispatcher_1.AbstractEventDispatcher, AbstractSynchronousAction, _this);
        return _this;
    }
    AbstractSynchronousAction.prototype.execute = function () {
        try {
            this.executeServiceMethod();
            this.dispatchSuccess(this.getResultObj());
            return UuidUtils_1.UuidUtils.generateUUID(); //we return an ID just to preserve consistency with the IAction interface definition
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
            this.tearDown();
        }
    };
    //required by interface, but not used in sync actions
    AbstractSynchronousAction.prototype.success = function (result) {
    };
    //required by interface, but not used in sync actions
    AbstractSynchronousAction.prototype.fault = function (fault) {
    };
    //required by interface, but not used in sync actions
    AbstractSynchronousAction.prototype.onProgress = function (progress) {
    };
    //Override this method in subclasses
    AbstractSynchronousAction.prototype.getResultObj = function () {
        return null;
    };
    AbstractSynchronousAction.prototype.dispatchSuccess = function (result) {
        //notify listeners and include all known values
        var doneEvent = new ActionSuccessEvent_1.ActionSuccessEvent(ActionSuccessEvent_1.ActionSuccessEvent.SUCCESS, { result: result });
        this.dispatch(doneEvent);
    };
    //Override this method in subclasses
    AbstractSynchronousAction.prototype.executeServiceMethod = function () {
    };
    //Override this method in subclasses
    AbstractSynchronousAction.prototype.getErrorMessage = function () {
        return null;
    };
    //Override this method in subclasses
    AbstractSynchronousAction.prototype.getExecErrorString = function () {
        return 'Lavender.AbstractSynchronousAction error';
    };
    AbstractSynchronousAction.prototype.executionError = function () {
        // These properties weren't injected or supplied in the constructor or manually.
        // They are needed so we throw an error.
        throw new Error(this.getExecErrorString());
    };
    AbstractSynchronousAction.prototype.tearDown = function () {
        this.errorModel = null;
    };
    return AbstractSynchronousAction;
}(Subject_1.Subject));
exports.AbstractSynchronousAction = AbstractSynchronousAction;
//# sourceMappingURL=AbstractSynchronousAction.js.map