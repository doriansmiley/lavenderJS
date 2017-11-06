/**
 * Created by dsmiley on 7/12/17.
 */
import {HttpSuccess} from './HttpSuccess';
import {HttpFault} from './HttpFault';
import {AbstractHttpService} from '../service/AbstractHttpService';
import {IFault} from '../responder/IFault';
import {IResult} from '../responder/IResult';

export class XhrHttpService extends AbstractHttpService{

    private xhrRequest:XMLHttpRequest;
    private async:boolean;
    private notifyOnProgress:boolean;

    constructor(async:boolean=true, notifyOnProgress:boolean=false){
        super();
        this.xhrRequest = new XMLHttpRequest();
        this.async = async;
        this.notifyOnProgress = notifyOnProgress;
    }

    private addEventListeners():void{
        if( this.notifyOnProgress ){
            this.xhrRequest.addEventListener("progress", this.updateProgress, false);
        }
        this.xhrRequest.addEventListener("load", this.load, false);
        this.xhrRequest.addEventListener("error", this.onXhrFault, false);
    }

    private removeEventListeners():void{
        this.xhrRequest.removeEventListener("load", this.load, false);
        this.xhrRequest.removeEventListener("error", this.onXhrFault, false);
        this.xhrRequest.removeEventListener("progress", this.updateProgress, false);
    }

    public setRequestHeaders(header:string, value:any):void{
        this.xhrRequest.setRequestHeader(header, value);
    }

    public success(result:IResult):void{
        if( this.xhrRequest.status != 200 ){
            //errorObj:any, status:number, message:string, requestId:string
            let faultObj = new HttpFault(this.xhrRequest.response, this.xhrRequest.status, this.xhrRequest.responseText, this.requestId);
            this.fault(faultObj);
            return;
        }
        let sucessObj = new HttpSuccess(this.xhrRequest.response, this.xhrRequest.status, this.requestId);
        for (let responderIndex = 0; responderIndex < this.responders.length; responderIndex++) {
            let responder = this.responders.getItemAt(responderIndex);
            responder.success(sucessObj);
        }
        this.destroy();
    }

    public fault(fault:IFault):void{
        for (let responderIndex = 0; responderIndex < this.responders.length; responderIndex++) {
            let responder = this.responders.getItemAt(responderIndex);
            responder.fault(fault);
        }
        this.destroy();
    }

    public load(event):void{
        if( this.notifyOnProgress ){
            for (let responderIndex = 0; responderIndex < this.responders.length; responderIndex++) {
                let responder = this.responders.getItemAt(responderIndex);
                responder.onProgress( 100, this.requestId );
            }
        }
    }
    
    public updateProgress(event):void{
        //event.lengthComputable seems to always be false, this might be because the service is not sending back progress events though
        //so I've commented it our for now
        //if (event.lengthComputable) {
        let percentComplete = event.loaded / ((event.total > 0) ? event.total : event.loaded); //prevent division by zero when !event.lengthComputable
        for (let responderIndex = 0; responderIndex < this.responders.length; responderIndex++) {
            let responder = this.responders.getItemAt(responderIndex);
            responder.onProgress( percentComplete, this.requestId );
        }
        //}
    }

    public send(type:string, url:string, data:any, contentType:string, dataType:XMLHttpRequestResponseType, cache:boolean=false):string{
        let requestId:string = super.send(type, url, data, contentType, dataType, cache);
        this.addEventListeners();
        this.xhrRequest.onreadystatechange = function( event ){
            if( this.xhrRequest.readyState == 4 ){
                this.success(this.xhrRequest.response);
            }
        }.bind(this);
        this.xhrRequest.open( type, url, this.async );
        if( dataType !== null ){
            this.xhrRequest.responseType = dataType;
        }
        if( contentType !== null ){
            this.xhrRequest.setRequestHeader("Content-Type", contentType);
        }
        this.xhrRequest.send( data );
        return requestId;
    }

    public onXhrFault(event):void{
        let faultObj = new HttpFault(this.xhrRequest.response, this.xhrRequest.status, this.xhrRequest.responseText, this.requestId);
        this.fault(faultObj);
    }

    public abort():void{
        this.xhrRequest.onreadystatechange = null;
        this.removeEventListeners();
        this.xhrRequest.abort();
        this.destroy();
    }

    public destroy():void{
        super.destroy();
        this.removeEventListeners();
        this.xhrRequest.onreadystatechange = null;
        this.xhrRequest = null;
    }
}