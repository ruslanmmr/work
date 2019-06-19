$(document).ready(function () {
  nav();
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
});

//global variables
var innerWidth = $('body').innerWidth();

//nav
function nav() {
  var $navToggle = $('.nav-open, .nav-close'),
    $overlay = $('.overlay'),
    $nav = $('.mobile-nav');

  $navToggle.on('click', function (event) {
    event.preventDefault();
    $nav.toggleClass('active');
    navState();
  })
  
  $overlay.on('click touchstart', function () {
    $nav.removeClass('active');
    navState();
  })

  function navState() {
    if ($nav.hasClass('active')) {
      $overlay.fadeIn(300);
    } else {
      $overlay.fadeOut(300);
    }
  }
  $(window).resize(function () {
    if (innerWidth > 1200) {
      $nav.removeClass('nav_active');
      navState();
    }
  });
}

