/**
 * Created by dsmiley on 4/18/17.
 */
import {BindingUtils} from '../../util/BindingUtils';
import {IObserver} from './IObserver';
import { IBindable } from './IBindable';

class Binding{
    readonly host:Object;
    readonly watcher:IObserver;
    constructor(host:Object, watcher:IObserver){
        this.host = host;
        this.watcher = watcher;
    }
}

export class Binder{
    private bindingGroups:Object = {};

    constructor() {};

    public bind (host:IBindable, hostProp:String, chain:Object, chainProp:String, isCSS?:Boolean, cssProperty?:String, group?:String = 'default'):void{
        let changeWatcher:IObserver = BindingUtils.bind(host, hostProp, chain, chainProp, isCSS, cssProperty);

        if (!this.bindingGroups.hasOwnProperty(group)){
            this.bindingGroups[group] = [] as Array<Binding>;
        }
        let binding = new Binding(host, changeWatcher);
        this.bindingGroups[group].push(binding);
    }
    
    public unbind (group?:String = 'default'):void{
        let bindings = this.bindingGroups[group];

        if (bindings){
            bindings.forEach(function (bindingData){
                bindingData.host.removeObserver(bindingData.watcher);
            });

            delete this.bindingGroups[group];
        }
    }

    public unbindAll():void{
        for (var group in this.bindingGroups){
            this.unbind(group);
        }
    }
}

