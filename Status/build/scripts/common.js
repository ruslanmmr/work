"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

lazySizes.cfg.init = false;
document.addEventListener('lazybeforeunveil', function (e) {
  var el = e.target.tagName,
      bg = e.target.getAttribute('data-src');

  if (el !== 'IMG') {
    var _bg = e.target.getAttribute('data-src');

    e.target.style.backgroundImage = "url('".concat(_bg, "')");
  }
});
var brakepoints = {
  xs: 576,
  sm: 768,
  xl: 1024,
  lg: 1280
};
$(document).ready(function () {
  TouchHoverEvents.init();
  select.init();
  slider.init();
  nav.init();
  toggle();
  up();
  tabs();
  window.mask = Inputmask({
    mask: "+7 999 999-9999",
    showMaskOnHover: false,
    clearIncomplete: false
  }).mask('.input__phone');
  fancy();
  lazySizes.init();
}); //hover/touch custom events

var TouchHoverEvents = {
  targets: 'a[class], button, label, tr, .jsTouchHover, .selectric-items li',
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
}; //select

var select = {
  init: function init() {
    this.items = $('select');

    if (this.items.length) {
      this.items.selectric({
        disableOnMobile: false,
        nativeOnMobile: false,
        arrowButtonMarkup: '<svg class="icon" width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 5L0 7.57103e-07L10 0L5 5Z" fill="#222222"/></svg>'
      });
    }
  }
};
var slider = {
  arrow: '<svg class="icon" width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L14 14L1 27" stroke="currentColor" stroke-width="2"/></svg>',
  init: function init() {
    this.el = $('.slider');
    slider.el.each(function () {
      var slideCount = 1,
          slideCountLg = 1,
          slideCountMd = 1,
          slideCountSm = 1,
          slideCountXs = 1,
          arrows = false,
          dots = false,
          centerMode = false,
          autoplay = false,
          nextArrow = "<button type=\"button\" class=\"slider__next\">".concat(slider.arrow, "</button>"),
          prevArrow = "<button type=\"button\" class=\"slider__prev\">".concat(slider.arrow, "</button>");

      if ($(this).is('.slider_3n')) {
        slideCount = 3;
        slideCountLg = 2;
        slideCountMd = 2;
        slideCountSm = 2;
        slideCountXs = 1;
        arrows = true;
        dots = true;
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

function up() {
  var $btn = $('.js-up');
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();

    if (scroll > $('.header').height()) {
      $btn.addClass('active');
    } else {
      $btn.removeClass('active');
    }
  });
  $btn.on('click', function (event) {
    event.preventDefault();
    $("html, body").animate({
      scrollTop: 0
    }, 500);
  });
}

function fancy() {
  $.fancybox.defaults.i18n.ru = {
    CLOSE: 'Закрыть',
    NEXT: 'Следующий слайд',
    PREV: 'Предидущий слайд',
    ERROR: 'Ошибка загрузки, попробуйте позже.',
    PLAY_START: 'Запустить слайд-шоу',
    PLAY_STOP: 'Остановить слайд-шоу',
    FULL_SCREEN: 'Полноэкранный режим',
    THUMBS: 'Миниатюры',
    DOWNLOAD: 'Загрузить',
    SHARE: 'Поделиться',
    ZOOM: 'Увеличить'
  };
  $.fancybox.defaults.lang = 'ru';
  $.fancybox.defaults.loop = true;
  $.fancybox.defaults.autoFocus = false;
  $.fancybox.defaults.animationEffect = 'fade';
  $.fancybox.defaults.backFocus = 'false';
  $("[data-modal]").fancybox({
    autoFocus: false,
    smallBtn: true,
    touch: false
  });
}

function tabs() {
  var $tablink = $('.services__link'),
      $tabblock = $('.services-block'),
      current = 0,
      old;

  var check = function check() {
    if (old !== undefined) {
      $tabblock.eq(old).hide();
      $tablink.eq(old).removeClass('active');
    }

    $tabblock.eq(current).fadeIn(500);
    $tablink.eq(current).addClass('active');
    old = current;
  };

  check();
  $tablink.on('click', function (event) {
    current = $tablink.index($(this));
    check();
  });
}

var nav = {
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
//# sourceMappingURL=maps/common.js.map
