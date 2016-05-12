'use strict';(function(l){"object"==typeof exports&&"object"==typeof module?l(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],l):l(CodeMirror)})(function(l){function t(b,a){var d=0;b=b.indentation();switch(a.tlvCurCtlFlowChar){case "\\":b=0;break;case "|":if("@"==a.tlvPrevPrevCtlFlowChar){d=-2;break}n[a.tlvPrevCtlFlowChar]&&(d=1);break;case "M":if("@"==a.tlvPrevPrevCtlFlowChar){d=-2;break}n[a.tlvPrevCtlFlowChar]&&(d=1);break;case "@":"S"==a.tlvPrevCtlFlowChar&&
(d=-1);"|"==a.tlvPrevCtlFlowChar&&(d=1);break;case "S":"@"==a.tlvPrevCtlFlowChar&&(d=1),n[a.tlvPrevCtlFlowChar]&&(d=1)}a=b+2*d;return 0<=a?a:b}l.defineMode("verilog",function(b,a){function d(c){var a={};c=c.split(" ");for(var g=0;g<c.length;++g)a[c[g]]=!0;return a}function h(c,a){var g=c.peek(),b;if(m[g]&&0!=(b=m[g](c,a))||m.tokenBase&&0!=(b=m.tokenBase(c,a)))return b;if(/[,;:\.]/.test(g))return k=c.next(),null;if(z.test(g))return k=c.next(),"bracket";if("`"==g)return c.next(),c.eatWhile(/[\w\$_]/)?
"def":null;if("$"==g)return c.next(),c.eatWhile(/[\w\$_]/)?"meta":null;if("#"==g)return c.next(),c.eatWhile(/[\d_.]/),"def";if('"'==g)return c.next(),a.tokenize=n(g),a.tokenize(c,a);if("/"==g){c.next();if(c.eat("*"))return a.tokenize=e,e(c,a);if(c.eat("/"))return c.skipToEnd(),"comment";c.backUp(1)}if(c.match(x)||c.match(A)||c.match(B)||c.match(C)||c.match(D)||c.match(E)||c.match(x))return"number";if(c.eatWhile(F))return"meta";if(c.eatWhile(/[\w\$_]/))return c=c.current(),G[c]?(f[c]&&(k="newblock"),
H[c]&&(k="newstatement"),p=c,"keyword"):"variable";c.next();return null}function n(c){return function(a,b){for(var d=!1,e,f=!1;null!=(e=a.next());){if(e==c&&!d){f=!0;break}d=!d&&"\\"==e}if(f||!d&&!I)b.tokenize=h;return"string"}}function e(c,a){for(var b=!1,d;d=c.next();){if("/"==d&&b){a.tokenize=h;break}b="*"==d}return"comment"}function u(c,a,b,d,e){this.indented=c;this.column=a;this.type=b;this.align=d;this.prev=e}function q(c,a,b){a=new u(c.indented,a,b,null,c.context);return c.context=a}function v(c){var a=
c.context.type;if(")"==a||"]"==a||"}"==a)c.indented=c.context.indented;return c.context=c.context.prev}function t(c,a){if(c==a)return!0;a=a.split(";");for(var b in a)if(c==a[b])return!0;return!1}var w=b.indentUnit,y=a.statementIndentUnit||w,J=a.dontAlignCalls;b=a.noIndentKeywords||[];var I=a.multiLineStrings,m=a.hooks||{},G=d("accept_on alias always always_comb always_ff always_latch and assert assign assume automatic before begin bind bins binsof bit break buf bufif0 bufif1 byte case casex casez cell chandle checker class clocking cmos config const constraint context continue cover covergroup coverpoint cross deassign default defparam design disable dist do edge else end endcase endchecker endclass endclocking endconfig endfunction endgenerate endgroup endinterface endmodule endpackage endprimitive endprogram endproperty endspecify endsequence endtable endtask enum event eventually expect export extends extern final first_match for force foreach forever fork forkjoin function generate genvar global highz0 highz1 if iff ifnone ignore_bins illegal_bins implements implies import incdir include initial inout input inside instance int integer interconnect interface intersect join join_any join_none large let liblist library local localparam logic longint macromodule matches medium modport module nand negedge nettype new nexttime nmos nor noshowcancelled not notif0 notif1 null or output package packed parameter pmos posedge primitive priority program property protected pull0 pull1 pulldown pullup pulsestyle_ondetect pulsestyle_onevent pure rand randc randcase randsequence rcmos real realtime ref reg reject_on release repeat restrict return rnmos rpmos rtran rtranif0 rtranif1 s_always s_eventually s_nexttime s_until s_until_with scalared sequence shortint shortreal showcancelled signed small soft solve specify specparam static string strong strong0 strong1 struct super supply0 supply1 sync_accept_on sync_reject_on table tagged task this throughout time timeprecision timeunit tran tranif0 tranif1 tri tri0 tri1 triand trior trireg type typedef union unique unique0 unsigned until until_with untyped use uwire var vectored virtual void wait wait_order wand weak weak0 weak1 while wildcard wire with within wor xnor xor"),
F=/[\+\-\*\/!~&|^%=?:]/,z=/[\[\]{}()]/,E=/\d[0-9_]*/,A=/\d*\s*'s?d\s*\d[0-9_]*/i,B=/\d*\s*'s?b\s*[xz01][xz01_]*/i,C=/\d*\s*'s?o\s*[xz0-7][xz0-7_]*/i,D=/\d*\s*'s?h\s*[0-9a-fxz?][0-9a-fxz?_]*/i,x=/(\d[\d_]*(\.\d[\d_]*)?E-?[\d_]+)|(\d[\d_]*\.\d[\d_]*)/i,K=/^((\w+)|[)}\]])/,L=/[)}\]]/,k,p;a=d("case checker class clocking config function generate interface module packageprimitive program property specify sequence table task");var f={},r;for(r in a)f[r]="end"+r;f.begin="end";f.casex="endcase";f.casez="endcase";
f["do"]="while";f.fork="join;join_any;join_none";f.covergroup="endgroup";for(var M in b)r=b[M],f[r]&&(f[r]=void 0);var H=d("always always_comb always_ff always_latch assert assign assume else export for foreach forever if import initial repeat while");return{electricInput:function(){var c=[],a;for(a in f)if(f[a]){var b=f[a].split(";"),d;for(d in b)c.push(b[d])}return new RegExp("[{}()\\[\\]]|("+c.join("|")+")$")}(),startState:function(c){c={tokenize:null,context:new u((c||0)-w,0,"top",!1),indented:0,
startOfLine:!0};m.startState&&m.startState(c);return c},token:function(c,a){var b=a.context;c.sol()&&(null==b.align&&(b.align=!1),a.indented=c.indentation(),a.startOfLine=!0);m.token&&m.token(c,a);if(c.eatSpace())return null;p=k=null;var d=(a.tokenize||h)(c,a);if("comment"==d||"meta"==d||"variable"==d)return d;null==b.align&&(b.align=!0);if(k==b.type)v(a);else if(";"==k&&"statement"==b.type||b.type&&t(p,b.type))for(b=v(a);b&&"statement"==b.type;)b=v(a);else"{"==k?q(a,c.column(),"}"):"["==k?q(a,c.column(),
"]"):"("==k?q(a,c.column(),")"):b&&"endcase"==b.type&&":"==k?q(a,c.column(),"statement"):"newstatement"==k?q(a,c.column(),"statement"):"newblock"!=k||"function"==p&&b&&("statement"==b.type||"endgroup"==b.type)||"task"==p&&b&&"statement"==b.type||(b=f[p],q(a,c.column(),b));a.startOfLine=!1;return d},indent:function(a,b){if(a.tokenize!=h&&null!=a.tokenize)return l.Pass;if(m.indent){var d=m.indent(a);if(0<=d)return d}a=a.context;d=b&&b.charAt(0);"statement"==a.type&&"}"==d&&(a=a.prev);var e=!1;(b=b.match(K))&&
(e=t(b[0],a.type));return"statement"==a.type?a.indented+("{"==d?0:y):L.test(a.type)&&a.align&&!J?a.column+(e?0:1):")"!=a.type||e?a.indented+(e?0:w):a.indented+y},blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//"}});l.defineMIME("text/x-verilog",{name:"verilog"});l.defineMIME("text/x-systemverilog",{name:"verilog"});var n={">":"property","->":"property","-":"hr","|":"link","?$":"qualifier","?*":"qualifier","@-":"variable-3","@":"variable-3","?":"qualifier"};l.defineMIME("text/x-tlv",{name:"verilog",
hooks:{"\\":function(b,a){var d=0,h=!1;if(b.sol()&&(/\\SV/.test(b.string)||/\\TLV/.test(b.string))){h=/\\TLV_version/.test(b.string)?"\\TLV_version":b.string;b.skipToEnd();"\\SV"==h&&a.vxCodeActive&&(a.vxCodeActive=!1);if(/\\TLV/.test(h)&&!a.vxCodeActive||"\\TLV_version"==h&&a.vxCodeActive)a.vxCodeActive=!0;h="keyword";a.tlvCurCtlFlowChar=a.tlvPrevPrevCtlFlowChar=a.tlvPrevCtlFlowChar="";1==a.vxCodeActive&&(a.tlvCurCtlFlowChar="\\",d=t(b,a));a.vxIndentRq=d}return h},tokenBase:function(b,a){var d=!1,
h=/[\[\]=:]/,l={"**":"variable-2","*":"variable-2",$$:"variable",$:"variable","^^":"attribute","^":"attribute"},e=b.peek(),u=a.tlvCurCtlFlowChar;if(1==a.vxCodeActive){if(/[\[\]{}\(\);\:]/.test(e))d="meta",b.next();else if("/"==e)b.next(),b.eat("/")?(b.skipToEnd(),d="comment",a.tlvCurCtlFlowChar="S"):b.backUp(1);else if("@"==e)d=n[e],a.tlvCurCtlFlowChar="@",b.next(),b.eatWhile(/[\w\$_]/);else if(b.match(/\b[mM]4+/,!0))b.skipTo("("),d="def",a.tlvCurCtlFlowChar="M";else if("!"==e&&b.sol())d="comment",
b.next();else if(h.test(e))b.eatWhile(h),d="operator";else if("#"==e)a.tlvCurCtlFlowChar=""==a.tlvCurCtlFlowChar?e:a.tlvCurCtlFlowChar,b.next(),b.eatWhile(/[+-]\d/),d="tag";else if(l.propertyIsEnumerable(e))d=l[e],a.tlvCurCtlFlowChar=""==a.tlvCurCtlFlowChar?"S":a.tlvCurCtlFlowChar,b.next(),b.match(/[a-zA-Z_0-9]+/);else if(d=n[e]||!1)a.tlvCurCtlFlowChar=""==a.tlvCurCtlFlowChar?e:a.tlvCurCtlFlowChar,b.next(),b.match(/[a-zA-Z_0-9]+/);a.tlvCurCtlFlowChar!=u&&(b=t(b,a),a.vxIndentRq=b)}return d},token:function(b,
a){1==a.vxCodeActive&&b.sol()&&""!=a.tlvCurCtlFlowChar&&(a.tlvPrevPrevCtlFlowChar=a.tlvPrevCtlFlowChar,a.tlvPrevCtlFlowChar=a.tlvCurCtlFlowChar,a.tlvCurCtlFlowChar="")},indent:function(b){return 1==b.vxCodeActive?b.vxIndentRq:-1},startState:function(b){b.tlvCurCtlFlowChar="";b.tlvPrevCtlFlowChar="";b.tlvPrevPrevCtlFlowChar="";b.vxCodeActive=!0;b.vxIndentRq=0}}})});
