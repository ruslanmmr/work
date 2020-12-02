"use strict";

$(function () {
  function tabs() {}

  tabs();
  $('.tabset a').on('click', function (event) {
    event.preventDefault();
    $('.tabset a').removeClass('active');
    $('.tab-list .tab').hide();
  });
  $('.tabset .tab1-opener').on('click', function (event) {
    $('.tabset .tab1-opener').addClass('active');
    $('.tab-list .tab1-box').show();
  });
  $('.tabset .tab2-opener').on('click', function (event) {
    $('.tabset .tab2-opener').addClass('active');
    $('.tab-list .tab2-box').show();
  });
  $('.tabset .tab3-opener').on('click', function (event) {
    $('.tabset .tab3-opener').addClass('active');
    $('.tab-list .tab3-box').show();
  });
  $('.tabset .tab4-opener').on('click', function (event) {
    $('.tabset .tab4-opener').addClass('active');
    $('.tab-list .tab4-box').show();
  });
  $('.tabset .tab5-opener').on('click', function (event) {
    $('.tabset .tab5-opener').addClass('active');
    $('.tab-list .tab5-box').show();
  });
  $('.tabset .tab6-opener').on('click', function (event) {
    $('.tabset .tab6-opener').addClass('active');
    $('.tab-list .tab6-box').show();
  });
  $('.tabset-bottom a').click(function () {
    $('body,html').animate({
      scrollTop: $('.tab-pc').offset().top
    }, 400);
    return false;
  });
  $('.top-slider').owlCarousel({
    loop: true,
    margin: 0,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      }
    }
  });
  $('.slider-items').owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      }
    }
  });
  $('.slider-items2').owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      }
    }
  });
  $(".toggle_mnu").click(function () {
    $(".sandwich").toggleClass("active");
    $('.mob-mnu-bx').toggle();
  });
  $(window).load(function () {
    $(".mcs-horizontal").mCustomScrollbar({
      axis: "x",
      theme: "dark-thick",
      autoExpandScrollbar: true,
      advanced: {
        autoExpandHorizontalScroll: true
      },
      updateOnContentResize: true,
      scrollbarPosition: 'outside',
      scrollInertia: 200
    });
  });
  $('.minus').click(function () {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $('.plus').click(function () {
    var $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  }); // replace custom forms

  jcf.lib.domReady(function () {
    jcf.customForms.replaceAll();
  });
  $(".tab-item .hh").click(function () {
    $(this).parent().children('.tt').toggle();
    $(this).parent().toggleClass('opened');
  });
  $(".cat-opener").click(function () {
    $('.aside-mnu').toggle();
  });
  $(".view-boxes-switch").click(function (event) {
    event.preventDefault();
    $('.view-bx a').removeClass('active');
    $(this).addClass('active');
    $('.view-boxes').show();
    $('.view-lines').hide();
  });
  $(".view-lines-switch").click(function (event) {
    event.preventDefault();
    $('.view-bx a').removeClass('active');
    $(this).addClass('active');
    $('.view-lines').show();
    $('.view-boxes').hide();
  });
  $(".switcher-bx1").change(function () {
    $('.switch-bx1').show();
    $('.switch-bx2').hide();
  });
  $(".switcher-bx2").change(function () {
    $('.switch-bx1').hide();
    $('.switch-bx2').show();
  });
  $('.pop-open1').on('click', function (event) {
    event.preventDefault();
    $('.overlay, .popup-call').fadeIn();
  });
  $('.pop-open2').on('click', function (event) {
    event.preventDefault();
    $('.overlay, .popup-tnx').fadeIn();
  });
  $('.overlay, .close, .btn-close').on('click', function (event) {
    event.preventDefault();
    $('.overlay, .popup').fadeOut();
  });
  $(".year-item .month").click(function () {
    $(this).toggleClass('act');
  });
});
//# sourceMappingURL=maps/common.js.map
