import {ChangeWatcher} from '../model/observable/ChangeWatcher';
import {IObserver} from '../model/observable/IObserver';
import { IBindable } from '../model/observable/IBindable';

export class BindingUtils{
    public static bind(host:IBindable, hostProp:String, chain:Object, chainProp:String, isCSS?:Boolean, cssProperty?:String):IObserver {

        let observer:IObserver = new ChangeWatcher(hostProp, chain, chainProp, isCSS, cssProperty);

        host.addObserver(observer);

        return observer;
    }
}

