/**
 * Created by dsmiley on 5/17/17.
 */
import { Subject } from './observable/Subject';
import { AsyncOperationModel } from "./AsyncOperationModel";
import { ErrorModel } from "./ErrorModel";
export declare class Config extends Subject {
    private _baseUrl;
    private _webRoot;
    private _parserCode;
    private _exporterCode;
    private _token;
    private _serviceCode;
    private _asyncOperationModel;
    private _errorModel;
    constructor();
    get errorModel(): ErrorModel;
    set errorModel(value: ErrorModel);
    get asyncOperationModel(): AsyncOperationModel;
    set asyncOperationModel(value: AsyncOperationModel);
    get serviceCode(): string;
    set serviceCode(value: string);
    get baseUrl(): string;
    set baseUrl(value: string);
    get webRoot(): string;
    set webRoot(value: string);
    get parserCode(): string;
    set parserCode(value: string);
    get exporterCode(): string;
    set exporterCode(value: string);
    get token(): string;
    set token(value: string);
}
