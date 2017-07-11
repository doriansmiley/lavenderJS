/**
 * Created by dsmiley on 5/17/17.
 */
import { RecordSetList } from './RecordSetList';
import { AbstractEventDispatcher } from '../../control/AbstractEventDispatcher';
import { Subject } from '../observable/Subject';
import { IEvent } from '../../events/IEvent';
export declare class RecordSetModel extends Subject implements AbstractEventDispatcher {
    private _recordSets;
    constructor();
    handlersByEventName: Object;
    addEventListener: (event: string, instance: Object, handler: string) => void;
    canListen: (eventType: string, instance: Object, handler: string) => boolean;
    removeEventListener: (event: string, instance: Object, handler: string) => void;
    removeAllEventListeners: (instance: Object) => void;
    dispatch: (event: IEvent) => void;
    recordSets: RecordSetList;
}