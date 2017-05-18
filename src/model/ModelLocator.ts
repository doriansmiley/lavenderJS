/**
 * Created by dsmiley on 5/12/17.
 */
import {Subject} from './observable/Subject';

export class ModelLocator extends Subject{
    
    private _recordsetModel;
    
    constructor(){
        super();
    }
    
    get recordsetModel(){
        return this._recordsetModel;
    }
}