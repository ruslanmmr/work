"use strict";

$(document).ready(function () {
  var $block = $('.helper'),
      $toggle = $('.helper__trigger');
  $toggle.on('click', function () {
    $block.toggleClass('active');
  });
});
//# sourceMappingURL=maps/helper.js.map
