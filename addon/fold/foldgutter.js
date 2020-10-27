'use strict';var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(c,e,d){c instanceof String&&(c=String(c));for(var k=c.length,f=0;f<k;f++){var l=c[f];if(e.call(d,l,f,c))return{i:f,v:l}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;$jscomp.FORCE_POLYFILL_PROMISE=!1;$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(c,e,d){if(c==Array.prototype||c==Object.prototype)return c;c[e]=d.value;return c};$jscomp.getGlobal=function(c){c=["object"==typeof globalThis&&globalThis,c,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var e=0;e<c.length;++e){var d=c[e];if(d&&d.Math==Math)return d}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(c,e){var d=$jscomp.propertyToPolyfillSymbol[e];if(null==d)return c[e];d=c[d];return void 0!==d?d:c[e]};
$jscomp.polyfill=function(c,e,d,k){e&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(c,e,d,k):$jscomp.polyfillUnisolated(c,e,d,k))};$jscomp.polyfillUnisolated=function(c,e,d,k){d=$jscomp.global;c=c.split(".");for(k=0;k<c.length-1;k++){var f=c[k];if(!(f in d))return;d=d[f]}c=c[c.length-1];k=d[c];e=e(k);e!=k&&null!=e&&$jscomp.defineProperty(d,c,{configurable:!0,writable:!0,value:e})};
$jscomp.polyfillIsolated=function(c,e,d,k){var f=c.split(".");c=1===f.length;k=f[0];k=!c&&k in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var l=0;l<f.length-1;l++){var n=f[l];if(!(n in k))return;k=k[n]}f=f[f.length-1];d=$jscomp.IS_SYMBOL_NATIVE&&"es6"===d?k[f]:null;e=e(d);null!=e&&(c?$jscomp.defineProperty($jscomp.polyfills,f,{configurable:!0,writable:!0,value:e}):e!==d&&($jscomp.propertyToPolyfillSymbol[f]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(f):$jscomp.POLYFILL_PREFIX+f,f=
$jscomp.propertyToPolyfillSymbol[f],$jscomp.defineProperty(k,f,{configurable:!0,writable:!0,value:e})))};$jscomp.polyfill("Array.prototype.find",function(c){return c?c:function(e,d){return $jscomp.findInternal(this,e,d).v}},"es6","es3");
(function(c){"object"==typeof exports&&"object"==typeof module?c(require("../../lib/codemirror"),require("./foldcode")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","./foldcode"],c):c(CodeMirror)})(function(c){function e(a){this.options=a;this.from=this.to=0}function d(a,b){a=a.findMarks(p(b,0),p(b+1,0));for(var g=0;g<a.length;++g)if(a[g].__isFold){var h=a[g].find(-1);if(h&&h.line===b)return a[g]}}function k(a){if("string"==typeof a){var b=document.createElement("div");b.className=
a+" CodeMirror-guttermarker-subtle";return b}return a.cloneNode(!0)}function f(a,b,g){var h=a.state.foldGutter.options,v=b-1,B=a.foldOption(h,"minFoldSize"),w=a.foldOption(h,"rangeFinder"),x="string"==typeof h.indicatorFolded&&new RegExp("(^|\\s)"+h.indicatorFolded+"(?:$|\\s)\\s*"),y="string"==typeof h.indicatorOpen&&new RegExp("(^|\\s)"+h.indicatorOpen+"(?:$|\\s)\\s*");a.eachLine(b,g,function(z){++v;var q=null,m=z.gutterMarkers;m&&(m=m[h.gutter]);if(d(a,v)){if(x&&m&&x.test(m.className))return;q=
k(h.indicatorFolded)}else{var r=p(v,0);if((r=w&&w(a,r))&&r.to.line-r.from.line>=B){if(y&&m&&y.test(m.className))return;q=k(h.indicatorOpen)}}(q||m)&&a.setGutterMarker(z,h.gutter,q)})}function l(a){var b=a.getViewport(),g=a.state.foldGutter;g&&(a.operation(function(){f(a,b.from,b.to)}),g.from=b.from,g.to=b.to)}function n(a,b,g){var h=a.state.foldGutter;h&&(h=h.options,g==h.gutter&&((g=d(a,b))?g.clear():a.foldCode(p(b,0),h)))}function t(a){var b=a.state.foldGutter;if(b){var g=b.options;b.from=b.to=
0;clearTimeout(b.changeUpdate);b.changeUpdate=setTimeout(function(){l(a)},g.foldOnChangeTimeSpan||600)}}function A(a){var b=a.state.foldGutter;if(b){var g=b.options;clearTimeout(b.changeUpdate);b.changeUpdate=setTimeout(function(){var h=a.getViewport();b.from==b.to||20<h.from-b.to||20<b.from-h.to?l(a):a.operation(function(){h.from<b.from&&(f(a,h.from,b.from),b.from=h.from);h.to>b.to&&(f(a,b.to,h.to),b.to=h.to)})},g.updateViewportTimeSpan||400)}}function u(a,b){var g=a.state.foldGutter;g&&(b=b.line,
b>=g.from&&b<g.to&&f(a,b,b+1))}c.defineOption("foldGutter",!1,function(a,b,g){g&&g!=c.Init&&(a.clearGutter(a.state.foldGutter.options.gutter),a.state.foldGutter=null,a.off("gutterClick",n),a.off("changes",t),a.off("viewportChange",A),a.off("fold",u),a.off("unfold",u),a.off("swapDoc",t));b&&(g=a.state,!0===b&&(b={}),null==b.gutter&&(b.gutter="CodeMirror-foldgutter"),null==b.indicatorOpen&&(b.indicatorOpen="CodeMirror-foldgutter-open"),null==b.indicatorFolded&&(b.indicatorFolded="CodeMirror-foldgutter-folded"),
g.foldGutter=new e(b),l(a),a.on("gutterClick",n),a.on("changes",t),a.on("viewportChange",A),a.on("fold",u),a.on("unfold",u),a.on("swapDoc",t))});var p=c.Pos});
