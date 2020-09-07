"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

lazySizes.cfg.init = false;
$(document).ready(function () {
  touchHoverEvents();
  lazy();
  toggle();
  select.init();
  header.init();
  nav.init();
  slider.init();
  window.mask = Inputmask({
    mask: "+7 999 999-9999",
    showMaskOnHover: false,
    clearIncomplete: false
  }).mask('.input__phone');
});
window.isTouch = false;
var brakepoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200
}; //hover/touch custom events

function touchHoverEvents() {
  document.addEventListener('touchstart', event);
  document.addEventListener('touchend', event);
  document.addEventListener('mouseenter', event, true);
  document.addEventListener('mouseleave', event, true);
  document.addEventListener('mousedown', event);
  document.addEventListener('mouseup', event);
  document.addEventListener('contextmenu', event);
  var targets = 'a[class], button, label, tr, .js-touch-hover, .selectric-items li, .selectric .label, .toggle-section__content',
      touchEndDelay = 100,
      //ms 
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
    } //touchstart


    if (event.type == 'touchstart') {
      isTouch = true;
      if (timeout) clearTimeout(timeout);

      if ($targets[0]) {
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
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } //touchend
    else if (event.type == 'touchend') {
        timeout = setTimeout(function () {
          isTouch = false;
        }, 500);

        if ($targets[0]) {
          setTimeout(function () {
            var _iterator3 = _createForOfIteratorHelper($targets),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _$target2 = _step3.value;

                _$target2.classList.remove('touch');
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }, touchEndDelay);
        }
      } //context menu
      else if (event.type == 'contextmenu') {
          isTouch = false;

          if ($targets[0]) {
            var _iterator4 = _createForOfIteratorHelper($targets),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var _$target3 = _step4.value;

                _$target3.classList.remove('touch');
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          }
        } //mouseenter


    if (event.type == 'mouseenter' && !isTouch && $targets[0] && $targets[0] == event.target) {
      $targets[0].classList.add('hover');
    } //mouseleave
    else if (event.type == 'mouseleave' && !isTouch && $targets[0] && $targets[0] == event.target) {
        $targets[0].classList.remove('hover');
        $targets[0].classList.remove('focus');
      } //mousedown


    if (event.type == 'mousedown' && !isTouch && $targets[0]) {
      $targets[0].classList.add('focus');
    } //mouseup
    else if (event.type == 'mouseup' && !isTouch && $targets[0]) {
        $targets[0].classList.remove('focus');
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
var header = {
  init: function init() {
    this.el = $('.header');
    this.isVisible = true;
    this.isFixed = false;
    this.scroll = $(window).scrollTop();
    this.scroll_last = this.scroll;
    this.checkFixed();
    $(window).scroll(function () {
      //if(!nav.state) {
      header.checkVisible(); //}
    });
  },
  checkFixed: function checkFixed() {
    var h = $('.header').height(); //fix header

    if (this.scroll > 0 && !this.isFixed) {
      this.isFixed = true;
      this.el.addClass('header_fixed');
    } else if (this.scroll <= 0 && this.isFixed) {
      this.isFixed = false;
      this.el.removeClass('header_fixed');
    }
  },
  checkVisible: function checkVisible() {
    this.scroll = $(window).scrollTop();
    this.checkFixed();

    if (this.scroll > this.scroll_last && this.scroll > $(window).height() / 2 && this.isVisible) {
      this.isVisible = false;
      this.el.addClass('header_hidden');
    } else if (this.scroll < this.scroll_last && !this.isVisible) {
      this.isVisible = true;
      this.el.removeClass('header_hidden');
    }

    this.scroll_last = this.scroll;
  }
};
var nav = {
  init: function init() {
    var _this = this;

    this.$nav = $('.mobile-nav');
    this.$toggle = $('.nav-toggle');
    this.$toggle.on('click', function (event) {
      event.preventDefault();

      if (_this.flag) {
        _this.close();
      } else {
        _this.open();
      }
    });
    $(document).on('click touchstart', function (event) {
      if ($(event.target).closest('.mobile-nav__container').length == 0 && $(event.target).closest('.header').length == 0 && $(event.target).closest(_this.$toggle).length == 0 && _this.flag == true) {
        _this.close();
      }
    });
  },
  open: function open() {
    this.flag = true;
    if (this.timout !== undefined) clearTimeout(this.timout);
    scrollLock.disablePageScroll();
    this.state = true;
    $('header').addClass('header_nav-active');
    this.$nav.addClass('active');
    this.$toggle.addClass('active');
  },
  close: function close() {
    var _this2 = this;

    this.flag = false;
    scrollLock.enablePageScroll();
    $('header').removeClass('header_nav-active');
    this.$nav.removeClass('active');
    this.$toggle.removeClass('active');
    this.timout = setTimeout(function () {
      _this2.state = false;
    }, 250);
  }
};
var slider = {
  el: $('.slider'),
  arrowPrev: '<svg class="icon" viewBox="0 0 10.5 18.1"><path stroke="none" d="M9,0l1.4,1.4L2.8,9l7.6,7.6L9,18.1L0,9C0,9,9.1,0,9,0z"></path></svg>',
  arrowNext: '<svg class="icon" viewBox="0 0 10.5 18.1"><path stroke="none" d="M1.4,18.1L0,16.7l7.6-7.6L0,1.5L1.4,0l9,9.1C10.4,9.1,1.3,18.1,1.4,18.1z"></path></svg>',
  init: function init() {
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
          nextArrow = "<button type=\"button\" class=\"button button_style-1 slider__next\">".concat(slider.arrowNext, "</button>"),
          prevArrow = "<button type=\"button\" class=\"button button_style-1 slider__prev\">".concat(slider.arrowPrev, "</button>");

      if ($(this).is('.slider_dots')) {
        dots = true;
      }

      if ($(this).is('.slider_arrows')) {
        arrows = true;
      }

      if ($(this).is('.slider_grid')) {
        arrows = true;
        dots = true;
      }

      if ($(this).is('.home-banner')) {
        //autoplay = true;
        nextArrow = "<button class=\"home-banner__arrow home-banner__next\" aria-label=\"Next\" type=\"button\">".concat(slider.arrowNext, "</button>");
        prevArrow = "<button class=\"home-banner__arrow home-banner__prev\" aria-label=\"Previous\" type=\"button\">".concat(slider.arrowPrev, "</button>");
        initSlider($(this));
      } else if ($(this).is('.photo-slider')) {
        initSlider($(this));
      } else if ($(this).is('.slider_3n')) {
        slideCount = 3;
        slideCountLg = 2;
        slideCountMd = 2;
        slideCountSm = 2;
        slideCountXs = 1;
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
        if (!isTouch) {
          if (timeout) clearTimeout(timeout);
          state = true;
          check();
        }
      });
      $toggle.add($content).on('mouseleave', function (event) {
        if (!isTouch) {
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