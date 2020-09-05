"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

lazySizes.cfg.init = false;
$(document).ready(function () {
  touchHoverEvents();
  lazy();
  select.init();
});
var brakepoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
}; //hover/touch custom events

function touchHoverEvents() {
  document.addEventListener('touchstart', event);
  document.addEventListener('touchend', event);
  document.addEventListener('mouseenter', event, true);
  document.addEventListener('mouseleave', event, true);
  document.addEventListener('mousedown', event);
  document.addEventListener('mouseup', event);
  document.addEventListener('contextmenu', event);
  var targets = 'a[class], button, label, tr, .js-3d-object, .selectric-items li, .selectric .label',
      touchEndDelay = 500,
      //ms    
  touch,
      timeout;

  function event(event) {
    var $targets = [];
    $targets[0] = event.target !== document ? event.target.closest(targets) : null;
    var $element = $targets[0],
        i = 0;

    while ($targets[0]) {
      $element = $element.parentNode;

      if ($element !== document) {
        if ($element.matches(targets)) {
          i++;
          $targets[i] = $element;
        }
      } else {
        break;
      }
    }

    if ($targets[0]) {
      //touchstart
      if (event.type == 'touchstart') {
        touch = true;

        var _iterator = _createForOfIteratorHelper(document.querySelectorAll(targets)),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var $target = _step.value;
            $target.classList.remove('touch');
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var _iterator2 = _createForOfIteratorHelper($targets),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _$target = _step2.value;

            _$target.classList.add('touch');

            _$target.dispatchEvent(new CustomEvent("customTouchstart", {
              detail: {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
              }
            }));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } //touchend
      else if (event.type == 'touchend') {
          setTimeout(function () {
            touch = false;

            var _iterator3 = _createForOfIteratorHelper($targets),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _$target2 = _step3.value;

                _$target2.classList.remove('touch');

                _$target2.dispatchEvent(new CustomEvent("customTouchend"));
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }, touchEndDelay);
        } //context menu
        else if (event.type == 'contextmenu') {
            var _iterator4 = _createForOfIteratorHelper($targets),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var _$target3 = _step4.value;

                _$target3.classList.remove('touch');

                _$target3.dispatchEvent(new CustomEvent("customTouchend"));
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }

            touch = false;
          } //mouseenter


      if (event.type == 'mouseenter' && !touch && $targets[0] == event.target) {
        $targets[0].classList.add('hover');
        $targets[0].dispatchEvent(new CustomEvent("customMouseenter", {
          detail: {
            x: event.clientX,
            y: event.clientY
          }
        }));
      } //mouseleave
      else if (event.type == 'mouseleave' && !touch && $targets[0] == event.target) {
          $targets[0].classList.remove('hover');
          $targets[0].classList.remove('focus');
          $targets[0].dispatchEvent(new CustomEvent("customMouseleave"));
        } //mousedown


      if (event.type == 'mousedown') {
        $targets[0].classList.add('focus');
      } else if (event.type == 'mouseup') {
        $targets[0].classList.remove('focus');
      }
    }
  }
} //lazyloading


function lazy() {
  //add backgrounds
  document.addEventListener('lazybeforeunveil', function (e) {
    var el = e.target.tagName,
        bg = e.target.getAttribute('data-src');

    if (el !== 'IMG') {
      var _bg = e.target.getAttribute('data-src');

      e.target.style.backgroundImage = "url('".concat(_bg, "')");
    }
  });
  lazySizes.init();
} //select


var select = {
  init: function init() {
    this.items = $('select');

    if (this.items.length) {
      this.items.selectric({
        disableOnMobile: false,
        nativeOnMobile: false,
        arrowButtonMarkup: '<svg class="icon" viewBox="0 0 12 7" xmlns="http://www.w3.org/2000/svg"><path d="M9.72606 -1.19209e-07L11.1403 1.41421L5.57036 6.98453L4.15614 5.57031L9.72606 -1.19209e-07Z"/><path d="M0 1.41421L1.41421 1.19209e-07L6.98434 5.57047L5.57036 6.98453L0 1.41421Z"/></svg>'
      });
    }
  }
};