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
  Tabs.init();
  Modal.init();
  Mask.init();
  jsRange();
  header_search();
  filter_mobile();
  calculator();
  //product images
  let $product_images = document.querySelector('.product__images');
  if($product_images) new ProductImages($product_images).init();
});

function value_format(number, decimals=0, dec_point=' ', thousands_sep=' ') {
  var i, j, kw, kd, km;

  i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

  if( (j = i.length) > 3 ){
      j = j % 3;
  } else{
      j = 0;
  }

  km = (j ? i.substr(0, j) + thousands_sep : "");
  kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
  kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");

  return km + kw + kd;
}

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

const Mask = {
  init: function() {
    let $phone = document.querySelectorAll('[data-phone]');
    if($phone.length) {
      Inputmask({
        mask: "+7 999 999-9999",
        showMaskOnHover: false,
        clearIncomplete: false
      }).mask($phone);
    }
  }
}

const Tabs = {
  init: function() {
    let $tabs = $('[data-action="tabs"]');
    $tabs.each(function(){
      let $parent = $(this),
          $tablinks = $parent.find('[data-action="tabs-trigger"]'),
          $tabcontent = $parent.find('[data-action="tabs-content"]');

      let change = (index)=> {
        $tablinks.removeClass('is-active').eq(index).addClass('is-active');
        $tabcontent.hide().eq(index).fadeIn(150);
      }

      change(0);
      $tablinks.on('click', function(){
        let index = $tablinks.index($(this));
        change(index);
      })
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

class ProductImages {
  constructor($slider) {
    this.$slider = $slider;
  }

  init() {
    this.index = 0;
    this.$mimages = this.$slider.querySelectorAll('.product__main-images .image');
    this.$nimages = this.$slider.querySelectorAll('.product__nav-images .image');

    this.slide = (index) => {
      if(!this.flag) {
        this.$mimages[this.index].style.zIndex = '1';
        this.$mimages[this.index].classList.remove('is-visible');
        this.$nimages[this.index].classList.remove('is-active');
      } else this.flag = true;

      this.$mimages[index].style.zIndex = '2';
      this.$mimages[index].classList.add('is-visible');
      this.$nimages[index].classList.add('is-active');

      this.index = index;
    }

    this.slide(this.index);

    this.events = [];
    this.$nimages.forEach(($this, index)=>{
      this.events[index] = (event)=> {
        if(event=='click' || (event=='mouseenter' && !TouchHoverEvents.touched)) {

        }
        this.slide(index);
      }
      $this.addEventListener('mouseenter', this.events[index])
      $this.addEventListener('click', this.events[index])
    })

  }
}

function jsRange() {
  let $range = $('.filter-range');
  
  $range.each(function() {
    let $this = $(this),
        $from = $this.find('.filter-range__input-from'),
        $to = $this.find('.filter-range__input-to'),
        $range = $this.find('.filter-range__range input');
    
      let instance,
          min = +$range.attr('data-min'),
          max = +$range.attr('data-max'),
          from = +$from.val() || min,
          to = +$to.val() || max,
          step = +$range.attr('data-step') || 1;

      $range.ionRangeSlider({
        skin: "round",
        type: 'double',
        min: min,
        max: max,
        from: from,
        to: to,
        step: step,
        onStart: updateInputs,
        onChange: updateInputs,
        onFinish: updateInputs
      });
      instance = $range.data("ionRangeSlider");
      
      function updateInputs(data) {
        from = data.from;
        to = data.to;
        if($from.length) $from.val(value_format(from));
        if($to.length) $to.val(value_format(to));
      }

      $from.add($to).on("input", function () {
        let value = +$(this).val().replace(/\s/g, '');
        $(this).val(value_format(value));
      })
      
      $from.on("change", function () {
        let value = +$(this).val().replace(/\s/g, '');
        if(value < min) value = min;
        else if(value > to) value = to;
        instance.update({from:value});
        $from.val(value_format(value));
      });

      $to.on("change", function () {
        let value = +$(this).val().replace(/\s/g, '');
        if(value < from) value = from;
        else if(value > max) value = max;
        instance.update({to:value});
        $to.val(value_format(value));
      });

  });
}

function calculator() {
  let $element = $('.js-calc');
  $element.each(function () {
    let $this = $(this),
        $plus = $this.find('.js-calc__plus'),
        $minus = $this.find('.js-calc__minus'),
        $input = $this.find('.js-calc__input'),
        val = +$input.val();

    check();

    $plus.on('click', function () {
      val++;
      check();
    });
    $minus.on('click', function () {
      if(val>1) val--;
      check();
    });
    $input.on('change input', function () {
      val = +$input.val().replace(/\s/g, '');
      if(val<1) val = 1;
      check();
    });

    function check() {
      $input.val(val);
      if(val==1) $minus.addClass('disabled');
      else $minus.removeClass('disabled');
    }

  });
}

function header_search() {
  let $search = $('.header__search');
  if($search.length) {
    let $open = $('.header__search-open'),
        $close = $('.header__search-close');

    $open.on('click', function(){
      $search.addClass('is-active');
      $($header).addClass('header_search-active');
    })
    $close.on('click', function(){
      $search.removeClass('is-active');
      $($header).removeClass('header_search-active');
    })
  }
}

function filter_mobile() {
  let $filter = $('.catalogue-filter'),
      $filter_open = $('.catalogue-filter-open'),
      $filter_close = $('.catalogue-filter__bg, .catalogue-filter__close');

  $filter_close.on('click', function() {
    $filter.removeClass('is-active');
    scrollLock.enablePageScroll();
  })

  $filter_open.on('click', function() {
    $filter.addClass('is-active');
    scrollLock.disablePageScroll();
  })
}