(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{107:function(e,n,t){"use strict";t.r(n),t.d(n,"FrontPage",(function(){return v}));t(115),t(117),t(118),t(137),t(220),t(39),t(37),t(123),t(120),t(221),t(121),t(38),t(66),t(124),t(63),t(64);var r=t(7),a=t.n(r),o=t(147),i=t.n(o),c=t(125),u=t(126),l=t(40);t(239),t(45);function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e,n){return!n||"object"!==s(n)&&"function"!=typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function f(e,n,t){return(f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,n,t){var r=function(e,n){for(;!Object.prototype.hasOwnProperty.call(e,n)&&null!==(e=b(e)););return e}(e,n);if(r){var a=Object.getOwnPropertyDescriptor(r,n);return a.get?a.get.call(t):a.value}})(e,n,t||e)}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,n){return(h=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}var v=function(e){function n(e,t){var r;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),r=d(this,b(n).call(this,e));var o=a()('<input type="text">'),c=Object(u.c)([{name:"Group 1: ".concat(l.d.linearNoBank),value:l.d.linearNoBank},{name:"Group 2: ".concat(l.d.linearWithBank),value:l.d.linearWithBank},{name:"Group 3: ".concat(l.d.parabolicNoBank),value:l.d.parabolicNoBank},{name:"Group 4: ".concat(l.d.parabolicWithBank),value:l.d.parabolicWithBank}]);return e.textElem.append(Object(u.e)("Testing Website for the Confidence Elicitation Project")).append(Object(u.b)("You must enter the subject ID string and group.")).append(Object(u.d)("Please enter the subject ID.")).append(o).append(Object(u.d)("Please select the subject group.")).append(c.jQueryObj),r.inputElem=o,r.options=c,r.subjectID="",r.groupSelectResult="",r.elements=e,r.data=t,i.a.get("/next-id").then((function(n){var t=n.data;if(null!=t.errorMsg){var a=Object(u.a)(t.errorMsg,null,"Dismiss",null);a.addRed(),e.textElem.prepend(a.jQueryObj)}else{var o=t.data.participantId,i=t.data.group,c=Object(u.a)("Current participant has ID ".concat(o," with group ").concat(i),"Use this ID and Group","Dismiss",(function(){r.inputElem.val(o),r.options.value=i,c.jQueryObj.remove()}));c.addBlue(),e.textElem.prepend(c.jQueryObj)}})).catch((function(e){console.error(e)})),r}var r,o,c;return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&h(e,n)}(n,e),r=n,(o=[{key:"canProceed",value:function(){var e=this,t=this.inputElem.val(),r=this.options.value;return""!==t&&l.a.isGroupType(r)?i.a.get("/validate-id",{params:{participantId:t,group:r}}).then((function(a){var o=a.data;return o.isValid?(e.subjectID=t,e.groupSelectResult=r,f(b(n.prototype),"hideErrorMessage",e).call(e),!0):(f(b(n.prototype),"addErrorMessage",e).call(e,o.errorMsg),!1)})):(f(b(n.prototype),"addErrorMessage",this).call(this,"Please input correct value(s) before continue"),!1)}},{key:"record",value:function(){var e=this;this.data.SubjectID=this.subjectID,this.data.Type=this.groupSelectResult,this.data.ReadableType=Object.keys(l.d).find((function(n){return l.d[n]===e.groupSelectResult}))}},{key:"nextElement",value:function(){var e=this;return f(b(n.prototype),"clearPage",this).call(this),t.e(4).then(t.bind(null,352)).then((function(n){return new n.StartPage(e.elements,e.data)}))}}])&&p(r.prototype,o),c&&p(r,c),n}(c.a)},125:function(e,n,t){"use strict";t.d(n,"a",(function(){return a}));t(37);function r(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(n){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.elements=n}var n,t,a;return n=e,(t=[{key:"canProceed",value:function(){return!0}},{key:"record",value:function(){}},{key:"nextElement",value:function(){return null}},{key:"addErrorMessage",value:function(e){this.elements.errorElem.html(e),this.elements.errorElem.show()}},{key:"hideErrorMessage",value:function(){this.elements.errorElem.hide()}},{key:"clearPage",value:function(){this.elements.textElem.empty(),this.elements.graphElem.empty()}}])&&r(n.prototype,t),a&&r(n,a),e}()},126:function(e,n,t){"use strict";t.d(n,"a",(function(){return s})),t.d(n,"c",(function(){return p})),t.d(n,"e",(function(){return d})),t.d(n,"d",(function(){return f})),t.d(n,"b",(function(){return b}));t(115),t(117),t(118),t(137),t(39),t(238),t(37),t(38),t(63),t(64);var r=t(7),a=t.n(r);function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function i(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e,n,t){return n&&i(e.prototype,n),t&&i(e,t),e}var u=function(){function e(n){o(this,e),void 0===n&&(n=[{name:"Yes",value:"Yes"},{name:"No",value:"No"}]),this.config=n,this.selectedItem=null,this.obj=null,this.allInputElements=[],this.render()}return c(e,[{key:"render",value:function(){for(var e=a()('<div class="question-options"></div>'),n=[],t=0;t<this.config.length;t+=1){var r=this.config[t],o="radio-".concat(t),i=a()('<input id="'.concat(o,'" type="radio" value="').concat(r.value,'">'));n.push(i);var c=a()('<label for="'.concat(o,'">').concat(r.name,"</label>")),u=a()('<div class="question-option-wrapper"></div>');u.append(i),u.append(c),e.append(u)}var l=this;e.on("click","input",(function(e){var t=a()(this),r=t.attr("id");t.prop("checked",!0),l.selectedItem=t.val();var o=!0,i=!1,c=void 0;try{for(var u,s=n[Symbol.iterator]();!(o=(u=s.next()).done);o=!0){var p=u.value;p.attr("id")!==r&&p.prop("checked",!1)}}catch(e){i=!0,c=e}finally{try{o||null==s.return||s.return()}finally{if(i)throw c}}})),this.obj=e,this.allInputElements=n}},{key:"jQueryObj",get:function(){return this.obj}},{key:"value",get:function(){return this.selectedItem},set:function(e){this.selectedItem=null;var n=!0,t=!1,r=void 0;try{for(var a,o=this.allInputElements[Symbol.iterator]();!(n=(a=o.next()).done);n=!0){var i=a.value;""!==e&&null!=e&&i.val()===e?(i.prop("checked",!0),this.selectedItem=i.val()):i.prop("checked",!1)}}catch(e){t=!0,r=e}finally{try{n||null==o.return||o.return()}finally{if(t)throw r}}}}]),e}(),l=function(){function e(n,t,r,i){o(this,e);var c=a()('<div class="banner-wrapper"></div>'),u=a()('<div class="banner-main-text">'.concat(n,"</div>"));c.append(u);var l=a()('<div class="banner-actions-wrapper"></div>'),s=!1;if(null!=t&&null!=i){s=!0;var p=a()('<button class="banner-action-button">'.concat(t,"</button>"));p.click((function(){return i()})),l.append(p)}if(null!=r){s=!0;var d=a()('<button class="banner-action-button">'.concat(r,"</button>"));d.click((function(){return c.remove()})),l.append(d)}s&&c.append(l),this.element=c}return c(e,[{key:"addBlue",value:function(){this.element.addClass("blue"),this.element.removeClass("red")}},{key:"addRed",value:function(){this.element.addClass("red"),this.element.removeClass("blue")}},{key:"jQueryObj",get:function(){return this.element}}]),e}();function s(e,n,t,r){return new l(e,n,t,r)}function p(e){return new u(e)}function d(e){return a()('<h1 class="section-title">'.concat(e,"</h1>"))}function f(e){return a()('<p class="question-title">'.concat(e,"</p>"))}function b(e){return a()('<p class="question-explanation">'.concat(e,"</p>"))}},239:function(e,n,t){var r=t(240);"string"==typeof r&&(r=[[e.i,r,""]]);var a={insert:"head",singleton:!1};t(68)(r,a);r.locals&&(e.exports=r.locals)},240:function(e,n,t){(e.exports=t(67)(!1)).push([e.i,".banner-wrapper {\n    margin-bottom: 1em;\n    display: flex;\n    flex-direction: row;\n    padding: 1em;\n    align-items: center;\n    justify-content: space-between;\n}\n.banner-wrapper.red {\n    background-color: #fed9cc;\n}\n.banner-wrapper.blue {\n    background-color: #D6EAF8;\n}\n.banner-wrapper .banner-main-text {\n    font-weight: bold;\n    font-size: 0.875em;\n}\n.banner-wrapper .banner-actions-wrapper {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: end;\n}\n\n.banner-wrapper .banner-actions-wrapper .banner-action-button {\n    background: none;\n    border: none;\n    padding: 0;\n    text-decoration: underline;\n    cursor: pointer;\n}\n\n.banner-wrapper .banner-actions-wrapper .banner-action-button:first-child {\n    margin-right: 1em;\n}",""])}}]);