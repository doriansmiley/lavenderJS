/**
 * Created by dsmiley on 7/12/17.
 */
import {IHttpService} from './IHttpService';
import {ArrayList} from '../../model/list/ArrayList';
import {IResponder} from '../responder/IResponder';
import {IFault} from '../responder/IFault';
import {IResult} from '../responder/IResult';
import {UuidUtils} from '../../util/UuidUtils';

export class AbstractHttpService implements IHttpService{
    public responders:ArrayList = new ArrayList();
    public requestId:string;

    constructor(){

    }

    //Overriden by subclass
    protected success(result:IResult):void{

    }

    //Overriden by subclass
    protected fault(fault:IFault):void{

    }

    public addResponder(responder:IResponder):number{
        if( responder.fault === null || responder.fault ===undefined || responder.success === null || responder.success === undefined ){
            throw new Error('responder must define fault and success methods');
        }
        return this.responders.addItem(responder);
    }

    //stub for override
    public setRequestHeaders(header:string, value:any):void{

    }

    public removeResponder(responder:IResponder):void{
        if( responder.fault === null || responder.fault ===undefined || responder.success === null || responder.success === undefined ){
            throw new Error('responder must define fault and success methods');
        }
        var index = this.responders.indexOf(responder);
        this.responders.removeItemAt(index);
    }

    public send(type:string, url:string, data:any, contentType:string, dataType:string, cache:boolean):string{
        this.requestId = UuidUtils.generateUUID();
        return this.requestId;
    }

    public destroy():void{
        this.responders.clear();
        this.responders = null;
    }
}