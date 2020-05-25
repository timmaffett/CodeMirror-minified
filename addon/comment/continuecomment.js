'use strict';var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.checkStringArgs=function(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,b){var c=$jscomp.propertyToPolyfillSymbol[b];if(null==c)return a[b];c=a[c];return void 0!==c?c:a[b]};
$jscomp.polyfill=function(a,b,c,e){b&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,b,c,e):$jscomp.polyfillUnisolated(a,b,c,e))};$jscomp.polyfillUnisolated=function(a,b,c,e){c=$jscomp.global;a=a.split(".");for(e=0;e<a.length-1;e++){var d=a[e];d in c||(c[d]={});c=c[d]}a=a[a.length-1];e=c[a];b=b(e);b!=e&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})};
$jscomp.polyfillIsolated=function(a,b,c,e){var d=a.split(".");a=1===d.length;e=d[0];e=!a&&e in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var n=0;n<d.length-1;n++){var p=d[n];p in e||(e[p]={});e=e[p]}d=d[d.length-1];c=$jscomp.IS_SYMBOL_NATIVE&&"es6"===c?e[d]:null;b=b(c);null!=b&&(a?$jscomp.defineProperty($jscomp.polyfills,d,{configurable:!0,writable:!0,value:b}):b!==c&&($jscomp.propertyToPolyfillSymbol[d]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(d):$jscomp.POLYFILL_PREFIX+d,d=$jscomp.propertyToPolyfillSymbol[d],
$jscomp.defineProperty(e,d,{configurable:!0,writable:!0,value:b})))};$jscomp.polyfill("String.prototype.repeat",function(a){return a?a:function(a){var c=$jscomp.checkStringArgs(this,null,"repeat");if(0>a||1342177279<a)throw new RangeError("Invalid count value");a|=0;for(var b="";a;)if(a&1&&(b+=c),a>>>=1)c+=c;return b}},"es6","es3");
(function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)})(function(a){function b(b){if(b.getOption("disableInput"))return a.Pass;for(var d=b.listSelections(),l,p=[],q=0;q<d.length;q++){var h=d[q].head;if(!/\bcomment\b/.test(b.getTokenTypeAt(h)))return a.Pass;var m=b.getModeAt(h);if(!l)l=m;else if(l!=m)return a.Pass;var f=null,g,r=l.blockCommentStart;m=l.lineComment;if(r&&
l.blockCommentContinue){var k=b.getLine(h.line);var t=k.lastIndexOf(l.blockCommentEnd,h.ch-l.blockCommentEnd.length);if(!(-1!=t&&t==h.ch-l.blockCommentEnd.length||m&&-1<(g=k.lastIndexOf(m,h.ch-1))&&/\bcomment\b/.test(b.getTokenTypeAt({line:h.line,ch:g+1}))))if(h.ch>=r.length&&-1<(g=k.lastIndexOf(r,h.ch-r.length))&&g>t)if(c(0,k)>=g)f=k.slice(0,g);else{f=b.options.tabSize;var u;g=a.countColumn(k,g,f);f=b.options.indentWithTabs?n.call("\t",u=Math.floor(g/f))+n.call(" ",g-f*u):n.call(" ",g)}else-1<(g=
k.indexOf(l.blockCommentContinue))&&g<=h.ch&&g<=c(0,k)&&(f=k.slice(0,g));null!=f&&(f+=l.blockCommentContinue)}null==f&&m&&e(b)&&((null==k&&(k=b.getLine(h.line)),g=k.indexOf(m),h.ch||g)?-1<g&&c(0,k)>=g&&(f=-1<c(h.ch,k),f||(h=b.getLine(h.line+1)||"",f=h.indexOf(m),f=-1<f&&c(0,h)>=f||null),f&&(f=k.slice(0,g)+m+k.slice(g+m.length).match(/^\s*/)[0])):f="");if(null==f)return a.Pass;p[q]="\n"+f}b.operation(function(){for(var a=d.length-1;0<=a;a--)b.replaceRange(p[a],d[a].from(),d[a].to(),"+insert")})}function c(a,
b){d.lastIndex=a;return(a=d.exec(b))?a.index:-1}function e(a){return(a=a.getOption("continueComments"))&&"object"==typeof a?!1!==a.continueLineComment:!0}var d=/\S/g,n=String.prototype.repeat||function(a){return Array(a+1).join(this)};a.defineOption("continueComments",null,function(c,d,e){e&&e!=a.Init&&c.removeKeyMap("continueComment");d&&(e="Enter","string"==typeof d?e=d:"object"==typeof d&&d.key&&(e=d.key),d={name:"continueComment"},d[e]=b,c.addKeyMap(d))})});
