/**
 * Created by dsmiley on 5/17/17.
 */
import { Subject } from './observable/Subject';
export declare class AsyncOperationModel extends Subject {
    private _asyncOperationCount;
    private _asyncOperationComplete;
    private _asyncOperationDescription;
    constructor();
    get asyncOperationCount(): number;
    set asyncOperationCount(value: number);
    get asyncOperationComplete(): boolean;
    set asyncOperationComplete(value: boolean);
    get asyncOperationDescription(): string;
    set asyncOperationDescription(value: string);
    addAsyncOperation(description?: string): void;
    removeAsyncOperation(): void;
}
