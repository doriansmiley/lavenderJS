/**
 * Created by dsmiley on 5/12/17.
 */
import { Subject } from './observable/Subject';
export declare class ModelLocator extends Subject {
    private _recordsetModel;
    constructor();
    readonly recordsetModel: any;
}
