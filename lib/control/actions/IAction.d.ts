/**
 * Created by dsmiley on 5/11/17.
 */
import { IResponder } from '../responder/IResponder';
import { IEventDispatcher } from "../../control/IEventDispatcher";
export interface IAction extends IResponder, IEventDispatcher {
    execute(): string;
    tearDown(): void;
}
