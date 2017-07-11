/**
 * Created by dsmiley on 5/18/17.
 */
import { IEvent } from './IEvent';
import { AbstractEvent } from './AbstractEvent';
export declare class ActionSuccessEvent extends AbstractEvent {
    constructor(type: string, payload?: Object);
    static SUCCESS: string;
    clone(type: string, payload: Object): IEvent;
}
