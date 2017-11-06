/**
 * Created by dsmiley on 5/17/17.
 */
import {RecordSetList} from './RecordSetList';
import {ObjectUtils} from '../../util/ObjectUtils';
import {EventDispatcher} from '../../control/EventDispatcher';
import {IEventDispatcher} from '../../control/IEventDispatcher';
import {Subject} from '../observable/Subject';
import {IEvent} from '../../events/IEvent';
import {RecordSetEvent} from '../../events/RecordSetEvent'

export class RecordSetModel extends Subject implements EventDispatcher{

    private _recordSets:RecordSetList = new RecordSetList();

    constructor(){
        super();
        ObjectUtils.mixin(EventDispatcher, RecordSetModel, this);
    }

    //placeholders for mixins, required for the compiler
    handlersByEventName:Object;
    addEventListener: (  event:string, instance:Object, handler:string ) => void;
    canListen: (  eventType:string, instance:Object, handler:string )  => boolean;
    removeEventListener: ( event:string, instance:Object, handler:string )  => void;
    removeAllEventListeners: ( instance:Object )  =>  void;
    dispatch: ( event:IEvent )  =>  void;

    get recordSets():RecordSetList{
        return this._recordSets;
    }
    set recordSets(value:RecordSetList){
        this._recordSets = value;
        this.notify(value, "recordSets");
        this.dispatch(new RecordSetEvent(RecordSetEvent.RECORDSETS_CHANGE));
    }

}