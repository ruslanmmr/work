lazySizes.cfg.init = false;

$(document).ready(function(){
  touchHoverEvents();
  lazy();
  toggle();
  select.init();
  header.init();
  nav.init();
  slider.init();

  window.mask = Inputmask({
    mask: "+7 999 999-9999",
    showMaskOnHover: false,
    clearIncomplete: false
  }).mask('.input__phone');
})

const brakepoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200
}


const TouchHoverEvents = {
  targets: 'a, button, label, tr, .jsTouchHover, .js-3d-object',
  touched: false,
  touchEndDelay: 100, //ms
  init: function() {
    document.addEventListener('touchstart',  (event)=>{this.events(event)});
    document.addEventListener('touchend',    (event)=>{this.events(event)});
    document.addEventListener('mouseenter',  (event)=>{this.events(event)},true);
    document.addEventListener('mouseleave',  (event)=>{this.events(event)},true);
    document.addEventListener('mousedown',   (event)=>{this.events(event)});
    document.addEventListener('mouseup',     (event)=>{this.events(event)});
    document.addEventListener('contextmenu', (event)=>{this.events(event)});
  },
  events: function(event) {
    let $targets = [];
    $targets[0] = event.target!==document?event.target.closest(this.targets):null;
    let $element = $targets[0], i = 0;

    while($targets[0]) {
      $element = $element.parentNode;
      if($element!==document) {
        if($element.matches(this.targets)) {
          i++;
          $targets[i] = $element;
        }
      } 
      else {
        break;
      }
    }

    //touchstart
    if(event.type=='touchstart') {
      this.touched = true;
      if(this.timeout) clearTimeout(this.timeout);
      if($targets[0]) {
        for(let $target of document.querySelectorAll(this.targets)) $target.classList.remove('touch');
        for(let $target of $targets) $target.classList.add('touch');
      }
    } 
    //touchend
    else if(event.type=='touchend') {
      this.timeout = setTimeout(() => {this.touched = false}, 500);
      if($targets[0]) {
        setTimeout(()=>{
          for(let $target of $targets) $target.classList.remove('touch');
        }, this.touchEndDelay)
      }
    } 
    //context menu
    else if(event.type=='contextmenu') {
      this.touched = false;
      if($targets[0]) {
        for(let $target of $targets) {
          $target.classList.remove('touch');
        }
      }
    } 
    //mouseenter
    if(event.type=='mouseenter' && !this.touched && $targets[0] && $targets[0]==event.target) {
      $targets[0].classList.add('hover');
    }
    //mouseleave
    else if(event.type=='mouseleave' && !this.touched && $targets[0] && $targets[0]==event.target) {
      $targets[0].classList.remove('hover');
      $targets[0].classList.remove('focus');
    }
    //mousedown
    if(event.type=='mousedown' && !this.touched && $targets[0]) {
      $targets[0].classList.add('focus');
    } 
    //mouseup
    else if(event.type=='mouseup' && !this.touched  && $targets[0]) {
      $targets[0].classList.remove('focus');
    }
  }
}

//lazyloading
function lazy() {
  //add backgrounds
  document.addEventListener('lazybeforeunveil', function(e){
    let el = e.target.tagName,
        bg = e.target.getAttribute('data-src');
    if(el!=='IMG') {
      let bg = e.target.getAttribute('data-src');
      e.target.style.backgroundImage = `url('${bg}')`;
    }
  });
  lazySizes.init();
}

//select
let select = {
  init: function() {
    this.items = $('select');
    if(this.items.length) {
      this.items.selectric({
        disableOnMobile: false,
        nativeOnMobile: false,
        arrowButtonMarkup: '<svg class="icon" viewBox="0 0 12 7" xmlns="http://www.w3.org/2000/svg"><path d="M9.72606 -1.19209e-07L11.1403 1.41421L5.57036 6.98453L4.15614 5.57031L9.72606 -1.19209e-07Z"/><path d="M0 1.41421L1.41421 1.19209e-07L6.98434 5.57047L5.57036 6.98453L0 1.41421Z"/></svg>'
      });
    }
  }
}


let header = {
  init: function() {
    this.el = $('.header');
    this.isVisible = true;
    this.isFixed = false;
    this.scroll = $(window).scrollTop();
    this.scroll_last = this.scroll;

    this.checkFixed();

    $(window).scroll(function(){
      //if(!nav.state) {
        header.checkVisible();
      //}
    });
  },
  checkFixed: function() {
    let h = $('.header').height();
    //fix header
    if (this.scroll>0 && !this.isFixed){
      this.isFixed = true;
      this.el.addClass('header_fixed');
    } else if(this.scroll<=0 && this.isFixed) {
      this.isFixed = false;
      this.el.removeClass('header_fixed');
    }
  },
  checkVisible: function() {
    this.scroll = $(window).scrollTop();
    this.checkFixed();
    if (this.scroll>this.scroll_last && this.scroll>$(window).height()/2 && this.isVisible){
      this.isVisible=false;
      this.el.addClass('header_hidden');
    } else if(this.scroll<this.scroll_last && !this.isVisible) {
      this.isVisible=true;
      this.el.removeClass('header_hidden');
    }
    this.scroll_last = this.scroll;
  }
}

let nav = {
  init: function() {
    this.$nav = $('.mobile-nav');
    this.$toggle = $('.nav-toggle');

    this.$toggle.on('click', (event)=>{
      event.preventDefault();
      if(this.flag) {
        this.close();
      } else {
        this.open();
      }
    })
    
    $(document).on('click touchstart', (event)=>{
      if( $(event.target).closest('.mobile-nav__container').length==0 
          && $(event.target).closest('.header').length==0
          && $(event.target).closest(this.$toggle).length==0
          && this.flag==true) {
            this.close(); 
      }
    })

  }, 

  open: function() {
    this.flag = true;
    if(this.timout!==undefined) clearTimeout(this.timout)
    scrollLock.disablePageScroll();
    this.state = true;
    $('header').addClass('header_nav-active')
    this.$nav.addClass('active');
    this.$toggle.addClass('active');
  },

  close: function() {
    this.flag = false;
    scrollLock.enablePageScroll();
    $('header').removeClass('header_nav-active')
    this.$nav.removeClass('active');
    this.$toggle.removeClass('active');
    this.timout = setTimeout(()=>{
      this.state = false;
    }, 250)
  }
}

let slider = {
  el: $('.slider'),
  arrowPrev: '<svg class="icon" viewBox="0 0 10.5 18.1"><path stroke="none" d="M9,0l1.4,1.4L2.8,9l7.6,7.6L9,18.1L0,9C0,9,9.1,0,9,0z"></path></svg>',
  arrowNext: '<svg class="icon" viewBox="0 0 10.5 18.1"><path stroke="none" d="M1.4,18.1L0,16.7l7.6-7.6L0,1.5L1.4,0l9,9.1C10.4,9.1,1.3,18.1,1.4,18.1z"></path></svg>',
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
          autoplay = false,
          nextArrow = `<button type="button" class="button button_style-1 slider__next">${slider.arrowNext}</button>`,
          prevArrow = `<button type="button" class="button button_style-1 slider__prev">${slider.arrowPrev}</button>`;
      
      if($(this).is('.slider_dots')) {
        dots=true;
      } 
      
      if($(this).is('.slider_arrows')) {
        arrows=true;
      }

      if($(this).is('.slider_grid')) {
        arrows=true;
        dots=true;
      } 
      
      if($(this).is('.home-banner')) {
        //autoplay = true;
        nextArrow = `<button class="home-banner__arrow home-banner__next" aria-label="Next" type="button">${slider.arrowNext}</button>`;
        prevArrow = `<button class="home-banner__arrow home-banner__prev" aria-label="Previous" type="button">${slider.arrowPrev}</button>`;
        initSlider($(this));
      }  
      
      else if($(this).is('.photo-slider')) {
        initSlider($(this));
      }
      
      else if($(this).is('.slider_3n')) {
        slideCount = 3;
        slideCountLg = 2;
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
          nextArrow: nextArrow,
          prevArrow: prevArrow,
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


function toggle() {
  let $section = $('.toggle-section'),
      speed = 250;

  $section.each(function() {
    let $this = $(this),
        $toggle = $this.children('.toggle-section__trigger'),
        $content = $this.children('.toggle-section__content'),
        state = $this.hasClass('active') ? true : false,
        initialized;

    $toggle.on('click', function() {
      state = !state ? true : false;
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