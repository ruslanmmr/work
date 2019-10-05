$(document).ready(function () {
  slider();
  timerMain();
  navigation();
  modalMagnificBasket();
  landingScroll();
  moreinfo();
  resizeEvents();
  $(".phone").mask("9 (999) 99-9999");
});
$(window).on('resize', function() {
  pw = $('body').width();
  resizeEvents();
});

//global
const $body = $('body');
let pw = $('body').width(),
  nav = {
    $block: $('.mobile-nav'),
    $link: $('.mobile-nav__link'),
    $toggle: $('.nav-toggle')
  },
  $overlay = $('.overlay'),
  $scrollLink = $('.scroll-link'),
  $fixedEls = $('.fixed-el');

//lazy
function lazy() {
  $(".lazy").Lazy({
    visibleOnly: true,
    threshold: '',
    effect: 'fadeIn',
    effectTime: '500'
  });
}
//resize events
function resizeEvents() {
  $fixedEls.css('max-width', pw);
}
//mobile nav
function navigation() {
  nav.$toggle.on('click', function(event) {
    event.preventDefault();
    nav.$block.toggleClass('active');
    stateToggle();
  })

  function stateToggle() {
    if(nav.$block.hasClass('active')) {
      nav.$toggle.addClass('active');
      $overlay.fadeIn();
      scrollLock.hide($body);
    } else {
      nav.$toggle.removeClass('active');
      $overlay.fadeOut();
      scrollLock.show($body);
    }
  }
  $(window).on('resize', function() {
    if(pw>768) {
      nav.$block.removeClass('active');
      stateToggle();
    }
  });
}
//timer
function timerMain() {
  let date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth()+1,
      day = date.getDate(),
      daysLeft = 2,
      finalDate = `${year}/${month}/${day+daysLeft}`;

  $('[data-countdown]').each(function() {
    let $this = $(this);
    $this.countdown(finalDate, function(event) {
      $this.html(event.strftime(''
      + '<div><span>%D</span> Дней</div>'
      + '<div><span>%H</span> Часов</div>'
      + '<div><span>%M</span> Минут</div>'
      + '<div><span>%S</span> Секунд</div>'));
    });
  });
}
//gallery-slider
function slider() {
  let $slider = $('.catalogue-block__slider');

  $slider.on('init', function(){
    lazy();
  });

  $slider.each( function() {
    $(this).after('<div class="catalogue-block__nav-slider"></div>');

    let $slides = $(this).html(),
        $nav = $(this).siblings('.catalogue-block__nav-slider');

    $nav.append($slides)
    
    $(this).slick({
      arrows: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      dots: true
    });
  });
  pag();

  $slider.on('swipe', function(){
    pag();
  });

  $('.catalogue-block__nav-slider .catalogue-block__slide').children().click(function() {
    let index = $(this).parent().index();
    $(this).parents('.catalogue-block').find('.catalogue-block__slider').slick('slickGoTo', index);
    pag();
  });

  //custom pagination
  function pag() {
    $(".slick-dots li").each(function() {
      if($(this).hasClass("slick-active")) {
        $(this).parents('.catalogue-block').find('.catalogue-block__nav-slider .catalogue-block__slide').removeClass("catalogue-block__slide_active");
        $(this).parents('.catalogue-block').find('.catalogue-block__nav-slider .catalogue-block__slide').eq($(this).index()).addClass("catalogue-block__slide_active");
      }
    });
  }

  $(".catalogue-block .slick-arrow").on('click', function(){
    setTimeout(function(){
      pag();
    }, 100);
  });

  //догрузка изображений при перелистывании
  $('.catalogue-block__slider').on('afterChange', function(){
    lazy();
  });
}
function modalMagnificBasket() {
	$('.popup-link').magnificPopup({
		closeBtnInside: false,
    fixedContentPos: true,
    removalDelay: 300,
    mainClass: 'mfp-fade',
    showCloseBtn: true,
    callbacks: {
      open: function() {
        let windowW = $('.mfp-container').width() + 30,
            x = window.innerWidth-windowW;
        $('.mfp-close').css('right', x)
      }
    }
  });

  $('.popup-youtube').magnificPopup({
    disableOn: 576,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 300,
    preloader: false,
    fixedContentPos: true,
    closeBtnInside: false,
    showCloseBtn: true
  });
}
//якорные ссылки
function landingScroll() {
  let headerH = $(".header").height();

  $scrollLink.on('click', function(event) {
    let id  = $(this).attr('href'),
        top = $(id).offset().top - headerH + 1;
    event.preventDefault();
    $('body,html').animate({scrollTop: top}, 400);
  })
}

//more {
function moreinfo() {
  let $button = $('.catalogue-block-more__btn');

  $button.on('click', function() {
    $(this).toggleClass('catalogue-block-more__btn_active')
    $(this).siblings('.catalogue-block-more__dropdown').slideToggle(300);
    if($(this).hasClass('catalogue-block-more__btn_active')) {
      $(this).text('Нажмите, чтобы cкрыть полное описание');
    } else {
      $(this).text('Нажмите, чтобы открыть полное описание');
    }
  })

}