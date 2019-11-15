$(document).ready(function () {
  lazy();
  nav();
  slider();
  funcybox();
  dropdown()
});

$(window).resize(function () {

  windowW = Math.max(window.innerWidth, document.documentElement.clientWidth);
  pageW = Math.min(window.innerWidth, document.documentElement.clientWidth);

  $('img').each(function() {
    imagesResize($(this));
  });
});

//global variables
let windowW = Math.max(window.innerWidth, document.documentElement.clientWidth),
    pageW = Math.min(window.innerWidth, document.documentElement.clientWidth),
    scrollbarW = windowW - pageW,
    $slider = $('.slider');

//nav
function nav() {
  let $navOpen = $('.nav-open-btn'),
    $navClose = $('.nav-close-btn'),
    $overlay = $('.overlay'),
    $nav = $('.nav');

  $navOpen.on('click', function() {
    $nav.addClass('active');
    $overlay.fadeIn(300);
  })
  $navClose.on('click', function() {
    $nav.removeClass('active');
    $overlay.fadeOut(300);
  })
  $overlay.on('click touchstart', function () {
    $nav.removeClass('active');
    $overlay.fadeOut(300);
  })

  $(window).resize(function () {
    if (windowW > 1024) {
      $nav.removeClass('active');
      $overlay.fadeOut(300);
    }
  });
}
function lazy() {
  $(".lazy").Lazy({
    effectTime: 0,
    threshold: 500,
    imageBase: false,
    defaultImage: false,
    afterLoad: function(element) {
      imagesResize(element);
    }
  });
}
function imagesResize(element) {
  let box = element.parent();

  if(!box.hasClass('cover-box_size-auto')) {
    let boxH = box.height(),
        boxW = box.width();

    setTimeout(function() {
      let imgH = element.height(),
          imgW = element.width();

      if ((boxW / boxH) >= (imgW / imgH)) {
        element.addClass('ww').removeClass('wh');
      } else {
        element.addClass('wh').removeClass('ww');
      }
      element.addClass('visible');
    }, 100)
  } else {
    element.addClass('visible');
  }
}
function slider() {
  $slider.on('init', function () {
    $(this).addClass('visible')
  });

  $slider.each(function () {
    $(this).on('init beforeChange afterChange', function(){
      lazy();
    });

    let slideCount = 1,
      slideCount1200 = 1,
      slideCount1024 = 1,
      slideCount768 = 1,
      slideCount576 = 1,
      slideCount420 = 1,
      arrows = false,
      dots = false,
      centerMode = false,
      adaptiveHeight = false;

    if ($(this).hasClass('dots')) {
      dots = true;
    }
    if ($(this).hasClass('arrows')) {
      arrows = true;
    }
    if ($(this).hasClass('banner-slider')) {
      adaptiveHeight = true;
    }
    if ($(this).hasClass('work-slider')) {
      slideCount = 4;
      slideCount1200 = 4;
      slideCount1024 = 3;
      slideCount768 = 2;
      slideCount576 = 2;
      slideCount420 = 1;
    }

    $(this).slick({
      infinite: true,
      dots: dots,
      arrows: true,
      speed: 600,
      adaptiveHeight: adaptiveHeight,
      centerMode: centerMode,
      slidesToShow: slideCount,
      slidesToScroll: slideCount,
      prevArrow: $(this).parents('.section').find('.slider-prev'),
      nextArrow: $(this).parents('.section').find('.slider-next'),
      responsive: [{
          breakpoint: 1200,
          settings: {
            slidesToShow: slideCount1200,
            slidesToScroll: slideCount1200
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: slideCount1024,
            slidesToScroll: slideCount1024
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: slideCount768,
            slidesToScroll: slideCount768
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: slideCount576,
            slidesToScroll: slideCount576
          }
        },
        {
          breakpoint: 420,
          settings: {
            slidesToShow: slideCount420,
            slidesToScroll: slideCount420
          }
        }
      ]
    });
  });
  //fix
  $('.publications-slide').parent().css('display', 'flex');
}
function funcybox() {
  $.fancybox.defaults.btnTpl.close = '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.6 13.6"><path d="M6.8 5.4L1.4 0 0 1.4l5.4 5.4L0 12.2l1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4L12.2 0z"></path></svg>' +
  "</button>";
  $.fancybox.defaults.btnTpl.arrowLeft = '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
  '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 10.14"><path d="M6.28 8.77l-1.34 1.37L0 5.07 4.94 0l1.34 1.38L3.6 4.1H14v1.94H3.6z"></path></svg></div>' +
  "</button>";
  $.fancybox.defaults.btnTpl.arrowRight = '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_right" title="{{PREV}}">' +
  '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 10.14"><path d="M10.4 6.04L7.72 8.76l1.34 1.38L14 5.07 9.06 0 7.72 1.38 10.4 4.1H0v1.94z"></path></svg></div>' +
  "</button>";
  $.fancybox.defaults.btnTpl.zoom = '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' +
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.056 14.096"> <path d="M13.756 12.356l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zm-10.6-3.5a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"></path> </svg>' +
  "</button>";
  $.fancybox.defaults.btnTpl.download = '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;">' +
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.24 14"> <path d="M13.24 12.09V14H0v-1.91zm-2.97-6.96l1.35 1.32-5 4.87-5-4.87 1.36-1.32 2.68 2.64V0h1.92v7.77z"></path> </svg>' +
  "</a>";
  $.fancybox.defaults.btnTpl.slideShow = '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">' +
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 13.2"> <path d="M0 0v13.2l11-6.6z"></path></svg>' +
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.35 12.5" id="slideshow"><path d="M0 0h2.2v12.5H0zm5.15 0h2.2v12.5h-2.2z"></path></svg>' +
  "</button>";
  $.fancybox.defaults.btnTpl.smallBtn = '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' +
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.6 13.6"><path d="M6.8 5.4L1.4 0 0 1.4l5.4 5.4L0 12.2l1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4L12.2 0z"></path></svg>' +
  "</button>";
  $.fancybox.defaults.btnTpl.thumbs = '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">' +
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.7 12.7" id="slideshow"><path d="M8.94 8.94h3.76v3.76H8.94zm-4.47 0h3.76v3.76H4.47zM0 8.94h3.76v3.76H0zm8.94-4.47h3.76v3.76H8.94zm-4.47 0h3.76v3.76H4.47zM0 4.47h3.76v3.76H0zM8.94 0h3.76v3.76H8.94zM4.47 0h3.76v3.76H4.47zM0 0h3.76v3.76H0z"></path></svg>' +
  "</button>";
  $.fancybox.defaults.i18n.ru = {
    CLOSE       : 'Закрыть',
    NEXT        : 'Следующий слайд',
    PREV        : 'Предидущий слайд',
    ERROR       : 'Ошибка загрузки, попробуйте позже.',
    PLAY_START  : 'Запустить слайд-шоу',
    PLAY_STOP   : 'Остановить слайд-шоу',
    FULL_SCREEN : 'Полноэкранный режим',
    THUMBS      : 'Миниатюры',
    DOWNLOAD    : 'Загрузить',
    SHARE       : 'Поделиться',
    ZOOM        : 'Увеличить'
  };
  $.fancybox.defaults.lang = 'ru';
  $.fancybox.defaults.loop = true;
  $.fancybox.defaults.autoFocus = false;
  $.fancybox.defaults.animationEffect = 'fade'
  $.fancybox.defaults.backFocus = 'false'

  $('.slide [data-fancybox]').on('click', function() {
    let $selector = $(this).parents('.slider').find('.slick-slide:not(.slick-cloned) a');

    $.fancybox.open( $selector, {
        selector : $selector,
        backFocus : false
    }, $selector.index( this ) );

    return false;
  });
}

function dropdown() {
  $(document).on('click', function(event) {
    if($(event.target).hasClass('dropdown__toggle')) {
      event.preventDefault();
      let $dropdown = $(event.target).parents('.dropdown');
      $dropdown.toggleClass('active');
    } else if($(event.target).parents('.dropdown').length==0 && !$(event.target).hasClass('dropdown')) {
      $('.dropdown').removeClass('active');
      console.log('+')
    }
  })
}