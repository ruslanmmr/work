import device from "current-device";
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import slick from "slick-carousel";
import 'lazysizes';
lazySizes.cfg.lazyClass = 'lazy';
lazySizes.cfg.loadedClass = 'loaded';
lazySizes.cfg.init = false;



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
  $(document).on('mouseenter mouseleave touchstart touchend mousedown mouseup', 'a, button, .js-touch-hover', function(event) {
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
  $('.b-slider__container').slick({
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    adaptiveHeight: true,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    prevArrow: '.b-slider__prev',
    nextArrow: '.b-slider__next',
    rows: 0
  });
}

function nav() {
  let $nav = $('.nav__block'),
      $toggle = $('.nav-toggle'),
      state = false;

  $toggle.on('click', function() {
    if(!state) {
      open();
    } else {
      close();
    }
  })

  function open() {
    state = true;
    $nav.stop().slideDown(250);
    $toggle.addClass('active');
  }
  function close() {
    state = false;
    $nav.stop().slideUp(250);
    $toggle.removeClass('active');
  }

  $(window).on('resize', function() {
    if($(this).width()>1024 && state) {
      close()
    }
  })
}

function navToggle() {
  let $navlink = $('.nav__link'),
      $subnav = $('.nav__sub-list');

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

//ctlg
let catalogue = {
  $toggle: $('.nav__catalogue-trigger'),
  $navTrigger: $('.ctlg-nav-m__item'),
  $nav: $('.ctlg-nav'),
  state: false,
  init: function() {

    let $parent = $('.ctlg-nav-m'),
        h = $parent.find('.ctlg-nav-m__list').height(),
        $subnav = $('.ctlg-nav-s__list'),
        $trigger = $('.ctlg-nav-m__item');
    
    $parent.css('min-width', catalogue.$toggle.outerWidth() + 2)
    
    this.$navTrigger.on('click mouseenter mouseleave', function(event) {
      let $this = $(this);

      function isLink() {
        if($this.find('.ctlg-nav-s').length>0 && $(event.target).closest('.ctlg-nav-s').length==0) {
          return false;
        } else {
          return true;
        }
      }

      if(event.type=='mouseenter' && device.desktop()) {
        $(this).addClass('active');
      } else if(event.type=='mouseleave' && device.desktop()) {
        catalogue.$navTrigger.removeClass('active');
      } 

    })

    catalogue.$toggle.on('mouseenter mouseleave', function(event) {
      if(device.desktop() && event.type=='mouseenter') {
        catalogue.open();
      } else if(device.desktop() && event.type=='mouseleave') {
        catalogue.close();
      }
    })
    $parent.on('mouseenter mouseleave', function(event) {
      if(device.desktop() && event.type=='mouseenter') {
        catalogue.open();
      } else if(device.desktop() && event.type=='mouseleave') {
        catalogue.close();
      }
    })

  },
  open: function() {
    catalogue.state=true;
    catalogue.$toggle.addClass('active');
    catalogue.$nav.addClass('active');
  }, 
  close: function() {
    catalogue.state=false;
    catalogue.$toggle.removeClass('active');
    catalogue.$nav.removeClass('active');
    catalogue.$navTrigger.removeClass('active');
  }
}