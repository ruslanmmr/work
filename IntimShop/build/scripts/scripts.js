const brakepoints = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1200,
  xxl: 1600
}

const $body = document.body;
const $wrapper = document.querySelector('.wrapper');
const $header = document.querySelector('.header');


document.addEventListener("DOMContentLoaded", function(event) { 
  TouchHoverEvents.init();
  Header.init();
  lazySizes.init();
  FormElements.init();
  Dropdown.init();
  Modal.init();
});

const TouchHoverEvents = {
  targets: 'a, button, label, tr, .ss-option, .jsTouchHover',
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

const Header = {
  init: function () {
    let old_scroll = 0,
        old_flag,
        pin,
        fh;

    this.checkSize = ()=> {
      pin = $header.getBoundingClientRect().height;
      fh = $wrapper.getBoundingClientRect().top + window.pageYOffset + $header.getBoundingClientRect().height;
    }

    this.check = ()=> {
      let y = window.pageYOffset,
          h = window.innerHeight,
          fixed = $header.classList.contains('header_fixed'),
          hidden = $header.classList.contains('header_hidden');
          

      if(y > fh && !fixed) {
        $header.classList.add('header_fixed');
        $wrapper.style.paddingTop = `${pin}px`;
      } else if(y<=fh && fixed) {
        $header.classList.remove('header_fixed');
        $wrapper.style.paddingTop = '0px';
        /* this.checkSize(); */
      }

      if(old_scroll<y) {
        old_flag = y;
        if((y>h) && !hidden) {
          $header.classList.add('header_hidden');
        }
      } else if(old_scroll>y) {
        if(hidden && (y<h || y+100<old_flag)) {
          $header.classList.remove('header_hidden');
        }
      }
      old_scroll = y;
    }

    /* this.checkSize(); */
    this.check();

    /* window.addEventListener('resize', ()=> {
      this.checkSize();
    }) */

    window.addEventListener('scroll', ()=> {
      this.check();
    })
  }
}

const FormElements = {
  init: function() {
    //select
    let $selects = document.querySelectorAll('.select');
    $selects.forEach(($element, index)=>{
      $element = new SlimSelect({
        select: $element,
        showContent: 'down',
        showSearch: false
      })
    })

  }
}

const Dropdown = {
  init: function() {
    //Выпадающие списки
    $('[data-action="dropdown-toggle"]').on('click', function() {
      let $this = $(this),
          active = 'is-active',
          $parent = $this.parents('[data-action="dropdown"]'),
          $content = $parent.find('[data-action="dropdown-content"]'),
          $siblings = $parent.siblings(),
          $siblings_button = $siblings.find('[data-action="dropdown-toggle"]'),
          $siblings_content = $siblings.find('[data-action="dropdown-content"]');

      $siblings_button.removeClass(active);
      $siblings_content.removeClass(active);
      $content.toggleClass(active);
      $this.toggleClass(active);
    })
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
      else if($close) {
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