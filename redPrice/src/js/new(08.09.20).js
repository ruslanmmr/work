$(document).ready(function(){
  homeBanner();
  toggle();
  up();
})


function homeBanner() {
  let $slider = $('.m-banner-slider');
  if ($slider.length) {
    $slider.owlCarousel({
      loop: true,
      nav: false,
      smartSpeed: 500,
      dots: true,
      items: 1,
      margin: 1,
      lazyLoad: true,
      autoplay: true,
      autoplayTimeout: $slider.data('interval')*1000,
      onDrag: mainSliderOnDragCallback,
      onDragged: mainSliderOnDraggedCallback,
    });
  }
  
  function mainSliderOnDragCallback(event) {
    let element = $(event.target);
    element.trigger('stop.owl.autoplay');
  }
  
  function mainSliderOnDraggedCallback(event) {
    let element = $(event.target);
    element.trigger('play.owl.autoplay');
  }
}

function toggle() {
  let $section = $('.toggle-section'),
      speed = 250;

  $section.each(function() {
    let $this = $(this),
        $toggle = $this.children('.toggle-section__trigger'),
        $content = $this.children('.toggle-section__content'),
        $close = $content.find('.toggle-section__close'),
        state = $this.hasClass('active') ? true : false,
        initialized;

    $toggle.on('click', function() {
      state = !state ? true : false;
      check();
    })

    $close.on('click', function() {
      state = false;
      check();
    })
    
    if($this.is('[data-hover]')) {
      let timeout;
      
      $toggle.add($content).on('mouseenter', function(event){
        if(!isTouch) {
          if(timeout) clearTimeout(timeout);
          state=true;
          check();
        }
      })

      $toggle.add($content).on('mouseleave', function(event){
        if(!isTouch) {
          let delay;
          if($(this).is($toggle)) {
            delay=500;
          } else {
            delay=100;
          }
          timeout = setTimeout(()=>{
            state=false;
            check();
          }, delay)
        }
      })

    }

    if($this.is('[data-out-hide]') || $this.is('[data-hover]')) {
      $(document).on('click touchstart', function(event) {
        let $target = $(event.target);
        if(!$target.closest($content).length && !$target.closest($toggle).length && state) {
          state=false;
          check();
        }
      })
    } 

    function check() {
      if(state) {
        $this.add($content).add($toggle).addClass('active');
        if($this.is('[data-slide]')) {
          $content.slideDown(speed);
        }
      } 
      else {
        $this.add($toggle).add($content).removeClass('active');
        if($this.is('[data-slide]')) {
          if(initialized) {
            $content.stop().slideUp(speed);
          } else {
            $content.hide(0);
          }
        }
      }
    }

    check();

    initialized=true;
  })
}


function up() {
  let $btn = $('.js-up');

  function check() {
    let scroll = $(window).scrollTop();
    if(scroll>50) {
      $btn.addClass('visible');
    } else {
      $btn.removeClass('visible');
    }
  }

  $(window).on('scroll', function() {
    check();
  })

  check();

  $btn.on('click', function(event) {
    event.preventDefault();
    $("html, body").animate({scrollTop:0}, 500);
  })
}
