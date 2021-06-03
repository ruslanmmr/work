const brakepoints = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1600
}

const $wrapper = document.querySelector('.wrapper');
const $header = document.querySelector('.header');

document.addEventListener("DOMContentLoaded", function() {
  new TouchHoverEvents('a, button, [data-touch-hover]').init();
  toggle();
  scrolling();
  Advantages();
  Nav.init();
  Modal.init();
});

window.onload = function() {
  //show page
  document.body.classList.add('loaded');
}

class TouchHoverEvents {
  constructor(targets) {
    this.targets = targets;
  }
  init() {
    let touchEndDelay = 100; //ms

    let events = (event) => {
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
              $target.removeAttribute('data-touch');
            }
          }, touchEndDelay)
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

    document.addEventListener('touchstart',  events);
    document.addEventListener('touchend',    events);
    document.addEventListener('mouseenter',  events, true);
    document.addEventListener('mouseleave',  events, true);
    document.addEventListener('mousedown',   events);
    document.addEventListener('mouseup',     events);
    document.addEventListener('contextmenu', events);
  }
}

function toggle() {
  let $section = $('.toggle-section'),
      speed = 250;

  $section.each(function() {
    let $this = $(this),
        $toggle = $this.find('.toggle-section__trigger'),
        $content = $this.find('.toggle-section__content'),
        state = $this.hasClass('is-active') ? true : false,
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
        $this.add($content).add($toggle).addClass('is-active');
        if($this.is('[data-slide]')) {
          $content.slideDown(speed);
        }
      } 
      else {
        $this.add($toggle).add($content).removeClass('is-active');
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

function scrolling() {
  let $triggers = document.querySelectorAll('[data-scroll]');
  
  $triggers.forEach($this => {
    $this.addEventListener('click', (event)=> {
      event.preventDefault();
      let href = $this.getAttribute('href'),
          $target = document.querySelector(href);
      if($target) {
        gsap.to(window, {duration:1, scrollTo:href, ease:'power2.inOut'});
        if(Nav.state) {
          Nav.close();
        }
      }
    })
  }) 
}

function Advantages() {
  let $parent = document.querySelector('.section-advantages');
  if($parent) {
    let $cards = document.querySelectorAll('.section-advantages__card'),
      $items = document.querySelectorAll('.section-advantages__item'),
      $items_container = document.querySelector('.section-advantages__content'),
      activeIndex,
      animations = [];

    $items.forEach(($this, index) => {
      let $image = $this.querySelector('.section-advantages__item-image');

      animations[index] = gsap.timeline({paused:true})
        .fromTo($this, {autoAlpha:0}, {autoAlpha:1, duration:0.5, ease:'power2.inOut'})
        .fromTo($image, {scale:0.8}, {scale:1, duration:0.5, ease:'power2.out'}, '-=0.5')
    })

    let resizeEvent = () => {
      let h = $items[activeIndex].getBoundingClientRect().height;
      $items_container.style.height = `${h}px`;
    }

    let changeEvent = (index=0) => {
      if(index!==activeIndex) {
        if(activeIndex!==undefined) {
          $cards[activeIndex].classList.remove('is-active');
          $items[activeIndex].classList.remove('is-active');
          animations[activeIndex].timeScale(1.5).reverse();
        }
        $cards[index].classList.add('is-active');
        $items[index].classList.add('is-active');
        animations[index].timeScale(1).play();
        //height
        let h = $items[index].getBoundingClientRect().height;
        gsap.to($items_container, {css:{height:h}, duration:0.5, ease:'power2.out'});

        activeIndex = index;
      }
    }

    changeEvent();
    window.addEventListener('resize', resizeEvent);
    $cards.forEach(($this, index) => {
      $this.addEventListener('click',      () => { changeEvent(index) });
      $this.addEventListener('mouseenter', () => { changeEvent(index) });
    })
  }
}

const Nav = {
  init: function() {
    this.$element = document.querySelector('.mobile-nav');
    this.$toggle = document.querySelector('.mobile-nav-toggle');

    this.change = ()=> {
      if(!this.state) {
        this.open();
      } else {
        this.close();
      }
    }

    this.$toggle.addEventListener('click', () => {
      this.change();
    })

    this.$element.addEventListener('click', (event) => {
      if(this.state && !event.target.closest('.mobile-nav__content')) {
        this.close();
      }
    })
  },

  open: function() {
    this.state = true;
    this.$element.classList.add('active');
    this.$toggle.classList.add('active');
    scrollLock.disablePageScroll();
  },

  close: function() {
    this.state = false;
    this.$element.classList.remove('active');
    this.$toggle.classList.remove('active');
    scrollLock.enablePageScroll();
  }
}

const Modal = {
  init: function () {
    gsap.registerEffect({
      name: "modal",
      effect: ($modal, $content) => {
        let anim = gsap.timeline({paused: true})
          .fromTo($modal, {autoAlpha: 0}, {autoAlpha:1, duration:0.5, ease:'power2.inOut'})
          .fromTo($content, {y: 20}, {y:0, duration:1, ease:'power2.out'}, `-=0.5`)
        return anim;
      },
      extendTimeline: true
    });

    document.addEventListener('click', (event) => {
      let $open = event.target.closest('[data-modal="open"]'),
        $close = event.target.closest('[data-modal="close"]'),
        $wrap = event.target.closest('.modal'),
        $block = event.target.closest('.modal-block');

      //open
      if ($open) {
        event.preventDefault();
        let $modal = document.querySelector(`${$open.getAttribute('href')}`);
        this.open($modal);
      }
      //close 
      else if ($close || (!$block && $wrap)) {
        this.close();
      }
    })
  },
  open: function ($modal) {
    let open = ()=> {
      scrollLock.disablePageScroll();
      $modal.classList.add('active');
      //animation
      let $content = $modal.querySelector('.modal-block')
      this.animation = gsap.effects.modal($modal, $content);
      this.animation.play();
      this.$active = $modal;
    }
    if($modal) {
      if(this.$active) this.close(open);
      else open();
    }
  },
  close: function (callback) {
    if(this.$active) {
      this.animation.timeScale(2).reverse().eventCallback('onReverseComplete', ()=> {
        delete this.animation;
        scrollLock.enablePageScroll();
        this.$active.classList.remove('active');
        delete this.$active;
        if(callback) callback();
      })
    }
  }
}