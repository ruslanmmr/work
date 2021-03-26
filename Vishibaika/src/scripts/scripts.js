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

//check device
function mobile() {
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    return true;
  } else {
    return false;
  }
}

window.onload = function(){
  TouchHoverEvents.init();
  Modal.init();
  Mask.init();
  gallery();
  if(mobile()) {
    //windowSize.init();
  }

  //slider
  let $reviews_slider = document.querySelector('.reviews-section__slider');
  if($reviews_slider) new ReviewsSlider($reviews_slider).init();

  //parallax
  if(!mobile() && window.innerWidth>=brakepoints.lg) {
    new Rellax('.rellax');
  }

  //show page
  $body.classList.add('loaded');
}

const TouchHoverEvents = {
  targets: 'a, button, label, tr, .js-touch-hover',
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

const Mask = {
  init: function() {
    let $inputs = document.querySelectorAll('[data-phone]');
    if($inputs.length) {
      Inputmask({
        mask: "+7 (999) 999-99-99",
        showMaskOnHover: false,
        clearIncomplete: false
      }).mask($inputs);
    }
  }
}

const windowSize = {
  init: function() {
    let $el = document.createElement('div');
    $el.style.cssText = 'position:fixed;height:100%;';
    $body.insertAdjacentElement('beforeend', $el);
    let h = $el.getBoundingClientRect().height;
    
    let check = ()=> {
      //screen
      let $el = document.querySelectorAll('.screen');
      $el.forEach($this => {
        $this.style.height = `${h}px`;
      })
    }

    check();
  }
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
}

class ReviewsSlider {
  constructor($block) {
    this.$block = $block
  }

  init() {
    this.slider = new Splide(this.$block, {
      type: 'loop',
      perMove: 1,
      focus: 'center',
      autoWidth: true,
      arrows: true,
      pagination: true,
      updateOnMove: true,
      waitForTransition: false,
      gap: 20,
      speed: 500,
      //autoplay: true,
      //interval: 7000
    })

    this.slider.mount();

  }
}