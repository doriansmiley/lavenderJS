import {ChangeWatcher} from '../model/observable/ChangeWatcher';
import {IObserver} from '../model/observable/IObserver';
import { IBindable } from '../model/observable/IBindable';

export class BindingUtils{
    public static bind(host:IBindable, hostProp:string, chain:Object, chainProp:string, isCSS?:boolean, cssProperty?:string):IObserver {

        let observer:IObserver = new ChangeWatcher(hostProp, chain, chainProp, isCSS, cssProperty);

        host.addObserver(observer);

        return observer;
    }
}

