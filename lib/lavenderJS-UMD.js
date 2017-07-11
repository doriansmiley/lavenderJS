(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Lavender", [], factory);
	else if(typeof exports === 'object')
		exports["Lavender"] = factory();
	else
		root["Lavender"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 4/18/17.
 */
var Binder_1 = __webpack_require__(7);
var Subject = (function () {
    function Subject() {
        this.observerHash = {};
        this.binder = new Binder_1.Binder();
    }
    ;
    Subject.prototype.notify = function (value, chain) {
        if (!this.observerHash.hasOwnProperty(chain) || this.observerHash[chain] == null || this.observerHash[chain] == undefined) {
            //property is not bound
            return;
        }
        this.observerHash[chain].forEach(function (observer) {
            observer.update(value, chain);
        });
    };
    Subject.prototype.addObserver = function (observer) {
        if (!this.observerHash.hasOwnProperty(observer.chain) || this.observerHash[observer.chain] == null || this.observerHash[observer.chain] == undefined) {
            this.observerHash[observer.chain] = [];
            //TODO: Once ArrayList is ported over comment this back in and remove the line above
            //this.observerHash[observer.chain] = new Lavender.ArrayList ();
        }
        this.observerHash[observer.chain].push(observer);
        //TODO: Once ArrayList is ported over comment this back in and remove the line above
        //this.observerHash[observer.chain].addItem(observer);
    };
    Subject.prototype.removeObserver = function (observer) {
        if (!this.observerHash.hasOwnProperty(observer.chain) || this.observerHash[observer.chain] == null || this.observerHash[observer.chain] == undefined) {
            throw 'Property not found in registered observers';
        }
        //TODO: Once ArrayList is ported over comment this back in and remove everything above to line 41
        //this.observerHash[observer.chain].removeItemAt(this.observerHash[observer.chain].indexOf(observer, 0));
        //TODO: Once ArrayList is ported over remove this
        var m_count = this.observerHash[observer.chain].length;
        var index = this.observerHash[observer.chain].indexOf(observer, 0);
        if (m_count > 0 && index > -1 && index < this.observerHash[observer.chain].length) {
            switch (index) {
                case 0:
                    this.observerHash[observer.chain].shift();
                    break;
                case m_count - 1:
                    this.observerHash[observer.chain].pop();
                    break;
                default:
                    var head = this.observerHash[observer.chain].slice(0, index);
                    var tail = this.observerHash[observer.chain].slice(index + 1);
                    this.observerHash[observer.chain] = head.concat(tail);
                    break;
            }
        }
    };
    return Subject;
}());
exports.Subject = Subject;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AbstractEvent = (function () {
    function AbstractEvent(type, payload) {
        this.type = type;
        this.payload = payload;
    }
    return AbstractEvent;
}());
exports.AbstractEvent = AbstractEvent;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 5/11/17.
 */
var ObjectUtils = (function () {
    function ObjectUtils() {
    }
    ;
    ObjectUtils.extend = function (base, sub) {
        // Avoid instantiating the base class just to setup inheritance
        // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
        sub.prototype = Object.create(base.prototype);
        // Remember the constructor property was set wrong, let's fix it
        sub.prototype.constructor = sub;
    };
    ObjectUtils.mixin = function (base, sub, subInstance, overwriteInstanceVariables) {
        if (overwriteInstanceVariables === void 0) { overwriteInstanceVariables = false; }
        var objectToExtend = new base();
        //Grab methods and properties defined through prototypal inheritance
        for (var prop in base.prototype) {
            if (base.prototype.hasOwnProperty(prop)) {
                sub.prototype[prop] = base.prototype[prop];
            }
        }
        //grab instance variables and function
        for (var prop in objectToExtend) {
            if (objectToExtend.hasOwnProperty(prop)) {
                //if an object defines an instance variable or function we don't want to overwrite it unless specified
                if (subInstance[prop] !== null && subInstance[prop] !== undefined && !overwriteInstanceVariables) {
                    continue;
                }
                subInstance[prop] = objectToExtend[prop];
            }
        }
        return subInstance;
    };
    ObjectUtils.hasFunction = function (obj, prop) {
        return (obj && typeof obj[prop] === 'function');
    };
    ObjectUtils.isPropDefined = function (obj, prop) {
        if (obj && obj.hasOwnProperty(prop) && obj[prop] != undefined && obj[prop] != null && obj[prop] != NaN) {
            return true;
        }
        return false;
    };
    return ObjectUtils;
}());
exports.ObjectUtils = ObjectUtils;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Listener = (function () {
    function Listener(handler, instance) {
        this.handler = handler;
        this.instance = instance;
    }
    return Listener;
}());
var AbstractEventDispatcher = (function () {
    function AbstractEventDispatcher() {
        this.handlersByEventName = {};
    }
    ;
    AbstractEventDispatcher.prototype.addEventListener = function (event, instance, handler) {
        if (this.handlersByEventName[event] === null || this.handlersByEventName[event] === undefined) {
            this.handlersByEventName[event] = [];
        }
        this.handlersByEventName[event].push(new Listener(handler, instance));
    };
    AbstractEventDispatcher.prototype.canListen = function (eventType, instance, handler) {
        var canListen = false;
        if (this.handlersByEventName[eventType] !== null && this.handlersByEventName[eventType] !== undefined) {
            for (var handlerIndex = 0; handlerIndex < this.handlersByEventName[eventType].length; handlerIndex++) {
                var handlerFunctionName = this.handlersByEventName[eventType][handlerIndex].handler;
                var objectInstance = this.handlersByEventName[eventType][handlerIndex].instance;
                if (handlerFunctionName == handler && objectInstance == instance) {
                    canListen = true;
                    break;
                }
            }
        }
        return canListen;
    };
    AbstractEventDispatcher.prototype.removeEventListener = function (event, instance, handler) {
        if (this.handlersByEventName[event] === null || this.handlersByEventName[event] === undefined) {
            return;
        }
        for (var handlerIndex = 0; handlerIndex < this.handlersByEventName[event].length; handlerIndex++) {
            if (this.handlersByEventName[event][handlerIndex].instance == instance && this.handlersByEventName[event][handlerIndex].handler == handler) {
                var itemToRemove = this.handlersByEventName[event][handlerIndex];
                switch (handlerIndex) {
                    case 0:
                        this.handlersByEventName[event].shift();
                        break;
                    case this.handlersByEventName[event].length - 1:
                        this.handlersByEventName[event].pop();
                        break;
                    default:
                        var head = this.handlersByEventName[event].slice(0, handlerIndex);
                        var tail = this.handlersByEventName[event].slice(handlerIndex + 1);
                        this.handlersByEventName[event] = head.concat(tail);
                        break;
                }
                //there can be only one item matching event, instance, handler so we return here
                return itemToRemove;
            }
        }
    };
    AbstractEventDispatcher.prototype.removeAllEventListeners = function (instance) {
        for (var event_1 in this.handlersByEventName) {
            for (var handlerIndex = this.handlersByEventName[event_1].length - 1; handlerIndex >= 0; handlerIndex--) {
                if (this.handlersByEventName[event_1][handlerIndex].instance == instance) {
                    this.removeEventListener(event_1, instance, this.handlersByEventName[event_1][handlerIndex].handler);
                }
            }
        }
    };
    AbstractEventDispatcher.prototype.dispatch = function (event) {
        if (this.handlersByEventName[event.type] === null || this.handlersByEventName[event.type] === undefined) {
            return;
        }
        // We need to make a copy of event handles before dispatching.
        // If the handler removes itself from the event queue during dispatching, it triggers removeEventListener, which
        // changes the array and this messes up the entire dispatch process (some handlers are never called).
        var dispatchToList = this.handlersByEventName[event.type].slice();
        var len = dispatchToList.length;
        for (var handlerIndex = 0; handlerIndex < len; ++handlerIndex) {
            var handlerFunctionName = dispatchToList[handlerIndex].handler;
            var instance = dispatchToList[handlerIndex].instance;
            instance[handlerFunctionName](event);
        }
    };
    return AbstractEventDispatcher;
}());
exports.AbstractEventDispatcher = AbstractEventDispatcher;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = __webpack_require__(0);
var ObjectUtils_1 = __webpack_require__(2);
var AbstractEventDispatcher_1 = __webpack_require__(3);
var CollectionEvent_1 = __webpack_require__(5);
var ArrayList = (function (_super) {
    __extends(ArrayList, _super);
    function ArrayList(source, allowDuplicates) {
        if (allowDuplicates === void 0) { allowDuplicates = true; }
        var _this = _super.call(this) || this;
        _this.aList = (source) ? source : [];
        _this.allowDuplicates = allowDuplicates;
        ObjectUtils_1.ObjectUtils.mixin(AbstractEventDispatcher_1.AbstractEventDispatcher, ArrayList, _this);
        return _this;
    }
    Object.defineProperty(ArrayList.prototype, "length", {
        get: function () {
            return this.aList.length;
        },
        enumerable: true,
        configurable: true
    });
    ArrayList.prototype.clone = function () {
        return new ArrayList(this.aList.slice());
    };
    ArrayList.prototype.source = function () {
        return this.aList;
    };
    ArrayList.prototype.allowInsert = function (object, hash, key) {
        var returnValue = true;
        if (!this.allowDuplicates) {
            if (hash !== null && hash !== undefined && key !== null && key !== undefined && object.hasOwnProperty(key) && object[key] !== null && object[key] !== undefined && hash[object[key]] !== null && hash[object[key]] !== undefined) {
                returnValue = false; //the item is a duplicate based on the hash. sometimes we receive newly deserialized objects which makes a lookup based on equality a no go. Instead we look up the object in a hash based on some key
            }
            else if (this.aList.indexOf(object) >= 0) {
                returnValue = false; //the item is a duplicate based on equality comparison
            }
        }
        return returnValue;
    };
    ArrayList.prototype.addItem = function (object, hash, key) {
        if (!this.allowInsert(object, hash, key)) {
            //replace the existing item with the new item
            return;
        }
        //Object are placed at the end of the array
        var index = this.aList.push(object);
        this.dispatch(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE, { type: 'add', item: object }));
        return index;
    };
    ArrayList.prototype.addAll = function (items, replaceIndex) {
        //add all items to the collection
        for (var i = 0; i < items.length; i++) {
            if (items[i].hasOwnProperty('addItemAt') && !isNaN(items[i].addItemAt)) {
                //object:any, index:number, suppressChangeEvent:boolean=false, hash?:Object, key?:string, replaceIndex:boolean=false
                this.insert(items[i].item, items[i].addItemAt, true, null, null, replaceIndex);
            }
            else {
                this.addItem(items[i]);
            }
        }
        this.dispatch(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE, { type: 'addAll', items: items }));
    };
    ArrayList.prototype.getItemAt = function (index) {
        if (index > -1 && index < this.aList.length)
            return this.aList[index];
        else
            return undefined; //Out of bound array, return undefined
    };
    ArrayList.prototype.clear = function () {
        this.aList = [];
        this.dispatch(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE, { type: 'removeAll' }));
    };
    ArrayList.prototype.clearHash = function (hash) {
        for (var prop in hash) {
            hash[prop] = null;
            delete hash[prop];
        }
    };
    ArrayList.prototype.removeItemFromHash = function (hash, key) {
        hash[key] = null;
        delete hash[key];
    };
    ArrayList.prototype.removeItemAt = function (index) {
        var m_count = this.aList.length;
        var item = this.getItemAt(index);
        if (m_count > 0 && index > -1 && index < this.aList.length) {
            switch (index) {
                case 0:
                    this.aList.shift();
                    break;
                case m_count - 1:
                    this.aList.pop();
                    break;
                default:
                    var head = this.aList.slice(0, index);
                    var tail = this.aList.slice(index + 1);
                    this.aList = head.concat(tail);
                    break;
            }
        }
        this.dispatch(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE, { type: 'remove', item: item }));
    };
    ArrayList.prototype.insert = function (object, index, suppressChangeEvent, hash, key, replaceIndex) {
        if (suppressChangeEvent === void 0) { suppressChangeEvent = false; }
        if (replaceIndex === void 0) { replaceIndex = false; }
        if (!this.allowInsert(object, hash, key)) {
            return;
        }
        var m_count = this.aList.length;
        var m_returnValue = -1;
        if (index > -1) {
            switch (index) {
                case 0:
                    this.aList.unshift(object);
                    m_returnValue = 0;
                    break;
                case m_count:
                    this.aList.push(object);
                    m_returnValue = m_count;
                    break;
                default:
                    if (index > m_count) {
                        for (var i = 0; i < index - m_count; i++) {
                            this.aList.push(null);
                        }
                    }
                    var head = this.aList.slice(0, index);
                    var tailIndex = (replaceIndex) ? index + 1 : index; //if we are to replace the current index in the array use index +1 which should drop the old item from the array
                    var tail = this.aList.slice(tailIndex);
                    tail.unshift(object);
                    this.aList = head.concat(tail);
                    m_returnValue = index;
                    break;
            }
        }
        if (!suppressChangeEvent) {
            this.dispatch(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE, { type: 'add', item: object }));
        }
        return m_returnValue;
    };
    ArrayList.prototype.changeIndex = function (fromIndex, toIndex, suppressChangeEvent) {
        var object = this.aList[fromIndex];
        this.aList.splice(toIndex, 0, this.aList.splice(fromIndex, 1)[0]);
        if (!suppressChangeEvent) {
            this.dispatch(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE_ORDER, { type: 'change', item: object, fromIndex: fromIndex, toIndex: toIndex }));
        }
    };
    ArrayList.prototype.swapIndex = function (fromIndex, toIndex, suppressChangeEvent) {
        var object = this.aList[fromIndex];
        this.aList[toIndex] = this.aList.splice(fromIndex, 1, this.aList[toIndex])[0];
        if (!suppressChangeEvent) {
            this.dispatch(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE_ORDER, { type: 'swap', item: object, fromIndex: fromIndex, toIndex: toIndex }));
        }
    };
    ArrayList.prototype.indexOf = function (object, startIndex) {
        if (startIndex === null || startIndex === undefined) {
            startIndex = 0;
        }
        var m_count = this.aList.length;
        var m_returnValue = -1;
        if (startIndex > -1 && startIndex < m_count) {
            var i = startIndex;
            while (i < m_count) {
                if (this.aList[i] == object) {
                    m_returnValue = i;
                    break;
                }
                i++;
            }
        }
        return m_returnValue;
    };
    ArrayList.prototype.lastIndexOf = function (object, startIndex) {
        var m_count = this.aList.length;
        var m_returnValue = -1;
        if (startIndex > -1 && startIndex < m_count) {
            var i = m_count - 1;
            while (i >= startIndex) {
                if (this.aList[i] == object) {
                    m_returnValue = i;
                    break;
                }
                i--;
            }
        }
        return m_returnValue;
    };
    return ArrayList;
}(Subject_1.Subject));
exports.ArrayList = ArrayList;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractEvent_1 = __webpack_require__(1);
var CollectionEvent = (function (_super) {
    __extends(CollectionEvent, _super);
    function CollectionEvent(type, payload) {
        return _super.call(this, type, payload) || this;
    }
    CollectionEvent.prototype.clone = function (type, payload) {
        return new CollectionEvent(this.type, this.payload);
    };
    CollectionEvent.COLLECTION_CHANGE = 'collectionChange';
    CollectionEvent.COLLECTION_CHANGE_ORDER = 'collectionChangeOrder';
    return CollectionEvent;
}(AbstractEvent_1.AbstractEvent));
exports.CollectionEvent = CollectionEvent;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractEvent_1 = __webpack_require__(1);
var RecordSetEvent = (function (_super) {
    __extends(RecordSetEvent, _super);
    function RecordSetEvent(type, payload) {
        return _super.call(this, type, payload) || this;
    }
    RecordSetEvent.prototype.clone = function (type, payload) {
        return new RecordSetEvent(this.type, this.payload);
    };
    RecordSetEvent.TOTALRECORDS_CHANGE = 'totalRecordsChange';
    RecordSetEvent.TOTALPAGES_CHANGE = 'totalPagesChange';
    RecordSetEvent.PAGE_LIST_CHANGE = 'pageListChange';
    RecordSetEvent.RESULTS_CHANGE = 'resultsChange';
    RecordSetEvent.RECORDS_PER_PAGE_CHANGE = 'recordsPerPageChange';
    RecordSetEvent.SELECTED_PAGE_CHANGE = 'selectedPageChange';
    RecordSetEvent.RECORDSETS_CHANGE = 'recordsetChange';
    RecordSetEvent.LOAD_PAGE_DATA = 'loadRecordSetPageData';
    return RecordSetEvent;
}(AbstractEvent_1.AbstractEvent));
exports.RecordSetEvent = RecordSetEvent;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 4/18/17.
 */
var BindingUtils_1 = __webpack_require__(10);
var Binding = (function () {
    function Binding(host, watcher) {
        this.host = host;
        this.watcher = watcher;
    }
    return Binding;
}());
var Binder = (function () {
    function Binder() {
        this.bindingGroups = {};
    }
    ;
    Binder.prototype.bind = function (host, hostProp, chain, chainProp, isCSS, cssProperty, group) {
        if (isCSS === void 0) { isCSS = false; }
        if (cssProperty === void 0) { cssProperty = null; }
        if (group === void 0) { group = 'default'; }
        var changeWatcher = BindingUtils_1.BindingUtils.bind(host, hostProp, chain, chainProp, isCSS, cssProperty);
        if (!this.bindingGroups.hasOwnProperty(group)) {
            this.bindingGroups[group] = [];
        }
        var binding = new Binding(host, changeWatcher);
        this.bindingGroups[group].push(binding);
    };
    Binder.prototype.unbind = function (group) {
        if (group === void 0) { group = 'default'; }
        var bindings = this.bindingGroups[group];
        if (bindings) {
            bindings.forEach(function (bindingData) {
                bindingData.host.removeObserver(bindingData.watcher);
            });
            delete this.bindingGroups[group];
        }
    };
    Binder.prototype.unbindAll = function () {
        for (var group in this.bindingGroups) {
            this.unbind(group);
        }
    };
    return Binder;
}());
exports.Binder = Binder;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ChangeWatcher = (function () {
    function ChangeWatcher(hostProp, chainInstance, chainPropToWatch, isCSS, cssProperty) {
        if (isCSS === void 0) { isCSS = false; }
        if (isCSS && !cssProperty) {
            throw new Error('cssProperty property is required when isCSS param is true');
        }
        this.chain = hostProp;
        this.instance = chainInstance;
        this.chainProp = chainPropToWatch;
        this.isCSS = isCSS;
        this.cssProperty = cssProperty;
    }
    ;
    ChangeWatcher.prototype.update = function (value, chain) {
        if (this.isCSS) {
            this.instance[this.chainProp](this.cssProperty, value);
        }
        else if (typeof (this.instance[this.chainProp]) == "function") {
            this.instance[this.chainProp](value, chain);
        }
        else {
            if (this.instance[this.chainProp] != value) {
                this.instance[this.chainProp] = value;
            }
        }
    };
    return ChangeWatcher;
}());
exports.ChangeWatcher = ChangeWatcher;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 5/17/17.
 */
var ArrayList_1 = __webpack_require__(4);
var RecordSetList = (function (_super) {
    __extends(RecordSetList, _super);
    function RecordSetList(source, allowDuplicates) {
        if (allowDuplicates === void 0) { allowDuplicates = true; }
        var _this = _super.call(this, source, allowDuplicates) || this;
        _this.recordSetsBySource = {};
        _this.recordSetsById = {};
        return _this;
    }
    RecordSetList.prototype.addItem = function (item, hash, key) {
        this.recordSetsById[item.id] = item;
        this.recordSetsBySource[item.source] = item;
        return _super.prototype.addItem.call(this, item, hash, key);
    };
    RecordSetList.prototype.clear = function () {
        this.clearHash(this.recordSetsById);
        this.clearHash(this.recordSetsBySource);
        _super.prototype.clear.call(this);
    };
    RecordSetList.prototype.removeItemAt = function (index) {
        var recordSet = this.getItemAt(index);
        this.removeItemFromHash(this.recordSetsById, recordSet.id);
        this.removeItemFromHash(this.recordSetsBySource, recordSet.source);
        _super.prototype.removeItemAt.call(this, index);
    };
    RecordSetList.prototype.insert = function (object, index, suppressChangeEvent, hash, key, replaceIndex) {
        if (suppressChangeEvent === void 0) { suppressChangeEvent = false; }
        if (replaceIndex === void 0) { replaceIndex = false; }
        //add item to hash
        this.recordSetsById[object.id] = object;
        this.recordSetsBySource[object.source] = object;
        return _super.prototype.insert.call(this, object, index, suppressChangeEvent, hash, key, replaceIndex);
    };
    return RecordSetList;
}(ArrayList_1.ArrayList));
exports.RecordSetList = RecordSetList;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ChangeWatcher_1 = __webpack_require__(8);
var BindingUtils = (function () {
    function BindingUtils() {
    }
    BindingUtils.bind = function (host, hostProp, chain, chainProp, isCSS, cssProperty) {
        var observer = new ChangeWatcher_1.ChangeWatcher(hostProp, chain, chainProp, isCSS, cssProperty);
        host.addObserver(observer);
        return observer;
    };
    return BindingUtils;
}());
exports.BindingUtils = BindingUtils;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 6/30/17.
 */
var MathUtils = (function () {
    function MathUtils() {
    }
    MathUtils.degreeToRadian = function (degAngle) {
        return degAngle * Math.PI / 180;
    };
    MathUtils.radianToDegree = function (radAngle) {
        return radAngle * 180 / Math.PI;
    };
    MathUtils.toFixed = function (number, precision) {
        if (precision === void 0) { precision = 10; }
        var multiplier = Math.pow(10, precision);
        return Math.round(number * multiplier) / multiplier;
    };
    MathUtils.isEven = function (value) {
        return ((value % 2) == 0);
    };
    return MathUtils;
}());
exports.MathUtils = MathUtils;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 6/30/17.
 */
var Point_1 = __webpack_require__(13);
var Matrix = (function () {
    function Matrix(a, b, c, d, tx, ty) {
        if (a === void 0) { a = 1; }
        if (b === void 0) { b = 0; }
        if (c === void 0) { c = 0; }
        if (d === void 0) { d = 1; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }
    Matrix.rotation = function (theta, aboutPoint) {
        if (aboutPoint === void 0) { aboutPoint = null; }
        var rotationMatrix = new Matrix(Math.cos(theta), Math.sin(theta), -Math.sin(theta), Math.cos(theta));
        if (aboutPoint) {
            rotationMatrix =
                Matrix.translation(aboutPoint.x, aboutPoint.y).concat(rotationMatrix).concat(Matrix.translation(-aboutPoint.x, -aboutPoint.y));
        }
        return rotationMatrix;
    };
    Matrix.scale = function (sx, sy, aboutPoint) {
        sy = sy || sx;
        var scaleMatrix = new Matrix(sx, 0, 0, sy);
        if (aboutPoint) {
            scaleMatrix =
                Matrix.translation(aboutPoint.x, aboutPoint.y).concat(scaleMatrix).concat(Matrix.translation(-aboutPoint.x, -aboutPoint.y));
        }
        return scaleMatrix;
    };
    Matrix.translation = function (tx, ty) {
        return new Matrix(1, 0, 0, 1, tx, ty);
    };
    ;
    Matrix.prototype.concat = function (matrix) {
        return new Matrix(this.a * matrix.a + this.c * matrix.b, this.b * matrix.a + this.d * matrix.b, this.a * matrix.c + this.c * matrix.d, this.b * matrix.c + this.d * matrix.d, this.a * matrix.tx + this.c * matrix.ty + this.tx, this.b * matrix.tx + this.d * matrix.ty + this.ty);
    };
    Matrix.prototype.deltaTransformPoint = function (point) {
        return new Point_1.Point(this.a * point.x + this.c * point.y, this.b * point.x + this.d * point.y);
    };
    Matrix.prototype.inverse = function () {
        var determinant = this.a * this.d - this.b * this.c;
        return new Matrix(this.d / determinant, -this.b / determinant, -this.c / determinant, this.a / determinant, (this.c * this.ty - this.d * this.tx) / determinant, (this.b * this.tx - this.a * this.ty) / determinant);
    };
    Matrix.prototype.rotate = function (theta, aboutPoint) {
        return this.concat(Matrix.rotation(theta, aboutPoint));
    };
    Matrix.prototype.scale = function (sx, sy, aboutPoint) {
        return this.concat(Matrix.scale(sx, sy, aboutPoint));
    };
    Matrix.prototype.transformPoint = function (point) {
        return new Point_1.Point(this.a * point.x + this.c * point.y + this.tx, this.b * point.x + this.d * point.y + this.ty);
    };
    Matrix.prototype.translate = function (tx, ty) {
        return this.concat(Matrix.translation(tx, ty));
    };
    Matrix.IDENTITY = new Matrix();
    Matrix.HORIZONTAL_FLIP = new Matrix(-1, 0, 0, 1);
    Matrix.VERTICAL_FLIP = new Matrix(1, 0, 0, -1);
    return Matrix;
}());
exports.Matrix = Matrix;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 6/30/17.
 */
var Point = (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Point.distance = function (p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    };
    Point.direction = function (p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    };
    Point.prototype.equal = function (other) {
        return this.x === other.x && this.y === other.y;
    };
    Point.prototype.add = function (other) {
        return new Point(this.x + other.x, this.y + other.y);
    };
    Point.prototype.subtract = function (other) {
        return new Point(this.x - other.x, this.y - other.y);
    };
    Point.prototype.scale = function (scalar) {
        return new Point(this.x * scalar, this.y * scalar);
    };
    Point.prototype.magnitude = function () {
        return Point.distance(new Point(0, 0), this);
    };
    return Point;
}());
exports.Point = Point;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractEvent_1 = __webpack_require__(1);
var ActionErrorEvent = (function (_super) {
    __extends(ActionErrorEvent, _super);
    function ActionErrorEvent(type, payload) {
        var _this = _super.call(this, type, payload) || this;
        if (!payload || payload.message === null || payload.message === undefined) {
            throw new Error('Lavender.ActionErrorEvent: payload.message is required');
        }
        return _this;
    }
    ActionErrorEvent.prototype.clone = function (type, payload) {
        return new ActionErrorEvent(this.type, this.payload);
    };
    ActionErrorEvent.ERROR = 'actionError';
    return ActionErrorEvent;
}(AbstractEvent_1.AbstractEvent));
exports.ActionErrorEvent = ActionErrorEvent;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractEvent_1 = __webpack_require__(1);
var ActionSuccessEvent = (function (_super) {
    __extends(ActionSuccessEvent, _super);
    function ActionSuccessEvent(type, payload) {
        var _this = _super.call(this, type, payload) || this;
        if (payload === null || payload === undefined) {
            throw new Error('Lavender.ActionSuccessEvent: payload is required');
        }
        return _this;
    }
    ActionSuccessEvent.prototype.clone = function (type, payload) {
        return new ActionSuccessEvent(this.type, this.payload);
    };
    ActionSuccessEvent.SUCCESS = 'actionSuccess';
    return ActionSuccessEvent;
}(AbstractEvent_1.AbstractEvent));
exports.ActionSuccessEvent = ActionSuccessEvent;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 5/17/17.
 */
var Subject_1 = __webpack_require__(0);
var AsyncOperationModel = (function (_super) {
    __extends(AsyncOperationModel, _super);
    function AsyncOperationModel() {
        var _this = _super.call(this) || this;
        _this._asyncOperationCount = 0;
        _this._asyncOperationComplete = true;
        return _this;
    }
    Object.defineProperty(AsyncOperationModel.prototype, "asyncOperationCount", {
        get: function () {
            return this._asyncOperationCount;
        },
        set: function (value) {
            this._asyncOperationCount = value;
            this.notify(value, "asyncOperationCount");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AsyncOperationModel.prototype, "asyncOperationComplete", {
        get: function () {
            return this.asyncOperationCount <= 0;
        },
        set: function (value) {
            this._asyncOperationComplete = value;
            this.notify(value, 'asyncOperationComplete');
        },
        enumerable: true,
        configurable: true
    });
    AsyncOperationModel.prototype.addAsyncOperation = function () {
        this.asyncOperationComplete = false;
        this.asyncOperationCount += 1;
    };
    AsyncOperationModel.prototype.removeAsyncOperation = function () {
        this.asyncOperationCount -= 1;
        if (!this.asyncOperationCount) {
            this.asyncOperationComplete = true;
        }
    };
    return AsyncOperationModel;
}(Subject_1.Subject));
exports.AsyncOperationModel = AsyncOperationModel;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 5/17/17.
 */
var Subject_1 = __webpack_require__(0);
var Config = (function (_super) {
    __extends(Config, _super);
    function Config() {
        var _this = _super.call(this) || this;
        _this._webRoot = ''; //path relative to webroot where the application is deployed
        _this._parserCode = undefined; //used to handle service results using a factory patter, see lotusJS examples
        _this._exporterCode = undefined; //used to serialize objects for service payloads using a factory patter, see lotusJS examples
        return _this;
    }
    Object.defineProperty(Config.prototype, "baseUrl", {
        get: function () {
            return this._baseUrl;
        },
        set: function (value) {
            this._baseUrl = value;
            this.notify(value, "baseUrl");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "webRoot", {
        get: function () {
            return this._webRoot;
        },
        set: function (value) {
            this._webRoot = value;
            this.notify(value, "webRoot");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "parserCode", {
        get: function () {
            return this._parserCode;
        },
        set: function (value) {
            this._parserCode = value;
            this.notify(value, "parserCode");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "exporterCode", {
        get: function () {
            return this._exporterCode;
        },
        set: function (value) {
            this._exporterCode = value;
            this.notify(value, "exporterCode");
        },
        enumerable: true,
        configurable: true
    });
    return Config;
}(Subject_1.Subject));
exports.Config = Config;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 5/17/17.
 */
var Subject_1 = __webpack_require__(0);
var ArrayList_1 = __webpack_require__(4);
var ErrorModel = (function (_super) {
    __extends(ErrorModel, _super);
    function ErrorModel() {
        var _this = _super.call(this) || this;
        _this._appError = false;
        _this._errors = new ArrayList_1.ArrayList();
        return _this;
    }
    Object.defineProperty(ErrorModel.prototype, "appError", {
        get: function () {
            return this._appError;
        },
        set: function (value) {
            this._appError = value;
            this.notify(value, "appError");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorModel.prototype, "errors", {
        get: function () {
            return this._errors;
        },
        set: function (value) {
            this._errors = value;
            this.notify(value, "errors");
        },
        enumerable: true,
        configurable: true
    });
    ErrorModel.prototype.getTitle = function () {
        var returnTitle = (this.errors.length > 1) ? 'Multiple errors have occurred.\n' : 'The following error occurred.\n';
        return returnTitle;
    };
    ErrorModel.prototype.getMessage = function () {
        var returnText = '';
        for (var errorIndex = 0; errorIndex < this.errors.length; errorIndex++) {
            returnText += 'Name: ' + this.errors.getItemAt(errorIndex).name + '\n';
            returnText += 'Message: ' + this.errors.getItemAt(errorIndex).message + '\n';
            returnText += '\n';
        }
        return returnText;
    };
    ErrorModel.prototype.addError = function (error) {
        this.errors.addItem(error);
        this.appError = true;
    };
    ErrorModel.prototype.clear = function () {
        this.errors.clear();
        this.appError = false;
    };
    return ErrorModel;
}(Subject_1.Subject));
exports.ErrorModel = ErrorModel;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 5/12/17.
 */
var Subject_1 = __webpack_require__(0);
var CollectionEvent_1 = __webpack_require__(5);
var RecordSetEvent_1 = __webpack_require__(6);
var ArrayList_1 = __webpack_require__(4);
var ObjectUtils_1 = __webpack_require__(2);
var AbstractEventDispatcher_1 = __webpack_require__(3);
var RecordSet = (function (_super) {
    __extends(RecordSet, _super);
    function RecordSet(timeToLive, listFunction) {
        if (timeToLive === void 0) { timeToLive = NaN; }
        if (listFunction === void 0) { listFunction = null; }
        var _this = _super.call(this) || this;
        _this.resultsByPage = {};
        ObjectUtils_1.ObjectUtils.mixin(AbstractEventDispatcher_1.AbstractEventDispatcher, RecordSet, _this);
        _this._timeToLive = timeToLive;
        _this._results = (listFunction) ? new listFunction() : new ArrayList_1.ArrayList();
        _this._pageList = (listFunction) ? new listFunction() : new ArrayList_1.ArrayList();
        if (!isNaN(_this._timeToLive)) {
            _this._intervalId = setTimeout(function () {
                _this.clear();
            });
        } //func, delay[, param1, param2, ...]
        _this._results.addEventListener(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE, _this, 'resultCollectionChanged');
        return _this;
    }
    Object.defineProperty(RecordSet.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (val) {
            this._id = val;
            this.notify(val, "id");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "totalRecords", {
        get: function () {
            return this._totalRecords;
        },
        set: function (val) {
            this._totalRecords = val;
            if (this._totalRecords != val) {
                this._totalRecords = val;
                this.notify(val, "totalRecords");
                this.dispatch(new RecordSetEvent_1.RecordSetEvent(RecordSetEvent_1.RecordSetEvent.TOTALRECORDS_CHANGE));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "totalPages", {
        get: function () {
            return this._totalPages;
        },
        set: function (val) {
            if (this._totalPages != val) {
                this._totalPages = val;
                this.notify(val, "totalPages");
                this.dispatch(new RecordSetEvent_1.RecordSetEvent(RecordSetEvent_1.RecordSetEvent.TOTALPAGES_CHANGE));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "selectedPage", {
        get: function () {
            return this._selectedPage;
        },
        set: function (val) {
            if (this._selectedPage != val) {
                //IMPORTANT: set the value first so responders to the ImageAssetEvent.GET_IMAGE_ASSETS event know what page we need to load data for
                this._selectedPage = val;
                if (!this.pageLoaded(val)) {
                    this.dispatch(new RecordSetEvent_1.RecordSetEvent(RecordSetEvent_1.RecordSetEvent.LOAD_PAGE_DATA, { recordSet: this }));
                }
                this.calculatePageList();
                this.notify(val, "selectedPage");
                this.dispatch(new RecordSetEvent_1.RecordSetEvent(RecordSetEvent_1.RecordSetEvent.SELECTED_PAGE_CHANGE));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "recordsPerPage", {
        get: function () {
            return this._recordsPerPage;
        },
        set: function (val) {
            if (this._recordsPerPage != val) {
                this._recordsPerPage = val;
                this.renewState();
                this.notify(val, "recordsPerPage");
                this.dispatch(new RecordSetEvent_1.RecordSetEvent(RecordSetEvent_1.RecordSetEvent.RECORDS_PER_PAGE_CHANGE));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "results", {
        get: function () {
            return this._results;
        },
        set: function (val) {
            if (this._results != val) {
                if (this._results !== null && this._results !== undefined) {
                    this._results.removeEventListener(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE, this, 'resultCollectionChanged');
                }
                this._results = val;
                this.renewState();
                this.selectedPage = 1;
                this._results.addEventListener(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE, this, 'resultCollectionChanged');
                this.notify(val, "results");
                this.dispatch(new RecordSetEvent_1.RecordSetEvent(RecordSetEvent_1.RecordSetEvent.RESULTS_CHANGE));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "createdOn", {
        get: function () {
            return this._createdOn;
        },
        set: function (val) {
            this._createdOn = val;
            this.notify(val, "id");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "pageList", {
        get: function () {
            return this._pageList;
        },
        set: function (val) {
            this._pageList = val;
            this.notify(val, "id");
            this.dispatch(new RecordSetEvent_1.RecordSetEvent(RecordSetEvent_1.RecordSetEvent.PAGE_LIST_CHANGE));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "timeToLive", {
        get: function () {
            return this._timeToLive;
        },
        set: function (val) {
            var _this = this;
            this._timeToLive = val;
            if (this._intervalId !== null && this._intervalId !== undefined) {
                this.clearInterval();
                //TODO:have this reload data instead of clearing it
                //set the timeout to _timeToLive. This will clear the recordset at the interval
                //calling this accessor multiple times will reset the timeout preserving the records
                this._intervalId = setTimeout(function () { _this.clear; }, val);
            }
            this.notify(val, "id");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "source", {
        get: function () {
            return this._source;
        },
        set: function (val) {
            this._source = val;
            this.notify(val, "id");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "routeController", {
        get: function () {
            return this._routeController;
        },
        set: function (val) {
            this._routeController = val;
            this.notify(val, "id");
        },
        enumerable: true,
        configurable: true
    });
    RecordSet.prototype.clearInterval = function () {
        if (this._intervalId !== null && this._intervalId !== undefined) {
            clearInterval(this._intervalId);
        }
    };
    RecordSet.prototype.clear = function () {
        if (this.results !== undefined && this.results !== null) {
            this.results.clear();
        }
        this.totalRecords = 0;
        this.totalPages = 0;
        this.resultsByPage[this.selectedPage] = new ArrayList_1.ArrayList();
        this.resultsByPage = {};
        this.selectedPage = -1;
        this.renewState();
    };
    RecordSet.prototype.pageLoaded = function (pageNumber) {
        return this.resultsByPage[pageNumber] !== null && this.resultsByPage[pageNumber] !== undefined && (this.resultsByPage[pageNumber].length == this.recordsPerPage || pageNumber == this.totalPages);
    };
    RecordSet.prototype.calculatePageList = function () {
        this.pageList = this.resultsByPage[this.selectedPage];
    };
    RecordSet.prototype.renewState = function () {
        this.totalPages = (Math.ceil(this.totalRecords / this.recordsPerPage));
        //loop through each page
        for (var pageIndex = 1; pageIndex <= this.totalPages; pageIndex++) {
            var first = (pageIndex - 1) * this.recordsPerPage;
            var last = ((first + this.recordsPerPage) > this.totalRecords) ? this.totalRecords : first + this.recordsPerPage;
            var dp = new ArrayList_1.ArrayList();
            if (this.results !== null && this.results !== undefined) {
                for (var i = first; i < last; i++) {
                    //because items can be added to the results in a non sequential manner (ie page 5 can be loaded before page 2) we have to check to make sure the items are loaded
                    if (this.results.getItemAt(i) === null || this.results.getItemAt(i) === undefined) {
                        continue;
                    }
                    dp.addItem(this.results.getItemAt(i));
                }
            }
            //if no items were added do not populate the page data index
            if (dp.length > 0) {
                this.resultsByPage[pageIndex] = dp;
            }
        }
        this.calculatePageList();
        this.dispatch(new RecordSetEvent_1.RecordSetEvent(RecordSetEvent_1.RecordSetEvent.RESULTS_CHANGE));
    };
    RecordSet.prototype.resultCollectionChanged = function (event) {
        this.renewState();
    };
    RecordSet.prototype.destroy = function () {
        this.clearInterval();
        this.results = null;
        this.pageList = null;
        this.resultsByPage = null;
    };
    RecordSet.USER_UPLOAD = 'userUpload';
    RecordSet.FOTOLIA = 'fotolia';
    RecordSet.FACEBOOK = 'facebook';
    return RecordSet;
}(Subject_1.Subject));
exports.RecordSet = RecordSet;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 5/17/17.
 */
var RecordSetList_1 = __webpack_require__(9);
var ObjectUtils_1 = __webpack_require__(2);
var AbstractEventDispatcher_1 = __webpack_require__(3);
var Subject_1 = __webpack_require__(0);
var RecordSetEvent_1 = __webpack_require__(6);
var RecordSetModel = (function (_super) {
    __extends(RecordSetModel, _super);
    function RecordSetModel() {
        var _this = _super.call(this) || this;
        _this._recordSets = new RecordSetList_1.RecordSetList();
        ObjectUtils_1.ObjectUtils.mixin(AbstractEventDispatcher_1.AbstractEventDispatcher, RecordSetModel, _this);
        return _this;
    }
    Object.defineProperty(RecordSetModel.prototype, "recordSets", {
        get: function () {
            return this._recordSets;
        },
        set: function (value) {
            this._recordSets = value;
            this.notify(value, "recordSets");
            this.dispatch(new RecordSetEvent_1.RecordSetEvent(RecordSetEvent_1.RecordSetEvent.RECORDSETS_CHANGE));
        },
        enumerable: true,
        configurable: true
    });
    return RecordSetModel;
}(Subject_1.Subject));
exports.RecordSetModel = RecordSetModel;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by dsmiley on 5/18/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BrowserInfo = (function () {
    function BrowserInfo(browser, version) {
        this.browser = browser;
        this.version = version;
    }
    return BrowserInfo;
}());
exports.BrowserInfo = BrowserInfo;
var BrowserUtils = (function () {
    function BrowserUtils() {
    }
    BrowserUtils.uaMatch = function (ua) {
        ua = ua.toLowerCase();
        var match = /(ipad).*(?:safari)[ \/]([\w.]+)/.exec(ua) ||
            /(android)[ chrome\/]([\w.]+)/.exec(ua) ||
            /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(safari)[ \/]([\w.]+)/.exec(ua) ||
            /(firefox)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            /trident.*rv[ :]*[1-9]\d\./.exec(ua.toLowerCase()) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];
        //IE 11+ changed user agents, AWESOME!!! More info here: http://stackoverflow.com/questions/17447373/how-can-i-target-only-internet-explorer-11-with-javascript
        //We need to reset to the expected id forIE
        if (/trident.*rv[ :]*[1-9]\d\./.exec(ua.toLowerCase())) {
            match[1] = 'msie'; //reset to msie
            match[2] = /[1-9]\d\./.exec(ua);
        }
        var browser = match[1] || "";
        var version = match[2] || "0";
        return new BrowserInfo(browser, version);
    };
    BrowserUtils.getBrowser = function () {
        var returnValue = new BrowserInfo('nodeJS', 'nodeJS');
        try {
            if (navigator) {
                returnValue = BrowserUtils.uaMatch(navigator.userAgent);
            }
        }
        catch (e) {
            console.log(e.stack);
        }
        return returnValue;
    };
    return BrowserUtils;
}());
exports.BrowserUtils = BrowserUtils;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 5/18/17.
 */
var ColorUtils = (function () {
    function ColorUtils() {
    }
    ColorUtils.rgb2hex = function (rgb) {
        var result = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (result === null || result === undefined || result.length <= 0) {
            return null;
        }
        return "#" +
            ("0" + parseInt(result[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(result[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(result[3], 10).toString(16)).slice(-2);
    };
    ColorUtils.hexToRgb = function (hex) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            var returnValue = Number('0x' + c.join(''));
            return 'rgb(' + [(returnValue >> 16) & 255, (returnValue >> 8) & 255, returnValue & 255].join(',') + ')';
        }
        throw new Error('Bad Hex');
    };
    ColorUtils.hexToRgbA = function (hex) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            var returnValue = Number('0x' + c.join(''));
            return 'rgba(' + [(returnValue >> 16) & 255, (returnValue >> 8) & 255, returnValue & 255].join(',') + ',1)';
        }
        throw new Error('Bad Hex');
    };
    ColorUtils.hexToRgbArray = function (hex) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            var returnValue = Number('0x' + c.join(''));
            return [(returnValue >> 16) & 255, (returnValue >> 8) & 255, returnValue & 255];
        }
        throw new Error('Bad Hex');
    };
    ColorUtils.rgbToHsl = function (r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        if (max == min) {
            h = s = 0; // achromatic
        }
        else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
    };
    ColorUtils.rgbToHsv = function (r, g, b) {
        var min = Math.min(r, g, b), max = Math.max(r, g, b), delta = max - min, h, s, v = max;
        v = Math.floor(max / 255 * 100);
        if (max != 0)
            s = Math.floor(delta / max * 100);
        else {
            // black
            return [0, 0, 0];
        }
        if (r == max)
            h = (g - b) / delta; // between yellow & magenta
        else if (g == max)
            h = 2 + (b - r) / delta; // between cyan & yellow
        else
            h = 4 + (r - g) / delta; // between magenta & cyan
        h = Math.floor(h * 60); // degrees
        if (h < 0)
            h += 360;
        return [h, s, v];
    };
    return ColorUtils;
}());
exports.ColorUtils = ColorUtils;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 5/19/17.
 */
var CoordsUtils = (function () {
    function CoordsUtils() {
    }
    CoordsUtils.globalToLocal = function (container, pageX, pageY) {
        var position = CoordsUtils.offset(container);
        return new Offset(pageX - position.left, pageY - position.top);
    };
    CoordsUtils.offset = function (element) {
        var win, box = { top: 0, left: 0 }, elem = element, doc = elem && elem.ownerDocument;
        if (!doc) {
            return;
        }
        var docElem = doc.documentElement;
        // Make sure it's not a disconnected DOM node
        if (!docElem.contains(elem)) {
            return box;
        }
        box = elem.getBoundingClientRect();
        win = CoordsUtils.getWindow(doc);
        return {
            top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
            left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
        };
    };
    CoordsUtils.getWindow = function (elem) {
        var returnValue = CoordsUtils.isWindow(elem) ?
            elem :
            elem.nodeType === 9 ?
                elem['defaultView'] || elem['parentWindow'] : null;
        return returnValue;
    };
    CoordsUtils.isWindow = function (elem) {
        return elem != null && elem.hasOwnProperty('window') && elem == elem['window'];
    };
    return CoordsUtils;
}());
exports.CoordsUtils = CoordsUtils;
var Offset = (function () {
    function Offset(top, left) {
        this.top = top;
        this.left = left;
    }
    return Offset;
}());
exports.Offset = Offset;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 6/30/17.
 */
var CopyUtils = (function () {
    function CopyUtils() {
    }
    CopyUtils.copyInheredValues = function (child, parent) {
        for (var prop in parent) {
            if (child.hasOwnProperty(prop) && (child[prop] === undefined || child[prop] === null || child[prop] === '' || child[prop] === NaN)) {
                child[prop] = parent[prop];
            }
        }
    };
    CopyUtils.overwriteValues = function (child, parent, excludeObjects) {
        if (excludeObjects === void 0) { excludeObjects = {}; }
        for (var prop in parent) {
            if (child.hasOwnProperty(prop)) {
                var value = (excludeObjects.hasOwnProperty(prop)) ? child[prop] : parent[prop];
                child[prop] = value;
            }
        }
    };
    CopyUtils.concatObjects = function (objects) {
        var ret = {};
        var len = objects.length;
        for (var i = 0; i < len; i++) {
            for (var p in objects[i]) {
                if (objects[i].hasOwnProperty(p)) {
                    ret[p] = objects[i][p];
                }
            }
        }
        return ret;
    };
    CopyUtils.copyProperties = function (target, source) {
        for (var prop in source) {
            if (typeof source[prop] !== 'function') {
                target[prop] = source[prop];
            }
        }
    };
    return CopyUtils;
}());
exports.CopyUtils = CopyUtils;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 6/30/17.
 */
var Subject_1 = __webpack_require__(0);
var ObjectUtils_1 = __webpack_require__(2);
var Geometry = (function (_super) {
    __extends(Geometry, _super);
    function Geometry(values) {
        if (values === void 0) { values = {}; }
        var _this = _super.call(this) || this;
        _this._left = undefined;
        _this._top = undefined;
        _this._width = undefined;
        _this._height = undefined;
        _this.left = values.left;
        _this.top = values.top;
        _this.width = values.width;
        _this.height = values.height;
        return _this;
    }
    Object.defineProperty(Geometry.prototype, "left", {
        get: function () {
            return this._left;
        },
        set: function (value) {
            this._left = value;
            this.notify(value, "left");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "top", {
        get: function () {
            return this._top;
        },
        set: function (value) {
            this._top = value;
            this.notify(value, "top");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
            this.notify(value, "width");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
            this.notify(value, "height");
        },
        enumerable: true,
        configurable: true
    });
    Geometry.prototype.update = function (values) {
        if (values === void 0) { values = {}; }
        for (var key in values) {
            //note accessor methods that are defined using Object.defineProperty in ES6 are found on the prototype not the object instance, hence the use of getPrototypeOf
            if (ObjectUtils_1.ObjectUtils.isPropDefined(values, key) && Object.getPrototypeOf(this).hasOwnProperty(key)) {
                this[key] = values[key];
            }
        }
    };
    Geometry.prototype.getDefinedValues = function () {
        var _this = this;
        var res = {};
        Object.keys(Object.getPrototypeOf(this)).forEach(function (key) {
            if (_this[key]) {
                res[key] = _this[key];
            }
        });
        return res;
    };
    return Geometry;
}(Subject_1.Subject));
exports.Geometry = Geometry;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 6/30/17.
 */
var MathUtils_1 = __webpack_require__(11);
var Matrix_1 = __webpack_require__(12);
var MatrixUtils = (function () {
    function MatrixUtils() {
    }
    MatrixUtils.rotate = function (matrix, degAngle, point) {
        return matrix.rotate(MathUtils_1.MathUtils.degreeToRadian(degAngle), point);
    };
    MatrixUtils.matrixToCSS = function (matrix) {
        var coeffs = ['a', 'b', 'c', 'd', 'tx', 'ty'];
        var values = [];
        for (var i in coeffs) {
            values.push(MathUtils_1.MathUtils.toFixed(matrix[coeffs[i]]));
        }
        return 'matrix(' + values.join(',') + ')';
    };
    MatrixUtils.getRotationAngleForElement = function (element) {
        var matrix = element.style["-webkit-transform"] ||
            element.style["-moz-transform"] ||
            element.style["-ms-transform"] ||
            element.style["-o-transform"] ||
            element.style["transform"];
        var angle;
        if (matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        }
        else {
            angle = 0;
        }
        return angle;
    };
    MatrixUtils.getRotationAngle = function (matrix) {
        return MathUtils_1.MathUtils.toFixed(MathUtils_1.MathUtils.radianToDegree(Math.atan2(matrix.b, matrix.a)));
    };
    MatrixUtils.getMatrix = function (cssTransformMatrix) {
        var values = cssTransformMatrix.split('(')[1];
        values = values.split(')')[0];
        var valuesArray = values.split(',');
        var a = parseFloat(valuesArray[0]);
        var b = parseFloat(valuesArray[1]);
        var c = parseFloat(valuesArray[2]);
        var d = parseFloat(valuesArray[3]);
        var tx = parseFloat(valuesArray[4]);
        var ty = parseFloat(valuesArray[5]);
        return new Matrix_1.Matrix(a, b, c, d, tx, ty);
    };
    return MatrixUtils;
}());
exports.MatrixUtils = MatrixUtils;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by dsmiley on 4/21/17.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(8));
__export(__webpack_require__(7));
__export(__webpack_require__(0));
__export(__webpack_require__(4));
__export(__webpack_require__(19));
__export(__webpack_require__(9));
__export(__webpack_require__(20));
__export(__webpack_require__(16));
__export(__webpack_require__(17));
__export(__webpack_require__(18));
__export(__webpack_require__(10));
__export(__webpack_require__(2));
__export(__webpack_require__(21));
__export(__webpack_require__(22));
__export(__webpack_require__(23));
__export(__webpack_require__(24));
__export(__webpack_require__(25));
__export(__webpack_require__(11));
__export(__webpack_require__(13));
__export(__webpack_require__(12));
__export(__webpack_require__(26));
__export(__webpack_require__(3));
__export(__webpack_require__(1));
__export(__webpack_require__(5));
__export(__webpack_require__(6));
__export(__webpack_require__(14));
__export(__webpack_require__(15));


/***/ })
/******/ ]);
});
//# sourceMappingURL=lavenderJS-UMD.js.map