$(document).ready(function(){
  nav();
})



function nav() {
  let $toggle = $('.nav-toggle'),
      $nav = $('.mobile-nav'),
      $header = $('.header'),
      state;
      
  $toggle.on('click', function(event){
    event.preventDefault();
    if(!state) {
      open();
    } else {
      close();
    }
  })

  function open() {
    $("html, body").animate({ scrollTop:0 }, 300);
    state = true;
    scrollLock.disablePageScroll();
    $nav.add($toggle).add($header).addClass('active');
  }
  function close() {
    state = false;
    scrollLock.enablePageScroll();
    $nav.add($toggle).add($header).removeClass('active');
  }
}