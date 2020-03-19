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