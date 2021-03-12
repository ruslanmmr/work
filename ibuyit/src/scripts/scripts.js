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

window.onload = function(){
  lazySizes.init();
  TouchHoverEvents.init();
  Header.init();
  Nav.init();
  toggle();
  jsRange();

  //banner
  let $banner = document.querySelector('.home-banner');
  if($banner) new Banner($banner).init();

  //product sliders
  let $product_slider1 = document.querySelectorAll('.catalogue-block');
  $product_slider1.forEach($this => {
    new ProductMiniSlider($this).init();
  })
  //
  let $product_slider2 = document.querySelector('.product-section__images');
  if($product_slider2) new ProductSlider($product_slider2).init();

}

const TouchHoverEvents = {
  targets: 'a, button, label, tr, .touch-hover',
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
    this.old_scroll = 0;
    window.addEventListener('scroll', ()=> {
      this.check();
    })
    this.check();
  },
  check: function () {
    let y = window.pageYOffset,
        h = window.innerHeight/2,
        fixed = $header.classList.contains('header_fixed'),
        hidden = $header.classList.contains('header_hidden');

    if (y > 0 && !fixed) {
      $header.classList.add('header_fixed');
    } else if ((y<=0 && fixed)) {
      $header.classList.remove('header_fixed');
    }

    //листаем вниз
    if(this.old_scroll<y) {
      this.old_flag = y;
      if(y>h && !hidden) {
        $header.classList.add('header_hidden');
      }
    }
    //листаем вверх
    else if(this.old_scroll>y) {
      if(hidden && (y<h || y+100<this.old_flag)) {
        $header.classList.remove('header_hidden');
      }
    } 

    this.old_scroll = y;
  }
}

const Nav = {
  init: function() {
    this.$nav = document.querySelector('.nav');
    this.$bg = document.querySelector('.nav__bg');
    this.$open = document.querySelector('.nav-open');
    this.$close = document.querySelector('.nav-close');
    this.state = false;
    this.opened = false;

    [this.$bg, this.$close].forEach($this=>{
      $this.addEventListener('click', ()=>{
        if(this.state) this.close()
      })
    })
    this.$open.addEventListener('click', ()=>{
      if(!this.state) this.open();
    })

    window.addEventListener('resize', ()=> {
      if(window.innerWidth >= brakepoints.xl && this.state) {
        this.close();
      }
    })

  },
  open: function() {
    scrollLock.disablePageScroll();
    this.$nav.classList.add('nav_opened');
    this.state=true;
  },
  close: function() {
    this.$nav.classList.remove('nav_opened');
    setTimeout(() => {
      scrollLock.enablePageScroll();
      this.state=false;
    }, 300);
  }
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
function jsRange() {
  var $range = $('.filter-range');
  $range.each(function () {
    var $this = $(this),
        $rangeItem = $this.find('.js-range'),
        $inputFrom = $this.find(".filter-range__input-from"),
        $inputTo = $this.find(".filter-range__input-to"),
        instance,
        min = +$rangeItem.attr('data-min'),
        max = +$rangeItem.attr('data-max'),
        from = +$inputFrom.attr('data-from') || min,
        to = +$inputTo.attr('data-to') || max;
    $rangeItem.ionRangeSlider({
      skin: "round",
      type: "double",
      min: min,
      max: max,
      from: from,
      to: to,
      onStart: updateInputs,
      onChange: updateInputs,
      onFinish: updateInputs
    });
    instance = $rangeItem.data("ionRangeSlider");

    function updateInputs(data) {
      from = data.from;
      to = data.to;
      $inputFrom.prop("value", from);
      $inputTo.prop("value", to);
    }

    $inputFrom.on("change", function () {
      var val = $(this).prop("value"); // validate

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
      var val = $(this).prop("value"); // validate

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
  });
}

class Banner {
  constructor($parent) {
    this.$parent = $parent;
  }

  init() {
    this.$slider = this.$parent.querySelector('.splide');
  
    this.slider = new Splide(this.$slider, {
      type: 'loop',
      perPage: 1,
      perMove: 1,
      arrows: true,
      pagination: false,
      gap: 20,
      speed: 500,
      autoplay: true,
      interval: 6000
    })

    this.slider.mount();

  }
}

class ProductMiniSlider {
  constructor($parent) {
    this.$parent = $parent;
  }
  init() {
    this.$slider = this.$parent.querySelector('.splide');
  
    this.slider = new Splide(this.$slider, {
      type: 'loop',
      perPage: 1,
      perMove: 1,
      arrows: false,
      pagination: true,
      gap: 20,
      speed: 500
    })

    this.slider.mount();
  }
}

class ProductSlider {
  constructor($slider) {
    this.$slider = $slider;
  }

  init() {
    this.index = 0;
    this.$mimages = this.$slider.querySelectorAll('.product-section__m-images .image');
    this.$nimages = this.$slider.querySelectorAll('.product-section__nav-images .image');
    let flag;

    this.slide = (index) => {
      if(!flag) {
        this.$mimages[this.index].style.zIndex = '1';
        this.$mimages[this.index].classList.remove('is-visible');
        this.$nimages[this.index].classList.remove('is-active');
      } 
      else flag = true;

      this.$mimages[index].style.zIndex = '2';
      this.$mimages[index].classList.add('is-visible');
      this.$nimages[index].classList.add('is-active');

      this.index = index;
    }

    this.slide(this.index);

    this.events = [];
    this.$nimages.forEach(($this, index)=>{
      this.events[index] = ()=> {
        this.slide(index);
      }
      $this.addEventListener('mouseenter', this.events[index])
      $this.addEventListener('click', this.events[index])
    })

  }
}