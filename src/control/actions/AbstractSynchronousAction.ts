/**
 * Created by dsmiley on 7/12/17.
 */
import {IAction} from './IAction';
import {IFault} from '../responder/IFault';
import {IResult} from '../responder/IResult'
import {ErrorModel} from '../../model/ErrorModel';
import {Subject} from '../../model/observable/Subject';
import {EventDispatcher} from '../EventDispatcher';
import {IEvent} from '../../events/IEvent';
import {ObjectUtils} from '../../util/ObjectUtils';
import {ActionSuccessEvent} from '../../events/ActionSuccessEvent';
import {ActionErrorEvent} from '../../events/ActionErrorEvent';
import {UuidUtils} from '../../util/UuidUtils';

export abstract class AbstractSynchronousAction extends Subject implements IAction, EventDispatcher{
    protected errorModel:ErrorModel;

    //placeholders for mixins, required for the compiler
    handlersByEventName:Object;
    addEventListener: (  event:string, instance:Object, handler:string ) => void;
    canListen: (  eventType:string, instance:Object, handler:string )  => boolean;
    removeEventListener: ( event:string, instance:Object, handler:string )  => void;
    removeAllEventListeners: ( instance:Object )  =>  void;
    dispatch: ( event:IEvent )  =>  void;

    constructor(errorModel:ErrorModel){
        super();
        this.errorModel = errorModel;
        ObjectUtils.mixin(EventDispatcher, AbstractSynchronousAction, this);
    }

    public execute():string{
        try {
            this.executeServiceMethod();
            this.dispatchSuccess(this.getResultObj());
            return UuidUtils.generateUUID();//we return an ID just to preserve consistency with the IAction interface definition
        } catch (e) {
            let errorMessage = this.getErrorMessage() + "\n" + e.message + "\n" + e.stack;
            let errorEvent = new ActionErrorEvent(ActionErrorEvent.ERROR, {message:errorMessage});
            this.dispatch(errorEvent);
            let error = {name: 'error', message: errorMessage};
            this.errorModel.errors.addItem(error);
            this.errorModel.appError = true;
        } finally {
            this.tearDown();
        }
    }

    //required by interface, but not used in sync actions
    public success(result:IResult):void{

    }

    //required by interface, but not used in sync actions
    public fault(fault:IFault):void{

    }

    //required by interface, but not used in sync actions
    public onProgress(progress:number){

    }

    //Override this method in subclasses
    protected getResultObj():Object{
        return null;
    }

    protected dispatchSuccess(result):void{
        //notify listeners and include all known values
        let doneEvent = new ActionSuccessEvent(ActionSuccessEvent.SUCCESS,{result:result});
        this.dispatch(doneEvent);
    }

    //Override this method in subclasses
    protected executeServiceMethod():void{
        
    }

    //Override this method in subclasses
    protected getErrorMessage():string{
        return null;
    }

    //Override this method in subclasses
    protected getExecErrorString():string{
        return 'Lavender.AbstractSynchronousAction error';
    }

    protected executionError():void{
        // These properties weren't injected or supplied in the constructor or manually.
        // They are needed so we throw an error.
        throw new Error(this.getExecErrorString());
    }

    public tearDown():void{
        this.errorModel = null;
    }
}