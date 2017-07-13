/**
 * Created by dsmiley on 7/12/17.
 */
import {IFault} from '../responder/IFault';
export class HttpFault implements IFault{
    public errorObj:any;
    public status:number;
    public message:string;
    public requestId:string;
    
    constructor(errorObj:any, status:number, message:string, requestId:string){
        this.errorObj = errorObj;
        this.status = status;
        this.message = message;
        this.requestId = requestId;
    }
}