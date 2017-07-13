/**
 * Created by dsmiley on 7/12/17.
 */
import { IAction } from './IAction';
import { IFault } from '../responder/IFault';
import { IResult } from '../responder/IResult';
import { ErrorModel } from '../../model/ErrorModel';
import { Subject } from '../../model/observable/Subject';
import { AbstractEventDispatcher } from '../../control/AbstractEventDispatcher';
import { IEvent } from '../../events/IEvent';
export declare abstract class AbstractSynchronousAction extends Subject implements IAction, AbstractEventDispatcher {
    protected errorModel: ErrorModel;
    handlersByEventName: Object;
    addEventListener: (event: string, instance: Object, handler: string) => void;
    canListen: (eventType: string, instance: Object, handler: string) => boolean;
    removeEventListener: (event: string, instance: Object, handler: string) => void;
    removeAllEventListeners: (instance: Object) => void;
    dispatch: (event: IEvent) => void;
    constructor(errorModel: ErrorModel);
    execute(): string;
    success(result: IResult): void;
    fault(fault: IFault): void;
    protected getResultObj(): Object;
    protected dispatchSuccess(result: any): void;
    protected executeServiceMethod(): void;
    protected getErrorMessage(): string;
    protected getExecErrorString(): string;
    protected executionError(): void;
    tearDown(): void;
}
