/**
 * Created by dsmiley on 1/28/14.
 * The story serializer will be responsible for appending style to the DOM using https://github.com/f0r4y312/jquery-stylesheet
 * By the time we get to here we can assume the CSS equivalents have been added and can be resolved once a view component is generated from this model object
 * One alternative to this approach would be having the server generate the CSS styles and specify a service call in a link URL. This would be optimal to avoid code bloat and processing
 * this is very similar to the approach we are taking with font embeds. Perhaps v2.
 *
 * We've omitted vertical alig as it was a hack to resolve and issue with TLF unro/redo
 */
Lavender.RecordSet = function (timeToLive, listFunction) {
    if (timeToLive === null || timeToLive === undefined) {
        timeToLive = NaN;//default to one hour
    }
    if (listFunction === null || listFunction === undefined) {
        listFunction = Lavender.ArrayList;//default to Lavender.ArrayList
    }
    var _id;//String
    var _totalRecords;//Number
    var _totalPages;//Number
    var _selectedPage;//Number
    var _recordsPerPage;//Number
    var _results = new listFunction();
    var _pageList = new listFunction();
    var _createdOn;//Date
    var _timeToLive;//Number
    var _source;//String
    var _routeController;//Object, used to load data from the API source

    this.resultsByPage = {};
    this.cacheTimer = undefined;
    //TODO:have this reload data instead of clearing it
    if(!isNaN(timeToLive)){
        this.intervalId = setTimeout(this.clear.bind(this), timeToLive);
    }//func, delay[, param1, param2, ...]
    _results.addEventListener(Lavender.CollectionEvent.COLLECTION_CHANGE, this, 'resultCollectionChanged');

    Lavender.Subject.prototype.constructor.call(this);
    Lavender.ObjectUtils.mixin(Lavender.AbstractEventDispatcher, Lavender.RecordSet, this);

    this.addProperties({
        routeController: {
            get: function () {
                return _routeController;
            },
            set: function (val) {
                _routeController = val;
                this.Notify(val, "routeController");
            }
        },
        source: {
            get: function () {
                return _source;
            },
            set: function (val) {
                _source = val;
                this.Notify(val, "source");
            }
        },
        timeToLive: {
            get: function () {
                return _timeToLive;
            },
            set: function (val) {
                _timeToLive = val;
                if( this.intervalId !== null && this.intervalId !== undefined ){
                    clearInterval( this.intervalId );
                    //TODO:have this reload data instead of clearing it
                    this.intervalId = setTimeout(this.clear.bind(this), val);//func, delay[, param1, param2, ...]
                }
                this.Notify(val, "timeToLive");
            }
        },
        createdOn: {
            get: function () {
                return _createdOn;
            },
            set: function (val) {
                _createdOn = val;
                this.Notify(val, "createdOn");
            }
        },
        pageList: {
            get: function () {
                return _pageList;
            },
            set: function (val) {
                _pageList = val;
                this.Notify(val, "pageList");
                this.dispatch(new Lavender.RecordSetEvent(Lavender.RecordSetEvent.PAGE_LIST_CHANGE));
            }
        },
        results: {
            get: function () {
                return _results;
            },
            set: function (val) {
                if (_results != val) {

                    if ( _results!== null && _results!== undefined )
                    {
                        _results.removeEventListener(Lavender.CollectionEvent.COLLECTION_CHANGE, this, 'resultCollectionChanged');
                    }
                    _results = val;
                    this.renewState();
                    this.selectedPage = 1;
                    _results.addEventListener(Lavender.CollectionEvent.COLLECTION_CHANGE, this, 'resultCollectionChanged');
                    this.Notify(val, "results");
                    this.dispatch(new Lavender.RecordSetEvent(Lavender.RecordSetEvent.RESULTS_CHANGE));
                }
            }
        },
        recordsPerPage: {
            get: function () {
                return _recordsPerPage;
            },
            set: function (val) {
                if (_recordsPerPage != val)
                {
                    _recordsPerPage = val;
                    this.renewState();
                    this.Notify(val, "recordsPerPage");
                    this.dispatch(new Lavender.RecordSetEvent(Lavender.RecordSetEvent.RECORDS_PER_PAGE_CHANGE));
                }
            }
        },
        selectedPage: {
            get: function () {
                return _selectedPage;
            },
            set: function (val) {
                if (_selectedPage != val) {
                    //IMPORTANT: set the value first so responders to the Lavender.ImageAssetEvent.GET_IMAGE_ASSETS event know what page we need to load data for
                    _selectedPage = val;
                    if( !this.pageLoaded( val ) ){
                        this.dispatch(new Lavender.RecordSetEvent(Lavender.RecordSetEvent.LOAD_PAGE_DATA, {recordSet:this}));
                    }
                    this.calculatePageList();
                    this.Notify(val, "selectedPage");
                    this.dispatch(new Lavender.RecordSetEvent(Lavender.RecordSetEvent.SELECTED_PAGE_CHANGE));
                }
            }
        },
        totalPages: {
            get: function () {
                return _totalPages;
            },
            set: function (val) {
                if( _totalPages != val ){
                    _totalPages = val;
                    this.Notify(val, "totalPages");
                    this.dispatch(new Lavender.RecordSetEvent(Lavender.RecordSetEvent.TOTALPAGES_CHANGE));
                }
            }
        },
        totalRecords: {
            get: function () {
                return _totalRecords;
            },
            set: function (val) {
                if( _totalRecords != val ){
                    _totalRecords = val;
                    this.Notify(val, "totalRecords");
                    this.dispatch(new Lavender.RecordSetEvent(Lavender.RecordSetEvent.TOTALRECORDS_CHANGE));
                }
            }
        },
        id: {
            get: function () {
                return _id;
            },
            set: function (val) {
                _id = val;
                this.Notify(val, "id");
            }
        }
    });
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.Subject, Lavender.RecordSet);

Lavender.RecordSet.prototype.calculatePageList = function () {
    this.pageList = this.resultsByPage[this.selectedPage];
}

Lavender.RecordSet.prototype.clearInterval = function () {
    if( this.intervalId !== null && this.intervalId !== undefined ){
        clearInterval( this.intervalId );
        this.intervalId = setTimeout(this.clear, val);//func, delay[, param1, param2, ...]
    }
}

Lavender.RecordSet.prototype.pageLoaded = function ( pageNumber ) {
    return this.resultsByPage[pageNumber] !== null && this.resultsByPage[pageNumber] !== undefined  && (this.resultsByPage[pageNumber].length() == this.recordsPerPage || pageNumber == this.totalPages);
}


Lavender.RecordSet.prototype.clear = function()
{
    if( this.results!== undefined && this.results !== null ){
        this.results.clear();
    }
    this.totalRecords = 0;
    this.totalPages = 0;
    this.resultsByPage[this.selectedPage] = new Lavender.ArrayList();
    this.resultsByPage = {};
    this.selectedPage = -1;
    this.renewState();
}

Lavender.RecordSet.prototype.renewState = function () {
    this.totalPages = (Math.ceil(this.totalRecords / this.recordsPerPage));
    //loop through each page
    for( var pageIndex = 1; pageIndex <= this.totalPages; pageIndex++){
        var first = (pageIndex - 1) * this.recordsPerPage;
        var last = ((first + this.recordsPerPage) > this.totalRecords) ? this.totalRecords : first + this.recordsPerPage;
        var dp = new Lavender.ArrayList();
        if (this.results !== null && this.results !== undefined) {
            for (var i = first; i < last; i++) {
                //because items can be added to the results in a non sequential manner (ie page 5 can be loaded before page 2) we have to check to make sure the items are loaded
                if( this.results.getItemAt(i) === null || this.results.getItemAt(i) === undefined ){
                    continue;
                }
                dp.addItem(this.results.getItemAt(i));
            }
        }
        //if no items were added do not populate the page data index
        if( dp.length() > 0 ){
            this.resultsByPage[pageIndex] = dp;
        }
    }
    this.calculatePageList();
    this.dispatch(new Lavender.RecordSetEvent(Lavender.RecordSetEvent.RESULTS_CHANGE));
}

Lavender.RecordSet.prototype.resultCollectionChanged = function (event) {
    this.renewState();
}

Lavender.RecordSet.prototype.destroy = function () {
    this.clearInterval();
    this.results = null;
    this.pageList = null;
    this.resultsByPage = null;
    this.cacheTimer = null;
}

Lavender.RecordSet.USER_UPLOAD = 'userUpload';
Lavender.RecordSet.FOTOLIA = 'fotolia';
Lavender.RecordSet.FACEBOOK = 'facebook';