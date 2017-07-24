/**
 * Created by dsmiley on 7/12/17.
 */
import { IService } from '../service/IService';
import { ArrayList } from '../../model/list/ArrayList';
import { IResponder } from '../responder/IResponder';
import { IFault } from '../responder/IFault';
import { IResult } from '../responder/IResult';
export declare class AbstractHttpService implements IService {
    responders: ArrayList;
    requestId: string;
    constructor();
    protected success(result: IResult): void;
    protected fault(fault: IFault): void;
    addResponder(responder: IResponder): number;
    removeResponder(responder: IResponder): void;
    send(type: string, url: string, data: any, contentType: string, dataType: string, cache: boolean): string;
    destroy(): void;
}
