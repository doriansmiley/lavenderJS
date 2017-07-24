/**
 * Created by dsmiley on 6/30/17.
 */
export class CopyUtils{
    public static copyInheredValues(child:Object, parent:Object):void{
        for (var prop in parent ) {
            if( child.hasOwnProperty(prop) && ( child[prop] === undefined || child[prop] === null || child[prop] === ''|| child[prop] === NaN ) ){
                child[prop] = parent[prop];
            }
        }
    }

    public static overwriteValues(child:Object, parent:Object, excludeObjects:Object={}):void{
        for (var prop in parent ) {
            if( child.hasOwnProperty(prop) ){ //As of jQuery 1.6, the .attr() method returns undefined for attributes that have not been set. null means it does not exist
                var value = ( excludeObjects.hasOwnProperty(prop) ) ? child[prop] : parent[prop];
                child[prop] = value;
            }
        }
    }

    public static concatObjects(objects:Array<Object>):Object{
        var ret = {};
        var len = objects.length;
        for (var i=0; i<len; i++) {
            for (var p in objects[i]) {
                if (objects[i].hasOwnProperty(p)) {
                    ret[p] = objects[i][p];
                }
            }
        }
        return ret;
    }

    public static copyProperties(target:Object, source:Object):void{
        for (var prop in source ) {
            if (typeof source[prop] !== 'function') {
                target[prop] = source[prop];
            }
        }
    }
}