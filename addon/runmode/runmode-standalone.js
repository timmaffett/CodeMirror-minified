'use strict';var root="undefined"!==typeof globalThis?globalThis:window;root.CodeMirror={};
(function(){function h(a,b){this.pos=this.start=0;this.string=a[b];this.strings=a;this.i=b;this.lineStart=0}h.prototype={eol:function(){return this.pos>=this.string.length},sol:function(){return 0==this.pos},peek:function(){return this.string.charAt(this.pos)||null},next:function(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)},eat:function(a){var b=this.string.charAt(this.pos);if("string"==typeof a?b==a:b&&(a.test?a.test(b):a(b)))return++this.pos,b},eatWhile:function(a){for(var b=
this.pos;this.eat(a););return this.pos>b},eatSpace:function(){for(var a=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>a},skipToEnd:function(){this.pos=this.string.length},skipTo:function(a){a=this.string.indexOf(a,this.pos);if(-1<a)return this.pos=a,!0},backUp:function(a){this.pos-=a},column:function(){return this.start-this.lineStart},indentation:function(){return 0},match:function(a,b,d){if("string"==typeof a){var c=function(a){return d?a.toLowerCase():a},
f=this.string.substr(this.pos,a.length);if(c(f)==c(a))return!1!==b&&(this.pos+=a.length),!0}else{if((a=this.string.slice(this.pos).match(a))&&0<a.index)return null;a&&!1!==b&&(this.pos+=a[0].length);return a}},current:function(){return this.string.slice(this.start,this.pos)},hideFirstChars:function(a,b){this.lineStart+=a;try{return b()}finally{this.lineStart-=a}},lookAhead:function(a){return this.strings[this.i+a]}};CodeMirror.StringStream=h;CodeMirror.startState=function(a,b,d){return a.startState?
a.startState(b,d):!0};var l=CodeMirror.modes={},f=CodeMirror.mimeModes={};CodeMirror.defineMode=function(a,b){2<arguments.length&&(b.dependencies=Array.prototype.slice.call(arguments,2));l[a]=b};CodeMirror.defineMIME=function(a,b){f[a]=b};CodeMirror.resolveMode=function(a){"string"==typeof a&&f.hasOwnProperty(a)?a=f[a]:a&&"string"==typeof a.name&&f.hasOwnProperty(a.name)&&(a=f[a.name]);return"string"==typeof a?{name:a}:a||{name:"null"}};CodeMirror.getMode=function(a,b){b=CodeMirror.resolveMode(b);
var d=l[b.name];if(!d)throw Error("Unknown mode: "+b);return d(a,b)};CodeMirror.registerHelper=CodeMirror.registerGlobalHelper=Math.min;CodeMirror.defineMode("null",function(){return{token:function(a){a.skipToEnd()}}});CodeMirror.defineMIME("text/plain","null");CodeMirror.runMode=function(a,b,d,c){b=CodeMirror.getMode({indentUnit:2},b);var f=/MSIE \d/.test(navigator.userAgent)&&(null==document.documentMode||9>document.documentMode);if(d.appendChild){var h=c&&c.tabSize||4,m=d,k=0;m.innerHTML="";d=
function(a,b){if("\n"==a)m.appendChild(document.createTextNode(f?"\r":a)),k=0;else{for(var d="",c=0;;){var e=a.indexOf("\t",c);if(-1==e){d+=a.slice(c);k+=a.length-c;break}else{k+=e-c;d+=a.slice(c,e);c=h-k%h;k+=c;for(var g=0;g<c;++g)d+=" ";c=e+1}}b?(a=m.appendChild(document.createElement("span")),a.className="cm-"+b.replace(/ +/g," cm-"),a.appendChild(document.createTextNode(d))):m.appendChild(document.createTextNode(d))}}}a=a.split(/\r?\n|\r/);c=c&&c.state||CodeMirror.startState(b);for(var g=0,l=
a.length;g<l;++g){g&&d("\n");var e=new CodeMirror.StringStream(a,g);for(!e.string&&b.blankLine&&b.blankLine(c);!e.eol();){var n=b.token(e,c);d(e.current(),n,g,e.start,c);e.start=e.pos}}}})();
