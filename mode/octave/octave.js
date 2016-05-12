'use strict';(function(c){"object"==typeof exports&&"object"==typeof module?c(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],c):c(CodeMirror)})(function(c){c.defineMode("octave",function(){function c(a){return new RegExp("^(("+a.join(")|(")+"))\\b")}function e(a,b){if(!a.sol()&&"'"===a.peek())return a.next(),b.tokenize=d,"operator";b.tokenize=d;return d(a,b)}function f(a,b){if(a.match(/^.*%}/))return b.tokenize=d,"comment";a.skipToEnd();return"comment"}
function d(a,b){if(a.eatSpace())return null;if(a.match("%{"))return b.tokenize=f,a.skipToEnd(),"comment";if(a.match(/^[%#]/))return a.skipToEnd(),"comment";if(a.match(/^[0-9\.+-]/,!1)){if(a.match(/^[+-]?0x[0-9a-fA-F]+[ij]?/))return a.tokenize=d,"number";if(a.match(/^[+-]?\d*\.\d+([EeDd][+-]?\d+)?[ij]?/)||a.match(/^[+-]?\d+([EeDd][+-]?\d+)?[ij]?/))return"number"}if(a.match(c(["nan","NaN","inf","Inf"])))return"number";if(a.match(/^"([^"]|(""))*"/)||a.match(/^'([^']|(''))*'/))return"string";if(a.match(g))return"keyword";
if(a.match(h))return"builtin";if(a.match(k))return"variable";if(a.match(l)||a.match(m))return"operator";if(a.match(n)||a.match(p)||a.match(q))return null;if(a.match(r))return b.tokenize=e,null;a.next();return"error"}var l=/^[\+\-\*/&|\^~<>!@'\\]/,n=/^[\(\[\{\},:=;]/,m=/^((==)|(~=)|(<=)|(>=)|(<<)|(>>)|(\.[\+\-\*/\^\\]))/,p=/^((!=)|(\+=)|(\-=)|(\*=)|(\/=)|(&=)|(\|=)|(\^=))/,q=/^((>>=)|(<<=))/,r=/^[\]\)]/,k=/^[_A-Za-z\u00a1-\uffff][_A-Za-z0-9\u00a1-\uffff]*/,h=c("error eval function abs acos atan asin cos cosh exp log prod sum log10 max min sign sin sinh sqrt tan reshape break zeros default margin round ones rand syn ceil floor size clear zeros eye mean std cov det eig inv norm rank trace expm logm sqrtm linspace plot title xlabel ylabel legend text grid meshgrid mesh num2str fft ifft arrayfun cellfun input fliplr flipud ismember".split(" ")),
g=c("return case switch else elseif end endif endfunction if otherwise do for while try catch classdef properties events methods global persistent endfor endwhile printf sprintf disp until continue pkg".split(" "));return{startState:function(){return{tokenize:d}},token:function(a,b){a=b.tokenize(a,b);if("number"===a||"variable"===a)b.tokenize=e;return a}}});c.defineMIME("text/x-octave","octave")});
