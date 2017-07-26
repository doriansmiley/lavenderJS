/**
 * Created by dsmiley on 4/18/17.
 */
import {IList} from './IList';
import {Subject} from '../observable/Subject';
import {ObjectUtils} from '../../util/ObjectUtils';
import {AbstractEventDispatcher} from '../../control/AbstractEventDispatcher';
import {IEventDispatcher} from '../../control/IEventDispatcher';
import {CollectionEvent} from '../../events/CollectionEvent';
import {IEvent} from '../../events/IEvent';

export class ArrayList extends Subject implements IList, AbstractEventDispatcher{
    private aList:Array<any>; //initialize with an empty array
    public allowDuplicates:boolean;

    constructor(source?:Array<any>, allowDuplicates:boolean = true){
        super();

        this.aList = (source) ? source : [];
        this.allowDuplicates = allowDuplicates;

        ObjectUtils.mixin(AbstractEventDispatcher, ArrayList, this);
    }

    //placeholders for mixins, required for the compiler
    handlersByEventName:Object;
    addEventListener: (  event:string, instance:Object, handler:string ) => void;
    canListen: (  eventType:string, instance:Object, handler:string )  => boolean;
    removeEventListener: ( event:string, instance:Object, handler:string )  => void;
    removeAllEventListeners: ( instance:Object )  =>  void;
    dispatch: ( event:IEvent )  =>  void;

    get length():number{
        return this.aList.length;
    }

    public clone():IList{
        return new ArrayList( this.aList.slice() );
    }

    public source():Array<any>{
        return this.aList;
    }
    
    public allowInsert(object:any, hash?:Object, key?:string):boolean{
        let returnValue = true;
        if( !this.allowDuplicates ){
            if( hash !== null && hash !== undefined &&  key!== null && key !== undefined && object.hasOwnProperty(key) && object[key] !== null && object[key] !== undefined && hash[ object[key] ] !== null && hash[ object[key] ] !== undefined ){
                returnValue = false;//the item is a duplicate based on the hash. sometimes we receive newly deserialized objects which makes a lookup based on equality a no go. Instead we look up the object in a hash based on some key
            }else if( this.aList.indexOf(object) >= 0 ){
                returnValue = false;//the item is a duplicate based on equality comparison
            }
        }
        return returnValue;
    }
    
    public addItem(object:any, hash?:Object, key?:string):number {
        if( !this.allowInsert( object, hash, key ) ){
            //replace the existing item with the new item
            return;
        }
        //Object are placed at the end of the array
        let index = this.aList.push(object);
        this.dispatch( new CollectionEvent( CollectionEvent.COLLECTION_CHANGE, {type:'add', item:object} ) );
        return index;
    }
    
    public addAll( items:Array<any>, replaceIndex?:boolean ){
        //add all items to the collection
        for( let i=0; i < items.length; i++ ){
            if( items[i].hasOwnProperty('addItemAt') && !isNaN( items[i].addItemAt ) ){
                //object:any, index:number, suppressChangeEvent:boolean=false, hash?:Object, key?:string, replaceIndex:boolean=false
                this.insert(items[i].item, items[i].addItemAt, true, null, null, replaceIndex );
            }else{
                this.addItem(items[i]);
            }
        }
        this.dispatch( new CollectionEvent( CollectionEvent.COLLECTION_CHANGE, {type:'addAll', items:items} ) );
    }

    public getItemAt(index:number):any{
        if (index > -1 && index < this.aList.length)
            return this.aList[index];
        else
            return undefined; //Out of bound array, return undefined
    }
    
    public clear():void{
        this.aList = [] as Array<any>;
        this.dispatch( new CollectionEvent( CollectionEvent.COLLECTION_CHANGE, {type:'removeAll'} ) );
    }

    public clearHash(hash:Object):void{
        for (var prop in hash ) {
            hash[ prop ] = null;
            delete hash[ prop ];
        }
    }

    protected removeItemFromHash(hash:Object, key:string):void{
        hash[ key ] = null;
        delete hash[ key ];
    }
    
    public removeItemAt(index:number):void{
        let m_count = this.aList.length;
        let item = this.getItemAt(index);
        if (m_count > 0 && index > -1 && index < this.aList.length) {
            switch (index) {
                case 0:
                    this.aList.shift();
                    break;
                case m_count - 1:
                    this.aList.pop();
                    break;
                default:
                    let head = this.aList.slice(0, index);
                    let tail = this.aList.slice(index + 1);
                    this.aList = head.concat(tail);
                    break;
            }
        }
        this.dispatch( new CollectionEvent( CollectionEvent.COLLECTION_CHANGE, {type:'remove', item:item} ) );
    }
    
    public insert(object:any, index:number, suppressChangeEvent:boolean=false, hash?:Object, key?:string, replaceIndex:boolean=false ):number{
        if( !this.allowInsert( object, hash, key ) ){
            return;
        }
        let m_count:number = this.aList.length;
        let m_returnValue:number = -1;
        if (index > -1 ){
            switch (index) {
                case 0:
                    this.aList.unshift(object);
                    m_returnValue = 0;
                    break;
                case m_count:
                    this.aList.push(object);
                    m_returnValue = m_count;
                    break;
                default:
                    if( index > m_count ){
                        for( let i=0; i < index - m_count; i++ ){
                            this.aList.push(null);
                        }
                    }
                    let head = this.aList.slice(0, index);
                    let tailIndex = (replaceIndex) ? index + 1 : index;//if we are to replace the current index in the array use index +1 which should drop the old item from the array
                    let tail = this.aList.slice(tailIndex);
                    tail.unshift(object);
                    this.aList = head.concat(tail);
                    m_returnValue = index;
                    break;
            }
        }
        if( !suppressChangeEvent ){
            this.dispatch( new CollectionEvent( CollectionEvent.COLLECTION_CHANGE, {type:'add', item:object} ) );
        }
        return m_returnValue;
    }
    
    public changeIndex(fromIndex:number, toIndex:number, suppressChangeEvent?:boolean):void{
        let object =  this.aList[fromIndex]
        this.aList.splice(toIndex, 0, this.aList.splice(fromIndex, 1)[0]);
        if( !suppressChangeEvent ){
            this.dispatch( new CollectionEvent( CollectionEvent.COLLECTION_CHANGE_ORDER, {type:'change', item:object, fromIndex:fromIndex, toIndex:toIndex} ) );
        }
    }

    public swapIndex(fromIndex:number, toIndex:number, suppressChangeEvent?:boolean):void{
        let object =  this.aList[fromIndex]
        this.aList[toIndex] = this.aList.splice(fromIndex, 1, this.aList[toIndex])[0];
        if( !suppressChangeEvent ){
            this.dispatch( new CollectionEvent( CollectionEvent.COLLECTION_CHANGE_ORDER, {type:'swap', item:object, fromIndex:fromIndex, toIndex:toIndex} ) );
        }
    }
    
    public indexOf(object:any, startIndex?:number):number{
        if( startIndex === null || startIndex === undefined ){
            startIndex = 0;
        }
        let m_count = this.aList.length;
        let m_returnValue = -1;

        if (startIndex > -1 && startIndex < m_count) {
            let i = startIndex;

            while (i < m_count) {
                if (this.aList[i] == object) {
                    m_returnValue = i;
                    break;
                }

                i++;
            }
        }

        return m_returnValue;
    }
    
    public lastIndexOf(object:any, startIndex?:number):number{
        let m_count = this.aList.length;
        let m_returnValue = -1;

        if (startIndex > -1 && startIndex < m_count) {
            let i = m_count - 1;

            while (i >= startIndex) {
                if (this.aList[i] == object) {
                    m_returnValue = i;
                    break;
                }

                i--;
            }
        }

        return m_returnValue;
    }
}