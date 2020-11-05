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
  Nav.init();
  Slider.init();
  select.init();
  popup.init();
  lazy();
  toggle();
  validation();
}); //hover/touch custom events

var TouchHoverEvents = {
  targets: 'a[class], button, label, tr, .jsTouchHover',
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

function toggle() {
  var $section = $('.toggle-section'),
      speed = 250;
  $section.each(function () {
    var $this = $(this),
        $toggle = $this.children('.toggle-section__trigger'),
        $content = $this.children('.toggle-section__content'),
        state = $this.hasClass('active') ? true : false,
        initialized;
    $toggle.on('click', function () {
      state = !state ? true : false;
      check();
    });

    if ($this.is('[data-hover]')) {
      var timeout;
      $toggle.add($content).on('mouseenter', function (event) {
        if (!TouchHoverEvents.touched) {
          if (timeout) clearTimeout(timeout);
          state = true;
          check();
        }
      });
      $toggle.add($content).on('mouseleave', function (event) {
        if (!TouchHoverEvents.touched) {
          var delay;

          if ($(this).is($toggle)) {
            delay = 500;
          } else {
            delay = 100;
          }

          timeout = setTimeout(function () {
            state = false;
            check();
          }, delay);
        }
      });
    }

    if ($this.is('[data-out-hide]') || $this.is('[data-hover]')) {
      $(document).on('click touchstart', function (event) {
        var $target = $(event.target);

        if (!$target.closest($content).length && !$target.closest($toggle).length && state) {
          state = false;
          check();
        }
      });
    }

    function check() {
      if (state) {
        $this.add($content).add($toggle).addClass('active');

        if ($this.is('[data-slide]')) {
          $content.slideDown(speed);
        }
      } else {
        $this.add($toggle).add($content).removeClass('active');

        if ($this.is('[data-slide]')) {
          if (initialized) {
            $content.stop().slideUp(speed);
          } else {
            $content.hide(0);
          }
        }
      }
    }

    check();
    initialized = true;
  });
}

var Nav = {
  init: function init() {
    var _this3 = this;

    this.$nav = $('.mobile-nav');
    this.$toggle = $('.nav-toggle');
    this.$toggle.on('click', function (event) {
      event.preventDefault();

      if (_this3.flag) {
        _this3.close();
      } else {
        _this3.open();
      }
    });
    $(document).on('click touchstart', function (event) {
      if ($(event.target).closest('.mobile-nav__container').length == 0 && $(event.target).closest('.header').length == 0 && $(event.target).closest(_this3.$toggle).length == 0 && _this3.flag == true) {
        _this3.close();
      }
    });
  },
  open: function open() {
    this.flag = true;
    scrollLock.disablePageScroll();
    $('header').addClass('header_nav-active');
    this.$nav.addClass('active');
    this.$toggle.addClass('active');
  },
  close: function close() {
    this.flag = false;
    scrollLock.enablePageScroll();
    $('header').removeClass('header_nav-active');
    this.$nav.removeClass('active');
    this.$toggle.removeClass('active');
  }
};
var Slider = {
  arrow: '<svg fill="currentColor" class="icon" viewBox="0 0 32 22" id="arrow"><path d="M32 11c0-.3-.1-.5-.3-.7L21.8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l8.2 8.3H1c-.6 0-1 .5-1 1s.4 1 1 1h27.6l-8.2 8.3c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0l9.9-10c.2-.2.3-.4.3-.7z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',
  init: function init() {
    this.el = $('.slider');
    this.el.each(function () {
      var slideCount = 1,
          slideCountLg = 1,
          slideCountMd = 1,
          slideCountSm = 1,
          slideCountXs = 1,
          arrows = false,
          dots = false,
          centerMode = false,
          autoplay = false,
          nextArrow = "<button type=\"button\" class=\"slider__next\">".concat(Slider.arrow, "</button>"),
          prevArrow = "<button type=\"button\" class=\"slider__prev\">".concat(Slider.arrow, "</button>");

      if ($(this).is('.slider_4n')) {
        slideCount = 4;
        slideCountLg = 3;
        slideCountMd = 3;
        slideCountSm = 2;
        slideCountXs = 2;
        arrows = true;
        initSlider($(this));
      }

      function initSlider($target) {
        $target.slick({
          rows: 0,
          infinite: true,
          dots: dots,
          arrows: arrows,
          nextArrow: nextArrow,
          prevArrow: prevArrow,
          speed: 500,
          centerMode: centerMode,
          slidesToShow: slideCount,
          slidesToScroll: slideCount,
          autoplay: autoplay,
          autoplaySpeed: 5000,
          responsive: [{
            breakpoint: brakepoints.lg,
            settings: {
              slidesToShow: slideCountLg,
              slidesToScroll: slideCountLg
            }
          }, {
            breakpoint: brakepoints.md,
            settings: {
              slidesToShow: slideCountMd,
              slidesToScroll: slideCountMd
            }
          }, {
            breakpoint: brakepoints.sm,
            settings: {
              slidesToShow: slideCountSm,
              slidesToScroll: slideCountSm
            }
          }, {
            breakpoint: brakepoints.xs,
            settings: {
              slidesToShow: slideCountXs,
              slidesToScroll: slideCountXs
            }
          }]
        });
      }
    });
  }
};
window.popup = {
  init: function init() {
    this.$trigger = $('[data-popup-open]');
    this.$close = $('[data-popup-close]');
    this.$trigger.on('click', function (event) {
      event.preventDefault();
      var $popup = $($(this).attr('href'));

      if ($popup.length) {
        popup.open($popup);
      }
    });
    $(document).on('click', function (event) {
      var $target = $(event.target);

      if ($target.closest(popup.$close).length || $target.closest('.popup').length && $target.closest('.popup-block__container').length == 0) {
        event.preventDefault();
        var $popup = $target.closest('.popup').length ? $target.closest('.popup') : $('.city-question-popup');
        popup.close($popup);
      }
    });
  },
  open: function open($popup) {
    var _this4 = this;

    var event = function event() {
      _this4.active = $popup;
      scrollLock.disablePageScroll();
      $popup.addClass('active');
    };

    if (this.active) {
      popup.close(this.active, function () {
        event();
      });
    } else {
      event();
    }
  },
  close: function close($popup, callback) {
    var _this5 = this;

    scrollLock.enablePageScroll();
    $popup.removeClass('active');
    setTimeout(function () {
      _this5.active = undefined;
      typeof callback === 'function' && callback();
    }, 250);
  }
};

function validation() {
  var $form = $('.js-validation');
  var namspaces = {
    phone: '.input_phone',
    email: '[name="email"]',
    name: '[name="name"]',
    message: '[name="message"]',
    review: '[name="review"]'
  },
      conditions = {
    phone: {
      format: {
        pattern: /^\+7 \d{3}\ \d{3}\-\d{4}$|()/,
        message: '^Некорректный номер телефона'
      },
      presence: {
        allowEmpty: false,
        message: '^Введите номер телефона'
      }
    },
    email: {
      presence: {
        allowEmpty: false,
        message: '^Введите ваш email'
      },
      email: {
        message: '^Неправильный формат'
      }
    },
    name: {
      presence: {
        allowEmpty: false,
        message: '^Вы не указали ваше имя'
      },
      length: {
        minimum: 2,
        tooShort: "^Имя слишком короткое",
        maximum: 20,
        tooLong: "^Имя слишком длинное"
      }
    },
    message: {
      presence: {
        allowEmpty: false,
        message: '^Введите ваше сообщение'
      },
      length: {
        minimum: 10,
        tooShort: "^Сообщение слишком короткое",
        maximum: 200,
        tooLong: "^Сообщение слишком длинное"
      }
    },
    review: {
      presence: {
        allowEmpty: false,
        message: '^Напишите ваш отзыв'
      },
      length: {
        minimum: 10,
        tooShort: "^Отзыв слишком короткий (минимум %{count} символов)",
        maximum: 200,
        tooLong: "^Отзыв слишком длинный (максимум %{count} символов)"
      }
    }
  },
      mask = Inputmask({
    mask: "+7 999 999-9999",
    showMaskOnHover: false,
    clearIncomplete: false
  }).mask(namspaces.phone); //validation events

  $form.each(function () {
    var $form = $(this),
        $inputs = $form.find('input, textarea');
    $inputs.on('input', function () {
      validateForm($(this));
    });

    function validateForm($input) {
      var values = {};
      var constraints = {};
      $inputs.each(function () {
        var $input = $(this);

        for (var key in namspaces) {
          if ($input.is(namspaces[key]) && $(this).is('.required')) {
            values[key] = $input.val();
            constraints[key] = conditions[key];
          }
        }
      });
      var resault = validate(values, constraints);

      if (resault !== undefined) {
        if ($input !== undefined) {
          var flag = true;

          for (var key in resault) {
            if ($input.is(namspaces[key]) && $input.is('.required')) {
              flag = false;
            }
          }

          if (flag) {
            $input.removeClass('error');
            $input.parent().find('.input__message').remove();
          }
        } else {
          $inputs.removeClass('error');
          $inputs.parent().find('.input__message').remove();

          var _loop = function _loop(_key) {
            $inputs.each(function () {
              var $input = $(this);

              if ($input.is(namspaces[_key]) && ($input.hasClass('required') || $input.hasClass('filled'))) {
                $input.addClass('error');
                $input.parent().append("<span class=\"input__message\">".concat(resault[_key][0], "</span>"));
              }
            });
          };

          for (var _key in resault) {
            _loop(_key);
          }
        }

        return false;
      } else {
        $inputs.removeClass('error');
        $inputs.parent().find('.input__message').remove();
        return true;
      }
    }

    $form.on('submit', function (event) {
      event.preventDefault();

      if (validateForm()) {//submit
      }
    });
  });
}
//# sourceMappingURL=maps/common.js.map
