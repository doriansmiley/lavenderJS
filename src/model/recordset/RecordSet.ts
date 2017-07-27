/**
 * Created by dsmiley on 5/12/17.
 */
import {Subject} from '../observable/Subject';
import {CollectionEvent} from '../../events/CollectionEvent';
import {RecordSetEvent} from '../../events/RecordSetEvent';
import {IEvent} from '../../events/IEvent';
import {IList} from '../list/IList';
import {ArrayList} from '../list/ArrayList';
import {ObjectUtils} from '../../util/ObjectUtils';
import {EventDispatcher} from '../../control/EventDispatcher';

export class RecordSet extends Subject implements EventDispatcher{

    public static USER_UPLOAD:string = 'userUpload';
    public static FOTOLIA:string = 'fotolia';
    public static FACEBOOK:string = 'facebook';
    
    private _id:string;
    private _totalRecords:number;
    private _totalPages:number
    private _selectedPage:number;
    private _recordsPerPage:number;
    private _results:IList;
    private _pageList:IList;
    private _createdOn:number;
    private _timeToLive:number;
    private _source:string;
    private _routeController:Object;
    private _intervalId:number;

    public resultsByPage:Object = {};

    //placeholders for mixins, required for the compiler
    handlersByEventName:Object;
    addEventListener: (  event:string, instance:Object, handler:string ) => void;
    canListen: (  eventType:string, instance:Object, handler:string )  => boolean;
    removeEventListener: ( event:string, instance:Object, handler:string )  => void;
    removeAllEventListeners: ( instance:Object )  =>  void;
    dispatch: ( event:IEvent )  =>  void;

    get id():string{
        return this._id;
    }
    set id(val:string){
        this._id = val;
        this.notify(val, "id");
    }

    get totalRecords():number{
        return this._totalRecords;
    }
    set totalRecords(val:number){
        this._totalRecords = val;
        if( this._totalRecords != val ){
            this._totalRecords = val;
            this.notify(val, "totalRecords");
            this.dispatch(new RecordSetEvent(RecordSetEvent.TOTALRECORDS_CHANGE));
        }
    }

    get totalPages():number{
        return this._totalPages;
    }
    set totalPages(val:number){
        if( this._totalPages != val ){
            this._totalPages = val;
            this.notify(val, "totalPages");
            this.dispatch(new RecordSetEvent(RecordSetEvent.TOTALPAGES_CHANGE));
        }
    }

    get selectedPage():number{
        return this._selectedPage;
    }
    set selectedPage(val:number){
        if (this._selectedPage != val) {
            //IMPORTANT: set the value first so responders to the ImageAssetEvent.GET_IMAGE_ASSETS event know what page we need to load data for
            this._selectedPage = val;
            if( !this.pageLoaded( val ) ){
                this.dispatch(new RecordSetEvent(RecordSetEvent.LOAD_PAGE_DATA, {recordSet:this}));
            }
            this.calculatePageList();
            this.notify(val, "selectedPage");
            this.dispatch(new RecordSetEvent(RecordSetEvent.SELECTED_PAGE_CHANGE));
        }
    }

    get recordsPerPage():number{
        return this._recordsPerPage;
    }
    set recordsPerPage(val:number){
        if (this._recordsPerPage != val)
        {
            this._recordsPerPage = val;
            this.renewState();
            this.notify(val, "recordsPerPage");
            this.dispatch(new RecordSetEvent(RecordSetEvent.RECORDS_PER_PAGE_CHANGE));
        }
    }

    get results():IList{
        return this._results;
    }
    set results(val:IList){
        if (this._results != val) {

            if ( this._results!== null && this._results!== undefined )
            {
                this._results.removeEventListener(CollectionEvent.COLLECTION_CHANGE, this, 'resultCollectionChanged');
            }
            this._results = val;
            this.renewState();
            this.selectedPage = 1;
            this._results.addEventListener(CollectionEvent.COLLECTION_CHANGE, this, 'resultCollectionChanged');
            this.notify(val, "results");
            this.dispatch(new RecordSetEvent(RecordSetEvent.RESULTS_CHANGE));
        }
    }

    get createdOn():number{
        return this._createdOn;
    }
    set createdOn(val:number){
        this._createdOn = val;
        this.notify(val, "id");
    }

    get pageList():IList{
        return this._pageList;
    }
    set pageList(val:IList){
        this._pageList = val;
        this.notify(val, "id");
        this.dispatch(new RecordSetEvent(RecordSetEvent.PAGE_LIST_CHANGE));
    }

    get timeToLive():number{
        return this._timeToLive;
    }
    set timeToLive(val:number){
        this._timeToLive = val;
        if( this._intervalId !== null && this._intervalId !== undefined ){
            this.clearInterval();
            //TODO:have this reload data instead of clearing it
            //set the timeout to _timeToLive. This will clear the recordset at the interval
            //calling this accessor multiple times will reset the timeout preserving the records
            this._intervalId = setTimeout(() =>{ this.clear }, val);
        }
        this.notify(val, "id");
    }

    get source():string{
        return this._source;
    }
    set source(val:string){
        this._source = val;
        this.notify(val, "id");
    }

    get routeController():Object{
        return this._routeController;
    }
    set routeController(val:Object){
        this._routeController = val;
        this.notify(val, "id");
    }
    
    constructor(timeToLive:number=NaN, listFunction:any=null){
        super();

        ObjectUtils.mixin(EventDispatcher, RecordSet, this);

        this._timeToLive = timeToLive;
        this._results = ( listFunction ) ? new listFunction() as IList : new ArrayList();
        this._pageList = ( listFunction ) ? new listFunction() as IList : new ArrayList();

        if(!isNaN(this._timeToLive)){
            this._intervalId = setTimeout(()=>{
                this.clear();
            });
        }//func, delay[, param1, param2, ...]
        this._results.addEventListener(CollectionEvent.COLLECTION_CHANGE, this, 'resultCollectionChanged');
    }
    
    private clearInterval():void{
        if( this._intervalId !== null && this._intervalId !== undefined ){
            clearInterval( this._intervalId );
        }
    }

    private clear():void{
        if( this.results!== undefined && this.results !== null ){
            this.results.clear();
        }
        this.totalRecords = 0;
        this.totalPages = 0;
        this.resultsByPage[this.selectedPage] = new ArrayList();
        this.resultsByPage = {};
        this.selectedPage = -1;
        this.renewState();
    }

    private pageLoaded(pageNumber:number):boolean{
        return this.resultsByPage[pageNumber] !== null && this.resultsByPage[pageNumber] !== undefined  && (this.resultsByPage[pageNumber].length == this.recordsPerPage || pageNumber == this.totalPages);
    }

    private calculatePageList():void{
        this.pageList = this.resultsByPage[this.selectedPage];
    }

    private renewState():void{
        this.totalPages = (Math.ceil(this.totalRecords / this.recordsPerPage));
        //loop through each page
        for( let pageIndex = 1; pageIndex <= this.totalPages; pageIndex++){
            let first = (pageIndex - 1) * this.recordsPerPage;
            let last = ((first + this.recordsPerPage) > this.totalRecords) ? this.totalRecords : first + this.recordsPerPage;
            let dp = new ArrayList();
            if (this.results !== null && this.results !== undefined) {
                for (let i = first; i < last; i++) {
                    //because items can be added to the results in a non sequential manner (ie page 5 can be loaded before page 2) we have to check to make sure the items are loaded
                    if( this.results.getItemAt(i) === null || this.results.getItemAt(i) === undefined ){
                        continue;
                    }
                    dp.addItem(this.results.getItemAt(i));
                }
            }
            //if no items were added do not populate the page data index
            if( dp.length > 0 ){
                this.resultsByPage[pageIndex] = dp;
            }
        }
        this.calculatePageList();
        this.dispatch(new RecordSetEvent(RecordSetEvent.RESULTS_CHANGE));
    }

    public resultCollectionChanged(event:CollectionEvent){
        this.renewState();
    }

    public destroy():void{
        this.clearInterval();
        this.results = null;
        this.pageList = null;
        this.resultsByPage = null;
    }

}