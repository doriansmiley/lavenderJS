/**
 * Created by dsmiley on 7/12/17.
 */
import { IAction } from './IAction';
import { IHttpService } from '../service/IHttpService';
import { IFault } from '../responder/IFault';
import { IResult } from '../responder/IResult';
import { AsyncOperationModel } from '../../model/AsyncOperationModel';
import { ErrorModel } from '../../model/ErrorModel';
import { Subject } from '../../model/observable/Subject';
import { IParser } from '../../serialization/IParser';
import { EventDispatcher } from '../EventDispatcher';
import { IEvent } from '../../events/IEvent';
export declare abstract class AbstractServiceAction extends Subject implements IAction, EventDispatcher {
    protected service: IHttpService;
    protected opModel: AsyncOperationModel;
    protected parser: IParser;
    protected errorModel: ErrorModel;
    handlersByEventName: Object;
    addEventListener: (event: string, instance: Object, handler: string) => void;
    canListen: (eventType: string, instance: Object, handler: string) => boolean;
    removeEventListener: (event: string, instance: Object, handler: string) => void;
    removeAllEventListeners: (instance: Object) => void;
    dispatch: (event: IEvent) => void;
    constructor(service: IHttpService, opModel: AsyncOperationModel, parser: IParser, errorModel: ErrorModel);
    execute(): string;
    protected executeServiceMethod(): string;
    protected parseResponse(result: IResult): Object;
    protected dispatchSuccess(parsedResult: Object): void;
    success(result: IResult): void;
    fault(fault: IFault): void;
    onProgress(progress: number): void;
    protected getFaultString(): string;
    protected getErrorMessage(): string;
    protected executionError(): void;
    protected getExecErrorString(): string;
    tearDown(): void;
}
