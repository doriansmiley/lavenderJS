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
    get appError(): boolean;
    set appError(value: boolean);
    get showConfirmationOption(): boolean;
    set showConfirmationOption(value: boolean);
    get errors(): IList;
    set errors(value: IList);
    getTitle(): string;
    getMessage(): string;
    addError(error: Error): void;
    clear(): void;
}
