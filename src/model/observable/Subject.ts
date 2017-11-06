/**
 * Created by dsmiley on 4/18/17.
 */
import {Binder} from './Binder';
import {IObserver} from "./IObserver";
import { IBindable } from './IBindable';

export class Subject implements IBindable {
    protected observerHash:Object = {};
    protected binder:Binder = new Binder();

    constructor(){};
    
    public notify(value:any, chain:string):void{
        if (!this.observerHash.hasOwnProperty(chain) || this.observerHash[chain] == null || this.observerHash[chain] == undefined) {
            //property is not bound
            return;
        }
        this.observerHash[chain].forEach(observer => {
            (observer as IObserver).update(value, chain);
        });
    }

    public addObserver(observer:IObserver):void{
        if (!this.observerHash.hasOwnProperty(observer.chain) || this.observerHash[observer.chain] == null || this.observerHash[observer.chain] == undefined) {
            this.observerHash[observer.chain] = [] as Array<IObserver>;
            //TODO: Once ArrayList is ported over comment this back in and remove the line above
            //this.observerHash[observer.chain] = new Lavender.ArrayList ();
        }
        this.observerHash[observer.chain].push(observer);
        //TODO: Once ArrayList is ported over comment this back in and remove the line above
        //this.observerHash[observer.chain].addItem(observer);
    }

    public removeObserver(observer:IObserver):void{
        if (!this.observerHash.hasOwnProperty(observer.chain) || this.observerHash[observer.chain] == null || this.observerHash[observer.chain] == undefined) {
            throw 'Property not found in registered observers';
        }
        //TODO: Once ArrayList is ported over comment this back in and remove everything above to line 41
        //this.observerHash[observer.chain].removeItemAt(this.observerHash[observer.chain].indexOf(observer, 0));
        //TODO: Once ArrayList is ported over remove this
        let m_count = this.observerHash[observer.chain].length;
        let index = this.observerHash[observer.chain].indexOf(observer,0);
        if (m_count > 0 && index > -1 && index < this.observerHash[observer.chain].length) {
            switch (index) {
                case 0:
                    this.observerHash[observer.chain].shift();
                    break;
                case m_count - 1:
                    this.observerHash[observer.chain].pop();
                    break;
                default:
                    let head = this.observerHash[observer.chain].slice(0, index);
                    let tail = this.observerHash[observer.chain].slice(index + 1);
                    this.observerHash[observer.chain] = (head as Array<IObserver>).concat(tail);
                    break;
            }
        }
    }

    //legacy method for pure Javascript application to define accessor methods. DO NOT USE
    public addProperty(label:string, getter:any, setter:any):void{
        if (Object.defineProperty) {
            try {
                Object.defineProperty(
                    this,
                    label,
                    {
                        get: getter,
                        set: setter,
                        // Properties have to be enumerable otherwise they will be skipped during
                        // for-in loop (which causes problems in CopyUtils)
                        enumerable: true
                    }
                );
            }
            catch (e) {
                // IE8 Bullshit implementation of Object.defineProperty
            }

        }
        else if (this['__defineGetter__']) {
            if (getter) {
                this['__defineGetter__'](label, getter);
            }
            if (setter) {
                this['__defineGetter__'](label, setter);
            }
        }
    }

    //legacy method for pure Javascript application to define accessor methods. DO NOT USE
    public addProperties(p):void{
        for (var label in p) {
            if (p.hasOwnProperty(label)) {
                this.addProperty(label, p[label].get, p[label].set);
            }
        }
    }

}