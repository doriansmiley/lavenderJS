Lavender.MathUtils = function(){

}

Lavender.MathUtils.degreeToRadian = function (degAngle) {
    return degAngle * Math.PI / 180;
};

Lavender.MathUtils.radianToDegree = function (radAngle) {
    return radAngle * 180 / Math.PI;
};

Lavender.MathUtils.toFixed = function ( number, precision ) {
    precision = precision || 10;
    var multiplier = Math.pow( 10, precision );
    return Math.round( number * multiplier ) / multiplier;
}

Lavender.MathUtils.isEven = function( value ){
    return ((value % 2) == 0);
}