"use strict";

$(document).ready(function () {
  newslider();
}); //gallery

function newslider() {
  var $slider = $('.form-section__slider .owl-carousel');

  if ($slider.length) {
    $slider.owlCarousel({
      loop: true,
      nav: true,
      smartSpeed: 500,
      dots: false,
      items: 1,
      lazyLoad: true,
      autoplay: true,
      autoplayTimeout: 5000
    });
  }
}
//# sourceMappingURL=maps/new.js.map
