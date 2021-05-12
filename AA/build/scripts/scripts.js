const brakepoints = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1600
}

document.addEventListener('DOMContentLoaded', ()=> {
  new Parallax('[data-parallax]').init();
  new TouchHoverEvents('a, button, [data-touch-hover]').init();
  gallery();
  //scroll
  document.querySelectorAll('a').forEach($this => {
    $this.addEventListener('click', (event)=> {
      let href = $this.getAttribute('href'),
          $target = document.querySelector(href);
      if($target) {
        event.preventDefault();
        let y = $target.getBoundingClientRect().y + window.pageYOffset;
        scrollPage(y, 1);
      }
    })
  })
});

//show page
window.onload = function(){
  document.body.classList.add('loaded');
}

//check device
function mobile() {
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    return true;
  } else {
    return false;
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

function scrollPage(y, speed) {
  let scroll = {y:window.pageYOffset},
      animation, frame;

  animation = gsap.to(scroll, {y:y, duration:speed, ease:'power2.inOut', onComplete:()=>{
    cancelAnimationFrame(frame);
  }})

  let check = ()=> {
    window.scrollTo(0, scroll.y);
    frame = requestAnimationFrame(check);
  }
  check();
}

class TouchHoverEvents {
  constructor(targets) {
    this.targets = targets;
  }
  init() {
    this.touchEndDelay = 100;
    document.addEventListener('touchstart',  (event)=>{this.events(event)});
    document.addEventListener('touchend',    (event)=>{this.events(event)});
    document.addEventListener('mouseenter',  (event)=>{this.events(event)}, true);
    document.addEventListener('mouseleave',  (event)=>{this.events(event)}, true);
    document.addEventListener('mousedown',   (event)=>{this.events(event)});
    document.addEventListener('mouseup',     (event)=>{this.events(event)});
    document.addEventListener('contextmenu', (event)=>{this.events(event)});

    this.events = (event) => {
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
        $targets[0].removeAttribute('data-click');
        $targets[0].removeAttribute('data-hover');
      }
      //mousedown
      if(event.type=='mousedown' && !this.touched && $targets[0]) {
        $targets[0].setAttribute('data-click', '');
      } 
      //mouseup
      else if(event.type=='mouseup' && !this.touched  && $targets[0]) {
        $targets[0].removeAttribute('data-click');
      }
    }
  }
}

class Parallax {
  constructor(targets) {
    this.$targets = document.querySelectorAll(targets);
  }
  init() {
    this.check = ()=> {
      this.$targets.forEach(($this)=>{
        let factor = +$this.getAttribute('data-parallax'),
            val = window.pageYOffset * factor;
        $this.style.transform = `translate3d(0, ${val}px, 0)`;
      })
    }
    window.addEventListener('scroll', ()=> {
      if(!mobile() && window.innerWidth>brakepoints.lg) this.check();
    })
  }
}