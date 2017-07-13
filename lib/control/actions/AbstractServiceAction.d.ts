/**
 * Created by dsmiley on 7/12/17.
 */
import { IAction } from './IAction';
import { IService } from '../service/IService';
import { IFault } from '../responder/IFault';
import { IResult } from '../responder/IResult';
import { AsyncOperationModel } from '../../model/AsyncOperationModel';
import { ErrorModel } from '../../model/ErrorModel';
import { Subject } from '../../model/observable/Subject';
import { IParser } from '../../serialization/IParser';
import { AbstractEventDispatcher } from '../../control/AbstractEventDispatcher';
import { IEvent } from '../../events/IEvent';
export declare abstract class AbstractServiceAction extends Subject implements IAction, AbstractEventDispatcher {
    protected service: IService;
    protected opModel: AsyncOperationModel;
    protected parser: IParser;
    protected errorModel: ErrorModel;
    handlersByEventName: Object;
    addEventListener: (event: string, instance: Object, handler: string) => void;
    canListen: (eventType: string, instance: Object, handler: string) => boolean;
    removeEventListener: (event: string, instance: Object, handler: string) => void;
    removeAllEventListeners: (instance: Object) => void;
    dispatch: (event: IEvent) => void;
    constructor(service: IService, opModel: AsyncOperationModel, parser: IParser, errorModel: ErrorModel);
    execute(): string;
    protected executeServiceMethod(): string;
    protected parseResponse(result: IResult): Object;
    protected dispatchSuccess(parsedResult: Object): void;
    success(result: IResult): void;
    fault(fault: IFault): void;
    protected getFaultString(): string;
    protected getErrorMessage(): string;
    protected executionError(): void;
    protected getExecErrorString(): string;
    tearDown(): void;
}
