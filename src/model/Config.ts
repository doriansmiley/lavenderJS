/**
 * Created by dsmiley on 5/17/17.
 */
import {Subject} from './observable/Subject';

export class Config extends Subject{
    private _baseUrl:string;//base http address of application ie http://localhost:3000
    private _webRoot:string = '';//path relative to webroot where the application is deployed
    private _parserCode:string = undefined;//used to handle service results using a factory patter, see lotusJS examples
    private _exporterCode:string = undefined;//used to serialize objects for service payloads using a factory patter, see lotusJS examples

    constructor(){
        super();
    }

    get baseUrl():string{
        return this._baseUrl;
    }
    set baseUrl(value:string){
        this._baseUrl = value;
        this.notify(value, "baseUrl");
    }

    get webRoot():string{
        return this._webRoot;
    }
    set webRoot(value:string){
        this._webRoot = value;
        this.notify(value, "webRoot");
    }

    get parserCode():string{
        return this._parserCode;
    }
    set parserCode(value:string){
        this._parserCode = value;
        this.notify(value, "parserCode");
    }

    get exporterCode():string{
        return this._exporterCode;
    }
    set exporterCode(value:string){
        this._exporterCode = value;
        this.notify(value, "exporterCode");
    }
}