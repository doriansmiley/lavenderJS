/**
 * Created by dsmiley on 9/4/15.
 */
Lavender.UuidUtils = function(){

}
Lavender.UuidUtils.generateUUID = function() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

Lavender.UuidUtils.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}