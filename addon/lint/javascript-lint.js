'use strict';var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.checkStringArgs=function(a,c,b){if(null==a)throw new TypeError("The 'this' value for String.prototype."+b+" must not be null or undefined");if(c instanceof RegExp)throw new TypeError("First argument to String.prototype."+b+" must not be a regular expression");return a+""};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;
$jscomp.FORCE_POLYFILL_PROMISE=!1;$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){if(a==Array.prototype||a==Object.prototype)return a;a[c]=b.value;return a};
$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var c=0;c<a.length;++c){var b=a[c];if(b&&b.Math==Math)return b}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};
$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,c){var b=$jscomp.propertyToPolyfillSymbol[c];if(null==b)return a[c];b=a[b];return void 0!==b?b:a[c]};$jscomp.polyfill=function(a,c,b,e){c&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,c,b,e):$jscomp.polyfillUnisolated(a,c,b,e))};
$jscomp.polyfillUnisolated=function(a,c,b,e){b=$jscomp.global;a=a.split(".");for(e=0;e<a.length-1;e++){var d=a[e];if(!(d in b))return;b=b[d]}a=a[a.length-1];e=b[a];c=c(e);c!=e&&null!=c&&$jscomp.defineProperty(b,a,{configurable:!0,writable:!0,value:c})};
$jscomp.polyfillIsolated=function(a,c,b,e){var d=a.split(".");a=1===d.length;e=d[0];e=!a&&e in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var f=0;f<d.length-1;f++){var g=d[f];if(!(g in e))return;e=e[g]}d=d[d.length-1];b=$jscomp.IS_SYMBOL_NATIVE&&"es6"===b?e[d]:null;c=c(b);null!=c&&(a?$jscomp.defineProperty($jscomp.polyfills,d,{configurable:!0,writable:!0,value:c}):c!==b&&(void 0===$jscomp.propertyToPolyfillSymbol[d]&&($jscomp.propertyToPolyfillSymbol[d]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(d):
$jscomp.POLYFILL_PREFIX+d),d=$jscomp.propertyToPolyfillSymbol[d],$jscomp.defineProperty(e,d,{configurable:!0,writable:!0,value:c})))};$jscomp.polyfill("String.prototype.startsWith",function(a){return a?a:function(c,b){var e=$jscomp.checkStringArgs(this,c,"startsWith");c+="";var d=e.length,f=c.length;b=Math.max(0,Math.min(b|0,e.length));for(var g=0;g<f&&b<d;)if(e[b++]!=c[g++])return!1;return g>=f}},"es6","es3");
(function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)})(function(a){a.registerHelper("lint","javascript",function(c,b){if(!window.JSHINT)return window.console&&window.console.error("Error: window.JSHINT not defined, CodeMirror JavaScript linting cannot run."),[];b.indent||(b.indent=1);JSHINT(c,b,b.globals);c=JSHINT.data().errors;b=[];if(c)for(var e=0;e<c.length;e++){var d=
c[e];if(d)if(0>=d.line)window.console&&window.console.warn("Cannot display JSHint error (invalid line "+d.line+")",d);else{var f=d.character-1,g=f+1;if(d.evidence){var h=d.evidence.substring(f).search(/.\b/);-1<h&&(g+=h)}d={message:d.reason,severity:d.code?d.code.startsWith("W")?"warning":"error":"error",from:a.Pos(d.line-1,f),to:a.Pos(d.line-1,g)};b.push(d)}}return b})});
