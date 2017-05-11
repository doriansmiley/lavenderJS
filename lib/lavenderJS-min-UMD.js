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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
    return CollectionEvent;
}(AbstractEvent_1.AbstractEvent));
CollectionEvent.COLLECTION_CHANGE = 'collectionChange';
CollectionEvent.COLLECTION_CHANGE_ORDER = 'collectionChangeOrder';
exports.CollectionEvent = CollectionEvent;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 4/18/17.
 */
var BindingUtils_1 = __webpack_require__(6);
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 4/18/17.
 */
var Binder_1 = __webpack_require__(3);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ChangeWatcher_1 = __webpack_require__(4);
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
/* 7 */
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
/* 8 */
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
var Subject_1 = __webpack_require__(5);
var ObjectUtils_1 = __webpack_require__(7);
var AbstractEventDispatcher_1 = __webpack_require__(0);
var CollectionEvent_1 = __webpack_require__(2);
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by dsmiley on 4/21/17.
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(4));
__export(__webpack_require__(3));
__export(__webpack_require__(5));
__export(__webpack_require__(8));
__export(__webpack_require__(6));
__export(__webpack_require__(7));
__export(__webpack_require__(0));
__export(__webpack_require__(1));
__export(__webpack_require__(2));


/***/ })
/******/ ]);
});
//# sourceMappingURL=lavenderJS-min-UMD.js.map