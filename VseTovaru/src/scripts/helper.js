$(document).ready(function(){
  
  let $block = $('.helper'),
      $toggle = $('.helper__trigger');

  $toggle.on('click', function() {
    $block.toggleClass('active');
  })

})