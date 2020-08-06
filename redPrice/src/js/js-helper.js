$(document).ready(function(){
  
  let $toggle = $('.js-helper-module__trigger '), 
      $block = $('.js-helper-module');

  $toggle.on('click', function() {
    $block.toggleClass('active');
  })



  let $state1 = $('.form-state-1'),
      $state2 = $('.form-state-2'),
      $form1 = $('.chat-block__send-form'),
      $form2 = $('.chat-block__info-form');

  $state1.on('click', function() {
    $form2.hide();
    $form1.show();
  })

  $state2.on('click', function() {
    $form2.show();
    $form1.hide();
  })
})