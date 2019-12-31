/**
 * Created by dsmiley on 6/30/17.
 */
import { Subject } from '../model/observable/Subject';
export declare class Geometry extends Subject {
    private _left;
    private _top;
    private _width;
    private _height;
    constructor(values?: any);
    get left(): number;
    set left(value: number);
    get top(): number;
    set top(value: number);
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    update(values?: Object): void;
    getDefinedValues(): Object;
}
