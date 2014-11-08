/**
 * Created by dsmiley on 10/3/14.
 */
Lavender.ResizeUtils = function(){

}

Lavender.ResizeUtils.getScaleToFill = function(objSize, sizeToFill){
    var scale = (sizeToFill.height / sizeToFill.width) > (objSize.height / objSize.width) ? (sizeToFill.height / objSize.height) : (sizeToFill.width / objSize.width);
    return scale;
}

Lavender.ResizeUtils.getScaleToFit = function(objSize, sizeToFit){
    return Math.min(sizeToFit.width / objSize.width, sizeToFit.height / objSize.height);
}