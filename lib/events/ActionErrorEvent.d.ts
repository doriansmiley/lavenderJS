/**
 * Created by dsmiley on 5/18/17.
 */
import { IEvent } from './IEvent';
import { AbstractEvent } from './AbstractEvent';
export declare class ActionErrorEvent extends AbstractEvent {
    constructor(type: string, payload?: Object);
    static ERROR: string;
    clone(type: string, payload: Object): IEvent;
}
