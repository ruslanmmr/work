//preloader
document.body.onload = function() {
  setTimeout(function() {
    var $preloader = $('.preloader');
    if(!$preloader.hasClass('loaded')) {
      $preloader.addClass('loaded');
      $('#scene').addClass('loaded');
    }
    scrollInit();
    parralax();
  }, 1500)
}

//global variables
var cursorcolorVar = "#fff",
    cursorwidthVar = "7px",
    cursorborderVar = "0",
    cursorborderradiusVar = "0",
    zindexVar = [100],
    bouncescrollVar = false;

//scroll
function scrollInit() {
  if ($('html').hasClass('desktop')) {
    $(window).on('scroll',function(){
      parallaxScroll();
    });
    $('body').niceScroll({
      cursorcolor: cursorcolorVar,
      cursorwidth: cursorwidthVar,
      cursorborder: cursorborderVar,
      cursorborderradius: cursorborderradiusVar,
      zindex: zindexVar,
      bouncescroll: bouncescrollVar,
      autohidemode: true,
    });
  } else {
    $('html, body').css('overflow', 'auto')
  }
};
//parralax
function parralax() {
  //init parralax
  var scene = document.getElementById('scene');
  var parallaxInstance = new Parallax(scene, {
    limitY: '80',
    limitX: '80'
  });
}
//parralax scroll
function parallaxScroll() {
  var scrolled = $(window).scrollTop();
  $('.scene').css('transform','translateY('+(0+(scrolled*.5))+'px)');
}