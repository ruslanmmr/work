lazySizes.cfg.init = false;
const brakepoints = {
  xs: 576,
  sm: 768,
  md: 1024,
  lg: 1200
}

$(document).ready(function(){
  TouchHoverEvents.init();
  select.init();
  header.init();
  slider.init();
  toggle();
  nav();
  up();
  jsRange();
  customScroll();
  mobileFilter();
  calculator();
  setTimeout(()=>{
    lazy();
  },500)
})

//hover/touch custom events
const TouchHoverEvents = {
  targets: 'a[class], button, label, tr, .jsTouchHover, .js-3d-object',
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
    else if(event.type=='touchend' || (event.type=='contextmenu' && this.touched)) {
      this.timeout = setTimeout(() => {this.touched = false}, 500);
      if($targets[0]) {
        setTimeout(()=>{
          for(let $target of $targets) {
            $target.dispatchEvent(new CustomEvent("customTouchend"));
            $target.classList.remove('touch');
          }
        }, this.touchEndDelay)
      }
    } 
    
    //mouseenter
    if(event.type=='mouseenter' && !this.touched && $targets[0] && $targets[0]==event.target) {
      $targets[0].classList.add('hover');
    }
    //mouseleave
    else if(event.type=='mouseleave' && !this.touched && $targets[0] && $targets[0]==event.target) {
      $targets[0].classList.remove('hover', 'focus');
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
function up() {
  let $btn = $('.js-up');

  $(window).on('scroll', function() {
    let scroll = $(window).scrollTop();
    if(scroll>$('.header').height()) {
      $btn.addClass('active');
    } else {
      $btn.removeClass('active');
    }
  })

  $btn.on('click', function(event) {
    event.preventDefault();
    $("html, body").animate({scrollTop:0}, 300);
  })
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

function toggle() {
  let $section = $('.toggle-section'),
      speed = 250

  $section.each(function() {
    let $this = $(this),
        $toggle = $this.children('.toggle-section__trigger'),
        $content = $this.children('.toggle-section__content'),
        state = $this.hasClass('active') ? true : false,
        height = $content.height(),
        initialized;

    $toggle.on('click', function() {
      state = !state ? true : false;
      check();
    })
    
    if($this.is('[data-hover]')) {
      let timeout;
      
      $toggle.add($content).on('mouseenter', function(event){
        if(!TouchHoverEvents.touched) {
          if(timeout) clearTimeout(timeout);
          state=true;
          check();
        }
      })

      $toggle.add($content).on('mouseleave', function(event){
        if(!TouchHoverEvents.touched) {
          let delay;
          if($this.is('[data-no-delay]')) {
            delay=0;
          } else if($(this).is($toggle)) {
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
          if($content.is('.scrollbar')) {
            $content.height(height);
          }
          $content.slideDown(speed);
        }
      } 
      else {
        $this.add($toggle).add($content).removeClass('active');
        if($this.is('[data-slide]')) {
          if(initialized) {
            if($content.is('.scrollbar')) {
              height = $content.height();
            }
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

let header = {
  init: function() {
    this.el = $('.header');
    this.height = this.el.height();
    this.isFixed = false;
    this.scroll = $(window).scrollTop();

    this.checkFixed();

    $(window).scroll(()=>{
      this.scroll = $(window).scrollTop();
      this.checkFixed();
    });
  },
  checkFixed: function() {
    if (this.scroll>this.height && !this.isFixed){
      this.isFixed = true;
      this.el.addClass('header_fixed');
    } else if(this.scroll<=this.height-56 && this.isFixed) {
      this.isFixed = false;
      this.el.removeClass('header_fixed');
    }
  }
}

function nav() {
  let $open = $('.nav-open'),
      $close = $('.mobile-nav__close'),
      $nav = $('.mobile-nav'),
      $container = $('.mobile-nav__block'),
      state;
      
  $open.on('click', function(event){
    event.preventDefault();
    if(!state) {
      open();
    } 
  })
  $close.on('click', function(event){
    event.preventDefault();
    if(state) {
      close();
    } 
  })
  $nav.on('touchstart', function(event){
    if(state && (($(event.target).closest($container).length==0 && event.type=='touchstart'))){
      close();
    } 
  })

  function open() {
    state = true;
    scrollLock.disablePageScroll();
    $nav.addClass('active');
  }

  function close() {
    state = false;
    scrollLock.enablePageScroll();
    $nav.removeClass('active');
  }
}

function jsRange() {
  let $range = $('.filter-range');

  $range.each(function() {
    let $this = $(this),  
        $rangeItem = $this.find('.js-range'),
        $inputFrom = $this.find(".filter-range__input-from input"),
        $inputTo = $this.find(".filter-range__input-to input"),
        instance,
        min = +$rangeItem.attr('data-min'),
        max = +$rangeItem.attr('data-max'),
        from, to;

    $rangeItem.ionRangeSlider({
      skin: "round",
      type: "double",
      min: min,
      max: max,
      from: min,
      to: max,
      onStart: updateInputs,
      onChange: updateInputs,
      onFinish: updateInputs
    });
    instance = $rangeItem.data("ionRangeSlider");
    
    function updateInputs (data) {
        from = data.from;
        to = data.to;
    
        $inputFrom.prop("value", from);
        $inputTo.prop("value", to);
    }
    
    $inputFrom.on("change", function () {
        var val = $(this).prop("value");
    
        // validate
        if (val < min) {
            val = min;
        } else if (val > to) {
            val = to;
        }
    
        instance.update({
            from: val
        });
    
        $(this).prop("value", val);
    
    });
    
    $inputTo.on("change", function () {
        var val = $(this).prop("value");
        //console.log(val, max)
    
        // validate
        if (val < from) {
          val = from;
        } else if (val > max) {
          val = max;
        }
    
        instance.update({
            to: val
        });
        $(this).prop("value", val);
    });

  })
}

function customScroll() {
  let $containers = document.querySelectorAll('.scrollbar');
  if(device.desktop()) {
    $containers.forEach(($target)=>{
      let $parent = $($target),
          $content = $parent.find('.scrollbar__content'),
          simpleBar = new SimpleBar($target);
      
      simpleBar.getScrollElement().addEventListener('scroll', function() {
        gradientCheck();
      });
      gradientCheck();
    
      function gradientCheck() {
        let scrollHeight = $content.outerHeight() - $parent.outerHeight(),
            scroll = $parent.offset().top - $content.offset().top;

        if(scroll > 0) {
          $parent.removeClass('scrollbar_start')
        } else {
          $parent.addClass('scrollbar_start')
        }
        if(scroll < scrollHeight) {
          $parent.removeClass('scrollbar_end')
        } else {
          $parent.addClass('scrollbar_end')
        }
      }

    })
  } else {
    $containers.forEach(($this)=>{
      $this.classList.add('scrollbar_mobile');
    })
  }
}

function mobileFilter() {
  let $open = $('.catalogue-filter-toggle'),
      $close = $('.filter__close'),
      $filter = $('.filter'),
      state;

  $open.on('click', function(event) {
    event.preventDefault();
    open();
  })
  $close.on('click', function(event) {
    event.preventDefault();
    close();
  })
  $(document).on('click touchstart', function(event) {
    let $target = $(event.target);
    if($target.closest($filter).length && !$target.closest('.filter__wrap').length && state) {
      close();
    }
  })

  function open() {
    state=true;
    scrollLock.disablePageScroll();
    $filter.addClass('active');
  }
  function close() {
    state=false;
    scrollLock.enablePageScroll();
    $filter.removeClass('active')
  }
}

window.slider = {
  arrowPrev: '<i class="fas fa-chevron-left"></i>',
  arrowNext: '<i class="fas fa-chevron-right"></i>',
  init: function init() {
    this.el = $('.slider').not('.slick-initialized');
    slider.el.each(function () {
      var slideCount = 1,
          slideCountLg = 1,
          slideCountMd = 1,
          slideCountSm = 1,
          slideCountXs = 1,
          arrows = false,
          dots = false,
          centerMode = false,
          autoplay = false;

      if($(this).is('.products-slider')) {
        slideCount = 5;
        slideCountLg = 4;
        slideCountMd = 3;
        slideCountSm = 2;
        slideCountXs = 2;
        dots = true;
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
          autoplaySpeed: 3000,
          responsive: [{
            breakpoint: brakepoints.lg,
            settings: {
              slidesToShow: slideCountLg,
              slidesToScroll: slideCountLg
            }
          }, {
            breakpoint: brakepoints.md,
            settings: {
              slidesToShow: slideCountMd,
              slidesToScroll: slideCountMd
            }
          }, {
            breakpoint: brakepoints.sm,
            settings: {
              slidesToShow: slideCountSm,
              slidesToScroll: slideCountSm
            }
          }, {
            breakpoint: brakepoints.xs,
            settings: {
              slidesToShow: slideCountXs,
              slidesToScroll: slideCountXs
            }
          }]
        });
      } 


      if ($(this).is('.product-slider')) {
        $(this).slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          prevArrow: `<a href='javascript:void(0);' class="product-slider__arrow product-slider__arrow-prev">${slider.arrowPrev}</a>`,
          nextArrow: `<a href='javascript:void(0);' class="product-slider__arrow product-slider__arrow-next">${slider.arrowNext}</a>`,
          dots: false,
          rows: 0,
          asNavFor: '.product-nav-slider'
        });
      }

      if ($(this).is('.product-nav-slider')) {
        $(this).slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          asNavFor: '.product-slider',
          dots: false,
          arrows: false,
          rows: 0,
          centerMode: true,
          centerPadding: 0,
          focusOnSelect: true,
        });
      }
    });
  }
};

function calculator() {
  var $element = $('.calc-count-block');
  $element.each(function () {
    var $this = $(this),
        $plus = $this.find('.js-plus'),
        $minus = $this.find('.js-minus'),
        $input = $this.find('input'),
        val = +$input.val();
    check();
    $plus.on('click', function () {
      val++;
      check();
      $input.trigger('change');
    });
    $minus.on('click', function () {
      val--;
      check();
      $input.trigger('change');
    });
    $input.on('change input', function () {
      setTimeout(function () {
        val = +$input.val();
        check();
      }, 100);
    });

    function check() {
      if (val < 1 || val == 1) {
        val = 1;
        $minus.addClass('disabled');
      } else {
        $minus.removeClass('disabled');
      }

      $input.val(val);
    }
  });
}