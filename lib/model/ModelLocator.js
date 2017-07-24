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
/**
 * Created by dsmiley on 5/12/17.
 */
var Subject_1 = require("./observable/Subject");
var ModelLocator = (function (_super) {
    __extends(ModelLocator, _super);
    function ModelLocator() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ModelLocator.prototype, "recordsetModel", {
        get: function () {
            return this._recordsetModel;
        },
        enumerable: true,
        configurable: true
    });
    return ModelLocator;
}(Subject_1.Subject));
exports.ModelLocator = ModelLocator;
//# sourceMappingURL=ModelLocator.js.map