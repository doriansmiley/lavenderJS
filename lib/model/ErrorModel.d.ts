/**
 * Created by dsmiley on 5/17/17.
 */
import { Subject } from './observable/Subject';
import { IList } from "./list/IList";
export declare class ErrorModel extends Subject {
    private _appError;
    private _showConfirmationOption;
    private _errors;
    constructor();
    appError: boolean;
    showConfirmationOption: boolean;
    errors: IList;
    getTitle(): string;
    getMessage(): string;
    addError(error: Error): void;
    clear(): void;
}
