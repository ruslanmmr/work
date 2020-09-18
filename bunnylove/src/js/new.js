$(document).ready(function(){
  mobileSearch();
  header();
})

function mobileSearch() {
  let $open = $('.mobile-search-open'),
      $close = $('.mobile-search__close'),
      $block = $('.mobile-search');

  $open.add($close).on('click', function(event) {
    event.preventDefault();
    if ($(this).is($open)) $block.addClass('active');
    else $block.removeClass('active');
  })

}

function header() {
  let $header = $('.new-header__center'),
      scroll;

  check();
  $(window).scroll(function() {
    check();
  });

  function check() {
    scroll = $(window).scrollTop();
    if(scroll>0){
      $header.addClass('active');
    } else {
      $header.removeClass('active');
    }
  }
}