/**
 * Created by dsmiley on 5/17/17.
 */
import {Subject} from './observable/Subject';

export class AsyncOperationModel extends Subject{
    
    private _asyncOperationCount:number = 0;
    private _asyncOperationComplete:boolean = true;
    private _asyncOperationDescription:string = '';

    constructor(){
        super();
    }


    get asyncOperationCount():number {
        return this._asyncOperationCount;
    }

    set asyncOperationCount(value:number) {
        this._asyncOperationCount = value;
        this.notify(value, 'asyncOperationCount');
    }

    get asyncOperationComplete():boolean {
        return this.asyncOperationCount <= 0;
    }

    set asyncOperationComplete(value:boolean) {
        this._asyncOperationComplete = value;
        this.notify(value, 'asyncOperationComplete');
    }

    get asyncOperationDescription():string {
        return this._asyncOperationDescription;
    }

    set asyncOperationDescription(value:string) {
        this._asyncOperationDescription = value;
        this.notify(value, 'asyncOperationDescription');
    }

    public addAsyncOperation(description:string = ''):void{
        if (description.length > 0) {
            this.asyncOperationDescription += (this.asyncOperationDescription.length ? '\n' : '') + description;
        }
        this.asyncOperationComplete = false;
        this.asyncOperationCount += 1;
    }

    public removeAsyncOperation():void{
        this.asyncOperationCount -= 1;
        if (!this.asyncOperationCount)
        {
            this.asyncOperationDescription = '';
            this.asyncOperationComplete = true;
        }
    }
}