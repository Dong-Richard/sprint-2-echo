!function(){"use strict";var n=[],e=new Map;function t(){return n}e.set("mockedData1.csv",[[1,2,3,4,5],["The","song","remains","the","same."]]),e.set("mockedData2.csv",[["First Name","Last Name","Class","Role"],["Nim","Telson","CSCI 0320","Student"],["Tim","Nelson","CSCI 0320","Student"]]);var o=[];function a(){var a=document.getElementById("repl-command-box");if(null==a)console.log("Couldn't find input element");else if(a instanceof HTMLInputElement){var s=a.value.split(" ")[0];if("view"===s)!function(n){var e=new Array;1==l&&e.push("<p>Command: ".concat(n,"</p>"));var a="";a=1==l?"<p>Output: </p>":"";0!=t().length?e.push(a+u(t())):e.push("<p>No CSV Loaded!</p>");o.push(e)}(a.value);else if("search"===s)!function(e){var a=new Array;if(1==l){var s="<p>Command: ".concat(e,"</p>");a.push(s)}var r="";r=1==l?"<p>Output: ":"<p>";0!=t().length?r+=u(function(e){var t=[];return t.push(n[0]),t}())+"</p>":r+="Sorry we could not find a CSV file to serach :(, please try again</p>";a.push(r),o.push(a)}(a.value);else if("mode"===s)!function(){if(0==l){l=1;var n=new Array("<p>Changed to verbose mode</p>");o.push(n)}else{l=0;n=new Array("<p>Changed to brief mode</p>");o.push(n)}}();else if("load_csv"===s)!function(t){var a=new Array;1==l&&a.push("<p>Command: ".concat(t,"</p>"));!function(t){var o=e.get(t);return o?(n=o,1):0}(t.split(" ")[1])?a.push("<p>CSV filepath not found</p>"):a.push("<p>CSV Loaded Successfully</p>");o.push(a)}(a.value);else{var r=new Array;1==l&&r.push("<p>Command:"+a.value+"</p>"),r.push("<p>Output: Not a valid command</p>"),o.push(r)}!function(){var n="";o.forEach((function(e){e.forEach((function(e){n+="".concat(e)}))}));var e=document.getElementById("repl-history");if(null==e)return void console.log("Could not find old-REPL element");if(!(e instanceof HTMLElement))return void console.log("first old-REPL element was not an HTMLElement");e.innerHTML=n}()}else console.log("Found element ".concat(a,", but it wasn't an button"))}function u(n){var e="<table class = 'table'>";return n.forEach((function(n){e+="<tr>",n.forEach((function(n){e+="<td class = 'table'>"+n+"</td>"})),e+="</tr>"})),e+="</table>"}window.onload=function(){!function(){var n=document.getElementById("submit-button");null==n?console.log("Couldn't find input element"):n instanceof HTMLButtonElement?n.addEventListener("click",a):console.log("Found element ".concat(n,", but it wasn't an button"))}()};var l=0}();
//# sourceMappingURL=main.b53949e0.js.map