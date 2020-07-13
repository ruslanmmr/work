"use strict";

lazySizes.cfg.init = false;
lazySizes.cfg.preloadAfterLoad = true;
$(document).ready(function () {
  hoverTouchEvents();
  lazy();
  popup();
  addGradient();
  $header.init();
});
var brakepoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
}; //hover/touch custom events

function hoverTouchEvents() {
  $(document).on('mouseenter mouseleave touchstart touchend mousedown mouseup contextmenu', 'a,button,label,input,textarea,.js-touch-hover', function (event) {
    var $target = $(this); //mobile events

    if (!device.desktop()) {
      if (event.type == 'touchstart') {
        $target.addClass('touch');
      } else if (event.type == 'touchend' || event.type == 'contextmenu') {
        $target.removeClass('touch');
      }
    } //desktop events
    else {
        if (event.type == 'mouseenter') {
          $target.addClass('hover');
        } else if (event.type == 'mousedown') {
          $target.addClass('mousedown');
        } else if (event.type == 'mouseup') {
          $target.removeClass('mousedown');
        } else {
          $target.removeClass('hover');
          $target.removeClass('mousedown');
        }
      }
  });
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
}

function popup() {
  var $button = $('.js-popup');
  $button.each(function () {
    var $window = $(this).siblings('.js-popup-item'),
        timeout;
    $(this).add($window).on('mouseenter', function (event) {
      if (device.desktop()) {
        if (timeout) {
          clearTimeout(timeout);
        }

        if ($(event.target).closest($button).length) {
          $button.addClass('popupVisible');
          $window.addClass('visible');
        }
      }
    });
    $(this).add($window).on('mouseleave', function () {
      if (device.desktop()) {
        if ($(event.target).closest($button).length) {
          timeout = setTimeout(function () {
            $button.removeClass('popupVisible');
            $window.removeClass('visible');
          }, 500);
        } else {
          $button.removeClass('popupVisible');
          $window.removeClass('visible');
        }
      }
    });
  });
}
/* HEADER */


var $header = {
  init: function init() {
    this.el = $('.header');
    this.isVisible = true;
    this.isFixed = false;
    this.scroll = $(window).scrollTop();
    this.scroll_last = this.scroll;
    this.checkFixed();
    $(window).scroll(function () {
      $header.checkVisible();
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

function addGradient() {
  var $block = $('.block-list');
  $block.each(function () {
    var $this = $(this),
        $items = $this.find('.block-list__item-icon'),
        value = 0.5 / ($items.length - 1),
        itemValue = 0.5;
    $items.each(function () {
      $(this).css('opacity', itemValue);
      itemValue += value;
    });
  });
}