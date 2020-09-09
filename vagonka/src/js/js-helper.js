$(document).ready(function(){
  
  let $toggle = $('.js-helper-module__trigger '), 
      $block = $('.js-helper-module');

  $toggle.on('click', function() {
    $block.toggleClass('active');
  })

})