'use strict';var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(b,f,g){b instanceof String&&(b=String(b));for(var l=b.length,k=0;k<l;k++){var r=b[k];if(f.call(g,r,k,b))return{i:k,v:r}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;$jscomp.FORCE_POLYFILL_PROMISE=!1;$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(b,f,g){if(b==Array.prototype||b==Object.prototype)return b;b[f]=g.value;return b};$jscomp.getGlobal=function(b){b=["object"==typeof globalThis&&globalThis,b,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var f=0;f<b.length;++f){var g=b[f];if(g&&g.Math==Math)return g}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(b,f){var g=$jscomp.propertyToPolyfillSymbol[f];if(null==g)return b[f];g=b[g];return void 0!==g?g:b[f]};
$jscomp.polyfill=function(b,f,g,l){f&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(b,f,g,l):$jscomp.polyfillUnisolated(b,f,g,l))};$jscomp.polyfillUnisolated=function(b,f,g,l){g=$jscomp.global;b=b.split(".");for(l=0;l<b.length-1;l++){var k=b[l];if(!(k in g))return;g=g[k]}b=b[b.length-1];l=g[b];f=f(l);f!=l&&null!=f&&$jscomp.defineProperty(g,b,{configurable:!0,writable:!0,value:f})};
$jscomp.polyfillIsolated=function(b,f,g,l){var k=b.split(".");b=1===k.length;l=k[0];l=!b&&l in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var r=0;r<k.length-1;r++){var y=k[r];if(!(y in l))return;l=l[y]}k=k[k.length-1];g=$jscomp.IS_SYMBOL_NATIVE&&"es6"===g?l[k]:null;f=f(g);null!=f&&(b?$jscomp.defineProperty($jscomp.polyfills,k,{configurable:!0,writable:!0,value:f}):f!==g&&($jscomp.propertyToPolyfillSymbol[k]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(k):$jscomp.POLYFILL_PREFIX+k,k=
$jscomp.propertyToPolyfillSymbol[k],$jscomp.defineProperty(l,k,{configurable:!0,writable:!0,value:f})))};$jscomp.polyfill("Array.prototype.find",function(b){return b?b:function(f,g){return $jscomp.findInternal(this,f,g).v}},"es6","es3");
(function(b){"object"==typeof exports&&"object"==typeof module?b(require("../../lib/codemirror"),require("./searchcursor"),require("../dialog/dialog")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","./searchcursor","../dialog/dialog"],b):b(CodeMirror)})(function(b){function f(a,c){"string"==typeof a?a=new RegExp(a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),c?"gi":"g"):a.global||(a=new RegExp(a.source,a.ignoreCase?"gi":"g"));return{token:function(e){a.lastIndex=e.pos;
var h=a.exec(e.string);if(h&&h.index==e.pos)return e.pos+=h[0].length||1,"searching";h?e.pos=h.index:e.skipToEnd()}}}function g(){this.overlay=this.posFrom=this.posTo=this.lastQuery=this.query=null}function l(a){return a.state.search||(a.state.search=new g)}function k(a){return"string"==typeof a&&a==a.toLowerCase()}function r(a,c,e){return a.getSearchCursor(c,e,{caseFold:k(c),multiline:!0})}function y(a,c,e,h,d){a.openDialog(c,h,{value:e,selectValueOnOpen:!0,closeOnEnter:!1,onClose:function(){x(a)},
onKeyDown:d})}function B(a,c,e,h,d){a.openDialog?a.openDialog(c,d,{value:h,selectValueOnOpen:!0}):d(prompt(e,h))}function I(a,c,e,h){if(a.openConfirm)a.openConfirm(c,h);else if(confirm(e))h[0]()}function D(a){return a.replace(/\\([nrt\\])/g,function(c,e){return"n"==e?"\n":"r"==e?"\r":"t"==e?"\t":"\\"==e?"\\":c})}function E(a){var c=a.match(/^\/(.*)\/([a-z]*)$/);if(c)try{a=new RegExp(c[1],-1==c[2].indexOf("i")?"":"i")}catch(e){}else a=D(a);if("string"==typeof a?""==a:a.test(""))a=/x^/;return a}function z(a,
c,e){c.queryText=e;c.query=E(e);a.removeOverlay(c.overlay,k(c.query));c.overlay=f(c.query,k(c.query));a.addOverlay(c.overlay);a.showMatchesOnScrollbar&&(c.annotate&&(c.annotate.clear(),c.annotate=null),c.annotate=a.showMatchesOnScrollbar(c.query,k(c.query)))}function v(a,c,e,h){var d=l(a);if(d.query)return A(a,c);var p=a.getSelection()||d.lastQuery;p instanceof RegExp&&"x^"==p.source&&(p=null);if(e&&a.openDialog){var m=null,w=function(q,t){b.e_stop(t);q&&(q!=d.queryText&&(z(a,d,q),d.posFrom=d.posTo=
a.getCursor()),m&&(m.style.opacity=1),A(a,t.shiftKey,function(n,u){var C;3>u.line&&document.querySelector&&(C=a.display.wrapper.querySelector(".CodeMirror-dialog"))&&C.getBoundingClientRect().bottom-4>a.cursorCoords(u,"window").top&&((m=C).style.opacity=.4)}))};y(a,F(a),p,w,function(q,t){var n=b.keyName(q),u=a.getOption("extraKeys");n=u&&u[n]||b.keyMap[a.getOption("keyMap")][n];if("findNext"==n||"findPrev"==n||"findPersistentNext"==n||"findPersistentPrev"==n)b.e_stop(q),z(a,l(a),t),a.execCommand(n);
else if("find"==n||"findPersistent"==n)b.e_stop(q),w(t,q)});h&&p&&(z(a,d,p),A(a,c))}else B(a,F(a),"Search for:",p,function(q){q&&!d.query&&a.operation(function(){z(a,d,q);d.posFrom=d.posTo=a.getCursor();A(a,c)})})}function A(a,c,e){a.operation(function(){var h=l(a),d=r(a,h.query,c?h.posFrom:h.posTo);if(!d.find(c)&&(d=r(a,h.query,c?b.Pos(a.lastLine()):b.Pos(a.firstLine(),0)),!d.find(c)))return;a.setSelection(d.from(),d.to());a.scrollIntoView({from:d.from(),to:d.to()},20);h.posFrom=d.from();h.posTo=
d.to();e&&e(d.from(),d.to())})}function x(a){a.operation(function(){var c=l(a);if(c.lastQuery=c.query)c.query=c.queryText=null,a.removeOverlay(c.overlay),c.annotate&&(c.annotate.clear(),c.annotate=null)})}function F(a){return'<span class="CodeMirror-search-label">'+a.phrase("Search:")+'</span> <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">'+a.phrase("(Use /re/ syntax for regexp search)")+"</span>"}function J(a){return'<span class="CodeMirror-search-label">'+
a.phrase("Replace?")+"</span> <button>"+a.phrase("Yes")+"</button> <button>"+a.phrase("No")+"</button> <button>"+a.phrase("All")+"</button> <button>"+a.phrase("Stop")+"</button> "}function G(a,c,e){a.operation(function(){for(var h=r(a,c);h.findNext();)if("string"!=typeof c){var d=a.getRange(h.from(),h.to()).match(c);h.replace(e.replace(/\$(\d)/g,function(p,m){return d[m]}))}else h.replace(e)})}function H(a,c){if(!a.getOption("readOnly")){var e=a.getSelection()||l(a).lastQuery,h='<span class="CodeMirror-search-label">'+
(c?a.phrase("Replace all:"):a.phrase("Replace:"))+"</span>";B(a,h+(' <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">'+a.phrase("(Use /re/ syntax for regexp search)")+"</span>"),h,e,function(d){d&&(d=E(d),B(a,'<span class="CodeMirror-search-label">'+a.phrase("With:")+'</span> <input type="text" style="width: 10em" class="CodeMirror-search-field"/>',a.phrase("Replace with:"),"",function(p){p=D(p);if(c)G(a,d,p);else{x(a);
var m=r(a,d,a.getCursor("from")),w=function(){var t=m.from(),n;if(!(n=m.findNext())&&(m=r(a,d),!(n=m.findNext())||t&&m.from().line==t.line&&m.from().ch==t.ch))return;a.setSelection(m.from(),m.to());a.scrollIntoView({from:m.from(),to:m.to()});I(a,J(a),a.phrase("Replace?"),[function(){q(n)},w,function(){G(a,d,p)}])},q=function(t){m.replace("string"==typeof d?p:p.replace(/\$(\d)/g,function(n,u){return t[u]}));w()};w()}}))})}}b.commands.find=function(a){x(a);v(a)};b.commands.findPersistent=function(a){x(a);
v(a,!1,!0)};b.commands.findPersistentNext=function(a){v(a,!1,!0,!0)};b.commands.findPersistentPrev=function(a){v(a,!0,!0,!0)};b.commands.findNext=v;b.commands.findPrev=function(a){v(a,!0)};b.commands.clearSearch=x;b.commands.replace=H;b.commands.replaceAll=function(a){H(a,!0)}});
