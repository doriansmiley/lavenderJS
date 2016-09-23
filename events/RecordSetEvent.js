/**
 * Created by dsmiley on 1/24/14.
 */
Lavender.RecordSetEvent = function( eventType, payload ){
    /*
     payload can contain
     nothing
     */
     Lavender.AbstractEvent.prototype.constructor.call(this, eventType, payload);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend( Lavender.AbstractEvent, Lavender.RecordSetEvent );

Lavender.RecordSetEvent.prototype.clone = function(){
    return new Lavender.RecordSetEvent( this.type, this.payload)
}

Lavender.RecordSetEvent.TOTALRECORDS_CHANGE = 'totalRecordsChange';
Lavender.RecordSetEvent.TOTALPAGES_CHANGE = 'totalPagesChange';
Lavender.RecordSetEvent.PAGE_LIST_CHANGE = 'pageListChange';
Lavender.RecordSetEvent.RESULTS_CHANGE = 'resultsChange';
Lavender.RecordSetEvent.RECORDS_PER_PAGE_CHANGE = 'recordsPerPageChange';
Lavender.RecordSetEvent.SELECTED_PAGE_CHANGE = 'selectedPageChange';
Lavender.RecordSetEvent.RECORDSETS_CHANGE = 'recordsetChange';
Lavender.RecordSetEvent.LOAD_PAGE_DATA = 'loadRecordSetPageData';