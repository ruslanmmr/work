"use strict";

//add lazy backgrounds
document.addEventListener('lazybeforeunveil', function (e) {
  var el = e.target.tagName,
      bg = e.target.getAttribute('data-src');

  if (el !== 'IMG') {
    var _bg = e.target.getAttribute('data-src');

    e.target.style.backgroundImage = 'url(' + _bg + ')';
  }
});
$(document).ready(function () {
  mainSlider();
  infoTabs();
}); //slider

function mainSlider() {
  var $slider = $('.home-slider__container');

  if ($slider.length) {
    $slider.slick({
      slidesToShow: 3,
      slidesToScroll: 3,
      dots: true,
      arrows: true,
      prevArrow: '<div class="home-slider__arrow home-slider__arrow-prev"><svg viewBox="0 0 27 47" fill="#fff"><path d="M26.8996 6.75L10.1496 23.5L26.8996 40.25L23.5496 46.95L0.0996094 23.5L23.5496 0.0500031L26.8996 6.75Z"/></svg></div>',
      nextArrow: '<div class="home-slider__arrow home-slider__arrow-next"><svg viewBox="0 0 27 47" fill="#fff"><path d="M0.1,40.2l16.7-16.8L0.1,6.8l3.4-6.7l23.4,23.4L3.4,47L0.1,40.2z"/></svg></div>',
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }, {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    });
  }
} //infoTabs


function infoTabs() {
  var $blocks = $('.questions-block');
  $blocks.each(function () {
    var $this = $(this),
        $title = $this.find('.questions-block__title'),
        $answer = $this.find('.questions-block__answer');
    $title.on('click', function () {
      $this.toggleClass('active');
      $answer.stop().slideToggle(250);
    });
  });
}