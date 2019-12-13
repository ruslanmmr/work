
/*! jQuery & Zepto Lazy v1.7.10 - http://jquery.eisbehr.de/lazy - MIT&GPL-2.0 license - Copyright 2012-2018 Daniel 'Eisbehr' Kern */
!function(t,e){"use strict";function r(r,a,i,u,l){function f(){L=t.devicePixelRatio>1,i=c(i),a.delay>=0&&setTimeout(function(){s(!0)},a.delay),(a.delay<0||a.combined)&&(u.e=v(a.throttle,function(t){"resize"===t.type&&(w=B=-1),s(t.all)}),u.a=function(t){t=c(t),i.push.apply(i,t)},u.g=function(){return i=n(i).filter(function(){return!n(this).data(a.loadedName)})},u.f=function(t){for(var e=0;e<t.length;e++){var r=i.filter(function(){return this===t[e]});r.length&&s(!1,r)}},s(),n(a.appendScroll).on("scroll."+l+" resize."+l,u.e))}function c(t){var i=a.defaultImage,o=a.placeholder,u=a.imageBase,l=a.srcsetAttribute,f=a.loaderAttribute,c=a._f||{};t=n(t).filter(function(){var t=n(this),r=m(this);return!t.data(a.handledName)&&(t.attr(a.attribute)||t.attr(l)||t.attr(f)||c[r]!==e)}).data("plugin_"+a.name,r);for(var s=0,d=t.length;s<d;s++){var A=n(t[s]),g=m(t[s]),h=A.attr(a.imageBaseAttribute)||u;g===N&&h&&A.attr(l)&&A.attr(l,b(A.attr(l),h)),c[g]===e||A.attr(f)||A.attr(f,c[g]),g===N&&i&&!A.attr(E)?A.attr(E,i):g===N||!o||A.css(O)&&"none"!==A.css(O)||A.css(O,"url('"+o+"')")}return t}function s(t,e){if(!i.length)return void(a.autoDestroy&&r.destroy());for(var o=e||i,u=!1,l=a.imageBase||"",f=a.srcsetAttribute,c=a.handledName,s=0;s<o.length;s++)if(t||e||A(o[s])){var g=n(o[s]),h=m(o[s]),b=g.attr(a.attribute),v=g.attr(a.imageBaseAttribute)||l,p=g.attr(a.loaderAttribute);g.data(c)||a.visibleOnly&&!g.is(":visible")||!((b||g.attr(f))&&(h===N&&(v+b!==g.attr(E)||g.attr(f)!==g.attr(F))||h!==N&&v+b!==g.css(O))||p)||(u=!0,g.data(c,!0),d(g,h,v,p))}u&&(i=n(i).filter(function(){return!n(this).data(c)}))}function d(t,e,r,i){++z;var o=function(){y("onError",t),p(),o=n.noop};y("beforeLoad",t);var u=a.attribute,l=a.srcsetAttribute,f=a.sizesAttribute,c=a.retinaAttribute,s=a.removeAttribute,d=a.loadedName,A=t.attr(c);if(i){var g=function(){s&&t.removeAttr(a.loaderAttribute),t.data(d,!0),y(T,t),setTimeout(p,1),g=n.noop};t.off(I).one(I,o).one(D,g),y(i,t,function(e){e?(t.off(D),g()):(t.off(I),o())})||t.trigger(I)}else{var h=n(new Image);h.one(I,o).one(D,function(){t.hide(),e===N?t.attr(C,h.attr(C)).attr(F,h.attr(F)).attr(E,h.attr(E)):t.css(O,"url('"+h.attr(E)+"')"),t[a.effect](a.effectTime),s&&(t.removeAttr(u+" "+l+" "+c+" "+a.imageBaseAttribute),f!==C&&t.removeAttr(f)),t.data(d,!0),y(T,t),h.remove(),p()});var m=(L&&A?A:t.attr(u))||"";h.attr(C,t.attr(f)).attr(F,t.attr(l)).attr(E,m?r+m:null),h.complete&&h.trigger(D)}}function A(t){var e=t.getBoundingClientRect(),r=a.scrollDirection,n=a.threshold,i=h()+n>e.top&&-n<e.bottom,o=g()+n>e.left&&-n<e.right;return"vertical"===r?i:"horizontal"===r?o:i&&o}function g(){return w>=0?w:w=n(t).width()}function h(){return B>=0?B:B=n(t).height()}function m(t){return t.tagName.toLowerCase()}function b(t,e){if(e){var r=t.split(",");t="";for(var a=0,n=r.length;a<n;a++)t+=e+r[a].trim()+(a!==n-1?",":"")}return t}function v(t,e){var n,i=0;return function(o,u){function l(){i=+new Date,e.call(r,o)}var f=+new Date-i;n&&clearTimeout(n),f>t||!a.enableThrottle||u?l():n=setTimeout(l,t-f)}}function p(){--z,i.length||z||y("onFinishedAll")}function y(t,e,n){return!!(t=a[t])&&(t.apply(r,[].slice.call(arguments,1)),!0)}var z=0,w=-1,B=-1,L=!1,T="afterLoad",D="load",I="error",N="img",E="src",F="srcset",C="sizes",O="background-image";"event"===a.bind||o?f():n(t).on(D+"."+l,f)}function a(a,o){var u=this,l=n.extend({},u.config,o),f={},c=l.name+"-"+ ++i;return u.config=function(t,r){return r===e?l[t]:(l[t]=r,u)},u.addItems=function(t){return f.a&&f.a("string"===n.type(t)?n(t):t),u},u.getItems=function(){return f.g?f.g():{}},u.update=function(t){return f.e&&f.e({},!t),u},u.force=function(t){return f.f&&f.f("string"===n.type(t)?n(t):t),u},u.loadAll=function(){return f.e&&f.e({all:!0},!0),u},u.destroy=function(){return n(l.appendScroll).off("."+c,f.e),n(t).off("."+c),f={},e},r(u,l,a,f,c),l.chainable?a:u}var n=t.jQuery||t.Zepto,i=0,o=!1;n.fn.Lazy=n.fn.lazy=function(t){return new a(this,t)},n.Lazy=n.lazy=function(t,r,i){if(n.isFunction(r)&&(i=r,r=[]),n.isFunction(i)){t=n.isArray(t)?t:[t],r=n.isArray(r)?r:[r];for(var o=a.prototype.config,u=o._f||(o._f={}),l=0,f=t.length;l<f;l++)(o[t[l]]===e||n.isFunction(o[t[l]]))&&(o[t[l]]=i);for(var c=0,s=r.length;c<s;c++)u[r[c]]=t[0]}},a.prototype.config={name:"lazy",chainable:!0,autoDestroy:!0,bind:"load",threshold:500,visibleOnly:!1,appendScroll:t,scrollDirection:"both",imageBase:null,defaultImage:"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",placeholder:null,delay:-1,combined:!1,attribute:"data-src",srcsetAttribute:"data-srcset",sizesAttribute:"data-sizes",retinaAttribute:"data-retina",loaderAttribute:"data-loader",imageBaseAttribute:"data-imagebase",removeAttribute:!0,handledName:"handled",loadedName:"loaded",effect:"show",effectTime:0,enableThrottle:!0,throttle:250,beforeLoad:e,afterLoad:e,onError:e,onFinishedAll:e},n(t).on("load",function(){o=!0})}(window);
//mask
(function (factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(['jquery'], factory);
  } else if (typeof exports === 'object') {
      // Node/CommonJS
      factory(require('jquery'));
  } else {
      // Browser globals
      factory(jQuery);
  }
}(function ($) {

/*!
 * jQuery & Zepto Lazy - iFrame Plugin - v1.5
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2018, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
  // load iframe content, like:
  // <iframe data-src="iframe.html"></iframe>
  //
  // enable content error check with:
  // <iframe data-src="iframe.html" data-error-detect="true"></iframe>
  $.lazy(['frame', 'iframe'], 'iframe', function(element, response) {
      var instance = this;

      if (element[0].tagName.toLowerCase() === 'iframe') {
          var srcAttr = 'data-src',
              errorDetectAttr = 'data-error-detect',
              errorDetect = element.attr(errorDetectAttr);

          // default way, just replace the 'src' attribute
          if (errorDetect !== 'true' && errorDetect !== '1') {
              // set iframe source
              element.attr('src', element.attr(srcAttr));

              // remove attributes
              if (instance.config('removeAttribute')) {
                  element.removeAttr(srcAttr + ' ' + errorDetectAttr);
              }
          }

          // extended way, even check if the document is available
          else {
              $.ajax({
                  url: element.attr(srcAttr),
                  dataType: 'html',
                  crossDomain: true,
                  xhrFields: {withCredentials: true},

                  /**
                   * success callback
                   * @access private
                   * @param {*} content
                   * @return {void}
                   */
                  success: function(content) {
                      // set responded data to element's inner html
                      element.html(content)

                      // change iframe src
                      .attr('src', element.attr(srcAttr));

                      // remove attributes
                      if (instance.config('removeAttribute')) {
                          element.removeAttr(srcAttr + ' ' + errorDetectAttr);
                      }
                  },

                  /**
                   * error callback
                   * @access private
                   * @return {void}
                   */
                  error: function() {
                      // pass error state to lazy
                      // use response function for Zepto
                      response(false);
                  }
              });
          }
      }

      else {
          // pass error state to lazy
          // use response function for Zepto
          response(false);
      }
  });
})(window.jQuery || window.Zepto);

var ua = navigator.userAgent,
iPhone = /iphone/i.test(ua),
chrome = /chrome/i.test(ua),
android = /android/i.test(ua),
caretTimeoutId;

$.mask = {
//Predefined character definitions
definitions: {
  '9': "[0-9]",
  'a': "[A-Za-z]",
  '*': "[A-Za-z0-9]"
},
autoclear: true,
dataName: "rawMaskFn",
placeholder: '_'
};

$.fn.extend({
//Helper Function for Caret positioning
caret: function(begin, end) {
  var range;

  if (this.length === 0 || this.is(":hidden") || this.get(0) !== document.activeElement) {
    return;
  }

  if (typeof begin == 'number') {
    end = (typeof end === 'number') ? end : begin;
    return this.each(function() {
      if (this.setSelectionRange) {
        this.setSelectionRange(begin, end);
      } else if (this.createTextRange) {
        range = this.createTextRange();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', begin);
        range.select();
      }
    });
  } else {
    if (this[0].setSelectionRange) {
      begin = this[0].selectionStart;
      end = this[0].selectionEnd;
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      begin = 0 - range.duplicate().moveStart('character', -100000);
      end = begin + range.text.length;
    }
    return { begin: begin, end: end };
  }
},
unmask: function() {
  return this.trigger("unmask");
},
mask: function(mask, settings) {
  var input,
    defs,
    tests,
    partialPosition,
    firstNonMaskPos,
          lastRequiredNonMaskPos,
          len,
          oldVal;

  if (!mask && this.length > 0) {
    input = $(this[0]);
          var fn = input.data($.mask.dataName)
    return fn?fn():undefined;
  }

  settings = $.extend({
    autoclear: $.mask.autoclear,
    placeholder: $.mask.placeholder, // Load default placeholder
    completed: null
  }, settings);


  defs = $.mask.definitions;
  tests = [];
  partialPosition = len = mask.length;
  firstNonMaskPos = null;

  mask = String(mask);

  $.each(mask.split(""), function(i, c) {
    if (c == '?') {
      len--;
      partialPosition = i;
    } else if (defs[c]) {
      tests.push(new RegExp(defs[c]));
      if (firstNonMaskPos === null) {
        firstNonMaskPos = tests.length - 1;
      }
              if(i < partialPosition){
                  lastRequiredNonMaskPos = tests.length - 1;
              }
    } else {
      tests.push(null);
    }
  });

  return this.trigger("unmask").each(function() {
    var input = $(this),
      buffer = $.map(
          mask.split(""),
          function(c, i) {
            if (c != '?') {
              return defs[c] ? getPlaceholder(i) : c;
            }
          }),
      defaultBuffer = buffer.join(''),
      focusText = input.val();

          function tryFireCompleted(){
              if (!settings.completed) {
                  return;
              }

              for (var i = firstNonMaskPos; i <= lastRequiredNonMaskPos; i++) {
                  if (tests[i] && buffer[i] === getPlaceholder(i)) {
                      return;
                  }
              }
              settings.completed.call(input);
          }

          function getPlaceholder(i){
              if(i < settings.placeholder.length)
                  return settings.placeholder.charAt(i);
              return settings.placeholder.charAt(0);
          }

    function seekNext(pos) {
      while (++pos < len && !tests[pos]);
      return pos;
    }

    function seekPrev(pos) {
      while (--pos >= 0 && !tests[pos]);
      return pos;
    }

    function shiftL(begin,end) {
      var i,
        j;

      if (begin<0) {
        return;
      }

      for (i = begin, j = seekNext(end); i < len; i++) {
        if (tests[i]) {
          if (j < len && tests[i].test(buffer[j])) {
            buffer[i] = buffer[j];
            buffer[j] = getPlaceholder(j);
          } else {
            break;
          }

          j = seekNext(j);
        }
      }
      writeBuffer();
      input.caret(Math.max(firstNonMaskPos, begin));
    }

    function shiftR(pos) {
      var i,
        c,
        j,
        t;

      for (i = pos, c = getPlaceholder(pos); i < len; i++) {
        if (tests[i]) {
          j = seekNext(i);
          t = buffer[i];
          buffer[i] = c;
          if (j < len && tests[j].test(t)) {
            c = t;
          } else {
            break;
          }
        }
      }
    }

    function androidInputEvent(e) {
      var curVal = input.val();
      var pos = input.caret();
      if (oldVal && oldVal.length && oldVal.length > curVal.length ) {
        // a deletion or backspace happened
        checkVal(true);
        while (pos.begin > 0 && !tests[pos.begin-1])
          pos.begin--;
        if (pos.begin === 0)
        {
          while (pos.begin < firstNonMaskPos && !tests[pos.begin])
            pos.begin++;
        }
        input.caret(pos.begin,pos.begin);
      } else {
        var pos2 = checkVal(true);
        var lastEnteredValue = curVal.charAt(pos.begin);
        if (pos.begin < len){
          if(!tests[pos.begin]){
            pos.begin++;
            if(tests[pos.begin].test(lastEnteredValue)){
              pos.begin++;
            }
          }else{
            if(tests[pos.begin].test(lastEnteredValue)){
              pos.begin++;
            }
          }
        }
        input.caret(pos.begin,pos.begin);
      }
      tryFireCompleted();
    }


    function blurEvent(e) {
              checkVal();

              if (input.val() != focusText)
                  input.change();
          }

    function keydownEvent(e) {
              if (input.prop("readonly")){
                  return;
              }

      var k = e.which || e.keyCode,
        pos,
        begin,
        end;
                  oldVal = input.val();
      //backspace, delete, and escape get special treatment
      if (k === 8 || k === 46 || (iPhone && k === 127)) {
        pos = input.caret();
        begin = pos.begin;
        end = pos.end;

        if (end - begin === 0) {
          begin=k!==46?seekPrev(begin):(end=seekNext(begin-1));
          end=k===46?seekNext(end):end;
        }
        clearBuffer(begin, end);
        shiftL(begin, end - 1);

        e.preventDefault();
      } else if( k === 13 ) { // enter
        blurEvent.call(this, e);
      } else if (k === 27) { // escape
        input.val(focusText);
        input.caret(0, checkVal());
        e.preventDefault();
      }
    }

    function keypressEvent(e) {
              if (input.prop("readonly")){
                  return;
              }

      var k = e.which || e.keyCode,
        pos = input.caret(),
        p,
        c,
        next;

      if (e.ctrlKey || e.altKey || e.metaKey || k < 32) {//Ignore
        return;
      } else if ( k && k !== 13 ) {
        if (pos.end - pos.begin !== 0){
          clearBuffer(pos.begin, pos.end);
          shiftL(pos.begin, pos.end-1);
        }

        p = seekNext(pos.begin - 1);
        if (p < len) {
          c = String.fromCharCode(k);
          if (tests[p].test(c)) {
            shiftR(p);

            buffer[p] = c;
            writeBuffer();
            next = seekNext(p);

            if(android){
              //Path for CSP Violation on FireFox OS 1.1
              var proxy = function() {
                $.proxy($.fn.caret,input,next)();
              };

              setTimeout(proxy,0);
            }else{
              input.caret(next);
            }
                          if(pos.begin <= lastRequiredNonMaskPos){
                           tryFireCompleted();
                           }
          }
        }
        e.preventDefault();
      }
    }

    function clearBuffer(start, end) {
      var i;
      for (i = start; i < end && i < len; i++) {
        if (tests[i]) {
          buffer[i] = getPlaceholder(i);
        }
      }
    }

    function writeBuffer() { input.val(buffer.join('')); }

    function checkVal(allow) {
      //try to place characters where they belong
      var test = input.val(),
        lastMatch = -1,
        i,
        c,
        pos;

      for (i = 0, pos = 0; i < len; i++) {
        if (tests[i]) {
          buffer[i] = getPlaceholder(i);
          while (pos++ < test.length) {
            c = test.charAt(pos - 1);
            if (tests[i].test(c)) {
              buffer[i] = c;
              lastMatch = i;
              break;
            }
          }
          if (pos > test.length) {
            clearBuffer(i + 1, len);
            break;
          }
        } else {
                      if (buffer[i] === test.charAt(pos)) {
                          pos++;
                      }
                      if( i < partialPosition){
                          lastMatch = i;
                      }
        }
      }
      if (allow) {
        writeBuffer();
      } else if (lastMatch + 1 < partialPosition) {
        if (settings.autoclear || buffer.join('') === defaultBuffer) {
          // Invalid value. Remove it and replace it with the
          // mask, which is the default behavior.
          if(input.val()) input.val("");
          clearBuffer(0, len);
        } else {
          // Invalid value, but we opt to show the value to the
          // user and allow them to correct their mistake.
          writeBuffer();
        }
      } else {
        writeBuffer();
        input.val(input.val().substring(0, lastMatch + 1));
      }
      return (partialPosition ? i : firstNonMaskPos);
    }

    input.data($.mask.dataName,function(){
      return $.map(buffer, function(c, i) {
        return tests[i]&&c!=getPlaceholder(i) ? c : null;
      }).join('');
    });


    input
      .one("unmask", function() {
        input
          .off(".mask")
          .removeData($.mask.dataName);
      })
      .on("focus.mask", function() {
                  if (input.prop("readonly")){
                      return;
                  }

        clearTimeout(caretTimeoutId);
        var pos;

        focusText = input.val();

        pos = checkVal();

        caretTimeoutId = setTimeout(function(){
                      if(input.get(0) !== document.activeElement){
                          return;
                      }
          writeBuffer();
          if (pos == mask.replace("?","").length) {
            input.caret(0, pos);
          } else {
            input.caret(pos);
          }
        }, 10);
      })
      .on("blur.mask", blurEvent)
      .on("keydown.mask", keydownEvent)
      .on("keypress.mask", keypressEvent)
      .on("input.mask paste.mask", function() {
                  if (input.prop("readonly")){
                      return;
                  }

        setTimeout(function() {
          var pos=checkVal(true);
          input.caret(pos);
                      tryFireCompleted();
        }, 0);
      });
              if (chrome && android)
              {
                  input
                      .off('input.mask')
                      .on('input.mask', androidInputEvent);
              }
      checkVal(); //Perform initial check for existing values
  });
}
});
}));



$(document).ready(function () {
  lazy();
  checkbox();
  mask();
  popup();
});

let $checkbox = $('.checkbox input');
let $popup = $('.popup');

let  $close = $('.popup-close, .popup__bg');


function mask() {
  $(".masked").mask("+7 (999) 999-99");

  $.fn.setCursorPosition = function(pos) {
    if ($(this).get(0).setSelectionRange) {
     $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
     var range = $(this).get(0).createTextRange();
     range.collapse(true);
     range.moveEnd('character', pos);
     range.moveStart('character', pos);
     range.select();
    }
   };

   $(document).on('click', '.masked', function(){
    $(this).setCursorPosition(4);
   });
}

function lazy() {
  $(".lazy").Lazy({
    effectTime: 0,
    threshold: 500,
    imageBase: false,
    defaultImage: false,
    afterLoad: function(element) {
      element.addClass('visible');
    }
  });
}

function checkbox() {
  $checkbox.on('change', function(e) {
    checkboxCheck();
  })
}

function checkboxCheck() {
  $checkbox.each(function() {
    if($(this).prop('checked')) {
      $(this).parent().addClass('checked');
    } else {
      $(this).parent().removeClass('checked');
    }
  })
  totalPrice();
}

function totalPrice() {
  let totalVal = 0,
      $totalVal = $('.form__total-price span');

  $checkbox.each(function() {
    if($(this).prop('checked')) {
      totalVal = totalVal+(+$(this).data('price'));
    }
  })

  $totalVal.text(totalVal + ' р.');
  $('.total-price').val(totalVal + ' р.');
}

function popup() {

  $close.on('click', function(e) {
    e.preventDefault();
    $popup.fadeOut(300);
  })
}

function popupOpen() {
  $popup.fadeIn(300);
  setTimeout(function() {
    $popup.fadeOut(300);
  }, 2000)
}