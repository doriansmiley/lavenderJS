/**
 * Created by dsmiley on 7/12/17.
 */
import {IResult} from '../responder/IResult';
export class HttpSuccess implements IResult{
    public resultObj:any;
    public status:number;
    public requestId:string;
    
    constructor(resultObj:any, status:number, requestId:string){
        this.resultObj = resultObj;
        this.status = status;
        this.requestId = requestId;
    }
}