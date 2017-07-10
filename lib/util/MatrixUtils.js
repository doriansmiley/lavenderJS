"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 6/30/17.
 */
var MathUtils_1 = require("./MathUtils");
var MatrixUtils = (function () {
    function MatrixUtils() {
    }
    MatrixUtils.rotate = function (matrix, degAngle, point) {
        return matrix.rotate(MathUtils_1.MathUtils.degreeToRadian(degAngle), point);
    };
    MatrixUtils.matrixToCSS = function () {
    };
    return MatrixUtils;
}());
exports.MatrixUtils = MatrixUtils;
//# sourceMappingURL=MatrixUtils.js.map