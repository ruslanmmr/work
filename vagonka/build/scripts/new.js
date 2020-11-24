"use strict";

$(document).ready(function () {
  homeBanner();
  header();
  gallery();
});

function homeBanner() {
  var $slider = $('.home-banner'),
      arrowPrev = '<svg class="icon" viewBox="0 0 10.5 18.1"><path stroke="none" d="M9,0l1.4,1.4L2.8,9l7.6,7.6L9,18.1L0,9C0,9,9.1,0,9,0z"></path></svg>',
      arrowNext = '<svg class="icon" viewBox="0 0 10.5 18.1"><path stroke="none" d="M1.4,18.1L0,16.7l7.6-7.6L0,1.5L1.4,0l9,9.1C10.4,9.1,1.3,18.1,1.4,18.1z"></path></svg>';

  if ($slider.length) {
    $slider.owlCarousel({
      loop: true,
      nav: true,
      smartSpeed: 500,
      dots: true,
      items: 1,
      lazyLoad: true,
      autoplay: false,
      autoplayTimeout: 5000,
      navText: [arrowPrev, arrowNext]
    });
  }
}

function header() {
  var $header = $('header'),
      height,
      scroll;
  check();
  $(window).scroll(function () {
    check();
  });

  function check() {
    scroll = $(window).scrollTop();
    height = $header.height();

    if (scroll > height) {
      console.log('++');
      $header.addClass('fixed');
    } else {
      $header.removeClass('fixed');
    }
  }
} //gallery


function gallery() {
  if ($.fancybox) {
    $('.owl-item [data-fancybox]').on('click', function () {
      var $selector = $(this).parents('.owl-carousel').find('.owl-item:not(.cloned) [data-fancybox]');
      console.log('sss');
      $.fancybox.open($selector, {
        selector: $selector,
        backFocus: false
      }, $selector.index(this));
      return false;
    });
  }
}
//# sourceMappingURL=maps/new.js.map
