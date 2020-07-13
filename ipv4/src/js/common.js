lazySizes.cfg.init = false;
lazySizes.cfg.preloadAfterLoad = true;

$(document).ready(function(){
  hoverTouchEvents();
  lazy();
  popup();
  addGradient();
  $header.init();
  nav.init();
})

const brakepoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
}

//hover/touch custom events
function hoverTouchEvents() {
  $(document).on('mouseenter mouseleave touchstart touchend mousedown mouseup contextmenu', 'a,button,label,input,textarea,.js-touch-hover', function(event) {
    let $target = $(this);
    //mobile events
    if(!device.desktop()) {
      if(event.type=='touchstart') {
        $target.addClass('touch');
      } 
      else if(event.type=='touchend' || event.type=='contextmenu') {
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

function popup() {
  let $button = $('.js-popup');

  $button.each(function() {

    let $window = $(this).siblings('.js-popup-item'),
        timeout;

    $(this).add($window).on('mouseenter', function(event) {
      if(device.desktop()) {
        if(timeout) {
          clearTimeout(timeout);
        }
        if($(event.target).closest($button).length)  {
          $button.addClass('popupVisible');
          $window.addClass('visible');
        }
      }
    })

    $(this).add($window).on('mouseleave', function() {
      if(device.desktop()) {
        if($(event.target).closest($button).length)  {
          timeout = setTimeout(()=>{
            $button.removeClass('popupVisible');
            $window.removeClass('visible');
          }, 500)
        } else {
          $button.removeClass('popupVisible');
          $window.removeClass('visible');
        }
      }
    })

  })
}

/* HEADER */
let $header = {
  init: function() {
    this.el = $('.header');
    this.isVisible = true;
    this.isFixed = false;
    this.scroll = $(window).scrollTop();
    this.scroll_last = this.scroll;

    this.checkFixed();

    $(window).scroll(function(){
      if(!nav.state) {
        $header.checkVisible();
      }
    });
  },
  checkFixed: function() {
    let h = $('.header').height();
    //fix header
    if (this.scroll>0 && !this.isFixed){
      this.isFixed = true;
      this.el.addClass('header_fixed');
    } else if(this.scroll<=0 && this.isFixed) {
      this.isFixed = false;
      this.el.removeClass('header_fixed');
    }
  },
  checkVisible: function() {
    this.scroll = $(window).scrollTop();
    this.checkFixed();
    if (this.scroll>this.scroll_last && this.scroll>$(window).height()/2 && this.isVisible){
      this.isVisible=false;
      this.el.addClass('header_hidden');
    } else if(this.scroll<this.scroll_last && !this.isVisible) {
      this.isVisible=true;
      this.el.removeClass('header_hidden');
    }
    this.scroll_last = this.scroll;
  }
}

function addGradient() {
  let $block = $('.block-list');

  $block.each(function(){
    let $this = $(this),
        $items = $this.find('.block-list__item-icon'),
        value = 0.5 / ($items.length-1),
        itemValue = 0.5;
    
    $items.each(function() {
      $(this).css('opacity', itemValue)
      itemValue+=value;
    })
    
  })
}

let nav = {
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
      if($(event.target).closest('.mobile-nav__container').length==0 
      && $(event.target).closest('.header').length==0
      && $(event.target).closest(this.$toggle).length==0) {
        console.log(this.flag)
        if(this.flag==true) {
          this.close();
        }
      }
    })

  }, 

  open: function() {
    this.flag = true;
    if(this.timout!==undefined) clearTimeout(this.timout)
    scrollLock.disablePageScroll();
    this.state = true;
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
    this.timout = setTimeout(()=>{
      this.state = false;
    }, 250)
  }
}