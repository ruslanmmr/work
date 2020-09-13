"use strict";

$(document).ready(function () {
  mobileSearch();
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