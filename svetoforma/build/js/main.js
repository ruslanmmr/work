"use strict";

lazySizes.cfg.init = false;
$(document).ready(function () {
  hoverTouchEvents();
  toggle();
  lazy();
  nav();
  searchToggle();
  mobileCatalogue();
  desktopCatalogue();
  header();
  up();
}); //hover/touch custom events

function hoverTouchEvents() {
  $(document).on('mouseenter mouseleave touchstart touchend mousedown mouseup', 'a,button,label,input,textarea,.js-touch-hover', function (event) {
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
    var $target = $(this).siblings('.mobile-catalogue-section');

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
        height = $list.height(),
        linksHeight = 0,
        $links = $(this).find('.desktop-catalogue__sub-link');
    $links.each(function () {
      var width = $(this).width();
      linksHeight += $(this).outerHeight();

      if (linksHeight > height) {
        $list.width($list.outerWidth() + width + 15);
        linksHeight = $(this).outerHeight();
        console.log('ss');
      }
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