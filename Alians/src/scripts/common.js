lazySizes.cfg.init = false;
const brakepoints = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1200
}

$(document).ready(function(){
  TouchHoverEvents.init();
  Nav.init();
  Slider.init();
  select.init();
  popup.init();
  lazy();
  toggle();
  validation();
})

//hover/touch custom events
const TouchHoverEvents = {
  targets: 'a[class], button, label, tr, .jsTouchHover',
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
        if(!TouchHoverEvents.touched) {
          if(timeout) clearTimeout(timeout);
          state=true;
          check();
        }
      })

      $toggle.add($content).on('mouseleave', function(event){
        if(!TouchHoverEvents.touched) {
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

const Nav = {
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
    scrollLock.disablePageScroll();
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
  }
}

const Slider = {
  arrow: '<svg fill="currentColor" class="icon" viewBox="0 0 32 22" id="arrow"><path d="M32 11c0-.3-.1-.5-.3-.7L21.8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l8.2 8.3H1c-.6 0-1 .5-1 1s.4 1 1 1h27.6l-8.2 8.3c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0l9.9-10c.2-.2.3-.4.3-.7z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',
  init: function() {
    this.el = $('.slider');
    this.el.each(function() {
      let slideCount = 1,
          slideCountLg = 1,
          slideCountMd = 1,
          slideCountSm = 1,
          slideCountXs = 1,
          arrows = false,
          dots = false,
          centerMode = false,
          autoplay = false,
          nextArrow = `<button type="button" class="slider__next">${Slider.arrow}</button>`,
          prevArrow = `<button type="button" class="slider__prev">${Slider.arrow}</button>`;
      
      
      if($(this).is('.slider_4n')) {
        slideCount = 4;
        slideCountLg = 3;
        slideCountMd = 3;
        slideCountSm = 2;
        slideCountXs = 2;
        arrows = true;
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

window.popup = {
  init: function() {
    this.$trigger = $('[data-popup-open]');
    this.$close = $('[data-popup-close]')

    this.$trigger.on('click', function(event) {
      event.preventDefault();
      let $popup = $($(this).attr('href'));
      if($popup.length) {
        popup.open($popup);
      }
    })

    $(document).on('click', function(event) {
      let $target = $(event.target);
      if(
        ($target.closest(popup.$close).length) ||
        ($target.closest('.popup').length && $target.closest('.popup-block__container').length==0)
      ) 
      {
        event.preventDefault();
        let $popup = $target.closest('.popup').length ? $target.closest('.popup') : $('.city-question-popup');
        popup.close($popup);
      }
    })

  }, 
  open: function($popup) {
    let event = () => {
      this.active = $popup;
      scrollLock.disablePageScroll();
      $popup.addClass('active');
    }

    if(this.active) {
      popup.close(this.active, function() {
        event();
      });
    } else {
      event();
    }

  }, 
  close: function($popup, callback) {
    scrollLock.enablePageScroll();
    $popup.removeClass('active');
    setTimeout(()=>{
      this.active = undefined;
      typeof callback === 'function' && callback();
    }, 250)
  }
}


function validation() {
  let $form = $('.js-validation');
      
  let namspaces = {
    phone: '.input_phone',
    email: '[name="email"]',
    name: '[name="name"]',
    message: '[name="message"]',
    review: '[name="review"]'
  },
  conditions = {
    phone: {
      format: {
        pattern: /^\+7 \d{3}\ \d{3}\-\d{4}$|()/,
        message: '^Некорректный номер телефона'
      },
      presence: {
        allowEmpty: false,
        message: '^Введите номер телефона'
      }
    },
    email: {
      presence: {
        allowEmpty: false,
        message: '^Введите ваш email'
      },
      email: {
        message: '^Неправильный формат'
      }
    },
    name: {
      presence: {
        allowEmpty: false,
        message: '^Вы не указали ваше имя'
      },
      length: {
        minimum: 2,
        tooShort: "^Имя слишком короткое",
        maximum: 20,
        tooLong: "^Имя слишком длинное"
      }
    },
    message: {
      presence: {
        allowEmpty: false,
        message: '^Введите ваше сообщение'
      },
      length: {
        minimum: 10,
        tooShort: "^Сообщение слишком короткое",
        maximum: 200,
        tooLong: "^Сообщение слишком длинное"
      }
    },
    review: {
      presence: {
        allowEmpty: false,
        message: '^Напишите ваш отзыв'
      },
      length: {
        minimum: 10,
        tooShort: "^Отзыв слишком короткий (минимум %{count} символов)",
        maximum: 200,
        tooLong: "^Отзыв слишком длинный (максимум %{count} символов)"
      }
    }
  },
  mask = Inputmask({
    mask: "+7 999 999-9999",
    showMaskOnHover: false,
    clearIncomplete: false
  }).mask(namspaces.phone);

  //validation events
  $form.each(function() {
    let $form = $(this),
        $inputs = $form.find('input, textarea');

    $inputs.on('input', function() {
      validateForm($(this));
    })
    

    function validateForm($input) {
      let values = {};
      let constraints = {};

      $inputs.each(function() {
        let $input = $(this);
        for(let key in namspaces) {
          if($input.is(namspaces[key]) && $(this).is('.required')) {
            values[key] = $input.val();
            constraints[key] = conditions[key];
          }
        }
      })

      let resault = validate(values, constraints);
      

      if(resault!==undefined) {
        if($input!==undefined) {
          let flag=true;
          for(let key in resault) {
            
            if($input.is(namspaces[key]) && $input.is('.required')) {
              flag=false;
            }
          }
          if(flag) {
            $input.removeClass('error');
            $input.parent().find('.input__message').remove();
          }
        } else {
          $inputs.removeClass('error');
          $inputs.parent().find('.input__message').remove();
          for(let key in resault) {
            $inputs.each(function() {
              let $input = $(this);
              if($input.is(namspaces[key]) && ($input.hasClass('required') || $input.hasClass('filled'))) {
                $input.addClass('error');
                $input.parent().append(`<span class="input__message">${resault[key][0]}</span>`);
              }
            })
          }
        }
        return false;
      } else {
        $inputs.removeClass('error');
        $inputs.parent().find('.input__message').remove();
        return true;
      }
    }

    $form.on('submit', function(event) {
      event.preventDefault();
      
      if(validateForm()) {
        //submit
      }
    })

  })
}