Lavender.CoordsUtils = function(){

}

Lavender.CoordsUtils.globalToLocal = function(container, pageX, pageY) {
     var position = container.offset();

    return({
        x:  pageX - position.left,
        y:  pageY - position.top
    });
}

Lavender.CoordsUtils.localToGlobal = function( context, localX, localY ){

    var position = context.offset();

    return({
        x: localX + position.left,
        y: localY + position.top
    });
};
