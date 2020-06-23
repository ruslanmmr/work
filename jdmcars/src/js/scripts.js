
$(document).ready(function() {
  lazyBackgrounds();
  mainSlider();
  infoTabs();
})

//lazy backgrounds
function lazyBackgrounds() {
  //add lazy backgrounds
  document.addEventListener('lazybeforeunveil', function(e){
    let el = e.target.tagName,
        bg = e.target.getAttribute('data-src');
    if(el!=='IMG') {
      let bg = e.target.getAttribute('data-src');
      e.target.style.backgroundImage = 'url(' + bg + ')';
    }
  });
}
//slider
function mainSlider() {
  let $slider = $('.home-slider-main'),
      $navslider = $('.home-slider-nav');
  if($slider.length) {
    $slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      asNavFor: $navslider
    });
    $navslider.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: $slider,
      dots: true,
      arrows: false,
      centerMode: true,
      focusOnSelect: true
    });
  }
}
//infoTabs
function infoTabs() {
  let $blocks = $('.questions-block');
  
  $blocks.each(function(){
    let $this = $(this),
        $title = $this.find('.questions-block__title'),
        $answer = $this.find('.questions-block__answer');

    $title.on('click', function() {
      $this.toggleClass('active');
      $answer.stop().slideToggle(250);
    })
  })
}