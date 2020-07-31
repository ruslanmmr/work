lazySizes.cfg.init = false;

$(document).ready(function(){
  hoverTouchEvents();
  toggle();
  nav();
  searchToggle();
  mobileCatalogue();
  desktopCatalogue();
  header();
  up();
  jsRange();
  customScroll();
  mobileFilter();
  inputs.init();
  select.init();
  cardSlider();
  //обработать изображения после инициализации слайдеров
  setTimeout(()=>{
    lazy();
  },500)
})

const brakepoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200
}


//hover/touch custom events
function hoverTouchEvents() {
  let targets = 'a, button, label, input, textarea, .selectric, .selectric-items li, .js-touch-hover'
  $(document).on('mouseenter mouseleave touchstart touchend mousedown mouseup', targets, function(event) {
    let $target = $(this);

    //mobile events
    if(!device.desktop()) {
      if(event.type=='touchstart') {
        $target.addClass('touch');
      } 
      else if(event.type=='touchend') {
        $target.removeClass('touch');
      }
    } 
    //desktop events
    else {
      
      if(event.type=='mouseenter') {
        $target.addClass('hover');
      } 
      else if(event.type=='mousedown') {
        $target.addClass('mousedown');
      } 
      else if(event.type=='mouseup') {
        $target.removeClass('mousedown');
      } 
      else {
        $target.removeClass('hover');
        $target.removeClass('mousedown');
      }

    }  
  })
}

function lazy() {
  //lazyloading
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

function toggle() {
  let $section = $('.toggle-section'),
      $toggle = $('.toggle-section__head');
  
  $toggle.on('click', function() {
    $(this).parent($section).toggleClass('active');
    check();
  })   

  function check() {
    $section.each(function(){
      if($(this).hasClass('active')) {
        $(this).children('.toggle-section__content').show();
      } else {
        $(this).children('.toggle-section__content').hide();
      }
    })
  }
  check();
}

function nav() {
  let $open = $('.nav-open'),
      $close = $('.nav-close'),
      $nav = $('.mobile-nav'),
      $overlay = $('.mobile-nav__overlay'),
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
  $overlay.on('click touchstart', function(event){
    event.preventDefault();
    if(state) {
      close();
    } 
  })

  function open() {
    state = true;
    scrollLock.disablePageScroll();
    $('header').addClass('header_nav-active')
    $nav.addClass('active');
  }

  function close() {
    state = false;
    scrollLock.enablePageScroll();
    $('header').removeClass('header_nav-active')
    $nav.removeClass('active');
  }
}

function searchToggle() {
  let $open = $('.header__button-search'),
      $close = $('.header__search-close'),
      $search = $('.header__search');

  $open.on('click', function(event) {
    event.preventDefault();
    $search.addClass('active');
  })
  $close.on('click', function(event) {
    event.preventDefault();
    $search.removeClass('active');
  })
}

function mobileCatalogue() {
  let $catalogueToggle = $('.mobile-nav__catalogue-toggle'),
      $catalogue = $('.mobile-catalogue'),
      $close = $('.mobile-catalogue-section__head'),
      $sectionOpen = $('.mobile-catalogue-section__link');

  $catalogueToggle.on('click', function(event) {
    event.preventDefault();
    $catalogue.addClass('active');
  })

  $close.on('click', function(event) {
    event.preventDefault();
    let $parent = $(this).closest('.mobile-catalogue-section');
    $parent.removeClass('active');
  })

  $sectionOpen.on('click', function(event) {
    let index = $(this).parent().index();
    let $target = $(this).parents('.mobile-catalogue-section').find('.mobile-catalogue-section').eq(index);
    if($target.length) {
      event.preventDefault();
      $target.addClass('active');
    }
  })

}

function desktopCatalogue() {
  let $toggle = $('.catalogue-toggle-btn'),
      $navTrigger = $('.desktop-catalogue__item'),
      $nav = $('.desktop-catalogue'),
      $lists = $('.desktop-catalogue__sub-list'),
      state = false;

  $lists.each(function(index) {
    let $list = $(this),
        $links = $(this).find('.desktop-catalogue__sub-link'),
        w = 210;

    function resize() {
      $list.width(210);
      let height = $list.height(),
          linksHeight = 0,
          rows = 1;
      $links.each(function() {
        linksHeight+=$(this).outerHeight();
        if(linksHeight>height) {
          console.log(height)
          rows++;
          $list.width(w*rows);
          linksHeight = $(this).outerHeight();
        }
      })
    }

    resize();
    $(window).on('resize', function() {
      resize();
    })
  })

  $toggle.add($nav).on('mouseenter mouseleave', function(event) {
    if(event.type=='mouseenter') {
      open();
    } else if(event.type=='mouseleave') {
      close();
    }
  })

  $navTrigger.on('mouseenter mouseleave', function(event) {
    let $this = $(this);

    if(event.type=='mouseenter') {
      $this.addClass('active');
    } else if(event.type=='mouseleave') {
      $this.removeClass('active');
    } 
  })

  $lists.on('mouseenter mouseleave', function(event) {
    let $link = $(this).siblings('.desktop-catalogue__link');
    if(event.type=='mouseenter') {
      $link.addClass('active');
    } else if(event.type=='mouseleave') {
      $link.removeClass('active');
    } 
  })


  function open() {
    state=true;
    $toggle.addClass('active');
    $nav.addClass('active');
  }
  function close() {
    state=false;
    $toggle.removeClass('active');
    $nav.removeClass('active');
  }
}

function header() {
  let $header = $('.header'), 
      height,
      scroll;

  padding();
  check();

  $(window).scroll(function() {
    check();
  });
  $(window).resize(function() {
    padding();
  });

  function padding() {
    $('.content').css('padding-top', $header.height());
  }

  function check() {
    scroll = $(window).scrollTop();
    height = $header.height();

    if(scroll>height){
      $header.addClass('fixed');
    } else {
      $header.removeClass('fixed');
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

let inputs = {
  init: function() {

    $(document).on('change input', 'input', function(event) {
      let $target = $(this);
      if($target.hasClass('num-only')) {
        $target.val( $target.val().replace(/\D/, '') )
      }
    })
    
  }
}

function cardSlider() {
  let $slider = $('.item-card-slider'),
      $navslider = $('.item-card-nav-slider');
      
  if($slider.length) {

    $slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: $navslider
    });
    $navslider.slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      asNavFor: $slider,
      focusOnSelect: true,
      arrows: true,
      nextArrow: '<button type="button" class="slider__arrow slider__next"><i class="fas fa-angle-right"></i></button>',
      prevArrow: '<button type="button" class="slider__arrow slider__prev"><i class="fas fa-angle-left"></i></button>',
      responsive: [
        {
          breakpoint: brakepoints.xs,
          settings: {
            slidesToShow: 3
          }
        }
      ]
    });

  }
}

//select
let select = {
  init: function() {
    this.items = $('.select');
    if(this.items.length) {
      this.items.selectric({
        disableOnMobile: false,
        nativeOnMobile: false,
        arrowButtonMarkup: '<span class="icon"></span>'
      });
    }
  }
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

function jsRange() {
  let $range = $('.filter-range');

  $range.each(function() {
    let $this = $(this),  
        $rangeItem = $this.find('.js-range'),
        $inputFrom = $this.find(".filter-range__input-from"),
        $inputTo = $this.find(".filter-range__input-to"),
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