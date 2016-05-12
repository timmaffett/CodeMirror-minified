'use strict';(function(d){"object"==typeof exports&&"object"==typeof module?d(require("../../lib/codemirror"),require("./foldcode")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","./foldcode"],d):d(CodeMirror)})(function(d){function r(a){this.options=a;this.from=this.to=0}function m(a,b){a=a.findMarksAt(k(b));for(var c=0;c<a.length;++c)if(a[c].__isFold&&a[c].find().from.line==b)return a[c]}function n(a){if("string"==typeof a){var b=document.createElement("div");b.className=
a+" CodeMirror-guttermarker-subtle";return b}return a.cloneNode(!0)}function h(a,b,c){var e=a.state.foldGutter.options,d=b,h=a.foldOption(e,"minFoldSize"),g=a.foldOption(e,"rangeFinder");a.eachLine(b,c,function(b){var c=null;if(m(a,d))c=n(e.indicatorFolded);else{var f=k(d,0);(f=g&&g(a,f))&&f.to.line-f.from.line>=h&&(c=n(e.indicatorOpen))}a.setGutterMarker(b,e.gutter,c);++d})}function l(a){var b=a.getViewport(),c=a.state.foldGutter;c&&(a.operation(function(){h(a,b.from,b.to)}),c.from=b.from,c.to=b.to)}
function p(a,b,c){var e=a.state.foldGutter;e&&(e=e.options,c==e.gutter&&((c=m(a,b))?c.clear():a.foldCode(k(b,0),e.rangeFinder)))}function g(a){var b=a.state.foldGutter;if(b){var c=b.options;b.from=b.to=0;clearTimeout(b.changeUpdate);b.changeUpdate=setTimeout(function(){l(a)},c.foldOnChangeTimeSpan||600)}}function q(a){var b=a.state.foldGutter;if(b){var c=b.options;clearTimeout(b.changeUpdate);b.changeUpdate=setTimeout(function(){var c=a.getViewport();b.from==b.to||20<c.from-b.to||20<b.from-c.to?l(a):
a.operation(function(){c.from<b.from&&(h(a,c.from,b.from),b.from=c.from);c.to>b.to&&(h(a,b.to,c.to),b.to=c.to)})},c.updateViewportTimeSpan||400)}}function f(a,b){var c=a.state.foldGutter;c&&(b=b.line,b>=c.from&&b<c.to&&h(a,b,b+1))}d.defineOption("foldGutter",!1,function(a,b,c){c&&c!=d.Init&&(a.clearGutter(a.state.foldGutter.options.gutter),a.state.foldGutter=null,a.off("gutterClick",p),a.off("change",g),a.off("viewportChange",q),a.off("fold",f),a.off("unfold",f),a.off("swapDoc",g));b&&(c=a.state,
!0===b&&(b={}),null==b.gutter&&(b.gutter="CodeMirror-foldgutter"),null==b.indicatorOpen&&(b.indicatorOpen="CodeMirror-foldgutter-open"),null==b.indicatorFolded&&(b.indicatorFolded="CodeMirror-foldgutter-folded"),c.foldGutter=new r(b),l(a),a.on("gutterClick",p),a.on("change",g),a.on("viewportChange",q),a.on("fold",f),a.on("unfold",f),a.on("swapDoc",g))});var k=d.Pos});
