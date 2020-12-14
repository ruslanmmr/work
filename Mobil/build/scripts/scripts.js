"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

window.onload = function () {
  TouchHoverEvents.init();
  Slider.init();
};

var brakepoints = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1600
};
var $body = document.body;
var $wrapper = document.querySelector('.wrapper');
var speed = 0.5; //seconds

var TouchHoverEvents = {
  targets: 'a, button, label, tr, .jsTouchHover',
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

            _$target.setAttribute('data-touch', '');
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

                _$target2.removeAttribute('data-touch');
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
      $targets[0].setAttribute('data-hover', '');
    } //mouseleave
    else if (event.type == 'mouseleave' && !this.touched && $targets[0] && $targets[0] == event.target) {
        $targets[0].removeAttribute('data-focus');
        $targets[0].removeAttribute('data-hover');
      } //mousedown


    if (event.type == 'mousedown' && !this.touched && $targets[0]) {
      $targets[0].setAttribute('data-focus', '');
    } //mouseup
    else if (event.type == 'mouseup' && !this.touched && $targets[0]) {
        $targets[0].removeAttribute('data-focus');
      }
  }
};
var Mask = {
  init: function init() {
    Inputmask({
      mask: "+7 999 999-9999",
      showMaskOnHover: false,
      clearIncomplete: false
    }).mask('[data-phone]');
  }
};
var Slider = {
  init: function init() {
    var _this3 = this;

    this.index = 0;
    this.m = 120;
    this.$slides = document.querySelectorAll('.calculator-slide');
    this.$next = document.querySelectorAll('.calculator-slide__next-button');
    this.$back = document.querySelector('.calculator__back-button');

    this.getPrev = function () {
      var value = _this3.index - 1;
      return value;
    };

    this.getNext = function () {
      var value = _this3.index + 1;
      return value;
    }; //listeners


    this.$next.forEach(function ($button) {
      $button.addEventListener('click', function () {
        if (!_this3.inAnimation) {
          _this3.index++;

          _this3.change();
        }
      });
    });
    this.$back.addEventListener('click', function () {
      if (!_this3.inAnimation) {
        _this3.index--;

        _this3.change();
      }
    });
    this.change();
  },
  change: function change() {
    this.inAnimation = true;

    if (this.index == 0) {
      this.$back.classList.remove('active');
    } else {
      this.$back.classList.add('active');
    }

    if (!this.old || this.old < this.index) {
      this.next();
    }
    /* gsap.timeline()
      .to($slide, {autoAlpha:1, duration:speed, ease:'power2.inOut'})
      .to($slide, {y:0, duration:speed, ease:'power2.out'}, `-=${speed}`)
     if(this.index==0 || this.index==1 || this.index==2) {
      let y = $slide.getBoundingClientRect().height;
      gsap.timeline()
        .to($next, {autoAlpha:0.3, duration:speed, ease:'power2.inOut'})
        .fromTo($next, {y:y+this.m+this.m}, {y:y+this.m, duration:speed, ease:'power2.out'}, `-=${speed}`)
    } */

  },
  next: function next() {
    this.animation = gsap.timeline({
      paused: true
    });
    var $slide = this.$slides[this.index],
        $prev_slide = this.$slides[this.getPrev()],
        $next_slide = this.$slides[this.getNext()];

    if (!this.old) {
      var timeline = gsap.timeline().to($slide, {
        autoAlpha: 1,
        duration: speed,
        ease: 'power2.inOut'
      }).fromTo($slide, {
        y: this.m
      }, {
        y: 0,
        duration: speed,
        ease: 'power2.out'
      }, "-=".concat(speed));
      this.animation.add(timeline, ">");
    } else {
      var _timeline = gsap.timeline().to($prev_slide, {
        autoAlpha: 0,
        duration: speed,
        ease: 'power2.out'
      }).to($slide, {
        autoAlpha: 1,
        duration: speed,
        ease: 'power2.inOut'
      }).to($slide, {
        y: 0,
        duration: speed,
        ease: 'power2.out'
      }, "-=".concat(speed));

      this.animation.add(_timeline, ">");
    }

    if (this.index == 0 || this.index == 1 || this.index == 2) {
      var y = $slide.getBoundingClientRect().height;

      var _timeline2 = gsap.timeline().to($next_slide, {
        autoAlpha: 0.3,
        duration: speed,
        ease: 'power2.inOut'
      }).fromTo($next_slide, {
        y: y + this.m + this.m
      }, {
        y: y + this.m,
        duration: speed,
        ease: 'power2.out'
      }, "-=".concat(speed));

      this.animation.add(_timeline2, ">-".concat(speed - 0.1));
    }

    this.animation.play();
  }
};
//# sourceMappingURL=maps/scripts.js.map
