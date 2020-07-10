lazySizes.cfg.init = false;

$(document).ready(function(){
  hoverTouchEvents();
  toggle();
  lazy();
  catalogueToggle();
  nav();
  searchToggle();
})


//hover/touch custom events
function hoverTouchEvents() {
  $(document).on('mouseenter mouseleave touchstart touchend mousedown mouseup', 'a,button,label,input,textarea,.js-touch-hover', function(event) {
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
      $toggle = $('.toggle-section__head'),
      flag;
  
  $toggle.on('click', function() {
    $(this).closest($section).toggleClass('active');
    check();
  })   

  function check() {
    $section.each(function(){
      if($(this).hasClass('active')) {
        if(!flag) {
          $(this).find('.toggle-section__content').show();
        }
        $(this).find('.toggle-section__content').slideDown(250);
      } else {
        $(this).find('.toggle-section__content').slideUp(250);
      }
    })
    flag = true;
  }
  check();
}


function catalogueToggle() {
  let $toggle = $('.catalogue-nav__head'),
      $block = $('.catalogue-nav__content');

  $toggle.on('click', function() {
    $block.toggleClass('active');
    $toggle.toggleClass('active');
    if($block.is('.active')) {
      $block.stop().slideDown(250);
    } else {
      $block.stop().slideUp(250);
    }
  })
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