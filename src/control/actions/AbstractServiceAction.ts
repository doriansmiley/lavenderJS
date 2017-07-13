/**
 * Created by dsmiley on 7/12/17.
 */
import {IAction} from './IAction';
import {IService} from '../service/IService';
import {IFault} from '../responder/IFault';
import {IResult} from '../responder/IResult';
import {AsyncOperationModel} from '../../model/AsyncOperationModel';
import {ErrorModel} from '../../model/ErrorModel';
import {Subject} from '../../model/observable/Subject';
import {IParser} from '../../serialization/IParser';
import {AbstractEventDispatcher} from '../../control/AbstractEventDispatcher';
import {IEvent} from '../../events/IEvent';
import {ObjectUtils} from '../../util/ObjectUtils';
import {ActionSuccessEvent} from '../../events/ActionSuccessEvent';
import {ActionErrorEvent} from '../../events/ActionErrorEvent';

export abstract class AbstractServiceAction extends Subject implements IAction, AbstractEventDispatcher{
    protected service:IService;
    protected opModel:AsyncOperationModel;
    protected parser:IParser;
    protected errorModel:ErrorModel;

    //placeholders for mixins, required for the compiler
    handlersByEventName:Object;
    addEventListener: (  event:string, instance:Object, handler:string ) => void;
    canListen: (  eventType:string, instance:Object, handler:string )  => boolean;
    removeEventListener: ( event:string, instance:Object, handler:string )  => void;
    removeAllEventListeners: ( instance:Object )  =>  void;
    dispatch: ( event:IEvent )  =>  void;

    constructor(service:IService, opModel:AsyncOperationModel, parser:IParser, errorModel:ErrorModel){
        super();
        this.service = service;
        this.opModel = opModel;
        this.parser = parser;
        this.errorModel = errorModel;
        ObjectUtils.mixin(AbstractEventDispatcher, AbstractServiceAction, this);
    }

    public execute():string{
        if (this.service === null || this.service === undefined || this.opModel === null || this.opModel === undefined || this.parser === null || this.parser === undefined) {
            this.executionError();
        }

        this.opModel.asyncOperationComplete = false;
        this.opModel.asyncOperationCount += 1;

        return this.executeServiceMethod();
    }

    //method must return a requestID
    //Override this method in subclasses
    protected executeServiceMethod():string{
        return null;
    }

    //Override this method in subclasses
    //it should parse the result and return the resulting Object tree
    protected parseResponse(result:IResult):Object{
        return null;
    }
    
    protected dispatchSuccess(parsedResult:Object):void{
        let doneEvent = new ActionSuccessEvent(ActionSuccessEvent.SUCCESS,{result:parsedResult});
        this.dispatch(doneEvent);
    }

    public success(result:IResult):void{
        try {
            //result is instance of Lavender.HttpSuccess
            let parsedResult = this.parseResponse(result);
            this.dispatchSuccess(parsedResult);
        } catch (e) {
            let errorMessage = this.getErrorMessage() + "\n" + e.message + "\n" + e.stack;
            let errorEvent = new ActionErrorEvent(ActionErrorEvent.ERROR, {message:errorMessage});
            this.dispatch(errorEvent);
            let error = {name: 'error', message: errorMessage};
            this.errorModel.errors.addItem(error);
            this.errorModel.appError = true;
        } finally {
            this.opModel.asyncOperationCount -= 1;
            if (this.opModel.asyncOperationCount == 0) {
                this.opModel.asyncOperationComplete = true;
            }
            this.tearDown();
        }
    }

    public fault(fault:IFault):void{
        //fault is an instance of Lavender.HttpFault
        this.opModel.asyncOperationCount -= 1;
        if (this.opModel.asyncOperationCount == 0) {
            this.opModel.asyncOperationComplete = true;
        }
        let errorMessage = this.getFaultString() + fault.message;
        let errorEvent = new ActionErrorEvent(ActionErrorEvent.ERROR, {message:errorMessage});
        this.dispatch(errorEvent);
        let error = {name: fault.status, message: errorMessage};
        this.errorModel.errors.addItem(error);
        this.errorModel.appError = true;
        this.tearDown();
    }

    //Override this method in subclasses
    protected getFaultString():string{
        return null;
    }

    //Override this method in subclasses
    protected getErrorMessage():string{
        return null;
    }

    protected executionError():void{
        // These properties weren't injected or supplied in the constructor or manually.
        // They are needed so we throw an error.
        let msg = this.getExecErrorString();
        if (this.service === null || this.service === undefined) {
            msg += " service";
        }
        if (this.opModel === null || this.opModel) {
            msg += ", opModel";
        }
        if (this.parser === null || this.parser === undefined) {
            msg += ", parser";
        }

        msg += ".";

        throw new Error(msg);
    }

    //Override this method in subclasses
    protected getExecErrorString():string{
        return 'Lavender.AbstractServiceAction.prototype.executionError: the following are required: ';
    }

    public tearDown():void{
        this.opModel = null;
        this.service = null;
        this.parser = null;
        this.errorModel = null;
        this.binder.unbindAll();
    }
}