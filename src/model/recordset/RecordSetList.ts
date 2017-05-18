/**
 * Created by dsmiley on 5/17/17.
 */
import {ArrayList} from '../list/ArrayList';
import {RecordSet} from './RecordSet';

export class RecordSetList extends ArrayList{

    public recordSetsBySource:Object = {};
    public recordSetsById:Object = {};

    constructor(source?:Array<any>, allowDuplicates:boolean = true){
        super(source, allowDuplicates);
    }

    public addItem(item:RecordSet, hash?:Object, key?:string):number{
        this.recordSetsById[ item.id ] = item;
        this.recordSetsBySource[ item.source ] = item;
        return super.addItem(item, hash, key);
    }
    
    public clear():void{
        this.clearHash(this.recordSetsById);
        this.clearHash(this.recordSetsBySource);
        super.clear();
    }

    public removeItemAt(index:number):void{
        let recordSet = this.getItemAt( index ) as RecordSet;
        this.removeItemFromHash(this.recordSetsById, recordSet.id);
        this.removeItemFromHash(this.recordSetsBySource, recordSet.source);
        super.removeItemAt(index);
    }

    public insert(object:RecordSet, index:number, suppressChangeEvent:boolean=false, hash?:Object, key?:string, replaceIndex:boolean=false):number{
        //add item to hash
        this.recordSetsById[ object.id ] = object;
        this.recordSetsBySource[ object.source ] = object;
        return super.insert(object, index, suppressChangeEvent, hash, key, replaceIndex);
    }
}