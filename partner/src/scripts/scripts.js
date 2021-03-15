const brakepoints = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1600
}
const $body = document.body;
const $wrapper = document.querySelector('.wrapper');
const $header = document.querySelector('.header');

const slider_arrow = 'M27,40c-0.1,0-0.3-0.1-0.4-0.2L12.8,20.5c-0.2-0.3-0.2-0.6,0-0.9L26.6,0.2c0.2-0.3,0.4-0.3,0.6,0c0.2,0.3,0.2,0.6,0,0.9L13.7,20l13.6,18.9c0.2,0.3,0.2,0.6,0,0.9C27.3,39.9,27.1,40,27,40z';

$(document).ready(function(){
  lazySizes.init();
  TouchHoverEvents.init();
  Nav.init();
  Header.init();
  Modal.init();
  ScrollLinks.init();
  inputs();
  gallery();
  toggle();

  if(mobile()) {
    mobileScreenSize.init();
  }

  let $stock_slider = document.querySelector('.stock-section__slider');
  if($stock_slider) new StockSlider($stock_slider).init();
  
  let $about_slider = document.querySelector('.about-section__slider');
  if($about_slider) new AboutSlider($about_slider).init();
})

const TouchHoverEvents = {
  targets: 'a, button, label, .js-touch-hover',
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
        for(let $target of $targets) $target.setAttribute('data-touch', '');
      }
    } 
    //touchend
    else if(event.type=='touchend' || (event.type=='contextmenu' && this.touched)) {
      this.timeout = setTimeout(() => {this.touched = false}, 500);
      if($targets[0]) {
        setTimeout(()=>{
          for(let $target of $targets) {
            $target.dispatchEvent(new CustomEvent("customTouchend"));
            $target.removeAttribute('data-touch');
          }
        }, this.touchEndDelay)
      }
    } 
    //mouseenter
    if(event.type=='mouseenter' && !this.touched && $targets[0] && $targets[0]==event.target) {
      $targets[0].setAttribute('data-hover', '');
    }
    //mouseleave
    else if(event.type=='mouseleave' && !this.touched && $targets[0] && $targets[0]==event.target) {
      $targets[0].removeAttribute('data-focus');
      $targets[0].removeAttribute('data-hover');
    }
    //mousedown
    if(event.type=='mousedown' && !this.touched && $targets[0]) {
      $targets[0].setAttribute('data-focus', '');
    } 
    //mouseup
    else if(event.type=='mouseup' && !this.touched  && $targets[0]) {
      $targets[0].removeAttribute('data-focus');
    }
  }
}

//check device
function mobile() {
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    return true;
  } else {
    return false;
  }
}

function inputs() {
  let $elements = document.querySelectorAll('input, textarea');
  $elements.forEach(($input) => {
    $input.addEventListener('focus', () => {
      $input.parentNode.classList.add('focused');
    })
    $input.addEventListener('blur', () => {
      let value = $input.value;
      if (validate.single(value, {presence: {allowEmpty: false}}) !== undefined) {
        $input.value = '';
        $input.parentNode.classList.remove('focused');
      }
    })
  })
}

function gallery() {
  $.fancybox.defaults.i18n.ru = {
    CLOSE       : 'Закрыть',
    NEXT        : 'Следующий слайд',
    PREV        : 'Предидущий слайд',
    ERROR       : 'Ошибка загрузки, попробуйте позже',
    PLAY_START  : 'Запустить слайд-шоу',
    PLAY_STOP   : 'Остановить слайд-шоу',
    FULL_SCREEN : 'Полноэкранный режим',
    THUMBS      : 'Миниатюры',
    DOWNLOAD    : 'Загрузить',
    SHARE       : 'Поделиться',
    ZOOM        : 'Увеличить'
  };
  $.fancybox.defaults.lang = 'ru';
  $.fancybox.defaults.loop = false;
  $.fancybox.defaults.autoFocus = false;
  $.fancybox.defaults.backFocus = false;
  $.fancybox.defaults.hideScrollbar = false;
  $.fancybox.defaults.animationDuration = 500;

  $(document).on('beforeShow.fb', function() {
    scrollLock.disablePageScroll();
  });
  $(document).on('afterClose.fb', function() {
    scrollLock.clearQueueScrollLocks();
    scrollLock.enablePageScroll();
  });

  $(document).on('click', '.splide__slide [data-gallery]', function() {
    let $selector = $(this).parents('.splide').find('.splide__slide:not(.splide__slide--clone) [data-gallery]');
    $.fancybox.open($selector, {
        selector: $selector,
        backFocus: false
    }, $selector.index(this));
    return false;
  });

}

function toggle() {
  let $section = $('.toggle-section'),
      speed = 250;

  $section.each(function() {
    let $this = $(this),
        $toggle = $this.find('.toggle-section__trigger'),
        $content = $this.find('.toggle-section__content'),
        $close = $this.find('.toggle-section__close'),
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
        if(!TouchHoverEvents.touched) {
          if(timeout) clearTimeout(timeout);
          state=true;
          check();
        }
      })

      $toggle.add($content).on('mouseleave', function(event){
        if(!TouchHoverEvents.touched) {
          state=false;
          check();
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
        if($this.is('[data-fix]')) {
          scrollLock.disablePageScroll();
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
        if($this.is('[data-fix]')) {
          scrollLock.enablePageScroll();
        }
      }
    }

    check();

    initialized=true;
  })
}

const Header = {
  init: function () {
    let old_scroll = 0;
    let old_flag;

    this.check = ()=> {
      let y = window.pageYOffset,
          h = window.innerHeight,
          fixed = $header.classList.contains('header_fixed'),
          hidden = $header.classList.contains('header_hidden');

      if(y > 0 && !fixed) {
        $header.classList.add('header_fixed');
      } else if(y<=0 && fixed) {
        $header.classList.remove('header_fixed');
      }

      if(!Nav.state) {
        if(ScrollLinks.inscroll || old_scroll<y) {
          old_flag = y;
          if((ScrollLinks.inscroll || y>h) && !hidden) {
            $header.classList.add('header_hidden');
          }
        } 
        if(old_scroll>y) {
          if(hidden && (y<h || y+100<old_flag)) {
            $header.classList.remove('header_hidden');
          }
        }
        old_scroll = y;
      }
    }

    this.check();
    window.addEventListener('scroll', ()=> {
      this.check();
    })
  }
}

const Nav = {
  init: function() {
    this.$nav = document.querySelector('.nav');
    this.$toggle = document.querySelector('.nav-toggle');

    this.$toggle.addEventListener('click', ()=>{
      if(!this.state) {
        this.open();
      } else {
        this.close();
      }
    })

    document.addEventListener('touchstart', (event)=> {
      let $block = event.target.closest('.nav__container, .nav-toggle');
      if(this.state && !$block) {
        this.close();
      }
    })

    window.addEventListener('resize', ()=>{
      if(window.innerWidth>=brakepoints.lg && this.state) {
        this.close();
      }
    })
  },
  open: function() {
    this.state = true;
    this.$nav.classList.add('active');
    this.$toggle.classList.add('active');
    scrollLock.disablePageScroll();
  },
  close: function() {
    this.$nav.classList.remove('active');
    this.$toggle.classList.remove('active');
    setTimeout(() => {
      this.state = false;
      scrollLock.enablePageScroll();
    }, 500);
  }
}

const Modal = {
  init: function () {
    this.$modals = document.querySelectorAll('.modal');

    document.addEventListener('click', (event) => {
      let $open = event.target.closest('[data-modal="open"]'),
        $close = event.target.closest('[data-modal="close"]'),
        $wrap = event.target.closest('.modal'),
        $block = event.target.closest('.modal-block');

      //open
      if($open) {
        event.preventDefault();
        let $modal = document.querySelector(`${$open.getAttribute('href')}`);
        this.open($modal);
      }
      //close 
      else if($close || (!$block && $wrap)) {
        this.close();
      }
    })

    //this.open(document.querySelector('#modal-form'));
  },

  open: function($modal) {
    if($modal) {
      let play = () => {
        this.$active = $modal;
        scrollLock.disablePageScroll();
        $modal.classList.add('active');
      }
      if (this.$active) this.close(play);
      else play();
    }
  },
  close: function(callback) {
    if(this.$active) {
      this.$active.classList.remove('active');
      setTimeout(() => {
        delete this.$active;
        scrollLock.enablePageScroll();
        if (callback) callback();
      }, 500);
    }
  }
}

const ScrollLinks = {
  init: function() {
    let $buttons = document.querySelectorAll('[data-scroll-link]'),
        $sections = document.querySelectorAll('[data-scroll-block]'),
        $oldLink = false;

    //click
    $buttons.forEach(($this)=>{
      $this.addEventListener('click', (event)=>{
        event.preventDefault();
        let $block = document.querySelector(`${$this.getAttribute('href')}`);
        if($block) {
          this.inscroll = true;
          if($oldLink) $oldLink.classList.remove('active');
          $this.classList.add('active');
          $oldLink = $this;
          if(Nav.state) {
            Nav.close();
          }
          //scroll
          $('html, body').animate({scrollTop: $($block).offset().top}, 600);
          setTimeout(() => {this.inscroll = false}, 600);
        }
      })
    })

    let check = ()=> {
      if(!this.inscroll) {

        let position = window.pageYOffset,
            y = position + window.innerHeight/2,
            $activelinks = [];

        $sections.forEach(($section)=>{
          let top = $section.getBoundingClientRect().y + position,
              bottom = top + $section.getBoundingClientRect().height;
          if (y >= top && y <= bottom) {
            $buttons.forEach(($button)=>{
              let attr = $button.getAttribute('href'),
                  id = '#'+$section.getAttribute('id');
              if(attr==id) {
                $activelinks.push($button);
              }
            })
          } 
        })

        $buttons.forEach($button=>{
          $button.classList.remove('active');
        })
        $activelinks.forEach($active => {
          $active.classList.add('active');
        });

      }
    }

    check();
    window.addEventListener('scroll', ()=>{
      check();
    })
    window.addEventListener('resize', ()=>{
      check();
    })
  }
}

class StockSlider {
  constructor($block) {
    this.$block = $block
  }

  init() {

    this.slider = new Splide(this.$block, {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      arrows: true,
      pagination: false,
      waitForTransition: false,
      gap: 24,
      arrowPath: slider_arrow,
      speed: 500,
      autoplay: true,
      interval: 7000,
      breakpoints: {
        767: {
          perPage: 2,
          arrows: false,
          pagination: true
        },
        575: {
          perPage: 1,
          pagination: true
        },
      }
    })

    this.slider.mount();

  }
}

class AboutSlider {
  constructor($block) {
    this.$block = $block
  }

  init() {

    this.slider = new Splide(this.$block, {
      type: 'loop',
      perPage: 1,
      perMove: 1,
      arrows: true,
      pagination: false,
      waitForTransition: false,
      gap: 24,
      updateOnMove: true,
      arrowPath: slider_arrow,
      speed: 500,
      breakpoints: {
        1023: {
          pagination: true,
          arrows: false
        },
        575: {
          pagination: true
        },
      }
    })

    this.slider.mount();

  }
}

const mobileScreenSize = {
  init: function() {
    let $el = document.createElement('div');
    $el.style.cssText = 'position:fixed;height:100%;';
    $body.insertAdjacentElement('beforeend', $el);
    let h = $el.getBoundingClientRect().height;
    $el.remove();
    
    //screen
    let $screen = document.querySelector('.screen');
    $screen.style.height = `${h}px`;
  }
}