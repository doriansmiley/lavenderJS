/**
 * Created by dsmiley on 5/17/17.
 */
import {Subject} from './observable/Subject';

export class Config extends Subject{
    private _baseUrl:string;//base http address of application ie http://localhost:3000
    private _webRoot:string = '';//path relative to webroot where the application is deployed

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
}