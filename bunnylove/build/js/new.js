"use strict";

$(document).ready(function () {
  mobileSearch();
  header();
});

function mobileSearch() {
  var $open = $('.mobile-search-open'),
      $close = $('.mobile-search__close'),
      $block = $('.mobile-search');
  $open.add($close).on('click', function (event) {
    event.preventDefault();
    if ($(this).is($open)) $block.addClass('active');else $block.removeClass('active');
  });
}

function header() {
  var $header = $('.new-header__center'),
      scroll;
  check();
  $(window).scroll(function () {
    check();
  });

  function check() {
    scroll = $(window).scrollTop();

    if (scroll > 0) {
      $header.addClass('active');
    } else {
      $header.removeClass('active');
    }
  }
}