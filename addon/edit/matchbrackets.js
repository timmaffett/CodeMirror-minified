'use strict';(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){function p(a,c,b,e){var d=a.getLineHandle(c.line),l=c.ch-1,d=0<=l&&r[d.text.charAt(l)]||r[d.text.charAt(++l)];if(!d)return null;var h=">"==d.charAt(1)?1:-1;if(b&&0<h!=(l==c.ch))return null;b=a.getTokenTypeAt(m(c.line,l+1));a=t(a,m(c.line,l+(0<h?1:0)),h,b||null,e);return null==a?null:{from:m(c.line,
l),to:a&&a.pos,match:a&&a.ch==d.charAt(0),forward:0<h}}function t(a,c,b,e,d){var l=d&&d.maxScanLineLength||1E4,h=d&&d.maxScanLines||1E3,g=[];d=d&&d.bracketRegex?d.bracketRegex:/[(){}[\]]/;for(var h=0<b?Math.min(c.line+h,a.lastLine()+1):Math.max(a.firstLine()-1,c.line-h),k=c.line;k!=h;k+=b){var n=a.getLine(k);if(n){var f=0<b?0:n.length-1,p=0<b?n.length:-1;if(!(n.length>l))for(k==c.line&&(f=c.ch-(0>b?1:0));f!=p;f+=b){var q=n.charAt(f);if(d.test(q)&&(void 0===e||a.getTokenTypeAt(m(k,f+1))==e))if(">"==
r[q].charAt(1)==0<b)g.push(q);else if(g.length)g.pop();else return{pos:m(k,f),ch:q}}}}return k-b==(0<b?a.lastLine():a.firstLine())?!1:null}function u(a,c,b){for(var e=a.state.matchBrackets.maxHighlightLineLength||1E3,d=[],f=a.listSelections(),h=0;h<f.length;h++){var g=f[h].empty()&&p(a,f[h].head,!1,b);if(g&&a.getLine(g.from.line).length<=e){var k=g.match?"CodeMirror-matchingbracket":"CodeMirror-nonmatchingbracket";d.push(a.markText(g.from,m(g.from.line,g.from.ch+1),{className:k}));g.to&&a.getLine(g.to.line).length<=
e&&d.push(a.markText(g.to,m(g.to.line,g.to.ch+1),{className:k}))}}if(d.length)if(w&&a.state.focused&&a.focus(),b=function(){a.operation(function(){for(var a=0;a<d.length;a++)d[a].clear()})},c)setTimeout(b,800);else return b}function v(a){a.operation(function(){f&&(f(),f=null);f=u(a,!1,a.state.matchBrackets)})}var w=/MSIE \d/.test(navigator.userAgent)&&(null==document.documentMode||8>document.documentMode),m=e.Pos,r={"(":")>",")":"(<","[":"]>","]":"[<","{":"}>","}":"{<"},f=null;e.defineOption("matchBrackets",
!1,function(a,c,b){b&&b!=e.Init&&(a.off("cursorActivity",v),f&&(f(),f=null));c&&(a.state.matchBrackets="object"==typeof c?c:{},a.on("cursorActivity",v))});e.defineExtension("matchBrackets",function(){u(this,!0)});e.defineExtension("findMatchingBracket",function(a,c,b){return p(this,a,c,b)});e.defineExtension("scanForBracket",function(a,c,b,e){return t(this,a,c,b,e)})});
