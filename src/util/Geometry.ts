/**
 * Created by dsmiley on 6/30/17.
 */
import {Subject} from '../model/observable/Subject';
import {ObjectUtils} from './ObjectUtils';

export class Geometry extends Subject{
    private _left:number = undefined;
    private _top:number = undefined;
    private _width:number = undefined;
    private _height:number = undefined;
    
    constructor(values:any={}){
        super();
        this.left = values.left;
        this.top = values.top;
        this.width = values.width;
        this.height = values.height;
    }

    get left():number{
        return this._left;
    }
    set left(value:number){
        this._left = value;
        this.notify(value, "left");
    }
    get top():number{
        return this._top;
    }
    set top(value:number){
        this._top = value;
        this.notify(value, "top");
    }
    get width():number{
        return this._width;
    }
    set width(value:number){
        this._width = value;
        this.notify(value, "width");
    }
    get height():number{
        return this._height;
    }
    set height(value:number){
        this._height = value;
        this.notify(value, "height");
    }

    public update(values:Object={}):void{

        for (var key in values) {
            //note accessor methods that are defined using Object.defineProperty in ES6 are found on the prototype not the object instance, hence the use of getPrototypeOf
            if (ObjectUtils.isPropDefined(values, key) && Object.getPrototypeOf( this ).hasOwnProperty(key)) {
                this[key] = values[key];
            }
        }
    }

    public getDefinedValues():Object{
        var res = {};
        Object.keys(Object.getPrototypeOf(this)).forEach((key) =>{
            if (this[key]) {
                res[key] = this[key];
            }
        })
        return res;
    }
}