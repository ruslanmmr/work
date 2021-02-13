$(document).ready(function(){
  homeBanner();
  header();
  gallery();
  landing_sliders();
})


function homeBanner() {
  let $slider = $('.home-banner'),
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
      navText: [
        arrowPrev,
        arrowNext
      ]
    });
  }
  
}

function header() {
  let $header = $('header'), 
      height,
      scroll;

  check();

  $(window).scroll(function() {
    check();
  });

  function check() {
    if(!$header.hasClass('header_landing')) {
      scroll = $(window).scrollTop();
      height = $header.height();
      if(scroll>height){
        $header.addClass('fixed');
      } else {
        $header.removeClass('fixed');
      }
    }
  }
  
}

//gallery
function gallery() {
  if($.fancybox) {

    $('.owl-item [data-fancybox]').on('click', function() {
      let $selector = $(this).parents('.owl-carousel').find('.owl-item:not(.cloned) [data-fancybox]');
      console.log('sss')
      $.fancybox.open( $selector, {
          selector : $selector,
          backFocus : false
      }, $selector.index( this ) );

      return false;
    });
    
  }
}

function landing_sliders() {
  let $sliders = $('.landing-slider .owl-carousel');
  if($sliders.length) {
    $sliders.each(function() {
      let $this = $(this);
      let count1, count2, count3, count4;

      if($this.is('.landing-slider_1 .owl-carousel')) {
        count1 = 2;
        count2 = 2; 
        count3 = 3; 
        count4 = 4;
      } else if($this.is('.landing-slider_2 .owl-carousel')) {
        count1 = 1;
        count2 = 2; 
        count3 = 3; 
        count4 = 4;
      }
      
      $this.owlCarousel({
        loop: true,
        margin: 20,
        responsive: {
          0: {
            items: count1,
            margin: 16
          },
          576: {
            items: count2
          },
          768: {
            items: count3
          },
          992: {
            items: count4
          }
        }
      });
    })
  }
}