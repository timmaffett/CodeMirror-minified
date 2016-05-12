'use strict';(function(d){"object"==typeof exports&&"object"==typeof module?d(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],d):d(CodeMirror)})(function(d){function k(e){var m={};e=e.split(",");for(var g=0;g<e.length;++g){var d=e[g].toUpperCase(),k=e[g].charAt(0).toUpperCase()+e[g].slice(1);m[e[g]]=!0;m[d]=!0;m[k]=!0}return m}function q(e){e.eatWhile(/[\w\$_]/);return"meta"}d.defineMode("vhdl",function(e,d){function g(a,b){var c=a.next();if(r[c]){var f=
r[c](a,b);if(!1!==f)return f}if('"'==c)return b.tokenize=x(c),b.tokenize(a,b);if("'"==c)return b.tokenize=w(c),b.tokenize(a,b);if(/[\[\]{}\(\),;\:\.]/.test(c))return h=c,null;if(/[\d']/.test(c))return a.eatWhile(/[\w\.']/),"number";if("-"==c&&a.eat("-"))return a.skipToEnd(),"comment";if(t.test(c))return a.eatWhile(t),"operator";a.eatWhile(/[\w\$_]/);a=a.current();return y.propertyIsEnumerable(a.toLowerCase())?(z.propertyIsEnumerable(a)&&(h="newstatement"),"keyword"):A.propertyIsEnumerable(a)?"atom":
"variable"}function w(a){return function(b,c){for(var f=!1,d,e=!1;null!=(d=b.next());){if(d==a&&!f){e=!0;break}f=!f&&"--"==d}if(e||!f&&!u)c.tokenize=g;return"string"}}function x(a){return function(b,c){for(var f=!1,d,e=!1;null!=(d=b.next());){if(d==a&&!f){e=!0;break}f=!f&&"--"==d}if(e||!f&&!u)c.tokenize=g;return"string-2"}}function v(a,b,c,d,e){this.indented=a;this.column=b;this.type=c;this.align=d;this.prev=e}function n(a,b,c){return a.context=new v(a.indented,b,c,null,a.context)}function l(a){var b=
a.context.type;if(")"==b||"]"==b||"}"==b)a.indented=a.context.indented;return a.context=a.context.prev}var p=e.indentUnit,A=d.atoms||k("null"),r=d.hooks||{"`":q,$:q},u=d.multiLineStrings,y=k("abs,access,after,alias,all,and,architecture,array,assert,attribute,begin,block,body,buffer,bus,case,component,configuration,constant,disconnect,downto,else,elsif,end,end block,end case,end component,end for,end generate,end if,end loop,end process,end record,end units,entity,exit,file,for,function,generate,generic,generic map,group,guarded,if,impure,in,inertial,inout,is,label,library,linkage,literal,loop,map,mod,nand,new,next,nor,null,of,on,open,or,others,out,package,package body,port,port map,postponed,procedure,process,pure,range,record,register,reject,rem,report,return,rol,ror,select,severity,signal,sla,sll,sra,srl,subtype,then,to,transport,type,unaffected,units,until,use,variable,wait,when,while,with,xnor,xor"),
z=k("architecture,entity,begin,case,port,else,elsif,end,for,function,if"),t=/[&|~><!\)\(*#%@+\/=?\:;}{,\.\^\-\[\]]/,h;return{startState:function(a){return{tokenize:null,context:new v((a||0)-p,0,"top",!1),indented:0,startOfLine:!0}},token:function(a,b){var c=b.context;a.sol()&&(null==c.align&&(c.align=!1),b.indented=a.indentation(),b.startOfLine=!0);if(a.eatSpace())return null;h=null;var d=(b.tokenize||g)(a,b);if("comment"==d||"meta"==d)return d;null==c.align&&(c.align=!0);if(";"!=h&&":"!=h||"statement"!=
c.type)if("{"==h)n(b,a.column(),"}");else if("["==h)n(b,a.column(),"]");else if("("==h)n(b,a.column(),")");else if("}"==h){for(;"statement"==c.type;)c=l(b);for("}"==c.type&&(c=l(b));"statement"==c.type;)c=l(b)}else h==c.type?l(b):("}"==c.type||"top"==c.type||"statement"==c.type&&"newstatement"==h)&&n(b,a.column(),"statement");else l(b);b.startOfLine=!1;return d},indent:function(a,b){if(a.tokenize!=g&&null!=a.tokenize)return 0;b=b&&b.charAt(0);a=a.context;var c=b==a.type;return"statement"==a.type?
a.indented+("{"==b?0:p):a.align?a.column+(c?0:1):a.indented+(c?0:p)},electricChars:"{}"}});d.defineMIME("text/x-vhdl","vhdl")});
