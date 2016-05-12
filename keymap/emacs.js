'use strict';(function(l){"object"==typeof exports&&"object"==typeof module?l(require("../lib/codemirror")):"function"==typeof define&&define.amd?define(["../lib/codemirror"],l):l(CodeMirror)})(function(l){function z(a,b){return a.line==b.line&&a.ch==b.ch}function A(a){h.push(a);50<h.length&&h.shift()}function F(a){return h[h.length-(a?Math.min(a,1):1)]||""}function O(){1<h.length&&h.pop();return F()}function r(a,b,c,d,e){null==e&&(e=a.getRange(b,c));d&&t&&t.cm==a&&z(b,t.pos)&&a.isClean(t.gen)?h.length?
h[h.length-1]+=e:A(e):A(e);a.replaceRange("",b,c,"+delete");t=d?{cm:a,pos:b,gen:a.changeGeneration()}:null}function p(a,b,c){return a.findPosH(b,c,"char",!0)}function u(a,b,c){return a.findPosH(b,c,"word",!0)}function v(a,b,c){return a.findPosV(b,c,"line",a.doc.sel.goalColumn)}function w(a,b,c){return a.findPosV(b,c,"page",a.doc.sel.goalColumn)}function G(a,b,c){var d=b.line,e=a.getLine(d);b=/\S/.test(0>c?e.slice(0,b.ch):e.slice(b.ch));for(var f=a.firstLine(),g=a.lastLine();;){d+=c;if(d<f||d>g)return a.clipPos(k(d-
c,0>c?0:null));e=a.getLine(d);if(/\S/.test(e))b=!0;else if(b)return k(d,0)}}function x(a,b,c){var d=b.line,e=b.ch;b=a.getLine(b.line);for(var f=!1;;){var g=b.charAt(e+(0>c?-1:0));if(g){if(f&&/[!?.]/.test(g))return k(d,e+(0<c?1:0));f||(f=/\w/.test(g));e+=c}else{if(d==(0>c?a.firstLine():a.lastLine()))return k(d,e);b=a.getLine(d+c);if(!/\S/.test(b))return k(d,e);d+=c;e=0>c?b.length:0}}}function m(a,b,c){var d;if(a.findMatchingBracket&&(d=a.findMatchingBracket(b,!0))&&d.match&&(d.forward?1:-1)==c)return 0<
c?k(d.to.line,d.to.ch+1):d.to;for(var e=!0;;e=!1){var f=a.getTokenAt(b);d=k(b.line,0>c?f.start:f.end);if(e&&0<c&&f.end==b.ch||!/\w/.test(f.string)){e=a.findPosH(d,c,"char");if(z(d,e))return b;b=e}else return d}}function q(a,b){var c=a.state.emacsPrefix;if(!c)return b?null:1;B(a);return"-"==c?-1:Number(c)}function g(a){var b="string"==typeof a?function(b){b.execCommand(a)}:a;return function(a){var d=q(a);b(a);for(var e=1;e<d;++e)b(a)}}function C(a,b,c,d){var e=q(a);0>e&&(d=-d,e=-e);for(var f=0;f<e;++f){var g=
c(a,b,d);if(z(g,b))break;b=g}return b}function f(a,b){var c=function(c){c.extendSelection(C(c,c.getCursor(),a,b))};c.motion=!0;return c}function n(a,b,c){for(var d=a.listSelections(),e,f=d.length;f--;)e=d[f].head,r(a,e,C(a,e,b,c),!0)}function H(a){if(a.somethingSelected()){for(var b=a.listSelections(),c,d=b.length;d--;)c=b[d],r(a,c.anchor,c.head);return!0}}function I(a,b){a.state.emacsPrefix?"-"!=b&&(a.state.emacsPrefix+=b):(a.state.emacsPrefix=b,a.on("keyHandled",J),a.on("inputRead",K))}function J(a,
b){a.state.emacsPrefixMap||L.hasOwnProperty(b)||B(a)}function B(a){a.state.emacsPrefix=null;a.off("keyHandled",J);a.off("inputRead",K)}function K(a,b){var c=q(a);if(1<c&&"+input"==b.origin){b=b.text.join("\n");for(var d="",e=1;e<c;++e)d+=b;a.replaceSelection(d)}}function y(a,b){if("string"!=typeof b||!/^\d$/.test(b)&&"Ctrl-U"!=b)a.removeKeyMap(D),a.state.emacsPrefixMap=!1,a.off("keyHandled",y),a.off("inputRead",y)}function M(a){a.setCursor(a.getCursor());a.setExtending(!a.getExtending());a.on("change",
function(){a.setExtending(!1)})}function P(a,b,c){a.openDialog?a.openDialog(b+': <input type="text" style="width: 10em"/>',c,{bottom:!0}):c(prompt(b,""))}function E(a,b){var c=a.getCursor(),d=a.findPosH(c,1,"word");a.replaceRange(b(a.getRange(c,d)),c,d);a.setCursor(d)}function N(a){D[a]=function(b){I(b,a)};Q["Ctrl-"+a]=function(b){I(b,a)};L["Ctrl-"+a]=!0}var k=l.Pos,h=[],t=null,L={"Alt-G":!0,"Ctrl-X":!0,"Ctrl-Q":!0,"Ctrl-U":!0},Q=l.keyMap.emacs=l.normalizeKeyMap({"Ctrl-W":function(a){r(a,a.getCursor("start"),
a.getCursor("end"))},"Ctrl-K":g(function(a){var b=a.getCursor(),c=a.clipPos(k(b.line)),d=a.getRange(b,c);/\S/.test(d)||(d+="\n",c=k(b.line+1,0));r(a,b,c,!0,d)}),"Alt-W":function(a){A(a.getSelection());a.setExtending(!1);a.setCursor(a.getCursor())},"Ctrl-Y":function(a){var b=a.getCursor();a.replaceRange(F(q(a)),b,b,"paste");a.setSelection(b,a.getCursor())},"Alt-Y":function(a){a.replaceSelection(O(),"around","paste")},"Ctrl-Space":M,"Ctrl-Shift-2":M,"Ctrl-F":f(p,1),"Ctrl-B":f(p,-1),Right:f(p,1),Left:f(p,
-1),"Ctrl-D":function(a){n(a,p,1)},Delete:function(a){H(a)||n(a,p,1)},"Ctrl-H":function(a){n(a,p,-1)},Backspace:function(a){H(a)||n(a,p,-1)},"Alt-F":f(u,1),"Alt-B":f(u,-1),"Alt-D":function(a){n(a,u,1)},"Alt-Backspace":function(a){n(a,u,-1)},"Ctrl-N":f(v,1),"Ctrl-P":f(v,-1),Down:f(v,1),Up:f(v,-1),"Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd",End:"goLineEnd",Home:"goLineStart","Alt-V":f(w,-1),"Ctrl-V":f(w,1),PageUp:f(w,-1),PageDown:f(w,1),"Ctrl-Up":f(G,-1),"Ctrl-Down":f(G,1),"Alt-A":f(x,-1),"Alt-E":f(x,
1),"Alt-K":function(a){n(a,x,1)},"Ctrl-Alt-K":function(a){n(a,m,1)},"Ctrl-Alt-Backspace":function(a){n(a,m,-1)},"Ctrl-Alt-F":f(m,1),"Ctrl-Alt-B":f(m,-1),"Shift-Ctrl-Alt-2":function(a){var b=a.getCursor();a.setSelection(C(a,b,m,1),b)},"Ctrl-Alt-T":function(a){var b=m(a,a.getCursor(),-1),c=m(a,b,1),d=m(a,c,1),e=m(a,d,-1);a.replaceRange(a.getRange(e,d)+a.getRange(c,e)+a.getRange(b,c),b,d)},"Ctrl-Alt-U":g(function(a){for(var b=a.getCursor(),c=b.line,b=b.ch,d=[];c>=a.firstLine();){for(var e=a.getLine(c),
f=null==b?e.length:b;0<f;)if(b=e.charAt(--f),")"==b)d.push("(");else if("]"==b)d.push("[");else if("}"==b)d.push("{");else if(/[\(\{\[]/.test(b)&&(!d.length||d.pop()!=b))return a.extendSelection(k(c,f));--c;b=null}}),"Alt-Space":function(a){for(var b=a.getCursor(),c=b.ch,d=b.ch,e=a.getLine(b.line);c&&/\s/.test(e.charAt(c-1));)--c;for(;d<e.length&&/\s/.test(e.charAt(d));)++d;a.replaceRange(" ",k(b.line,c),k(b.line,d))},"Ctrl-O":g(function(a){a.replaceSelection("\n","start")}),"Ctrl-T":g(function(a){a.execCommand("transposeChars")}),
"Alt-C":g(function(a){E(a,function(a){var c=a.search(/\w/);return-1==c?a:a.slice(0,c)+a.charAt(c).toUpperCase()+a.slice(c+1).toLowerCase()})}),"Alt-U":g(function(a){E(a,function(a){return a.toUpperCase()})}),"Alt-L":g(function(a){E(a,function(a){return a.toLowerCase()})}),"Alt-;":"toggleComment","Ctrl-/":g("undo"),"Shift-Ctrl--":g("undo"),"Ctrl-Z":g("undo"),"Cmd-Z":g("undo"),"Shift-Alt-,":"goDocStart","Shift-Alt-.":"goDocEnd","Ctrl-S":"findNext","Ctrl-R":"findPrev","Ctrl-G":function(a){a.execCommand("clearSearch");
a.setExtending(!1);a.setCursor(a.getCursor())},"Shift-Alt-5":"replace","Alt-/":"autocomplete","Ctrl-J":"newlineAndIndent",Enter:!1,Tab:"indentAuto","Alt-G G":function(a){var b=q(a,!0);if(null!=b&&0<b)return a.setCursor(b-1);P(a,"Goto line",function(b){var d;b&&!isNaN(d=Number(b))&&d==(d|0)&&0<d&&a.setCursor(d-1)})},"Ctrl-X Tab":function(a){a.indentSelection(q(a,!0)||a.getOption("indentUnit"))},"Ctrl-X Ctrl-X":function(a){a.setSelection(a.getCursor("head"),a.getCursor("anchor"))},"Ctrl-X Ctrl-S":"save",
"Ctrl-X Ctrl-W":"save","Ctrl-X S":"saveAll","Ctrl-X F":"open","Ctrl-X U":g("undo"),"Ctrl-X K":"close","Ctrl-X Delete":function(a){r(a,a.getCursor(),x(a,a.getCursor(),1),!0)},"Ctrl-X H":"selectAll","Ctrl-Q Tab":g("insertTab"),"Ctrl-U":function(a){a.state.emacsPrefixMap=!0;a.addKeyMap(D);a.on("keyHandled",y);a.on("inputRead",y)}}),D={"Ctrl-G":B};for(l=0;10>l;++l)N(String(l));N("-")});
