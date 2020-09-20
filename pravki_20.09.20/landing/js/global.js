$(document).ready(function() {
        // if ($(window).width() < 767) {
        //     $('.prezent-cover').height((window.innerHeight - 110) + 'px' );
        // }

      $('.rewiews-slide').slick({
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrow: true,
            prevArrow: null,
            nextArrow: null,
            dots: true,
            prevArrow: $('.rewiews-arrow__left'),
            nextArrow: $('.rewiews-arrow__right'),
            dotsClass: 'slick-dots slider__dots',
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                      dots: true,
                      slidesToShow: 2
                  }
              },
              {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    dots: true
                }
              }
            ]
        });


});
