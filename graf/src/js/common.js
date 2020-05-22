import device from "current-device";
import 'lazysizes';
lazySizes.cfg.lazyClass = 'lazy';
lazySizes.cfg.loadedClass = 'loaded';
lazySizes.cfg.init = false;
import slick from 'slick-carousel';

$(document).ready(function(){
  hoverTouchEvents();
  slider();
  nav();
  navToggle();
  setTimeout(()=>{
    lazySizes.init();
  },500)
})


//hover/touch custom events
function hoverTouchEvents() {
  $(document).on('mouseenter mouseleave touchstart touchend mousedown mouseup', 'a, button', function(event) {
    if(event.type=='touchstart' && !device.desktop()) {
      $(this).addClass('touch');
    } else if(event.type=='mouseenter' && device.desktop()) {
      $(this).addClass('hover');
    } else if(event.type=='mousedown' && device.desktop()) {
      $(this).addClass('mousedown');
    } else if(event.type=='mouseup' && device.desktop()) {
      $(this).removeClass('mousedown');
    } else {
      $(this).removeClass('touch');
      $(this).removeClass('hover');
      $(this).removeClass('mousedown');
    }
  })
}

function slider() {
  $('.banner-slider .slider').slick({
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    adaptiveHeight: true,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    prevArrow: '.banner-slider__prev',
    nextArrow: '.banner-slider__next',
    rows: 0
  });
}

function nav() {
  let $nav = $('.nav'),
      $toggle = $('.nav-toggle'),
      $overlay = $('.overlay'),
      state = false;

  $toggle.on('click', function() {
    if(!state) {
      open();
    } else {
      close();
    }
  })

  $overlay.on('click touchstart', function() {
    close();
  })

  function open() {
    state = true;
    $nav.addClass('active');
    $toggle.addClass('active');
    $overlay.addClass('active');
  }
  function close() {
    state = false;
    $nav.removeClass('active');
    $toggle.removeClass('active');
    $overlay.removeClass('active');
  }

  $(window).on('resize', function() {
    if($(this).width()>768 && state) {
      close();
    }
  })
}
function navToggle() {
  let $navlink = $('.nav__link'),
      $subnav = $('.nav__sub-list');
  //fix
  $navlink.each(function() {

    if($(this).siblings('.nav__sub-list').length>0) {
      let path = $(this).attr('data-icon');
      $(this).find('span').append(`<svg class="icon"><use xlink:href=${path}></use></svg>`)
    }
  })

  $navlink.on('click mouseenter mouseleave', function(event) {
    if($(this).siblings('.nav__sub-list').length>0) {

      if(event.type=='mouseenter' && device.desktop() && $(window).width()>768) {
        $(this).addClass('active');
        $(this).siblings('.nav__sub-list').addClass('active');
      } else if(event.type=='mouseleave' && device.desktop() && $(window).width()>768) {
        $(this).removeClass('active');
        $(this).siblings('.nav__sub-list').removeClass('active');
      } else if(event.type=='click' && !device.desktop() && $(window).width()>768) {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('.nav__sub-list').toggleClass('active');
      } else if(event.type=='click' && $(window).width()<=768) {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('.nav__sub-list').toggleClass('active');
        $(this).siblings('.nav__sub-list').stop().slideToggle(250);
      }

    }
  })
  $subnav.on('mouseenter mouseleave', function(event) {
    if(event.type=='mouseenter' && device.desktop() && $(window).width()>768) {
      $(this).addClass('active');
      $(this).siblings('.nav__link').addClass('active');
    } else if(event.type=='mouseleave' && device.desktop() && $(window).width()>768) {
      $(this).removeClass('active');
      $(this).siblings('.nav__link').removeClass('active');
    }
  })
  $(document).on('touchstart', function(event) {
    if($(event.target).closest($subnav).length==0 
    && $(event.target).closest($navlink).length==0
    && !$(event.target).is($navlink)
    && !$(event.target).is($subnav)
    && $(window).width()>768) {
      $navlink.removeClass('active');
      $subnav.removeClass('active');
    }
  })

}