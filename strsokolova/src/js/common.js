$(document).ready(function(){
  hoverTouchEvents();
  navigation();
})

const brakepoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1280
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


function navigation() {
  let flag;
  
  function checkPosition() {
    let $buttons = $('.header__buttons-group'),
        $mobileContainer = $('.header__top .container'),
        $desktopContainer = $('.header__bottom .container');

    if($(window).width()<brakepoints.md && !flag) {
      $buttons.appendTo($mobileContainer);
      flag = true;
      console.log('1')
    } 
    else if($(window).width()>=brakepoints.md && flag) {
      $buttons.appendTo($desktopContainer);
      flag = false;
      console.log('2')
    }
  }

  checkPosition();
  $(window).on('resize', function() {
    checkPosition();
  })
}
