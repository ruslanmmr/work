"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

lazySizes.cfg.init = false;
var brakepoints = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1200
};
$(document).ready(function () {
  TouchHoverEvents.init();
  select.init();
  lazy();
  console.log('_');
}); //hover/touch custom events

var TouchHoverEvents = {
  targets: 'a[class], button, label, tr, .jsTouchHover, .js-3d-object',
  touched: false,
  touchEndDelay: 100,
  //ms
  init: function init() {
    var _this = this;

    document.addEventListener('touchstart', function (event) {
      _this.events(event);
    });
    document.addEventListener('touchend', function (event) {
      _this.events(event);
    });
    document.addEventListener('mouseenter', function (event) {
      _this.events(event);
    }, true);
    document.addEventListener('mouseleave', function (event) {
      _this.events(event);
    }, true);
    document.addEventListener('mousedown', function (event) {
      _this.events(event);
    });
    document.addEventListener('mouseup', function (event) {
      _this.events(event);
    });
    document.addEventListener('contextmenu', function (event) {
      _this.events(event);
    });
  },
  events: function events(event) {
    var _this2 = this;

    var $targets = [];
    $targets[0] = event.target !== document ? event.target.closest(this.targets) : null;
    var $element = $targets[0],
        i = 0;

    while ($targets[0]) {
      $element = $element.parentNode;

      if ($element !== document) {
        if ($element.matches(this.targets)) {
          i++;
          $targets[i] = $element;
        }
      } else {
        break;
      }
    } //touchstart


    if (event.type == 'touchstart') {
      this.touched = true;
      if (this.timeout) clearTimeout(this.timeout);

      if ($targets[0]) {
        var _iterator = _createForOfIteratorHelper(document.querySelectorAll(this.targets)),
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
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } //touchend
    else if (event.type == 'touchend' || event.type == 'contextmenu' && this.touched) {
        this.timeout = setTimeout(function () {
          _this2.touched = false;
        }, 500);

        if ($targets[0]) {
          setTimeout(function () {
            var _iterator3 = _createForOfIteratorHelper($targets),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _$target2 = _step3.value;

                _$target2.dispatchEvent(new CustomEvent("customTouchend"));

                _$target2.classList.remove('touch');
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }, this.touchEndDelay);
        }
      } //mouseenter


    if (event.type == 'mouseenter' && !this.touched && $targets[0] && $targets[0] == event.target) {
      $targets[0].classList.add('hover');
    } //mouseleave
    else if (event.type == 'mouseleave' && !this.touched && $targets[0] && $targets[0] == event.target) {
        $targets[0].classList.remove('hover', 'focus');
      } //mousedown


    if (event.type == 'mousedown' && !this.touched && $targets[0]) {
      $targets[0].classList.add('focus');
    } //mouseup
    else if (event.type == 'mouseup' && !this.touched && $targets[0]) {
        $targets[0].classList.remove('focus');
      }
  }
}; //lazyloading

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
//# sourceMappingURL=maps/common.js.map
