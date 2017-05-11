/**
 * Created by dsmiley on 5/11/17.
 */
export class ObjectUtils {
    constructor(){};
    
    public static extend(base:any, sub:any):void {
        // Avoid instantiating the base class just to setup inheritance
        // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
        sub.prototype = Object.create(base.prototype);
        // Remember the constructor property was set wrong, let's fix it
        sub.prototype.constructor = sub;
    }

    public static mixin(base:any, sub:any, subInstance:any, overwriteInstanceVariables:boolean = false):any {
        var objectToExtend = new base();
        //Grab methods and properties defined through prototypal inheritance
        for (var prop in base.prototype) {
            if (base.prototype.hasOwnProperty(prop)) {
                sub.prototype[prop] = base.prototype[prop];
            }
        }
        //grab instance variables and function
        for (var prop in objectToExtend) {
            if (objectToExtend.hasOwnProperty(prop)) {
                //if an object defines an instance variable or function we don't want to overwrite it unless specified
                if (subInstance[prop] !== null && subInstance[prop] !== undefined && !overwriteInstanceVariables) {
                    continue;
                }
                subInstance[prop] = objectToExtend[prop];
            }
        }
        return subInstance;
    }

    public static hasFunction(obj:Object, prop:string) {
        return (obj && typeof obj[prop] === 'function');
    }

    public static isPropDefined(obj:Object, prop:string):boolean {
        if (obj && obj.hasOwnProperty(prop) && obj[prop] != undefined && obj[prop] != null && obj[prop] != NaN) {
            return true;
        }

        return false;
    }

}