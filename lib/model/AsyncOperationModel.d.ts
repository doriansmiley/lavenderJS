/**
 * Created by dsmiley on 5/17/17.
 */
import { Subject } from './observable/Subject';
export declare class AsyncOperationModel extends Subject {
    private _asyncOperationCount;
    private _asyncOperationComplete;
    private _asyncOperationDescription;
    constructor();
    asyncOperationCount: number;
    asyncOperationComplete: boolean;
    asyncOperationDescription: string;
    addAsyncOperation(description?: string): void;
    removeAsyncOperation(): void;
}
