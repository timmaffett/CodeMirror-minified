'use strict';(function(n){"object"==typeof exports&&"object"==typeof module?n(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],n):n(CodeMirror)})(function(n){function q(d,b,v){return v?0<=d.indexOf(b):0==d.lastIndexOf(b,0)}var w=n.Pos;n.registerHelper("hint","xml",function(d,b){function v(){return{list:p,from:r?w(k.line,null==z?a.start:z):k,to:r?w(k.line,a.end):k}}var c=b&&b.schemaInfo,t=b&&b.quoteChar||'"',u=b&&b.matchInMiddle;if(c){var k=d.getCursor(),
a=d.getTokenAt(k);a.end>k.ch&&(a.end=k.ch,a.string=a.string.slice(0,k.ch-a.start));b=n.innerMode(d.getMode(),a.state);if(b.mode.xmlCurrentTag){var p=[],r=!1,m=/\btag\b/.test(a.type)&&!/>$/.test(a.string),C=m&&/^\w/.test(a.string),z;if(C){var e=d.getLine(k.line).slice(Math.max(0,a.start-2),a.start);(e=/<\/$/.test(e)?"close":/<$/.test(e)?"open":null)&&(z=a.start-("close"==e?2:1))}else m&&"<"==a.string?e="open":m&&"</"==a.string&&(e="close");var A=b.mode.xmlCurrentTag(b.state);if(!m&&!A||e){if(C)var h=
a.string;r=e;var g=b.mode.xmlCurrentContext?b.mode.xmlCurrentContext(b.state):[];m=(b=g.length&&g[g.length-1])&&c[b];if((g=b?m&&m.children:c["!top"])&&"close"!=e)for(d=0;d<g.length;++d)h&&!q(g[d],h,u)||p.push("<"+g[d]);else if("close"!=e)for(var f in c)!c.hasOwnProperty(f)||"!top"==f||"!attrs"==f||h&&!q(f,h,u)||p.push("<"+f);b&&(!h||"close"==e&&q(b,h,u))&&p.push("</"+b+">")}else{f=(m=A&&c[A.name])&&m.attrs;c=c["!attrs"];if(!f&&!c)return;if(!f)f=c;else if(c){e={};for(var l in c)c.hasOwnProperty(l)&&
(e[l]=c[l]);for(l in f)f.hasOwnProperty(l)&&(e[l]=f[l]);f=e}if("string"==a.type||"="==a.string){e=d.getRange(w(k.line,Math.max(0,k.ch-60)),w(k.line,"string"==a.type?a.start:a.end));c=e.match(/([^\s\u00a0=<>"']+)=$/);if(!c||!f.hasOwnProperty(c[1])||!(g=f[c[1]]))return;"function"==typeof g&&(g=g.call(this,d));"string"==a.type&&(h=a.string,c=0,/['"]/.test(a.string.charAt(0))&&(t=a.string.charAt(0),h=a.string.slice(1),c++),l=a.string.length,/['"]/.test(a.string.charAt(l-1))&&(t=a.string.charAt(l-1),h=
a.string.substr(c,l-2)),c&&(d=d.getLine(k.line),d.length>a.end&&d.charAt(a.end)==t&&a.end++),r=!0);d=function(x){if(x)for(var y=0;y<x.length;++y)h&&!q(x[y],h,u)||p.push(t+x[y]+t);return v()};return g&&g.then?g.then(d):d(g)}"attribute"==a.type&&(h=a.string,r=!0);for(var B in f)!f.hasOwnProperty(B)||h&&!q(B,h,u)||p.push(B)}return v()}}})});
