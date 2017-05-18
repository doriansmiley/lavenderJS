/**
 * Created by dsmiley on 5/12/17.
 */
import {Subject} from './observable/Subject';

export class ModelLocator{
    
    private _recordsetModel;
    
    constructor(){
        
    }
    
    get recordsetModel(){
        return this._recordsetModel;
    }
}