/**
 * Created by dsmiley on 5/11/17.
 */
import { IResponder } from '../responder/IResponder';
export interface IService {
    requestId: string;
    addResponder(reponder: IResponder): void;
    send(requestObject: Object): string;
    destroy(): void;
}
