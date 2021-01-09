'use strict';(function(n){"object"==typeof exports&&"object"==typeof module?n(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],n):n(CodeMirror)})(function(n){function k(d,h){return d.string.charAt(d.pos+(h||0))}function w(d,h){if(h){var m=d.pos-h;return d.string.substr(0<=m?m:0,h)}return d.string.substr(0,d.pos-1)}function r(d,h){var m=d.string.length,p=m-d.pos+1;return d.string.substr(d.pos,h&&h<m?h:p)}function g(d,h){h=d.pos+h;var m;0>=h?d.pos=
0:h>=(m=d.string.length-1)?d.pos=m:d.pos=h}n.defineMode("perl",function(){function d(a,c,f,l,b){c.chain=null;c.style=null;c.tail=null;c.tokenize=function(x,q){for(var t=!1,u,v=0;u=x.next();){if(u===f[v]&&!t){void 0!==f[++v]?(q.chain=f[v],q.style=l,q.tail=b):b&&x.eatWhile(b);q.tokenize=m;break}t=!t&&"\\"==u}return l};return c.tokenize(a,c)}function h(a,c,f){c.tokenize=function(l,b){l.string==f&&(b.tokenize=m);l.skipToEnd();return"string"};return c.tokenize(a,c)}function m(a,c){if(a.eatSpace())return null;
if(c.chain)return d(a,c,c.chain,c.style,c.tail);if(a.match(/^\-?[\d\.]/,!1)&&a.match(/^(\-?(\d*\.\d+(e[+-]?\d+)?|\d+\.\d*)|0x[\da-fA-F]+|0b[01]+|\d+(e[+-]?\d+)?)/))return"number";if(a.match(/^<<(?=[_a-zA-Z])/))return a.eatWhile(/\w/),h(a,c,a.current().substr(2));if(a.sol()&&a.match(/^=item(?!\w)/))return h(a,c,"=cut");var f=a.next();if('"'==f||"'"==f){if(w(a,3)=="<<"+f){var l=a.pos;a.eatWhile(/\w/);var b=a.current().substr(1);if(b&&a.eat(f))return h(a,c,b);a.pos=l}return d(a,c,[f],"string")}if("q"==
f&&(b=k(a,-2),!b||!/\w/.test(b)))if(b=k(a,0),"x"==b){b=k(a,1);if("("==b)return g(a,2),d(a,c,[")"],"string-2",e);if("["==b)return g(a,2),d(a,c,["]"],"string-2",e);if("{"==b)return g(a,2),d(a,c,["}"],"string-2",e);if("<"==b)return g(a,2),d(a,c,[">"],"string-2",e);if(/[\^'"!~\/]/.test(b))return g(a,1),d(a,c,[a.eat(b)],"string-2",e)}else if("q"==b){b=k(a,1);if("("==b)return g(a,2),d(a,c,[")"],"string");if("["==b)return g(a,2),d(a,c,["]"],"string");if("{"==b)return g(a,2),d(a,c,["}"],"string");if("<"==
b)return g(a,2),d(a,c,[">"],"string");if(/[\^'"!~\/]/.test(b))return g(a,1),d(a,c,[a.eat(b)],"string")}else if("w"==b){b=k(a,1);if("("==b)return g(a,2),d(a,c,[")"],"bracket");if("["==b)return g(a,2),d(a,c,["]"],"bracket");if("{"==b)return g(a,2),d(a,c,["}"],"bracket");if("<"==b)return g(a,2),d(a,c,[">"],"bracket");if(/[\^'"!~\/]/.test(b))return g(a,1),d(a,c,[a.eat(b)],"bracket")}else if("r"==b){b=k(a,1);if("("==b)return g(a,2),d(a,c,[")"],"string-2",e);if("["==b)return g(a,2),d(a,c,["]"],"string-2",
e);if("{"==b)return g(a,2),d(a,c,["}"],"string-2",e);if("<"==b)return g(a,2),d(a,c,[">"],"string-2",e);if(/[\^'"!~\/]/.test(b))return g(a,1),d(a,c,[a.eat(b)],"string-2",e)}else if(/[\^'"!~\/(\[{<]/.test(b)){if("("==b)return g(a,1),d(a,c,[")"],"string");if("["==b)return g(a,1),d(a,c,["]"],"string");if("{"==b)return g(a,1),d(a,c,["}"],"string");if("<"==b)return g(a,1),d(a,c,[">"],"string");if(/[\^'"!~\/]/.test(b))return d(a,c,[a.eat(b)],"string")}if("m"==f&&(b=k(a,-2),!b||!/\w/.test(b))&&(b=a.eat(/[(\[{<\^'"!~\/]/))){if(/[\^'"!~\/]/.test(b))return d(a,
c,[b],"string-2",e);if("("==b)return d(a,c,[")"],"string-2",e);if("["==b)return d(a,c,["]"],"string-2",e);if("{"==b)return d(a,c,["}"],"string-2",e);if("<"==b)return d(a,c,[">"],"string-2",e)}if("s"==f&&(b=/[\/>\]})\w]/.test(k(a,-2)),!b&&(b=a.eat(/[(\[{<\^'"!~\/]/)))||"y"==f&&(b=/[\/>\]})\w]/.test(k(a,-2)),!b&&(b=a.eat(/[(\[{<\^'"!~\/]/)))||"t"==f&&(b=/[\/>\]})\w]/.test(k(a,-2)),!b&&(b=a.eat("r")))&&(b=a.eat(/[(\[{<\^'"!~\/]/)))return"["==b?d(a,c,["]","]"],"string-2",e):"{"==b?d(a,c,["}","}"],"string-2",
e):"<"==b?d(a,c,[">",">"],"string-2",e):"("==b?d(a,c,[")",")"],"string-2",e):d(a,c,[b,b],"string-2",e);if("`"==f)return d(a,c,[f],"variable-2");if("/"==f)return/~\s*$/.test(w(a))?d(a,c,[f],"string-2",e):"operator";if("$"==f){l=a.pos;if(a.eatWhile(/\d/)||a.eat("{")&&a.eatWhile(/\d/)&&a.eat("}"))return"variable-2";a.pos=l}if(/[$@%]/.test(f)){l=a.pos;if(a.eat("^")&&a.eat(/[A-Z]/)||!/[@$%&]/.test(k(a,-2))&&a.eat(/[=|\\\-#?@;:&`~\^!\[\]*'"$+.,\/<>()]/))if(b=a.current(),p[b])return"variable-2";a.pos=l}if(/[$@%&]/.test(f)&&
(a.eatWhile(/[\w$]/)||a.eat("{")&&a.eatWhile(/[\w$]/)&&a.eat("}")))return b=a.current(),p[b]?"variable-2":"variable";if("#"==f&&"$"!=k(a,-2))return a.skipToEnd(),"comment";if(/[:+\-\^*$&%@=<>!?|\/~\.]/.test(f)){l=a.pos;a.eatWhile(/[:+\-\^*$&%@=<>!?|\/~\.]/);if(p[a.current()])return"operator";a.pos=l}if("_"==f&&1==a.pos){if("_END__"==r(a,6))return d(a,c,["\x00"],"comment");if("_DATA__"==r(a,7))return d(a,c,["\x00"],"variable-2");if("_C__"==r(a,7))return d(a,c,["\x00"],"string")}if(/\w/.test(f)){l=
a.pos;if("{"==k(a,-2)&&("}"==k(a,0)||a.eatWhile(/\w/)&&"}"==k(a,0)))return"string";a.pos=l}if(/[A-Z]/.test(f))if(c=k(a,-2),l=a.pos,a.eatWhile(/[A-Z_]/),/[\da-z]/.test(k(a,0)))a.pos=l;else{b=p[a.current()];if(!b)return"meta";b[1]&&(b=b[0]);return":"!=c?1==b?"keyword":2==b?"def":3==b?"atom":4==b?"operator":5==b?"variable-2":"meta":"meta"}if(/[a-zA-Z_]/.test(f)){c=k(a,-2);a.eatWhile(/\w/);b=p[a.current()];if(!b)return"meta";b[1]&&(b=b[0]);return":"!=c?1==b?"keyword":2==b?"def":3==b?"atom":4==b?"operator":
5==b?"variable-2":"meta":"meta"}return null}var p={"->":4,"++":4,"--":4,"**":4,"=~":4,"!~":4,"*":4,"/":4,"%":4,x:4,"+":4,"-":4,".":4,"<<":4,">>":4,"<":4,">":4,"<=":4,">=":4,lt:4,gt:4,le:4,ge:4,"==":4,"!=":4,"<=>":4,eq:4,ne:4,cmp:4,"~~":4,"&":4,"|":4,"^":4,"&&":4,"||":4,"//":4,"..":4,"...":4,"?":4,":":4,"=":4,"+=":4,"-=":4,"*=":4,",":4,"=>":4,"::":4,not:4,and:4,or:4,xor:4,BEGIN:[5,1],END:[5,1],PRINT:[5,1],PRINTF:[5,1],GETC:[5,1],READ:[5,1],READLINE:[5,1],DESTROY:[5,1],TIE:[5,1],TIEHANDLE:[5,1],UNTIE:[5,
1],STDIN:5,STDIN_TOP:5,STDOUT:5,STDOUT_TOP:5,STDERR:5,STDERR_TOP:5,$ARG:5,$_:5,"@ARG":5,"@_":5,$LIST_SEPARATOR:5,'$"':5,$PROCESS_ID:5,$PID:5,$$:5,$REAL_GROUP_ID:5,$GID:5,"$(":5,$EFFECTIVE_GROUP_ID:5,$EGID:5,"$)":5,$PROGRAM_NAME:5,$0:5,$SUBSCRIPT_SEPARATOR:5,$SUBSEP:5,"$;":5,$REAL_USER_ID:5,$UID:5,"$<":5,$EFFECTIVE_USER_ID:5,$EUID:5,"$>":5,$a:5,$b:5,$COMPILING:5,"$^C":5,$DEBUGGING:5,"$^D":5,"${^ENCODING}":5,$ENV:5,"%ENV":5,$SYSTEM_FD_MAX:5,"$^F":5,"@F":5,"${^GLOBAL_PHASE}":5,"$^H":5,"%^H":5,"@INC":5,
"%INC":5,$INPLACE_EDIT:5,"$^I":5,"$^M":5,$OSNAME:5,"$^O":5,"${^OPEN}":5,$PERLDB:5,"$^P":5,$SIG:5,"%SIG":5,$BASETIME:5,"$^T":5,"${^TAINT}":5,"${^UNICODE}":5,"${^UTF8CACHE}":5,"${^UTF8LOCALE}":5,$PERL_VERSION:5,"$^V":5,"${^WIN32_SLOPPY_STAT}":5,$EXECUTABLE_NAME:5,"$^X":5,$1:5,$MATCH:5,"$&":5,"${^MATCH}":5,$PREMATCH:5,"$`":5,"${^PREMATCH}":5,$POSTMATCH:5,"$'":5,"${^POSTMATCH}":5,$LAST_PAREN_MATCH:5,"$+":5,$LAST_SUBMATCH_RESULT:5,"$^N":5,"@LAST_MATCH_END":5,"@+":5,"%LAST_PAREN_MATCH":5,"%+":5,"@LAST_MATCH_START":5,
"@-":5,"%LAST_MATCH_START":5,"%-":5,$LAST_REGEXP_CODE_RESULT:5,"$^R":5,"${^RE_DEBUG_FLAGS}":5,"${^RE_TRIE_MAXBUF}":5,$ARGV:5,"@ARGV":5,ARGV:5,ARGVOUT:5,$OUTPUT_FIELD_SEPARATOR:5,$OFS:5,"$,":5,$INPUT_LINE_NUMBER:5,$NR:5,"$.":5,$INPUT_RECORD_SEPARATOR:5,$RS:5,"$/":5,$OUTPUT_RECORD_SEPARATOR:5,$ORS:5,"$\\":5,$OUTPUT_AUTOFLUSH:5,"$|":5,$ACCUMULATOR:5,"$^A":5,$FORMAT_FORMFEED:5,"$^L":5,$FORMAT_PAGE_NUMBER:5,"$%":5,$FORMAT_LINES_LEFT:5,"$-":5,$FORMAT_LINE_BREAK_CHARACTERS:5,"$:":5,$FORMAT_LINES_PER_PAGE:5,
"$=":5,$FORMAT_TOP_NAME:5,"$^":5,$FORMAT_NAME:5,"$~":5,"${^CHILD_ERROR_NATIVE}":5,$EXTENDED_OS_ERROR:5,"$^E":5,$EXCEPTIONS_BEING_CAUGHT:5,"$^S":5,$WARNING:5,"$^W":5,"${^WARNING_BITS}":5,$OS_ERROR:5,$ERRNO:5,"$!":5,"%OS_ERROR":5,"%ERRNO":5,"%!":5,$CHILD_ERROR:5,"$?":5,$EVAL_ERROR:5,"$@":5,$OFMT:5,"$#":5,"$*":5,$ARRAY_BASE:5,"$[":5,$OLD_PERL_VERSION:5,"$]":5,"if":[1,1],elsif:[1,1],"else":[1,1],"while":[1,1],unless:[1,1],"for":[1,1],foreach:[1,1],abs:1,accept:1,alarm:1,atan2:1,bind:1,binmode:1,bless:1,
bootstrap:1,"break":1,caller:1,chdir:1,chmod:1,chomp:1,chop:1,chown:1,chr:1,chroot:1,close:1,closedir:1,connect:1,"continue":[1,1],cos:1,crypt:1,dbmclose:1,dbmopen:1,"default":1,defined:1,"delete":1,die:1,"do":1,dump:1,each:1,endgrent:1,endhostent:1,endnetent:1,endprotoent:1,endpwent:1,endservent:1,eof:1,eval:1,exec:1,exists:1,exit:1,exp:1,fcntl:1,fileno:1,flock:1,fork:1,format:1,formline:1,getc:1,getgrent:1,getgrgid:1,getgrnam:1,gethostbyaddr:1,gethostbyname:1,gethostent:1,getlogin:1,getnetbyaddr:1,
getnetbyname:1,getnetent:1,getpeername:1,getpgrp:1,getppid:1,getpriority:1,getprotobyname:1,getprotobynumber:1,getprotoent:1,getpwent:1,getpwnam:1,getpwuid:1,getservbyname:1,getservbyport:1,getservent:1,getsockname:1,getsockopt:1,given:1,glob:1,gmtime:1,"goto":1,grep:1,hex:1,"import":1,index:1,"int":1,ioctl:1,join:1,keys:1,kill:1,last:1,lc:1,lcfirst:1,length:1,link:1,listen:1,local:2,localtime:1,lock:1,log:1,lstat:1,m:null,map:1,mkdir:1,msgctl:1,msgget:1,msgrcv:1,msgsnd:1,my:2,"new":1,next:1,no:1,
oct:1,open:1,opendir:1,ord:1,our:2,pack:1,"package":1,pipe:1,pop:1,pos:1,print:1,printf:1,prototype:1,push:1,q:null,qq:null,qr:null,quotemeta:null,qw:null,qx:null,rand:1,read:1,readdir:1,readline:1,readlink:1,readpipe:1,recv:1,redo:1,ref:1,rename:1,require:1,reset:1,"return":1,reverse:1,rewinddir:1,rindex:1,rmdir:1,s:null,say:1,scalar:1,seek:1,seekdir:1,select:1,semctl:1,semget:1,semop:1,send:1,setgrent:1,sethostent:1,setnetent:1,setpgrp:1,setpriority:1,setprotoent:1,setpwent:1,setservent:1,setsockopt:1,
shift:1,shmctl:1,shmget:1,shmread:1,shmwrite:1,shutdown:1,sin:1,sleep:1,socket:1,socketpair:1,sort:1,splice:1,split:1,sprintf:1,sqrt:1,srand:1,stat:1,state:1,study:1,sub:1,substr:1,symlink:1,syscall:1,sysopen:1,sysread:1,sysseek:1,system:1,syswrite:1,tell:1,telldir:1,tie:1,tied:1,time:1,times:1,tr:null,truncate:1,uc:1,ucfirst:1,umask:1,undef:1,unlink:1,unpack:1,unshift:1,untie:1,use:1,utime:1,values:1,vec:1,wait:1,waitpid:1,wantarray:1,warn:1,when:1,write:1,y:null},e=/[goseximacplud]/;return{startState:function(){return{tokenize:m,
chain:null,style:null,tail:null}},token:function(a,c){return(c.tokenize||m)(a,c)},lineComment:"#"}});n.registerHelper("wordChars","perl",/[\w$]/);n.defineMIME("text/x-perl","perl")});
