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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
var BindingUtils_1 = __webpack_require__(2);
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ChangeWatcher_1 = __webpack_require__(1);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 4/18/17.
 */
var Binder_1 = __webpack_require__(0);
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
        var m_count = this.observerHash[chain].length;
        //TODO: Once ArrayList is ported over comment this back in and remove the line above
        //let m_count = this.observerHash[chain].length();
        for (var i = 0; i < m_count; i++) {
            this.observerHash[chain][i].update(value, chain);
            //TODO: Once ArrayList is ported over comment this back in and remove the line above
            //(this.observerHash[chain].getItemAt(i) as IObserver).update(value, chain);
        }
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
        var m_count = this.observerHash[observer.chain].length;
        var index = m_count.indexOf(observer, 0);
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
        //TODO: Once ArrayList is ported over comment this back in and remove everything above to line 41
        //this.observerHash[observer.chain].removeItemAt(this.observerHash[observer.chain].indexOf(observer, 0));
    };
    return Subject;
}());
exports.Subject = Subject;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by dsmiley on 4/21/17.
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(1));
__export(__webpack_require__(0));
__export(__webpack_require__(3));
__export(__webpack_require__(2));


/***/ })
/******/ ]);
});
//# sourceMappingURL=lavenderJS-UMD.js.map