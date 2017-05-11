/**
 * Created by dsmiley on 4/18/17.
 */
export interface IList {
    allowDuplicates:boolean;
    length:number;
    clone();
    source();
    allowInsert(object:any, hash?:Object, key?:string);
    addItem(object:any, hash?:Object, key?:string);
    addAll( items:Array<any>, replaceIndex?:number );
    getItemAt(index:number);
    clear();
    removeItemAt(index:number);
    insert(object:any, index:number, suppressChangeEvent:boolean, hash?:Object, key?:string, replaceIndex?:number );
    changeIndex(fromIndex:number, toIndex:number, suppressChangeEvent?:boolean);
    swapIndex(fromIndex:number, toIndex:number, suppressChangeEvent?:boolean);
    indexOf(object:any, startIndex?:number);
    lastIndexOf(object:any, startIndex?:number);
}