/**
 * Created by dsmiley on 5/11/17.
 */
import {IEvent} from './IEvent';
import {AbstractEvent} from './AbstractEvent';

export class CollectionEvent extends AbstractEvent{
    
    constructor(type:string, payload?:Object){
        super(type, payload)
    }
    
    public static COLLECTION_CHANGE:string = 'collectionChange';
    public static COLLECTION_CHANGE_ORDER:string = 'collectionChangeOrder';

    clone(type:string, payload:Object):IEvent{
        return new CollectionEvent(this.type, this.payload)
    }
}