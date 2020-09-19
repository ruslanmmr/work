$(document).ready(function(){
  mobileSearch();
  header();
  slider.init();
})

const brakepoints = {
  xs: 576,
  sm: 768,
  md: 1024,
  lg: 1200
}

function mobileSearch() {
  let $open = $('.mobile-search-open'),
      $close = $('.mobile-search__close'),
      $block = $('.mobile-search');

  $open.add($close).on('click', function(event) {
    event.preventDefault();
    if ($(this).is($open)) $block.addClass('active');
    else $block.removeClass('active');
  })

}

function header() {
  let $header = $('.new-header__center'),
      scroll;

  check();
  $(window).scroll(function() {
    check();
  });

  function check() {
    scroll = $(window).scrollTop();
    if(scroll>0){
      $header.addClass('active');
    } else {
      $header.removeClass('active');
    }
  }
}

let slider = {
  el: $('.slider'),
  init: function() {
    slider.el.each(function () {
      let slideCount = 1,
          slideCountLg = 1,
          slideCountMd = 1,
          slideCountSm = 1,
          slideCountXs = 1,
          arrows = false,
          dots = false,
          centerMode = false,
          autoplay = false;
      
      if($(this).is('.slider_dots')) {
        dots=true;
      } 
      if($(this).is('.blog-slider')) {
        slideCount = 3;
        slideCountLg = 3;
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
            },
            {
              breakpoint: brakepoints.md,
              settings: {
                slidesToShow: slideCountMd,
                slidesToScroll: slideCountMd
              }
            },
            {
              breakpoint: brakepoints.sm,
              settings: {
                slidesToShow: slideCountSm,
                slidesToScroll: slideCountSm
              }
            },
            {
              breakpoint: brakepoints.xs,
              settings: {
                slidesToShow: slideCountXs,
                slidesToScroll: slideCountXs
              }
            }
          ]
        });
      }
    
    });

  }
}