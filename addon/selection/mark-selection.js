'use strict';var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(a,c,d){a instanceof String&&(a=String(a));for(var e=a.length,f=0;f<e;f++){var m=a[f];if(c.call(d,m,f,a))return{i:f,v:m}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;$jscomp.FORCE_POLYFILL_PROMISE=!1;$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,d){if(a==Array.prototype||a==Object.prototype)return a;a[c]=d.value;return a};$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var c=0;c<a.length;++c){var d=a[c];if(d&&d.Math==Math)return d}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,c){var d=$jscomp.propertyToPolyfillSymbol[c];if(null==d)return a[c];d=a[d];return void 0!==d?d:a[c]};
$jscomp.polyfill=function(a,c,d,e){c&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,c,d,e):$jscomp.polyfillUnisolated(a,c,d,e))};$jscomp.polyfillUnisolated=function(a,c,d,e){d=$jscomp.global;a=a.split(".");for(e=0;e<a.length-1;e++){var f=a[e];if(!(f in d))return;d=d[f]}a=a[a.length-1];e=d[a];c=c(e);c!=e&&null!=c&&$jscomp.defineProperty(d,a,{configurable:!0,writable:!0,value:c})};
$jscomp.polyfillIsolated=function(a,c,d,e){var f=a.split(".");a=1===f.length;e=f[0];e=!a&&e in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var m=0;m<f.length-1;m++){var r=f[m];if(!(r in e))return;e=e[r]}f=f[f.length-1];d=$jscomp.IS_SYMBOL_NATIVE&&"es6"===d?e[f]:null;c=c(d);null!=c&&(a?$jscomp.defineProperty($jscomp.polyfills,f,{configurable:!0,writable:!0,value:c}):c!==d&&(void 0===$jscomp.propertyToPolyfillSymbol[f]&&($jscomp.propertyToPolyfillSymbol[f]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(f):
$jscomp.POLYFILL_PREFIX+f),$jscomp.defineProperty(e,$jscomp.propertyToPolyfillSymbol[f],{configurable:!0,writable:!0,value:c})))};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(c,d){return $jscomp.findInternal(this,c,d).v}},"es6","es3");
(function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)})(function(a){function c(b){b.state.markedSelection&&b.operation(function(){r(b)})}function d(b){b.state.markedSelection&&b.state.markedSelection.length&&b.operation(function(){f(b)})}function e(b,g,h,k){if(0!=p(g,h))for(var l=b.state.markedSelection,n=b.state.markedSelectionStyle,q=g.line;;){var t=q==g.line?g:v(q,
0);q+=u;var w=q>=h.line,x=w?h:v(q,0);t=b.markText(t,x,{className:n});null==k?l.push(t):l.splice(k++,0,t);if(w)break}}function f(b){b=b.state.markedSelection;for(var g=0;g<b.length;++g)b[g].clear();b.length=0}function m(b){f(b);for(var g=b.listSelections(),h=0;h<g.length;h++)e(b,g[h].from(),g[h].to())}function r(b){if(!b.somethingSelected())return f(b);if(1<b.listSelections().length)return m(b);var g=b.getCursor("start"),h=b.getCursor("end"),k=b.state.markedSelection;if(!k.length)return e(b,g,h);var l=
k[0].find(),n=k[k.length-1].find();if(!l||!n||h.line-g.line<=u||0<=p(g,n.to)||0>=p(h,l.from))return m(b);for(;0<p(g,l.from);)k.shift().clear(),l=k[0].find();0>p(g,l.from)&&(l.to.line-g.line<u?(k.shift().clear(),e(b,g,l.to,0)):e(b,g,l.from,0));for(;0>p(h,n.to);)k.pop().clear(),n=k[k.length-1].find();0<p(h,n.to)&&(h.line-n.from.line<u?(k.pop().clear(),e(b,n.from,h)):e(b,n.to,h))}a.defineOption("styleSelectedText",!1,function(b,g,h){h=h&&h!=a.Init;g&&!h?(b.state.markedSelection=[],b.state.markedSelectionStyle=
"string"==typeof g?g:"CodeMirror-selectedtext",m(b),b.on("cursorActivity",c),b.on("change",d)):!g&&h&&(b.off("cursorActivity",c),b.off("change",d),f(b),b.state.markedSelection=b.state.markedSelectionStyle=null)});var u=8,v=a.Pos,p=a.cmpPos});
