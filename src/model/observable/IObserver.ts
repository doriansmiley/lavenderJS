/**
 * Created by dsmiley on 4/18/17.
 */
export interface IObserver{
    chain:String;
    instance:Object;
    chainProp:String;
    isCSS:Boolean;
    cssProperty:String;
    update(value:any, chain:Object):void;
}