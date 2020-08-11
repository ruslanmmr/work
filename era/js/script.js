$(document).ready(function(){
  $('.b-slider').bxSlider({
    slideWidth: 152,
    minSlides: 5,
    maxSlides: 6,
    moveSlides: 1,
    pager: false,
    infiniteLoop: false,
    hideControlOnEnd: true,
    slideMargin: 10
  });   
  $('.b-banner').bxSlider({
    moveSlides: 1,
    mode: 'fade',
    controls: false,
    pager: true, 
    auto: true,
    pause: 3000,
  });  
  $('.js-trigger').on('click', function(event) {
    event.preventDefault();
    $('#modal-form').addClass('md-show');
  });

  var diagramList =  $('.b-options').find('.b-options__count'); 

  var animDiargam = function() {

    $.each(diagramList, function(index, val) {
       var diagramItem = $(diagramList[index]);
       var currentHeight = diagramItem.css('height');
       diagramItem.css('height',0)
       diagramItem.animate({
         height: currentHeight},
         400, function() {
         /* stuff to do after animation is complete */
       });     
    });
  }

  $(".b-taxonomy__link").on('click',function(e){
    e.preventDefault();
    animDiargam();
    var item = $(this).closest('.b-taxonomy__item'),
        contentGroup = $('.b-big-slider__group'),
        contentItem  = $('.b-big-slider__item'),
        itemList = item.find('.b-pager__item'), 
        itemPosition = item.index();

        if(itemList.length == 1) { 
          $('.b-decor__prev, .b-decor__next').hide();
        } else {
          $('.b-decor__prev, .b-decor__next').show();
        }

        contentGroup.eq(itemPosition)
          .addClass('active')
          .siblings()
          .removeClass('active');       

        contentGroup.eq(itemPosition)
        .find('.b-big-slider__item')
        .siblings()
        .removeClass('active')       
        contentGroup.eq(itemPosition)
        .find('.b-big-slider__item')
        .first()
        .addClass('active');

        item.addClass('active')
        .siblings()
        .removeClass('active');

        item
        .find('.b-pager__item')
        .siblings()
        .removeClass('active')
        item
        .find('.b-pager__item') 
        .first()
        .addClass('active');    
  });
  
  $('.b-pager__item').on('click', function(event) {
    event.preventDefault();
    animDiargam();
    var item = $(this),
        itemIndex = item.index(),
        itemParent = item.closest('.b-taxonomy__item'),
        itemParentIndex = itemParent.index(),
        contentGroup = $('.b-big-slider__group'),
        contentItems = contentGroup.eq(itemParentIndex).find('.b-big-slider__item');

        contentItems
          .eq(itemIndex)
          .addClass('active')
          .siblings()
          .removeClass('active');
                 
        item.addClass('active') 
        .siblings()
        .removeClass('active');
  });
  $('.b-decor__next').on('click', function(event) {
    event.preventDefault();
    var contentGroup = $('.b-big-slider__group.active'), 
        contentItem  = contentGroup.find('.b-big-slider__item'), 
        contentItemActive = contentGroup.find('.b-big-slider__item.active'),
        contentItemActiveIndex = contentItemActive.index() +1,  

        currentNumber = contentItemActiveIndex + 1,
        menuList = $('.b-taxonomy__item.active').find('.b-pager__item'); 
        $('.b-decor__prev').show(); 

        console.log(contentItemActiveIndex);

        menuList.eq(contentItemActiveIndex)
        .addClass('active')
        .siblings()
        .removeClass('active');  
        
       console.log('currentNumber');
       if(currentNumber > contentItem.length) {
         $(this).hide();
       } else {
        contentItemActive
         .removeClass('active')
         .next() 
         .addClass('active');
        };
        animDiargam();
  });  
  $('.b-decor__prev').on('click', function(event) {
    event.preventDefault();
    var contentGroup = $('.b-big-slider__group.active'), 
        contentItem  = contentGroup.find('.b-big-slider__item'), 
        contentItemActive = contentGroup.find('.b-big-slider__item.active'),
        contentItemActiveIndex = contentItemActive.index(),
        currentNumber = contentItemActiveIndex + 1,
        menuList = $('.b-taxonomy__item.active').find('.b-pager__item');  
        $('.b-decor__next').show();
        menuList.eq(contentItemActiveIndex)
        .addClass('active')
        .siblings()
        .removeClass('active');                

       if(currentNumber == 1) {
         $(this).hide();
       } else {
        contentItemActive
         .removeClass('active')
         .prev() 
         .addClass('active');
        };
        animDiargam();
  });
});