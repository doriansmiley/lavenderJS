"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 5/17/17.
 */
var Subject_1 = require("./observable/Subject");
var ArrayList_1 = require("./list/ArrayList");
var ErrorModel = /** @class */ (function (_super) {
    __extends(ErrorModel, _super);
    function ErrorModel() {
        var _this = _super.call(this) || this;
        _this._appError = false; //controls the visibility of app error messages
        _this._showConfirmationOption = false; //this controls whether or not the SpiAlerts directive presents an OK and Cancel button to the end user for confirmation dialogs
        _this._errors = new ArrayList_1.ArrayList();
        return _this;
    }
    Object.defineProperty(ErrorModel.prototype, "appError", {
        get: function () {
            return this._appError;
        },
        set: function (value) {
            this._appError = value;
            this.notify(value, 'appError');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorModel.prototype, "showConfirmationOption", {
        get: function () {
            return this._showConfirmationOption;
        },
        set: function (value) {
            this._showConfirmationOption = value;
            this.notify(value, 'showConfirmationOption');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorModel.prototype, "errors", {
        get: function () {
            return this._errors;
        },
        set: function (value) {
            this._errors = value;
            this.notify(value, 'errors');
        },
        enumerable: true,
        configurable: true
    });
    ErrorModel.prototype.getTitle = function () {
        return (this.errors.length > 1) ? 'Multiple errors have occurred.\n' : 'The following error occurred.\n';
        ;
    };
    ErrorModel.prototype.getMessage = function () {
        var returnText = '';
        for (var errorIndex = 0; errorIndex < this.errors.length; errorIndex++) {
            returnText += 'Name: ' + this.errors.getItemAt(errorIndex).name + '\n';
            returnText += 'Message: ' + this.errors.getItemAt(errorIndex).message + '\n';
            returnText += '\n';
        }
        return returnText;
    };
    ErrorModel.prototype.addError = function (error) {
        this.errors.addItem(error);
        this.appError = true;
    };
    ErrorModel.prototype.clear = function () {
        this.errors.clear();
        this.appError = false;
    };
    return ErrorModel;
}(Subject_1.Subject));
exports.ErrorModel = ErrorModel;
//# sourceMappingURL=ErrorModel.js.map