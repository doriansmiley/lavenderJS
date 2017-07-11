/**
 * Created by dsmiley on 5/17/17.
 */
import { Subject } from './observable/Subject';
export declare class Config extends Subject {
    private _baseUrl;
    private _webRoot;
    private _parserCode;
    private _exporterCode;
    constructor();
    baseUrl: string;
    webRoot: string;
    parserCode: string;
    exporterCode: string;
}
