'use strict';(function(d){"object"==typeof exports&&"object"==typeof module?d(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],d):d(CodeMirror)})(function(d){var g=function(c){return new RegExp("^(?:"+c.join("|")+")$","i")};d.defineMode("cypher",function(c){var p=function(b){var a=b.next();if('"'===a||"'"===a)return b.match(/.+?["']/),"string";if(/[{}\(\),\.;\[\]]/.test(a))return e=a,"node";if("/"===a&&b.eat("/"))return b.skipToEnd(),"comment";
if(k.test(a))return b.eatWhile(k),null;b.eatWhile(/[_\w\d]/);if(b.eat(":"))return b.eatWhile(/[\w\d_\-]/),"atom";b=b.current();return l.test(b)?"builtin":m.test(b)?"def":n.test(b)?"keyword":"variable"},f=function(b,a,c){return b.context={prev:b.context,indent:b.indent,col:c,type:a}},h=function(b){b.indent=b.context.indent;return b.context=b.context.prev},q=c.indentUnit,e,l=g("abs acos allShortestPaths asin atan atan2 avg ceil coalesce collect cos cot count degrees e endnode exp extract filter floor haversin head id keys labels last left length log log10 lower ltrim max min node nodes percentileCont percentileDisc pi radians rand range reduce rel relationship relationships replace reverse right round rtrim shortestPath sign sin size split sqrt startnode stdev stdevp str substring sum tail tan timestamp toFloat toInt toString trim type upper".split(" ")),
m=g("all and any contains exists has in none not or single xor".split(" ")),n=g("as asc ascending assert by case commit constraint create csv cypher delete desc descending detach distinct drop else end ends explain false fieldterminator foreach from headers in index is join limit load match merge null on optional order periodic profile remove return scan set skip start starts then true union unique unwind using when where with".split(" ")),k=/[*+\-<>=&|~%^]/;return{startState:function(){return{tokenize:p,
context:null,indent:0,col:0}},token:function(b,a){b.sol()&&(a.context&&null==a.context.align&&(a.context.align=!1),a.indent=b.indentation());if(b.eatSpace())return null;var c=a.tokenize(b,a);"comment"!==c&&a.context&&null==a.context.align&&"pattern"!==a.context.type&&(a.context.align=!0);if("("===e)f(a,")",b.column());else if("["===e)f(a,"]",b.column());else if("{"===e)f(a,"}",b.column());else if(/[\]\}\)]/.test(e)){for(;a.context&&"pattern"===a.context.type;)h(a);a.context&&e===a.context.type&&h(a)}else"."===
e&&a.context&&"pattern"===a.context.type?h(a):/atom|string|variable/.test(c)&&a.context&&(/[\}\]]/.test(a.context.type)?f(a,"pattern",b.column()):"pattern"!==a.context.type||a.context.align||(a.context.align=!0,a.context.col=b.column()));return c},indent:function(b,a){a=a&&a.charAt(0);b=b.context;if(/[\]\}]/.test(a))for(;b&&"pattern"===b.type;)b=b.prev;a=b&&a===b.type;return b?"keywords"===b.type?d.commands.newlineAndIndent:b.align?b.col+(a?0:1):b.indent+(a?0:q):0}}});d.modeExtensions.cypher={autoFormatLineBreaks:function(c){var d,
f;d=c.split("\n");f=/\s+\b(return|where|order by|match|with|skip|limit|create|delete|set)\b\s/g;for(c=0;c<d.length;c++)d[c]=d[c].replace(f," \n$1 ").trim();return d.join("\n")}};d.defineMIME("application/x-cypher-query","cypher")});
