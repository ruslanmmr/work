"use strict";

lazySizes.cfg.init = false;
$(document).ready(function () {
  hoverTouchEvents();
  toggle();
  nav();
  searchToggle();
  mobileCatalogue();
  desktopCatalogue();
  header();
  up();
  inputs.init();
  select.init();
  cardSlider(); //обработать изображения после инициализации слайдеров

  setTimeout(function () {
    lazy();
  }, 500);
});
var brakepoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200
}; //hover/touch custom events

function hoverTouchEvents() {
  var targets = 'a, button, label, input, textarea, .selectric, .selectric-items li, .js-touch-hover';
  $(document).on('mouseenter mouseleave touchstart touchend mousedown mouseup', targets, function (event) {
    var $target = $(this); //mobile events

    if (!device.desktop()) {
      if (event.type == 'touchstart') {
        $target.addClass('touch');
      } else if (event.type == 'touchend') {
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
}

function lazy() {
  //lazyloading
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

function toggle() {
  var $section = $('.toggle-section'),
      $toggle = $('.toggle-section__head'),
      flag;
  $toggle.on('click', function () {
    $(this).closest($section).toggleClass('active');
    check();
  });

  function check() {
    $section.each(function () {
      if ($(this).hasClass('active')) {
        if (!flag) {
          $(this).find('.toggle-section__content').show();
        }

        $(this).find('.toggle-section__content').slideDown(250);
      } else {
        $(this).find('.toggle-section__content').slideUp(250);
      }
    });
    flag = true;
  }

  check();
}

function nav() {
  var $open = $('.nav-open'),
      $close = $('.nav-close'),
      $nav = $('.mobile-nav'),
      $overlay = $('.mobile-nav__overlay'),
      state;
  $open.on('click', function (event) {
    event.preventDefault();

    if (!state) {
      open();
    }
  });
  $close.on('click', function (event) {
    event.preventDefault();

    if (state) {
      close();
    }
  });
  $overlay.on('click touchstart', function (event) {
    event.preventDefault();

    if (state) {
      close();
    }
  });

  function open() {
    state = true;
    scrollLock.disablePageScroll();
    $('header').addClass('header_nav-active');
    $nav.addClass('active');
  }

  function close() {
    state = false;
    scrollLock.enablePageScroll();
    $('header').removeClass('header_nav-active');
    $nav.removeClass('active');
  }
}

function searchToggle() {
  var $open = $('.header__button-search'),
      $close = $('.header__search-close'),
      $search = $('.header__search');
  $open.on('click', function (event) {
    event.preventDefault();
    $search.addClass('active');
  });
  $close.on('click', function (event) {
    event.preventDefault();
    $search.removeClass('active');
  });
}

function mobileCatalogue() {
  var $catalogueToggle = $('.mobile-nav__catalogue-toggle'),
      $catalogue = $('.mobile-catalogue'),
      $close = $('.mobile-catalogue-section__head'),
      $sectionOpen = $('.mobile-catalogue-section__link');
  $catalogueToggle.on('click', function (event) {
    event.preventDefault();
    $catalogue.addClass('active');
  });
  $close.on('click', function (event) {
    event.preventDefault();
    var $parent = $(this).closest('.mobile-catalogue-section');
    $parent.removeClass('active');
  });
  $sectionOpen.on('click', function (event) {
    var index = $(this).parent().index();
    var $target = $(this).parents('.mobile-catalogue-section').find('.mobile-catalogue-section').eq(index);

    if ($target.length) {
      event.preventDefault();
      $target.addClass('active');
    }
  });
}

function desktopCatalogue() {
  var $toggle = $('.catalogue-toggle-btn'),
      $navTrigger = $('.desktop-catalogue__item'),
      $nav = $('.desktop-catalogue'),
      $lists = $('.desktop-catalogue__sub-list'),
      state = false;
  $lists.each(function (index) {
    var $list = $(this),
        $links = $(this).find('.desktop-catalogue__sub-link'),
        w = 210;

    function resize() {
      $list.width(210);
      var height = $list.height(),
          linksHeight = 0,
          rows = 1;
      $links.each(function () {
        linksHeight += $(this).outerHeight();

        if (linksHeight > height) {
          console.log(height);
          rows++;
          $list.width(w * rows);
          linksHeight = $(this).outerHeight();
        }
      });
    }

    resize();
    $(window).on('resize', function () {
      resize();
    });
  });
  $toggle.add($nav).on('mouseenter mouseleave', function (event) {
    if (event.type == 'mouseenter') {
      open();
    } else if (event.type == 'mouseleave') {
      close();
    }
  });
  $navTrigger.on('mouseenter mouseleave', function (event) {
    var $this = $(this);

    if (event.type == 'mouseenter') {
      $this.addClass('active');
    } else if (event.type == 'mouseleave') {
      $this.removeClass('active');
    }
  });
  $lists.on('mouseenter mouseleave', function (event) {
    var $link = $(this).siblings('.desktop-catalogue__link');

    if (event.type == 'mouseenter') {
      $link.addClass('active');
    } else if (event.type == 'mouseleave') {
      $link.removeClass('active');
    }
  });

  function open() {
    state = true;
    $toggle.addClass('active');
    $nav.addClass('active');
  }

  function close() {
    state = false;
    $toggle.removeClass('active');
    $nav.removeClass('active');
  }
}

function header() {
  var $header = $('.header'),
      height,
      scroll;
  check();
  padding();
  $(window).scroll(function () {
    check();
  });
  $(window).resize(function () {
    padding();
  });

  function padding() {
    $('.content').css('padding-top', $header.height());
  }

  function check() {
    scroll = $(window).scrollTop();
    height = $header.height();

    if (scroll > height) {
      $header.addClass('fixed');
    } else {
      $header.removeClass('fixed');
    }
  }
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
    }, 300);
  });
}

var inputs = {
  init: function init() {
    $(document).on('change input', 'input', function (event) {
      var $target = $(this);

      if ($target.hasClass('num-only')) {
        $target.val($target.val().replace(/\D/, ''));
      }
    });
  }
};

function cardSlider() {
  var $slider = $('.item-card-slider'),
      $navslider = $('.item-card-nav-slider');

  if ($slider.length) {
    $slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: $navslider
    });
    $navslider.slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      asNavFor: $slider,
      focusOnSelect: true,
      arrows: true,
      nextArrow: '<button type="button" class="slider__arrow slider__next"><i class="fas fa-angle-right"></i></button>',
      prevArrow: '<button type="button" class="slider__arrow slider__prev"><i class="fas fa-angle-left"></i></button>',
      responsive: [{
        breakpoint: brakepoints.xs,
        settings: {
          slidesToShow: 3
        }
      }]
    });
  }
} //select


var select = {
  init: function init() {
    this.items = $('.select');

    if (this.items.length) {
      this.items.selectric({
        disableOnMobile: false,
        nativeOnMobile: false,
        arrowButtonMarkup: '<span class="icon"></span>'
      });
    }
  }
};