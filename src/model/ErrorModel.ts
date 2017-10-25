/**
 * Created by dsmiley on 5/17/17.
 */
import {Subject} from './observable/Subject';
import {ArrayList} from './list/ArrayList';
import {IList} from "./list/IList";

export class ErrorModel extends Subject{

    private _appError:boolean = false;//controls the visibility of app error messages
    private _showConfirmationOption:boolean = false;//this controls whether or not the SpiAlerts directive presents an OK and Cancel button to the end user for confirmation dialogs
    private _errors:IList = new ArrayList();

    constructor(){
        super();
    }


    get appError():boolean {
        return this._appError;
    }

    set appError(value:boolean) {
        this._appError = value;
        this.notify(value, 'appError');
    }

    get showConfirmationOption():boolean {
        return this._showConfirmationOption;
    }

    set showConfirmationOption(value:boolean) {
        this._showConfirmationOption = value;
        this.notify(value, 'showConfirmationOption');
    }

    get errors():IList {
        return this._errors;
    }

    set errors(value:IList) {
        this._errors = value;
        this.notify(value, 'errors');
    }

    public getTitle():string{
        return (this.errors.length > 1 ) ? 'Multiple errors have occurred.\n' : 'The following error occurred.\n';;
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