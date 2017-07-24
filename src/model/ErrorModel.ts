/**
 * Created by dsmiley on 5/17/17.
 */
import {Subject} from './observable/Subject';
import {ArrayList} from './list/ArrayList';

export class ErrorModel extends Subject{

    private _appError:boolean = false;
    private _errors:ArrayList = new ArrayList();

    constructor(){
        super();
    }

    get appError():boolean{
        return this._appError;
    }
    set appError(value:boolean){
        this._appError = value;
        this.notify(value, "appError");
    }

    get errors():ArrayList{
        return this._errors;
    }
    set errors(value:ArrayList){
        this._errors = value;
        this.notify(value, "errors");
    }

    public getTitle():string{
        var returnTitle = (this.errors.length > 1 ) ? 'Multiple errors have occurred.\n' : 'The following error occurred.\n';
        return returnTitle;
    }

    public getMessage():string{
        var returnText = '';
        for( var errorIndex = 0; errorIndex < this.errors.length; errorIndex++ ){
            returnText += 'Name: '+ this.errors.getItemAt(errorIndex).name + '\n';
            returnText += 'Message: '+ this.errors.getItemAt(errorIndex).message + '\n';
            returnText += '\n';
        }
        return returnText;
    }

    public addError(error:Error):void{
        this.errors.addItem( error );
        this.appError = true;
    }

    public clear():void{
        this.errors.clear();
        this.appError = false;
    }
}