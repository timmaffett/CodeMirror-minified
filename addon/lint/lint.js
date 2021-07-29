'use strict';(function(k){"object"==typeof exports&&"object"==typeof module?k(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],k):k(CodeMirror)})(function(k){function A(a,b,e){function d(f){if(!c.parentNode)return k.off(document,"mousemove",d);c.style.top=Math.max(0,f.clientY-c.offsetHeight-5)+"px";c.style.left=f.clientX+5+"px"}var c=document.createElement("div");c.className="CodeMirror-lint-tooltip cm-s-"+a.options.theme;c.appendChild(e.cloneNode(!0));
a.state.lint.options.selfContain?a.getWrapperElement().appendChild(c):document.body.appendChild(c);k.on(document,"mousemove",d);d(b);null!=c.style.opacity&&(c.style.opacity=1);return c}function B(a){a.parentNode&&(null==a.style.opacity&&a.parentNode&&a.parentNode.removeChild(a),a.style.opacity=0,setTimeout(function(){a.parentNode&&a.parentNode.removeChild(a)},600))}function u(a,b,e,d){function c(){k.off(d,"mouseout",c);f&&(B(f),f=null)}var f=A(a,b,e),h=setInterval(function(){if(f)for(var g=d;;g=g.parentNode){g&&
11==g.nodeType&&(g=g.host);if(g==document.body)return;if(!g){c();break}}if(!f)return clearInterval(h)},400);k.on(d,"mouseout",c)}function C(a,b,e){this.marked=[];b instanceof Function&&(b={getAnnotations:b});b&&!0!==b||(b={});this.options={};this.linterOptions=b.options||{};for(var d in p)this.options[d]=p[d];for(d in b)p.hasOwnProperty(d)?null!=b[d]&&(this.options[d]=b[d]):b.options||(this.linterOptions[d]=b[d]);this.timeout=null;this.hasGutter=e;this.onMouseOver=function(c){var f=c.target||c.srcElement;
if(/\bCodeMirror-lint-mark-/.test(f.className)){f=f.getBoundingClientRect();var h=a.findMarksAt(a.coordsChar({left:(f.left+f.right)/2,top:(f.top+f.bottom)/2},"client"));f=[];for(var g=0;g<h.length;++g){var l=h[g].__annotation;l&&f.push(l)}if(f.length){h=c.target||c.srcElement;g=document.createDocumentFragment();for(l=0;l<f.length;l++)g.appendChild(v(f[l]));u(a,c,g,h)}}};this.waitingFor=0}function w(a){var b=a.state.lint;b.hasGutter&&a.clearGutter("CodeMirror-lint-markers");b.options.highlightLines&&
D(a);for(a=0;a<b.marked.length;++a)b.marked[a].clear();b.marked.length=0}function D(a){a.eachLine(function(b){var e=b.wrapClass&&/\bCodeMirror-lint-line-\w+\b/.exec(b.wrapClass);e&&a.removeLineClass(b,"wrap",e[0])})}function E(a,b,e,d,c){var f=document.createElement("div"),h=f;f.className="CodeMirror-lint-marker CodeMirror-lint-marker-"+e;d&&(h=f.appendChild(document.createElement("div")),h.className="CodeMirror-lint-marker CodeMirror-lint-marker-multiple");if(0!=c)k.on(h,"mouseover",function(g){u(a,
g,b,h)});return f}function F(a){for(var b=[],e=0;e<a.length;++e){var d=a[e],c=d.from.line;(b[c]||(b[c]=[])).push(d)}return b}function v(a){var b=a.severity;b||(b="error");var e=document.createElement("div");e.className="CodeMirror-lint-message CodeMirror-lint-message-"+b;"undefined"!=typeof a.messageHTML?e.innerHTML=a.messageHTML:e.appendChild(document.createTextNode(a.message));return e}function G(a,b){function e(){c=-1;a.off("change",e)}var d=a.state.lint,c=++d.waitingFor;a.on("change",e);b(a.getValue(),
function(f,h){a.off("change",e);d.waitingFor==c&&(h&&f instanceof k&&(f=h),a.operation(function(){q(a,f)}))},d.linterOptions,a)}function r(a){var b=a.state.lint;if(b){var e=b.options,d=e.getAnnotations||a.getHelper(k.Pos(0,0),"lint");if(d)if(e.async||d.async)G(a,d);else{var c=d(a.getValue(),b.linterOptions,a);c&&(c.then?c.then(function(f){a.operation(function(){q(a,f)})}):a.operation(function(){q(a,c)}))}}}function q(a,b){var e=a.state.lint;if(e){var d=e.options;w(a);for(var c=F(b),f=0;f<c.length;++f){var h=
c[f];if(h){var g=[];h=h.filter(function(x){return-1<g.indexOf(x.message)?!1:g.push(x.message)});for(var l=null,y=e.hasGutter&&document.createDocumentFragment(),t=0;t<h.length;++t){var m=h[t],n=m.severity;n||(n="error");"error"!=l&&(l=n);d.formatAnnotation&&(m=d.formatAnnotation(m));e.hasGutter&&y.appendChild(v(m));m.to&&e.marked.push(a.markText(m.from,m.to,{className:"CodeMirror-lint-mark CodeMirror-lint-mark-"+n,__annotation:m}))}e.hasGutter&&a.setGutterMarker(f,"CodeMirror-lint-markers",E(a,y,l,
1<c[f].length,d.tooltips));d.highlightLines&&a.addLineClass(f,"wrap","CodeMirror-lint-line-"+l)}}if(d.onUpdateLinting)d.onUpdateLinting(b,c,a)}}function z(a){var b=a.state.lint;b&&(clearTimeout(b.timeout),b.timeout=setTimeout(function(){r(a)},b.options.delay))}var p={highlightLines:!1,tooltips:!0,delay:500,lintOnChange:!0,getAnnotations:null,async:!1,selfContain:null,formatAnnotation:null,onUpdateLinting:null};k.defineOption("lint",!1,function(a,b,e){e&&e!=k.Init&&(w(a),!1!==a.state.lint.options.lintOnChange&&
a.off("change",z),k.off(a.getWrapperElement(),"mouseover",a.state.lint.onMouseOver),clearTimeout(a.state.lint.timeout),delete a.state.lint);if(b){e=a.getOption("gutters");for(var d=!1,c=0;c<e.length;++c)"CodeMirror-lint-markers"==e[c]&&(d=!0);b=a.state.lint=new C(a,b,d);if(b.options.lintOnChange)a.on("change",z);if(0!=b.options.tooltips&&"gutter"!=b.options.tooltips)k.on(a.getWrapperElement(),"mouseover",b.onMouseOver);r(a)}});k.defineExtension("performLint",function(){r(this)})});
