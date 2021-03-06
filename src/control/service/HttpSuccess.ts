/**
 * Created by dsmiley on 7/12/17.
 */
import {IResult} from '../responder/IResult';
export class HttpSuccess implements IResult{
    public resultObj:any;
    public status:number;
    public requestId:string;
    
    constructor(resultObj:any, status:number, requestId:string){
        if( resultObj === null || resultObj === undefined && status != 304){
            throw new Error('resultObj is required');
        }
        if( status === null || status === undefined ){
            throw new Error('status is required');
        }
        this.resultObj = resultObj;
        this.status = status;
        this.requestId = requestId;
    }
}