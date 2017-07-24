/**
 * Created by dsmiley on 5/12/17.
 */
import {IEvent} from './IEvent';
import {AbstractEvent} from './AbstractEvent';

export class RecordSetEvent extends AbstractEvent{

    constructor(type:string, payload?:Object){
        super(type, payload)
    }

    public static TOTALRECORDS_CHANGE:string = 'totalRecordsChange';
    public static TOTALPAGES_CHANGE:string = 'totalPagesChange';
    public static PAGE_LIST_CHANGE:string = 'pageListChange';
    public static RESULTS_CHANGE:string = 'resultsChange';
    public static RECORDS_PER_PAGE_CHANGE:string = 'recordsPerPageChange';
    public static SELECTED_PAGE_CHANGE:string = 'selectedPageChange';
    public static RECORDSETS_CHANGE:string = 'recordsetChange';
    public static LOAD_PAGE_DATA:string = 'loadRecordSetPageData';

    clone(type:string, payload:Object):IEvent{
        return new RecordSetEvent(this.type, this.payload)
    }
}