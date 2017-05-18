/**
 * Created by dsmiley on 5/11/17.
 */
import {IEvent} from './IEvent';

export abstract class AbstractEvent implements IEvent{
    public type:string;
    public payload:Object;

    constructor(type:string, payload?:Object){
        this.type = type;
        this.payload = payload;
    }

    abstract clone(type:string, payload:Object):IEvent;
}