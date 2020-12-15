"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

window.onload = function () {
  gsap.to($wrapper, {
    autoAlpha: 1,
    duration: speed,
    ease: 'power2.inOut'
  });
  TouchHoverEvents.init();
  Slider.init();
  Form.init();
  Validation.init();
};

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
var Form = {
  init: function init() {
    var _this3 = this;

    this.$input_wcount = document.querySelector('#val3'); //btns

    var $calc_buttons = document.querySelectorAll('[data-input-button]');
    $calc_buttons.forEach(function ($button) {
      $button.addEventListener('click', function () {
        var attr = $button.getAttribute('data-input-button'),
            input = $button.getAttribute('for'),
            $input = document.querySelector("#".concat(input)),
            max = +$input.getAttribute('data-max');

        if (attr !== '+' && attr !== '-') {
          $input.value = attr;
          $button.classList.add('active');
          $button.parentNode.querySelectorAll('[data-input-button]').forEach(function ($el) {
            if ($el !== $button) $el.classList.remove('active');
          }); //next btn change

          var $next = $button.closest('.calculator-slide').querySelector('.calculator-slide__next-button');

          if ($next) {
            $next.classList.add('active');

            if ($input.getAttribute('id') == 'val3') {
              if (attr == '0') $next.setAttribute('data-slide-next', '1');else $next.setAttribute('data-slide-next', '');
            }
          }
        } else {
          var val = +$input.value;

          if (attr == '+' && val < max) {
            $input.value = val + 1;
          } else if (attr == '-' && val > 1) {
            $input.value = val - 1;
          } else {
            $button.classList.add('hidden');
          }
        }

        $input.dispatchEvent(new Event("change"));
      });
    }); //calc price

    var $calculation_inputs = document.querySelectorAll('[data-calculation-input]'),
        $total = document.querySelector('.calculator-slide__total-price span'),
        $total_input = document.querySelector('#totalprice'),
        $ads_container = document.querySelector('.calculator__ads');

    var checkPrice = function checkPrice() {
      var $ads = document.querySelectorAll('.calculator__ad');
      $ads.forEach(function ($this) {
        $this.remove();
      });
      var total = +document.querySelector('#baseprice').value;
      $calculation_inputs.forEach(function ($input) {
        var price = +$input.getAttribute('data-price'),
            value = +$input.value;
        total += price * value; //допы

        if (value > 0) {
          var name = $input.getAttribute('name');

          for (var i = 0; i < value; i++) {
            $ads_container.insertAdjacentHTML('beforeend', "<div class=\"calculator__ad\"><span>+".concat(price, " $</span> ").concat(name, "</div>"));
          }
        }
      });
      $total.textContent = priceCorrecting(total, 2, ',');
      $total_input.value = total; //
    };

    $calculation_inputs.forEach(function ($input) {
      $input.addEventListener('change', function () {
        checkPrice(); //windows

        if ($input.getAttribute('id') == 'val3') {
          var val = +_this3.$input_wcount.value,
              $val = document.querySelector('.calc-count__value'),
              $calc_minus = document.querySelector('.calc-count__button_minus'),
              $calc_plus = document.querySelector('.calc-count__button_plus'),
              max = +$input.getAttribute('data-max');
          $val.textContent = '0' + $input.value;
          if (val == 1) $calc_minus.classList.add('hidden');else $calc_minus.classList.remove('hidden');
          if (val == max) $calc_plus.classList.add('hidden');else $calc_plus.classList.remove('hidden');
        }
      });
    });
  },
  on: function on(callback, func) {
    if (callback == 'changed') {
      this.changed_callback = func;
    }
  }
};
var Slider = {
  init: function init() {
    var _this4 = this;

    this.m = 120;
    this.$slides = document.querySelectorAll('.calculator-slide');
    this.$next = document.querySelectorAll('[data-slide-next]');
    this.$back = document.querySelector('[data-slide-back]');
    this.animations = [];
    this.step = 0;
    this.steps = [0]; //listeners

    this.$next.forEach(function ($button) {
      $button.addEventListener('click', function () {
        if (!_this4.inAnimation) {
          var attr = $button.getAttribute('data-slide-next'),
              value;

          var change = function change() {
            _this4.step++;
            _this4.steps[_this4.step] = _this4.steps[_this4.step - 1] + 1 + value;

            _this4.change();
          };

          if (attr == 'validate') {
            if (Validation.checkValid($button.closest('.form'))) {
              value = 0;
              change();
            }
          } else {
            value = !+attr ? 0 : +attr;
            change();
          }
        }
      });
    });
    this.$back.addEventListener('click', function () {
      if (!_this4.inAnimation) {
        _this4.step--;

        _this4.change();
      }
    });
    this.change();
  },
  change: function change() {
    this.inAnimation = true;

    if (this.steps.length - 1 > this.step) {
      this.steps.splice(this.step + 1, 1);
      this.prev();
    } else {
      this.next();
    }

    if (this.step == 0 || this.steps[this.step] == this.$slides.length - 1) {
      this.$back.classList.remove('active');
    } else {
      this.$back.classList.add('active');
    }
  },
  last: function last() {
    this.step++;
    this.steps[this.step] = this.steps[this.step - 1] + 1;
    this.change();
  },
  next: function next() {
    var _this5 = this;

    this.animation = this.animations[this.step] = gsap.timeline({
      paused: true
    });
    this.animation.eventCallback('onComplete', function () {
      _this5.inAnimation = false;
    });
    var $slide = this.$slides[this.steps[this.step]],
        $prev_slide = this.$slides[this.steps[this.step - 1]],
        $next_slide = this.$slides[this.steps[this.step] + 1];
    $slide.classList.add('active');

    if (this.step == 0) {
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
      var y = this.m,
          ease = 'power2.out';

      if ($slide.getAttribute('data-slide-opacity') !== null) {
        y = $prev_slide.getBoundingClientRect().height + this.m;
        ease = 'power2.inOut';
      }

      var _timeline = gsap.timeline().to($prev_slide, {
        autoAlpha: 0,
        duration: speed,
        ease: 'power2.inOut'
      }).to($prev_slide, {
        y: -this.m,
        duration: speed,
        ease: 'power2.in'
      }, "-=".concat(speed)).to($slide, {
        autoAlpha: 1,
        duration: speed,
        ease: 'power2.inOut'
      }, "-=".concat(speed - 0.1)).fromTo($slide, {
        y: y
      }, {
        y: 0,
        duration: speed,
        ease: ease
      }, "-=".concat(speed));

      this.animation.add(_timeline, ">"); //scale

      if ($slide.classList.contains('calculator-slide_congratulation')) {
        var $price = document.querySelector('.calculator-slide__total-price');
        var scale = gsap.fromTo($price, {
          scale: 0.8
        }, {
          scale: 1,
          duration: speed,
          ease: 'power2.out'
        });
        this.animation.add(scale, ">-".concat(speed));
      }
    }

    if ($next_slide && $next_slide.getAttribute('data-slide-opacity') !== null) {
      var _y = $slide.getBoundingClientRect().height;

      var _timeline2 = gsap.timeline().to($next_slide, {
        autoAlpha: 0.2,
        duration: speed / 2,
        ease: 'power2.inOut'
      }).fromTo($next_slide, {
        y: _y + this.m + this.m
      }, {
        y: _y + this.m,
        duration: speed / 2,
        ease: 'power2.out'
      }, "-=".concat(speed / 2));

      this.animation.add(_timeline2, ">-".concat(speed / 3));
    }

    this.animation.play();
  },
  prev: function prev() {
    var _this6 = this;

    this.animations[this.step + 1].reverse();
    this.animations[this.step + 1].eventCallback('onReverseComplete', function () {
      _this6.inAnimation = false;
    });
  }
};
var Validation = {
  init: function init() {
    var _this7 = this;

    //validation
    this.namspaces = {
      name: 'name',
      phone: 'phone',
      email: 'email',
      text: 'text'
    };
    this.constraints = {
      name: {
        presence: {
          allowEmpty: false,
          message: '^Введите ваше имя'
        },
        format: {
          pattern: /[A-zА-яЁё ]+/,
          message: '^Введите корректное имя'
        },
        length: {
          minimum: 2,
          tooShort: "^Имя слишком короткое (минимум %{count} символа)",
          maximum: 20,
          tooLong: "^Имя слишком длинное (максимум %{count} символов)"
        }
      },
      phone: {
        presence: {
          allowEmpty: false,
          message: '^Введите ваш номер телефона'
        },
        format: {
          pattern: /^\+7 \d{3}\ \d{3}\-\d{4}$/,
          message: '^Введите корректный номер телефона'
        }
      },
      email: {
        presence: {
          allowEmpty: false,
          message: '^Введите ваш email'
        },
        email: {
          message: '^Неправильный формат email-адреса'
        }
      },
      text: {
        presence: {
          allowEmpty: false,
          message: '^Введите ваш ZIP'
        },
        length: {
          minimum: 5,
          tooShort: "^Недостаточно символов (минимум %{count})",
          maximum: 100,
          tooLong: "^Слишком много символов (максимум %{count})"
        }
      }
    };
    this.mask = Inputmask({
      mask: "+7 999 999-9999",
      showMaskOnHover: false,
      clearIncomplete: false
    }).mask("[data-validate='phone']");
    document.addEventListener('submit', function (event) {
      event.preventDefault();
      var $form = event.target;

      if ($form.classList.contains('js-validation') && _this7.checkValid($form)) {
        //Событие отправки формы
        //код
        //slide
        Slider.last();
      }
    });
    document.addEventListener('input', function (event) {
      var $input = event.target,
          $form = $input.closest('.form');

      if ($form.classList.contains('js-validation')) {
        _this7.checkValid($form, $input);
      }
    });
  },
  checkValid: function checkValid($form, $input) {
    var _this8 = this;

    var $inputs = $form.querySelectorAll('input, textarea'),
        values = {},
        constraints = {},
        resault;
    $inputs.forEach(function ($input) {
      var name = $input.getAttribute('name');

      for (var key in _this8.namspaces) {
        if ($input.getAttribute('data-validate') == _this8.namspaces[key]) {
          values[name] = $input.value;
          constraints[name] = _this8.constraints[key];
        }
      }
    });
    resault = validate(values, constraints);

    if (resault !== undefined) {
      if ($input !== undefined) {
        var flag = true,
            name = $input.getAttribute('name');

        for (var key in resault) {
          if (name == key) {
            flag = false;
          }
        }

        if (flag && $input.parentNode.classList.contains('error')) {
          $input.parentNode.classList.remove('error');
          var $msg = $input.parentNode.querySelector('.input__message');
          gsap.to($msg, {
            autoAlpha: 0,
            duration: 0.3,
            ease: 'power2.inOut'
          }).eventCallback('onComplete', function () {
            $msg.remove();
          });
        }
      } else {
        $inputs.forEach(function ($input) {
          var name = $input.getAttribute('name');

          for (var _key in resault) {
            if (name == _key) {
              if (!$input.parentNode.classList.contains('error')) {
                $input.parentNode.classList.add('error');
                $input.parentNode.insertAdjacentHTML('beforeend', "<span class=\"input__message\">".concat(resault[_key][0], "</span>"));
                gsap.to($input.parentNode.querySelector('.input__message'), {
                  autoAlpha: 1,
                  duration: 0.3,
                  ease: 'power2.inOut'
                });
              } else {
                $input.parentNode.querySelector('.input__message').textContent = "".concat(resault[_key][0]);
              }
            }
          }
        });
      }

      return false;
    } else {
      $inputs.forEach(function ($input) {
        $input.parentNode.classList.remove('error');
        var $msg = $input.parentNode.querySelector('.input__message');

        if ($msg) {
          gsap.to($msg, {
            autoAlpha: 0,
            duration: 0.3,
            ease: 'power2.inOut'
          }).eventCallback('onComplete', function () {
            $msg.remove();
          });
        }
      });
      return true;
    }
  },
  reset: function reset($form) {
    var $inputs = $form.querySelectorAll('input, textarea');
    $inputs.forEach(function ($input) {
      $input.value = '';
      var $parent = $input.parentNode;

      if ($parent.classList.contains('focused')) {
        $parent.classList.remove('focused');
      }

      if ($parent.classList.contains('error')) {
        $parent.classList.remove('error');
        var $msg = $input.parentNode.querySelector('.input__message');

        if ($msg) {
          gsap.to($msg, {
            autoAlpha: 0,
            duration: 0.3,
            ease: 'power2.inOut'
          }).eventCallback('onComplete', function () {
            $msg.remove();
          });
        }
      }
    });
  }
};

function priceCorrecting(number, decimals) {
  var char = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';
  var i, j, kw, kd, km;
  i = parseInt(number = (+number || 0).toFixed(decimals)) + '';
  (j = i.length) > 3 ? j = j % 3 : j = 0;
  km = j ? i.substr(0, j) + char : '';
  kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ' ');
  kd = decimals ? '.' + Math.abs(number - i).toFixed(decimals).replace(/-/, '0').slice(2) : '';
  return (km + kw + kd).replace(/(0+)$/, '').replace(/[^0-9]$/, '');
}
//# sourceMappingURL=maps/scripts.js.map
