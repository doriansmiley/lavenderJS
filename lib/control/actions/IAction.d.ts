/**
 * Created by dsmiley on 5/11/17.
 */
import { IResponder } from '../responder/IResponder';
export interface IAction extends IResponder {
    execute(): string;
    tearDown(): void;
}
