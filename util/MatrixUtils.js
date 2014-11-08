Lavender.MatrixUtils = function(){

}

Lavender.MatrixUtils.rotate = function (matrix, degAngle, point) {
    return matrix.rotate(Lavender.MathUtils.degreeToRadian(degAngle), point);
};

Lavender.MatrixUtils.matrixToCSS = function (matrix) {

    var coeffs = ['a', 'b', 'c', 'd', 'tx', 'ty'];
    var values = [];
    for (var i in coeffs)
    {
        values.push(Lavender.MathUtils.toFixed(matrix[coeffs[i]]));
    }

    return 'matrix(' + values.join(',')+ ')';
};

Lavender.MatrixUtils.getRotationAngleForElement = function (element) {
    var matrix = element.css("-webkit-transform") ||
        element.css("-moz-transform")    ||
        element.css("-ms-transform")     ||
        element.css("-o-transform")      ||
        element.css("transform");
    var angle;
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else {
        angle = 0;
    }
    return angle;
};

Lavender.MatrixUtils.getRotationAngle = function (matrix) {
    return Lavender.MathUtils.toFixed(Lavender.MathUtils.radianToDegree(Math.atan2(matrix.b, matrix.a)));
};

Lavender.MatrixUtils.getMatrix = function (cssTransformMatrix) {
    var values = cssTransformMatrix.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');
    var a = values[0];
    var b = values[1];
    var c = values[2];
    var d = values[3];
    return Matrix(a,b,c,d);
};

