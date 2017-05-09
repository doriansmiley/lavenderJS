/**
 * Created by dsmiley on 4/18/17.
 */
import { IObserver } from './IObserver';

export class ChangeWatcher implements IObserver {

    readonly chain:string;
    readonly instance:Object;
    readonly chainProp:string;
    readonly isCSS:boolean;
    readonly cssProperty:string;

    constructor(hostProp:string, chainInstance:Object, chainPropToWatch:string, isCSS:boolean = false, cssProperty?:string) {

        if(isCSS && !cssProperty){
            throw new Error('cssProperty property is required when isCSS param is true')
        }
        
        this.chain = hostProp;
        this.instance = chainInstance;
        this.chainProp = chainPropToWatch;
        this.isCSS = isCSS;
        this.cssProperty = cssProperty;
    };

    public update(value:any, chain?:Object):void {
        if (this.isCSS) {
            this.instance[this.chainProp](this.cssProperty, value);
        }
        else if (typeof( this.instance[this.chainProp] ) == "function") {
            this.instance[this.chainProp](value, chain);
        }
        else {
            if (this.instance[this.chainProp] != value) {
                this.instance[this.chainProp] = value;
            }
        }
    }
}