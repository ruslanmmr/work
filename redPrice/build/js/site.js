"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

;

Number.isInteger = Number.isInteger || function (value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};

$(document).ready(function (event) {
  if ($('.mp_wide_slider').length > 0) {
    $('.mp_wide_slider').owlCarousel({
      loop: true,
      nav: false,
      dots: true,
      items: 1,
      margin: 1,
      lazyLoad: true,
      autoplay: true,
      autoplayTimeout: $('.mp_wide_slider__wrapper').data('timeout') * 1000,
      onDrag: mainSliderOnDragCallback,
      onDragged: mainSliderOnDraggedCallback
    });
  }

  if ($('.mp_wide_slider__mobile').length > 0) {
    $('.mp_wide_slider__mobile').owlCarousel({
      loop: true,
      nav: false,
      dots: true,
      items: 1,
      margin: 1,
      lazyLoad: true,
      autoplay: true,
      autoplayTimeout: $('.mp_wide_slider__wrapper__mobile').data('timeout') * 1000,
      onDrag: mainSliderOnDragCallback,
      onDragged: mainSliderOnDraggedCallback
    });
  }

  function mainSliderOnDragCallback(event) {
    var element = $(event.target);
    element.trigger('stop.owl.autoplay');
  }

  function mainSliderOnDraggedCallback(event) {
    var element = $(event.target);
    element.trigger('play.owl.autoplay');
  }

  if ($('.brands_elements').length > 0) {
    $('.brands_elements').owlCarousel({
      loop: false,
      nav: true,
      dots: false,
      autoWidth: true,
      margin: 10,
      lazyLoad: true
    });
  }

  if ($('.product_page__all_previews .row.owl-carousel').length > 0) {
    $('.product_page__all_previews .row.owl-carousel').owlCarousel({
      loop: false,
      nav: true,
      dots: false,
      margin: 0,
      items: 3,
      lazyLoad: true
    });
  }

  if ($('.product_page__see_also__wrapper .product__wrapper__cols').length > 0) {
    $('.product_page__see_also__wrapper .products_catalog__wrapper').owlCarousel({
      loop: false,
      nav: false,
      dots: false,
      lazyLoad: true,
      items: 5,
      margin: 36,
      responsive: {
        0: {
          items: 2,
          margin: 20
        },
        580: {
          items: 3,
          margin: 30
        },
        768: {
          items: 4,
          margin: 35
        },
        992: {
          items: 5,
          margin: 40
        }
      }
    });
  }

  if ($('.popular_elements.owl-carousel').length > 0) {
    $('.popular_elements.owl-carousel').owlCarousel({
      loop: false,
      nav: false,
      dots: false,
      margin: 0,
      autoWidth: true,
      lazyLoad: true
    });
  }

  if ($('.rubrics__mobile__wrapper .rubrics__mobile__container:not(.noclone)').length > 0) {
    if ($('.rubrics__wrapper > ul:first').length > 0) {
      $('.rubrics__mobile__wrapper .rubrics__mobile__container .rubrics__mobile__container__wrapper:not(.noclone)').html($('.rubrics__wrapper > ul:first').clone());
    }
  }

  if ($('.filters__mobile__wrapper .filters__mobile__container').length > 0) {
    if ($('.product_filter').length > 0) {
      $('.filters__mobile__wrapper .filters__mobile__container .filters__mobile__container__wrapper').html($('.product_filter').clone());
      $('.filters__mobile__wrapper .filters__mobile__container .filters__mobile__container__wrapper').append('<div class="filter_mobile_toggler"><a href="#" class="btn_close__page_menu__mobile__container noclone">' + '<svg width="21" height="13" viewBox="-20 -10 21 13" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M0.75069 0L0 14.2631L14.2631 13.5124" transform="translate(0.243469 1.58545) rotate(135)" stroke="#1F1F1F"></path>' + '</svg></a></div>');
      $('.filters__mobile__wrapper .filters__mobile__container .filters__mobile__container__wrapper').addClass('closable');
      $(document).on('click', '.btn_close__page_menu__mobile__container', function (event) {
        if ($('.filters__mobile__container .filters__mobile__container__wrapper').length > 0) {
          var container = $('.filters__mobile__container');

          if (!container.hasClass('filters__mobile__container__shown')) {
            container.addClass('filters__mobile__container__shown');
            container.slideDown(300);
          } else {
            container.slideUp(300);
            setTimeout(function () {
              $('.filters__mobile__container').removeClass('filters__mobile__container__shown');
            }, 310);
          }
        }

        event.preventDefault();
      });

      if ($('.range .slider-margin:not(.noUi-target)').length > 0) {
        initRangeSliders();
      }
    }
  }

  if ($('.sidemenu_mobile__wrapper').length > 0) {
    $('.sidemenu_mobile__wrapper .mobile_menu__wrapper').append($('.header .header_menu').clone());
    $('.header .header__spot').each(function (index) {
      $('.sidemenu_mobile__wrapper .mobile_spots__wrapper').append($(this).clone());
    });
  }

  if ($('.payment_methods__wrapper').not('.payment_methods__wrapper_nojs').length > 0) {
    if ($('.mobile_payment_methods__wrapper').length > 0) {
      $('.mobile_payment_methods__wrapper > .row > div').append($('.payment_methods__wrapper').eq(0).clone());
    }
  }

  if ($('.product_page__navigation_tabs a').length > 0) {
    if ($('#product_parameters_tab table').children().length == 0) {
      $('#content_tab_button').trigger('click');
    } else {
      $('.product_page__navigation_tabs a:first').trigger('click');
    }
  }

  $(window).trigger('resize');
  var ww = $(window).width();
});
$(document).ready(function () {
  var form = $('#catalog_filter_form');

  if (typeof form != 'undefined') {
    var data = form.serializeArray();
    last_check = null;
    $.each(data, function (i, item) {
      var elements = $.find('input[name="' + item.name + '"]');
      $.each(elements, function (i, elem) {
        if ($(elem).attr('type') == 'checkbox') {
          if ($(elem).attr('value') == item.value) {
            var tw = $(elem).parents('.toggler-wrapper:first');
            tw.css('display', 'block');
            tw.siblings('.toggler').addClass('toggler_is_active');
            var chkbx = $(elem).parents('label:first');
            chkbx.find('input').attr('checked', 'checked');
            chkbx.find('span').addClass('checkbox__active');
            last_check = chkbx.find('.checkbox:not(.disabled)');
          }
        } else if ($(elem).attr('type') == 'radio') {
          if ($(elem).attr('value') == item.value) {}
        }
      });
    });

    if (last_check != null) {
      refreshProductsCount($(last_check), display_quick_button = false);
    }
  }
});
$(document).ready(function (event) {
  if ($('.footer__bottom-panel .bottom_cart').length > 0) {
    var cart = $('#order_cart');
    var cartPriceBtn = $('.footer__bottom-panel .footer__basket-sum');
    var cartPriceNum = $('.footer__bottom-panel .footer__basket-number');
    var url = cart.attr('data-ajax-cart-total');
    $.ajax({
      method: 'get',
      url: url,
      dataType: 'json'
    }).done(function (result) {
      var newCartSummary = parseFloat(result['total_cost']);
      var newCartCount = parseInt(result['total_count']);

      if (Number.isInteger(newCartCount)) {
        cartPriceNum.html(newCartCount);
        cartPriceBtn.html(newCartSummary.toString() + ' р.');
      } else {
        cartPriceNum.html('0');
        cartPriceBtn.html('00.00 р.');
      }
    });
  }
});
$(window).resize(function () {
  responsiveProductCols();
  responsivePopularCats();
  compileProductForLaptop();
  rangeSliderReDraw();
  var ww = $(window).width();

  if (ww <= 768) {
    $('.catalog_actions__wrapper .row .text-center').hide();
    $('.catalog_actions__wrapper .row .text-right').hide();
    $('.footer___bottom_panel .footer_btn__wrapper .footer_btn span.hidden_caption').hide();
    $('.category-top-products').hide();
    $('.footer .footer__wrapper .footer_catalog').hide();
    $('.price_list_button_wrapper').show();
  } else {
    $('.catalog_actions__wrapper .row .text-center').show();
    $('.catalog_actions__wrapper .row .text-right').show();
    $('.footer___bottom_panel .footer_btn__wrapper .footer_btn span.hidden_caption').show();
    $('.category-top-products').show();
    $('.footer .footer__wrapper .footer_catalog').show();
    $('.price_list_button_wrapper').hide();
  }
});
$(window).scroll(function () {
  var wst = $(window).scrollTop();

  if (wst > $('.header__mobile__wrapper').outerHeight()) {
    $('.header_mobile_toggler').addClass('header_mobile_toggler__scroll');
  } else {
    $('.header_mobile_toggler').removeClass('header_mobile_toggler__scroll');
  }
});
var waypoint = null;

function initWaypoint() {
  var is_main_page = null;
  var receiver = null;
  var elements = null;

  if (window.location.pathname == '/') {} else {
    is_main_page = false;
    elements_selector = '.products_catalog__wrapper__shown .row .product-col';
    receiver = $('.products_catalog__wrapper__shown .product-list');
  }

  var element = $('.products_catalog__wrapper__shown');

  if (element.length > 0 && typeof elements_selector != 'undefined') {
    waypoint = new Waypoint({
      element: element,
      handler: function handler() {
        ajaxUploadProduct(receiver, elements_selector, is_main_page);
      },
      offset: 'bottom-in-view'
    });
  }
}

$(document).on('click', '.pagination .page-item .page-link:not(.company-page-link)', function (event) {
  var isShowDots = $('.page-item').hasClass('show_dots');

  if (!isShowDots) {
    event.preventDefault();
    var set_links_pagination = $('.pagination .page-item .page-link');
    var current_page = parseInt($('.pagination .page-item.active .page-link').data('page'));
    var self = $(this);
    var page = 1;
    var last_page = parseInt(set_links_pagination.slice(-2, -1).data('page'));

    if (self[0] === set_links_pagination[0] && current_page > 1) {
      page = current_page - 1;
    } else if (self[0] === set_links_pagination.slice(-1)[0] && current_page < last_page) {
      page = current_page + 1;
    } else if (self[0] === set_links_pagination[0] && current_page == 1) {
      return;
    } else if (self[0] === set_links_pagination.slice(-1)[0] && current_page === last_page) {
      return;
    } else {
      page = parseInt(self.data('page'));
    }

    var receiver = $('.products_catalog__wrapper__shown .product-list');
    var elements_selector = '.products_catalog__wrapper__shown .row .product-col';
    var is_main_page = false;
    ajaxUploadProduct(receiver, elements_selector, is_main_page, undefined, undefined, page);
    var pageItem = set_links_pagination.eq(page).parent('li');
    select_active_pagination_button(pageItem);
  }
});
$(document).on('click', '.pagination .page-item .page-link:not(.company-page-link)', function (event) {
  var pageItems = $('.page-item:not(.show_dots)');
  var isShowDots = $('.page-item').hasClass('show_dots');
  var currentPageItemActive = $('.page-item.active');
  var indexCurrentPageItemActive = pageItems.index(currentPageItemActive);
  var pageLinkActive = $(event.target);
  var pageItemActive = pageLinkActive.parents('li');

  if (isShowDots) {
    var page = '';
    event.preventDefault();
    var indexPageItemActive = pageItems.index(pageItemActive);
    var dots = $('.page-item.show_dots');
    var dotsClone = dots.clone();
    var indexPageItemActive = pageItems.index(pageItemActive);

    if (indexPageItemActive !== 0 && indexPageItemActive !== 1 && indexPageItemActive !== pageItems.index(pageItems.last()) - 1 && indexPageItemActive !== pageItems.index(pageItems.last()) && !pageItemActive.hasClass('prev_button') && !pageItemActive.hasClass('next_button')) {
      if ($(pageItemActive).hasClass('page_range_first')) {
        var nextPageItem = pageItems.eq(indexPageItemActive + 1);

        if (!nextPageItem.hasClass('page_range_third')) {
          nextPageItem.addClass('page_range_first');
          nextPageItem.show();
          dotsClone.insertAfter(nextPageItem);
          pageItems.eq(indexPageItemActive - 1).hide();
          dots.remove();
        }
      }

      if ($(pageItemActive).hasClass('page_range_third')) {
        var previousPageItem = pageItems.eq(indexPageItemActive - 1);

        if (!previousPageItem.hasClass('page_range_first')) {
          previousPageItem.addClass('page_range_third');
          previousPageItem.show();
          dotsClone.insertBefore(previousPageItem);
          pageItems.eq(indexPageItemActive + 1).hide();
          dots.remove();
        }
      }

      page = pageItemActive;
    } else if (pageItemActive.hasClass('prev_button')) {
      if (currentPageItemActive.hasClass('page_range_first')) {
        var previousPageItem = pageItems.eq(indexCurrentPageItemActive - 1);

        if (previousPageItem !== pageItemActive && indexCurrentPageItemActive !== 1) {
          previousPageItem.show();
          pageItems.eq(indexCurrentPageItemActive + 1).removeClass('page_range_first');
          pageItems.eq(indexCurrentPageItemActive + 1).hide();
          dotsClone.insertAfter(currentPageItemActive);
          dots.remove();
          page = previousPageItem;
        } else {
          return;
        }
      } else if (currentPageItemActive.hasClass('page_range_third')) {
        var previousPageItemActive = pageItems.eq(indexCurrentPageItemActive - 1);
        var previousPageItemNoActive = pageItems.eq(indexCurrentPageItemActive - 2);

        if (!previousPageItemNoActive.hasClass('page_range_first')) {
          previousPageItemNoActive.addClass('page_range_third');
          previousPageItemActive.addClass('page_range_third');
          previousPageItemNoActive.show();
          previousPageItemActive.show();
          dotsClone.insertBefore(previousPageItemNoActive);
          currentPageItemActive.hide();
          dots.remove();
          page = previousPageItemActive;
        } else {
          return;
        }
      }
    } else if (pageItemActive.hasClass('next_button')) {
      if (currentPageItemActive.hasClass('page_range_third')) {
        var nextPageItem = pageItems.eq(indexCurrentPageItemActive + 1);

        if (pageItems.index(nextPageItem) !== pageItems.index(pageItemActive)) {
          nextPageItem.show();
          pageItems.eq(indexCurrentPageItemActive - 1).removeClass('page_range_third');
          pageItems.eq(indexCurrentPageItemActive - 1).hide();
          dotsClone.insertBefore(currentPageItemActive);
          dots.remove();
          page = nextPageItem;
        } else {
          return;
        }
      } else if (currentPageItemActive.hasClass('page_range_first')) {
        var nextPageItemActive = pageItems.eq(indexCurrentPageItemActive + 1);
        var nextPageItemNoActive = pageItems.eq(indexCurrentPageItemActive + 2);

        if (!nextPageItemNoActive.hasClass('page_range_third')) {
          nextPageItemNoActive.addClass('page_range_first');
          nextPageItemActive.addClass('page_range_first');
          nextPageItemNoActive.show();
          nextPageItemActive.show();
          dotsClone.insertAfter(nextPageItemNoActive);
          currentPageItemActive.hide();
          dots.remove();
          page = nextPageItemActive;
        } else {
          return;
        }
      }
    } else if (indexPageItemActive === 1 || indexPageItemActive === pageItems.index(pageItems.last()) - 1) {
      page = pageItemActive;
    }

    var receiver = $('.products_catalog__wrapper__shown .product-list');
    var elements_selector = '.products_catalog__wrapper__shown .row .product-col';
    var is_main_page = false;
    var pageNumber = page.children().data('page');
    ajaxUploadProduct(receiver, elements_selector, is_main_page, undefined, undefined, pageNumber);
    select_active_pagination_button(page);
  }
});

function select_active_pagination_button(page) {
  var buttonsPagination = $('.pagination .page-item');
  buttonsPagination.removeClass('active');
  page.addClass('active');
}

function ajaxUploadProduct(receiver, elements_selector, is_main_page, price_order, reload, page) {
  var data = [];

  if (price_order === undefined) {
    price_order = null;
  }

  if (reload === undefined) {
    reload = false;
  }

  var shown_wrapper = $('.products_catalog__wrapper__shown');
  var wide = $('.product-col').first().hasClass('product-col-wide') ? 'rows' : 'cols';
  var sort_asc = $('#sort_asc');

  if (sort_asc.hasClass('catalog_price__sorter__selected') || sort_asc.hasClass('selected')) {
    price_order = 'asc';
  }

  var sort_desc = $('#sort_desc');

  if (sort_desc.hasClass('catalog_price__sorter__selected') || sort_desc.hasClass('selected')) {
    price_order = 'desc';
  }

  var id = shown_wrapper.attr('id');
  var form = $('#catalog_filter_form');
  var path = window.location.pathname;
  var pathArray = path.split('/');
  var category_slug = pathArray[pathArray.length - 2];

  if (typeof form != 'undefined') {
    data = form.serializeArray();
  }

  data.push({
    name: 'display_id',
    value: id
  });
  data.push({
    name: 'wide',
    value: wide
  });
  data.push({
    name: 'shown_count',
    value: $(elements_selector).length
  });
  data.push({
    name: 'page',
    value: page
  });
  data.push({
    name: 'is_main_page',
    value: is_main_page
  });

  if (price_order != null) {
    data.push({
      name: 'price_order',
      value: price_order
    });
  }

  if (typeof category_slug != 'undefined' && category_slug != '') {
    data.push({
      name: 'category_slug',
      value: category_slug
    });
  }

  $.ajax({
    type: 'GET',
    url: '/catalog/ajax_upload_product/',
    data: $.param(data),
    dataType: "html"
  }).done(function (result) {
    result = JSON.parse(result);
    receiver.html(result.html);
    $('html, body').animate({
      scrollTop: $("h1").offset().top
    }, "fast");

    if (price_order && page === undefined) {
      select_active_pagination_button(1);
    }
  });
}

$(document).on('click', '[data-scrolly]', function (event) {
  var self = $(this);
  var toObj = $(self.attr('href'));
  $('html, body').animate({
    scrollTop: toObj.offset().top - 45
  }, 300);
  toObj = null;
  event.preventDefault();
});
$(document).on('click', '.popupme', function (event) {
  var self = $(this);
  var modal = $('[id=' + self.attr('data-popup-name') + ']');

  if (modal.hasClass('dialog--open')) {
    console.log('close');
    modal.addClass('dialog--close');
    modal.removeClass('dialog--open');
  } else {
    modal.addClass('dialog--open');
    modal.removeClass('dialog--close');
    modal.find('.popup-screen-1').slideDown(50);
    modal.find('.popup-screen-2').slideUp(50);
  }

  modal = null;
  self = null;
  event.preventDefault();
});
$(document).on('click', '.close-popup, .dialog .dialog__overlay', function (event) {
  event.preventDefault();
  var self = $(this);
  var modal = self.parents('.dialog');

  if (modal.hasClass('dialog--open')) {
    modal.addClass('dialog--close');
    modal.removeClass('dialog--open');
  }

  modal = null;
  self = null;
});
$(document).on('mouseover', '.rubrics__wrapper > ul > li', function (event) {
  var self = $(this);
  $('.rubrics__wrapper > ul > li').removeClass('hovered');
  $('.rubrics__wrapper > ul > li').each(function () {
    $(this).find('a span img.icon').attr('src', $(this).attr('data-icon'));
  });
  $('.rubrics__wrapper > ul > li > ul').css({
    right: '0%',
    display: 'none'
  });
  var subMenu = self.find('> ul');

  if (subMenu.length > 0) {
    self.addClass('hovered');
    subMenu.css({
      right: '-100%',
      display: 'block'
    });
  }

  if (self.hasClass('hovered')) {
    self.find('a span img.icon').attr('src', self.attr('data-white-icon'));
  } else {
    self.find('a span img.icon').attr('src', self.attr('data-icon'));
  }

  subMenu = null;
  self = null;
  event.preventDefault();
});
$(document).on('mouseleave', '.rubrics__wrapper > ul > li > ul', function (event) {
  $(this).css({
    right: '0%',
    display: 'none'
  });
  $('.rubrics__wrapper > ul > li.hovered').find('a span img.icon').attr('src', $('.rubrics__wrapper > ul > li.hovered').attr('data-icon'));
  $('.rubrics__wrapper > ul > li').removeClass('hovered');
  event.preventDefault();
});
$(document).on('mouseleave', '.rubrics__wrapper > ul', function (event) {
  $('.rubrics__wrapper > ul > li > ul').css({
    right: '0%',
    display: 'none'
  });
  $('.rubrics__wrapper > ul > li.hovered').find('a span img.icon').attr('src', $('.rubrics__wrapper > ul > li.hovered').attr('data-icon'));
  $('.rubrics__wrapper > ul > li').removeClass('hovered');
  event.preventDefault();
});
$(document).on('mouseover', '.rubrics__wrapper__single > ul > li', function (event) {
  var self = $(this);
  self.find('a span img.icon').attr('src', self.attr('data-white-icon'));
});
$(document).on('mouseleave', '.rubrics__wrapper__single > ul > li', function (event) {
  var self = $(this);
  self.find('a span img.icon').attr('src', self.attr('data-icon'));
});
$(document).on('click', '.search__wrapper > .search__actions > .search__example', function (event) {
  $('.search__wrapper > input').val($('.search__wrapper > .search__actions > .search__example span').html());
  $('.search__wrapper > .search__actions > .search__example').fadeOut(150);
  event.preventDefault();
});
$(document).on('blur', '.search__wrapper > input', function (event) {
  var self = $(this);

  if (self.val().length <= 0) {
    $('.search__wrapper > .search__actions > .search__example').fadeIn(150);
  }

  event.preventDefault();
});
$(document).on('click', '.product_page__navigation_tabs a', function (event) {
  var self = $(this);

  if (!self.hasClass('navigation_tab__active')) {
    $('.product_page__navigation_tabs a').removeClass('navigation_tab__active');
    $('.product_page__tab_content__wrapper').fadeOut(300).removeClass('product_page__tab_content__wrapper__shown');
    self.addClass('navigation_tab__active');
    $('[id=' + self.attr('data-tab-content') + ']').stop().fadeIn(300).addClass('product_page__tab_content__wrapper__shown');
    Waypoint.refreshAll();
  }

  event.preventDefault();
});
$(document).on('click', '.mainpage_catalog a', function (event) {
  var self = $(this);

  if (!self.hasClass('navigation_tab__active')) {
    $('.mainpage_catalog a').removeClass('navigation_tab__active');
    $('.products_catalog__wrapper').removeClass('products_catalog__wrapper__shown');
    self.addClass('navigation_tab__active');
    $('.products_catalog__wrapper').stop().fadeOut(300);
    $('.products_catalog__wrapper[id=' + self.attr('data-tab-content') + ']').stop().fadeIn(300).addClass('products_catalog__wrapper__shown');
  } else if (self.hasClass('navigation_tab__active') && $('.products_catalog__wrapper[id=' + self.attr('data-tab-content') + ']').hasClass('products_catalog__wrapper__shown') == 0) {
    $('.products_catalog__wrapper').stop().fadeOut(300);
    $('.products_catalog__wrapper[id=' + self.attr('data-tab-content') + ']').stop().fadeIn(300).addClass('products_catalog__wrapper__shown');
  }

  event.preventDefault();
});
$(document).on('click', '.custom_select__wrapper > .caption', function (event) {
  var self = $(this);
  var subMenu = self.next('ul');

  if (!self.hasClass('sort_select__active')) {
    self.addClass('sort_select__active');
    subMenu.slideDown('150');
  } else {
    self.removeClass('sort_select__active');
    subMenu.slideUp('150');
  }

  event.preventDefault();
});
$(document).on('click', '.custom_select__wrapper:not(.sort_select__wrapper):not(.company__sort_select__wrapper) > ul li a', function (event) {
  console.log('click selector');
  var self = $(this);
  var subMenu = self.parents('ul:first');
  var parent = self.parents('.custom_select__wrapper:first');

  if (!self.hasClass('selected')) {
    parent.find('> ul li a').removeClass('selected');
    parent.find('.caption').removeClass('sort_select__active').find('> span:first').html(self.html());
    self.addClass('selected');
    subMenu.slideUp('150');
  }

  event.preventDefault();
});

function priceSort(asc) {
  if (asc === undefined) {
    asc = 'sort_asc';
  }

  var is_main_page = null;
  var receiver = null;

  if (window.location.pathname == '/') {
    var sort_by_price = function sort_by_price(a, b) {
      if (asc == 'sort_asc') {
        return parseFloat($(a).attr('data-price')) > parseFloat($(b).attr('data-price')) ? 1 : -1;
      } else {
        return parseFloat($(a).attr('data-price')) < parseFloat($(b).attr('data-price')) ? 1 : -1;
      }
    };

    var wrapper_list = $('.products_catalog__wrapper').get();
    var wrapper_arr = [].slice.call(wrapper_list);
    wrapper_arr.forEach(function (wrapper) {
      var list = $(wrapper).find('.product__wrapper');
      var arr = [].slice.call(list).sort(sort_by_price);
      $(wrapper).html('');
      arr.forEach(function (elem) {
        $(wrapper).append(elem);
      });
    });
  } else {
    is_main_page = false;
    receiver = $('.products_catalog__wrapper__shown .product-list');
    ajaxUploadProduct(receiver, 0, is_main_page, null, true);
  }
}

function priceTopProductSort(asc) {
  if (asc === undefined) {
    asc = 'sort_asc';
  }

  is_top = true;
  receiver = $('.product-list');
  ajaxUploadProduct(receiver, 0, is_top, null, true);
}

$(document).on('click', '.sort_select__wrapper > ul li a', function (event) {
  var self = $(this);
  var subMenu = self.parents('ul:first');

  if (!self.hasClass('selected')) {
    $('.sort_select__wrapper > ul li a').removeClass('selected');
    $('.custom_select__wrapper > .caption').removeClass('sort_select__active');
    self.addClass('selected');
    subMenu.slideUp('150');
    $('.sort_select__wrapper > .caption > span').first().text(self.html());

    if (self.attr('id') == 'sort_default') {
      window.location = self.attr('data-location');
    } else {
      priceTopProductSort(asc = self.attr('id'));
    }
  }

  event.preventDefault();
});
$(document).on('click', '.catalog_view__toggler a', function (event) {
  var self = $(this);
  var subMenu = self.parents('ul:first');

  if (!self.hasClass('catalog_actions__selected')) {
    subMenu.find('a').removeClass('catalog_actions__selected');
    self.addClass('catalog_actions__selected');

    if (self.attr('data-view-attr') == 'cols') {
      if ($('.products_catalog__wrapper .product__wrapper:not(.product__wrapper__cols):not(.product__wrapper__category)').length > 0) {
        $('.products_catalog__wrapper .product__wrapper:not(.product__wrapper__category)').addClass('product__wrapper__cols');

        if ($('.products_catalog__category__wrapper').length > 0) {
          $('.products_catalog__category__wrapper .product-col:not(.product-col-cats)').removeClass('product-col-wide');
        }

        $('.prodname__truncated').css('display', 'block');
        $('.prodname__full').css('display', 'none');
        responsiveProductCols();
      } else {
        return false;
      }
    } else {
      if ($('.products_catalog__wrapper .product__wrapper.product__wrapper__cols').length > 0) {
        $('.products_catalog__wrapper .product__wrapper').removeClass('product__wrapper__cols');

        if ($('.products_catalog__category__wrapper').length > 0) {
          $('.products_catalog__category__wrapper .product-col:not(.product-col-cats)').addClass('product-col-wide');
        }

        $('.prodname__truncated').css('display', 'none');
        $('.prodname__full').css('display', 'block');
      } else {
        return false;
      }
    }

    Waypoint.refreshAll();
  }

  event.preventDefault();
});
$(document).on('click touchend', '.custom_checkbox span', function (event) {
  event.preventDefault();
  var self = $(this).parent('.custom_checkbox');
  var checkbox = $('.custom_checkbox input');

  if (!self.hasClass('custom_checkbox__checked')) {
    self.addClass('custom_checkbox__checked');
    checkbox.attr('checked', 'checked');
    $(this).find('svg').show();
  } else {
    self.removeClass('custom_checkbox__checked');
    checkbox.removeAttr('checked');
    $(this).find('svg').hide();
  }
});
$(document).ready(function (event) {
  $('.custom_checkbox input').each(function (index, element) {
    if ($(element).attr('checked') == true || $(element).attr('checked') == 'checked') {
      $(element).parents('.custom_checkbox').addClass('custom_checkbox__checked');
    }
  });
});
$(document).on('click', '.rubrics__wrapper__interactive .rubrics_headline', function (event) {
  var headline = $(this);
  var menu = headline.parents('.rubrics__wrapper__interactive:first').find('> ul:first');

  if ($('.rubrics__wrapper__interactive__layout').length <= 0) {
    $('body').append('<div class="rubrics__wrapper__interactive__layout">&nbsp;</div>');
  }

  var layout = $('.rubrics__wrapper__interactive__layout');

  if (!menu.hasClass('ul_menu_shown')) {
    menu.addClass('ul_menu_shown').slideDown(300);
    headline.addClass('rubrics_headline_top');
    layout.fadeIn(300);
  } else {
    menu.removeClass('ul_menu_shown').slideUp(300);
    layout.fadeOut(300);
    setTimeout(function () {
      $('.rubrics__wrapper__interactive .rubrics_headline').removeClass('rubrics_headline_top');
    }, 320);
  }

  event.preventDefault();
});
$(document).on('click', '.toggle_inline_menu', function (event) {
  var form = $('.inline_order_form__wrapper form');
  var wrapper = $('.inline_order_form__wrapper');

  if (!wrapper.hasClass('inline_order_form__wrapper__shown')) {
    wrapper.addClass('inline_order_form__wrapper__shown');
    form.slideDown(300);
    $(this).slideUp(300).remove();
    $('html, body').animate({
      scrollTop: wrapper.offset().top - 10
    }, 200);
  }

  event.preventDefault();
  return false;
});
$(document).on('click', '.rubrics__wrapper__interactive__layout', function (event) {
  if ($('.rubrics__wrapper__interactive').length > 0) {
    $('.rubrics__wrapper__interactive > ul').removeClass('ul_menu_shown').slideUp(300);
    $('.rubrics__wrapper__interactive .rubrics_headline').removeClass('rubrics_headline_top');
    $('.rubrics__wrapper__interactive__layout').fadeOut(300);
  }

  event.preventDefault();
});
$(document).on('click', '.rubrics__mobile__wrapper .col-12 .rubrics__mobile__toggler:not(.company_rubrics__mobile__toggler)', function (event) {
  if ($('.rubrics__mobile__container .rubrics__mobile__container__wrapper > ul:first').length > 0) {
    var container = $('.rubrics__mobile__container');

    if (!container.hasClass('rubrics__mobile__container__shown')) {
      container.addClass('rubrics__mobile__container__shown');
      container.slideDown(300);
    } else {
      container.slideUp(300);
      setTimeout(function () {
        $('.rubrics__mobile__container').removeClass('rubrics__mobile__container__shown');
      }, 310);
    }
  }

  event.preventDefault();
});
$(document).on('click', '.filters__mobile__toggler', function (event) {
  if ($('.filters__mobile__container .filters__mobile__container__wrapper > .product_filter').length > 0) {
    var container = $('.filters__mobile__container');

    if (!container.hasClass('filters__mobile__container__shown')) {
      container.addClass('filters__mobile__container__shown');
      container.slideDown(300);
      rangeSliderReDraw();
    } else {
      container.slideUp(300);
      setTimeout(function () {
        $('.filters__mobile__container').removeClass('filters__mobile__container__shown');
      }, 310);
    }
  }

  event.preventDefault();
});
$(document).on('click', '.header_mobile_toggler , .sidemenu_mobile__close_btn', function (event) {
  if ($('.sidemenu_mobile__wrapper').length > 0) {
    var mobileMenu = $('.sidemenu_mobile__wrapper');

    if (!mobileMenu.hasClass('sidemenu_mobile__wrapper__shown')) {
      mobileMenu.addClass('sidemenu_mobile__wrapper__shown');
      mobileMenu.css({
        left: 0
      });
    } else {
      mobileMenu.removeClass('sidemenu_mobile__wrapper__shown');
      mobileMenu.css({
        left: '-200vw'
      });
    }
  }

  event.preventDefault();
});
$(document).on('click', '.product__wrapper:not(.product__wrapper__cols) .single_price', function (event) {
  if ($('.price_info_modal').length > 0) {
    var self = $(this);
    var popup = $('.price_info_modal');
    var left = parseInt(self.offset().left) - parseInt(self.outerWidth() / 2);
    popup.removeClass('price_info_modal__shown');

    if (!popup.hasClass('price_info_modal__shown')) {
      popup.addClass('price_info_modal__shown');
      popup.css({
        left: left + 'px',
        top: parseInt(self.offset().top) - 15 + 'px'
      });
      popup.stop().fadeIn(300);
    } else {
      popup.css({
        left: left + 'px',
        top: parseInt(self.offset().top) - 15 + 'px'
      });
    }
  }

  event.preventDefault();
});
$(document).on('click', '.price_info_modal .close-btn', function (event) {
  var popup = $('.price_info_modal');
  popup.removeClass('price_info_modal__shown');
  popup.stop().fadeOut(300);
  setTimeout(function () {
    $('.price_info_modal').removeAttr('style');
  }, 310);
  event.preventDefault();
});
$(document).on('click', '.btn-credit', function (event) {
  if ($('.credit_info_modal').length > 0) {
    var self = $(this);
    var popup = $('.credit_info_modal');
    var left = parseInt(self.offset().left) - parseInt(self.outerWidth() / 5);

    if ($(window).width() <= 575) {
      left = parseInt(parseInt($(window).width()) - parseInt(popup.outerWidth())) / 2;
    }

    popup.removeClass('credit_info_modal__shown');

    if (!popup.hasClass('credit_info_modal__shown')) {
      popup.addClass('credit_info_modal__shown');
      popup.css({
        left: left + 'px',
        top: parseInt(self.offset().top) - 10 + 'px'
      });
      popup.stop().fadeIn(300);
    } else {
      popup.css({
        left: left + 'px',
        top: parseInt(self.offset().top) - 10 + 'px'
      });
    }
  }

  event.preventDefault();
});
$(document).on('click', '.credit_info_modal .close-btn', function (event) {
  var popup = $('.credit_info_modal');
  popup.removeClass('credit_info_modal__shown');
  popup.stop().fadeOut(300);
  setTimeout(function () {
    $('.credit_info_modal').removeAttr('style');
  }, 310);
  event.preventDefault();
});

function updateBottomBlackCart(result, cartPriceNum, cartPriceBtn) {
  if (result.success) {
    cartPriceNum.html(result.total_count);
    cartPriceBtn.html(result.total_cost + ' р.');
    showNotification($('.footer__basket-number'), 'Товар добавлен в корзину', '/cart/');
  } else {
    cartPriceNum.html('0');
    cartPriceBtn.html('0.00 р.');
  }
}

$(document).on('click', '.btn_add_to_cart', function (event) {
  var self = $(this);

  if ($('.footer__basket').length > 0) {
    var url = $('#order_cart').attr('data-ajax-url');
    var productId = self.attr('data-product-id');
    var cartCountInt = self.parents('.buy__wrapper').find('input[name="count"]').val().replace(/\D/g, '');
    var cartPriceBtn = $('.footer__bottom-panel .bottom_cart .footer__basket-sum');
    var cartPriceNum = $('.footer__bottom-panel .bottom_cart .footer__basket-number');
    $.ajax({
      method: 'get',
      url: url,
      data: {
        'product_id': productId,
        'count': cartCountInt
      },
      dataType: 'json'
    }).done(function (result) {
      updateBottomBlackCart(result, cartPriceNum, cartPriceBtn);
    });
  }

  event.preventDefault();
});

function addToCartFromCalculator(productId, cartCountInt) {
  if ($('.footer_btn.bottom_cart').length > 0) {
    var url = $('#order_cart').attr('data-ajax-url');
    var cartPriceBtn = $('.footer__bottom-panel .bottom_cart .footer__basket-sum');
    var cartPriceNum = $('.footer__bottom-panel .bottom_cart .footer__basket-number');
    $.ajax({
      method: 'get',
      url: url,
      data: {
        'product_id': productId,
        'count': cartCountInt
      },
      dataType: 'json'
    }).done(function (result) {
      updateBottomBlackCart(result, cartPriceNum, cartPriceBtn);
    });
  }
}

function addProductToCart(self) {
  if ($('.footer__bottom-panel .bottom_cart').length > 0) {
    var cartCount = $('.counter__wrapper input[name="count"]');
    var url = $('#order_cart').attr('data-ajax-url');
    var cartCountInt = cartCount.val();
    var cartPrice = cartCount.attr('data-single-price');
    var productId = cartCount.attr('data-product-id');
    var cartPriceBtn = $('.footer__bottom-panel .bottom_cart .footer__basket-sum');
    var cartPriceNum = $('.footer__bottom-panel .bottom_cart .footer__basket-number');
    console.log('add product id=' + productId + ' price=' + cartPrice + ' count=' + cartCountInt);
    $.ajax({
      method: 'get',
      url: url,
      data: {
        'product_id': productId,
        'count': cartCountInt
      },
      dataType: 'json'
    }).done(function (result) {
      updateBottomBlackCart(result, cartPriceNum, cartPriceBtn);
    });
  }
}

$(document).on('click', '.btn_add_product_to_cart', function (event) {
  var self = $(this);
  addProductToCart(self);
  event.preventDefault();
});
$(document).on('click', '.btn_buy_now', function (event) {
  var form = $('.inline_order_form__wrapper form');
  var wrapper = $('.inline_order_form__wrapper');

  if (!wrapper.hasClass('inline_order_form__wrapper__shown')) {
    wrapper.addClass('inline_order_form__wrapper__shown');
    form.slideDown(300);
    $('html, body').animate({
      scrollTop: wrapper.offset().top - 10
    }, 200);
  }

  $('form[name="feedback_form"] textarea[name="text"]').val($('.product_page__top__wrapper h1:first').html());
});
$(document).on('click', '.btn_submit_order, .footer__basket-number', function (event) {
  var url = $('#order_cart button').attr('data-url');
  window.location.href = url;
  event.preventDefault();
});
$(document).on('click', '.btn_add_to_compare', function (event) {
  if ($('.footer_btn.btn_compare').length > 0) {
    var count = $('.footer_btn.btn_compare .caption');
    count.html(parseInt(count.html()) + 1);
    showNotification($('.footer_btn.btn_compare'), '1 товар добавлен к сравнению', 'ссылка на страницу СРАВНЕНИЕ');
  }

  event.preventDefault();
});
$(document).on('click', '.btn_add_to_favorite', function (event) {
  if ($('.footer_btn.btn_favorite').length > 0) {
    var count = $('.footer_btn.btn_favorite .caption');
    count.html(parseInt(count.html()) + 1);
    showNotification($('.footer_btn.btn_favorite'), '1 товар добавлен в избранное', 'ссылка на страницу ИЗБРАННОЕ');
  }

  event.preventDefault();
});

function feedbackFormHandler() {
  var self = $('form[name="feedback_form"]');
  var data = self.serializeArray();
  $.ajax({
    type: 'POST',
    url: '/feedback/message/',
    data: data,
    dataType: 'json'
  }).done(function (response) {
    $('.input_error__message').each(function () {
      $(this).remove();
    });
    $(self).find('.form-control').each(function () {
      $(this).removeClass('input_error__state');
    });

    if (response['success']) {
      $(self).find('input[name="name"]').val('');
      $(self).find('input[name="email"]').val('');
      $(self).find('input[name="phone"]').val('');
      $(self).find('textarea[name="message"]').val('');
      $(self).find('input[name="agree"]').removeAttr('checked');
      $(self).find('label.custom_checkbox').removeClass('custom_checkbox__checked');
      $(self).find(':submit').notify('Ваше сообщение отправлено!', 'success', {
        position: "right"
      });
    } else {
      for (var f in response.errors) {
        var msg = '<p class="input_error__message">' + response.errors[f] + '</p>';

        if (f == 'agree') {
          $(self).find('label.custom_checkbox').append(msg);
        } else {
          var input = $(self).find('[name="' + f + '"]');
          input.addClass('input_error__state');
          input.parents('div.form-group:first').append(msg);
        }
      }
    }
  });
}

$(document).on('mouseover mouseleave click', '.review__form .ratio__wrapper__interactive a', function (event) {
  var self = $(this);

  switch (event.type) {
    case 'mouseover':
      self.removeClass('empty');
      self.prevAll('a').removeClass('empty');
      break;

    case 'mouseleave':
      $('.review__form .ratio__wrapper__interactive a').addClass('empty');
      break;

    case 'click':
      self.removeClass('empty');
      self.removeClass('active');
      $('.review__form .ratio__wrapper__interactive a').addClass('empty');
      $('.review__form .ratio__wrapper__interactive a').removeClass('active');
      self.addClass('active');
      self.prevAll('a').addClass('active');
      $('.review__form input[name=rating_value]').val(self.attr('data-rate-value'));
      break;
  }

  self = null;
  event.preventDefault();
});

function refreshCaptcha() {
  $.getJSON("/captcha/refresh/", function (result) {
    $('.captcha').attr('src', result['image_url']);
    $('#id_captcha_0').val(result['key']);
  });
}

$('#review_form').on('submit', function (event) {
  event.preventDefault();
  var form = $(this);
  var data = form.serializeArray();
  $.ajax({
    type: "POST",
    url: form.attr('action'),
    data: $.param(data),
    dataType: "json",
    success: function success(response) {
      $(form).html('<span class="success">Ваш отзыв добавлен и будет показан на сайте сразу после прохождения модерации.</span>');
    },
    error: function error(response) {
      var fields = {
        'review': 'Текст отзыва',
        'name': 'Ваше имя',
        'captcha': 'Код с картинки'
      };
      var message = 'Пожалуйста, исправьте ошибки: \n\n';

      if ('__all__' in response.responseJSON.errors) {
        message = response.responseJSON.errors['__all__'].join(', ');
      } else {
        for (var f in response.responseJSON.errors) {
          message += fields[f] + ': ' + response.responseJSON.errors[f].join(', ') + '\n';
        }
      }

      $(form).find(':submit').notify(message, {
        position: "right"
      });
    }
  });
  refreshCaptcha();
});
$('.js-captcha-refresh').click(function () {
  refreshCaptcha();
});

function responsiveProductCols() {
  var ww = $(window).width();

  if (ww <= 1180 && ww >= 768) {
    if ($('.products_catalog__wrapper .product__wrapper.product__wrapper__cols').length > 0) {
      window.productBiggestHeight = 0;
      $('.products_catalog__wrapper .product__wrapper.product__wrapper__cols').attr('style', '');
    }
  } else if (ww <= 768) {
    if ($('.products_catalog__wrapper .product__wrapper:not(.product__wrapper__cols)').length > 0) {
      $('.products_catalog__wrapper .product__wrapper:not(.product__wrapper__cols)').stop().addClass('product__wrapper__cols');
    }
  }

  if ($('.price_info_modal').length > 0) {
    $('.price_info_modal').removeClass('price_info_modal__shown');
    $('.price_info_modal').stop().fadeOut(300);
    setTimeout(function () {
      $('.price_info_modal').removeAttr('style');
    }, 310);
  }

  if ($('.credit_info_modal').length > 0) {
    $('.credit_info_modal').removeClass('credit_info_modal__shown');
    $('.credit_info_modal').stop().fadeOut(300);
    setTimeout(function () {
      $('.credit_info_modal').removeAttr('style');
    }, 310);
  }
}

function responsivePopularCats() {
  if ($('.popular_elements__wrapper .popular_elements .owl-stage').length > 0) {
    $('.popular_elements__wrapper .popular_elements .owl-stage .owl-item a').css({
      height: $('.popular_elements__wrapper .popular_elements .owl-stage').outerHeight() + 'px'
    });
  }
}

var mobileOwls = null;
$(document).on("click", ".mainpage_catalog__headline_js", function (event) {
  var self = $(this);

  if (self.hasClass('_active')) {
    self.removeClass('_active');
    self.next('.mainpage_catalog__mobile_toggle__contaner').slideUp(300);
  } else {
    self.addClass('_active');
    self.next('.mainpage_catalog__mobile_toggle__contaner').slideDown(300);
  }

  event.preventDefault();
});

function validateNumsOnly(event) {
  var charCode = event.which ? event.which : event.keyCode;
  return !(charCode > 31 && (charCode < 48 || charCode > 57));
}

$(document).on('click', '.counter__wrapper a', function (event) {
  var btn = $(this);
  var input = btn.parents('.counter__wrapper').find('input');
  var inputValue = input.val() ? input.val() : 1;

  if (btn.hasClass('counter__minus')) {
    var newValue = parseInt(inputValue) - 1;
  } else {
    var newValue = parseInt(inputValue) + 1;
  }

  if (newValue <= 0) {
    newValue = 1;
  }

  input.val(newValue);
  input.trigger('change');
  event.preventDefault();
});
$(document).on('keyup', '.counter__wrapper input', function (event) {
  var inputValue = $(this).val();

  if (inputValue <= 0) {
    $(this).val(1);
  }

  $(this).trigger('change');
  event.preventDefault();
});

function compileProductForLaptop() {
  if ($('.product_responsive__wrapper').length > 0 && !$('.product_responsive__wrapper').hasClass('product_responsive__wrapper__ready')) {
    $('.product_responsive__wrapper .product_page__actions__wrapper').prepend($('.product_responsive__information .product_responsive__information__prices').clone());
    $('.product_responsive__wrapper').addClass('product_responsive__wrapper__ready');
    $('.product_responsive__information__data').prepend($('.product_responsive__information .product_responsive__information__stock_ratio').html());
    $('.product_responsive__information__links').append($('.product_responsive__information .product_responsive__information__data .product__actions_btn.product__actions_btn__favorite').clone());
    $('.product_responsive__photos').append($('.product_responsive__information').clone());
  }

  if ($('.product_responsive__wrapper .loan_info').length > 0) {
    var ww = $(window).width();

    if (ww >= 575 && ww <= 768) {
      $('.product_responsive__wrapper .loan_info').css({
        width: $('.product_responsive__wrapper .product_page__actions__wrapper .btn_add_product_to_cart').outerWidth() + 'px',
        left: $('.product_responsive__wrapper .product_page__actions__wrapper .btn_add_product_to_cart').offset().left + 'px'
      });
    }

    if (ww >= 768 && ww <= 1010) {
      $('.product_responsive__wrapper .loan_info').css({
        width: $('.product_responsive__wrapper .product_page__actions__wrapper .btn_add_product_to_cart').outerWidth() + 'px',
        left: 'initial'
      });
    }

    if (ww <= 575 || ww > 1010) {
      $('.product_responsive__wrapper .loan_info').attr('style', '');
    }
  }
}

$(document).on('click', '.product_page__all_previews a', function (event) {
  var link = $(this);
  var img = link.find('img');

  if (!link.hasClass('product_page__all_previews__active')) {
    $('.product_page__all_previews a').removeClass('product_page__all_previews__active');
    link.addClass('product_page__all_previews__active');
    $('.product_page__main_preview').attr('href', link.attr('href'));
    $('.product_page__main_preview img.main_image').attr('src', img.attr('src'));
  }

  event.preventDefault();
});
$(document).on('click', '.go_to_reviews, .to_reviews', function (event) {
  if ($('a[data-tab-content="product_reviews_tab"]').length > 0) {
    $('html, body').animate({
      scrollTop: $('.product_page__navigation_tabs:first').offset().top - 10
    }, 300);
    setTimeout(function () {
      $('a[data-tab-content="product_reviews_tab"]:first').trigger('click');
    }, 550);
  }

  event.preventDefault();
});
$(document).on('click', '.read-more', function (event) {
  event.preventDefault();
  var self = $(this);
  url = self.data('url');
  $.ajax({
    type: 'GET',
    url: url
  }).done(function (result) {
    if (result.success) {
      var reviewText = self.parent().prev();
      reviewText.html(result.text);
      self.hide();
    }
  });
});

function getAdvantage(self) {
  review_adv = $('#review_advantage');
  url = self.data('url');
  $.ajax({
    type: 'GET',
    url: url
  }).done(function (result) {
    if (result.success) {
      review_adv.html(result.advantage);
    }
  });
}

$(document).on('click', '.review__footer__yes', function (event) {
  event.preventDefault();
  var self = $(this);
  getAdvantage(self);
});
$(document).on('click', '.review__footer__no', function (event) {
  event.preventDefault();
  var self = $(this);
  getAdvantage(self);
});
$(document).on('click', '.quick_filter__wrapper:not(search_filter__wrapper) li a', function (event) {
  var self = $(this);
  var li = self.parents('li:first');

  if (!li.hasClass('quick_filter__active')) {
    $('.quick_filter__wrapper li').removeClass('quick_filter__active');
    $('.products_catalog__wrapper').removeClass('products_catalog__wrapper__shown');
    li.addClass('quick_filter__active');
    $('.products_catalog__wrapper').stop().fadeOut(300);
    $('.products_catalog__wrapper[id=' + self.attr('data-tab-content') + ']').stop().fadeIn(300).addClass('products_catalog__wrapper__shown');
  } else if (self.hasClass('quick_filter__active') && $('.products_catalog__wrapper[id=' + self.attr('data-tab-content') + ']').hasClass('products_catalog__wrapper__shown') == 0) {
    $('.products_catalog__wrapper').stop().fadeOut(300);
    $('.products_catalog__wrapper[id=' + self.attr('data-tab-content') + ']').stop().fadeIn(300).addClass('products_catalog__wrapper__shown');
  }

  event.preventDefault();
});
$(document).on('click', '.catalog_price__sorter li a', function (event) {
  var self = $(this);
  var order = 'asc';

  if (self.attr('id') == 'sort_desc') {
    order = 'desc';
  }

  $('input[name="price_sorting"]').val(order);
  var form = $('#catalog_filter_form');
  $(form).submit();
  self.attr('disabled', 'disabled');
  self = null;
  order = null;
  form = null;
  event.preventDefault();
});
$(document).ready(function (event) {
  var order = $('#catalog_filter_form input[name="price_sorting"]').val();

  if (order == 'desc') {
    $('.catalog_price__sorter li a').removeClass('catalog_price__sorter__selected');
    $('.catalog_price__sorter li a').removeClass('catalog_actions__selected');
    $('#sort_desc').addClass('catalog_price__sorter__selected catalog_actions__selected');
    $('#sort_desc').addClass('catalog_actions__selected');
  }
});

function showNotification(self, msg, link) {
  var wrapper = $('.footer___bottom_panel__message');
  var message = $('.footer___bottom_panel__message .message__wrapper');
  var link = $('.footer___bottom_panel__message a');
  message.html(msg);
  link.attr('href', link);
  wrapper.addClass('footer___bottom_panel__message__shown');
  wrapper.stop().hide();
  wrapper.css({
    left: parseInt(self.offset().left) + parseInt(self.outerWidth()) - parseInt(wrapper.outerWidth() / 2) - 18 + 'px'
  });
  wrapper.fadeIn('300');
  window.footerMsgToClose = wrapper;
  setTimeout(function () {
    if (typeof window.footerMsgToClose != 'undefined') {
      window.footerMsgToClose.stop().fadeOut('300');
      window.footerMsgToClose.removeClass('footer___bottom_panel__message__shown');
    }
  }, parseInt(window.footerMsgToClose.attr('data-close-delay')) * 1000);
}

$(document).on('click', '.product_filter .toggler , .product_filter legend', function (event) {
  if ($(window).width() > 768) {
    var toggler = $(this).parents('.filter__item:first').find('.toggler');
    var wrapper = $(this).parents('.filter__item:first').find('.toggler-wrapper');

    if (!toggler.hasClass('toggler_is_active')) {
      wrapper.slideDown(300);
      toggler.addClass('toggler_is_active');
    } else {
      wrapper.slideUp(300);
      toggler.removeClass('toggler_is_active');
    }
  }

  event.preventDefault();
});

function refreshProductsCount(control, display_quick_button) {
  if (display_quick_button === undefined) {
    display_quick_button = true;
  }

  var data = $('#catalog_filter_form input').serializeArray();
  var slug = $('#catalog_filter_form').data('ajax-slug');
  data.push({
    name: 'slug',
    value: slug
  });
  data = $.param(data);
  count = 0;
  $.when($.getJSON('/catalog/category/filter/', data, function (result) {
    $.each(result.data, function (i, item) {
      var val = $('.toggler-wrapper input[name=' + item.name + '][value=' + item.value + ']').siblings('span.checkbox').html();
      $('.toggler-wrapper input[name="' + item.name + '"][value="' + item.value + '"]').parents('label').children('span.checkbox').html(val.replace(/(\(\d{1,}\))/g, '(' + item.count + ')'));

      if (item.count === 0) {
        $('.toggler-wrapper input[name="' + item.name + '"][value="' + item.value + '"]').parents('label').children('span.checkbox').addClass("disabled");
        $('.toggler-wrapper input[name="' + item.name + '"][value="' + item.value + '"]').attr('disabled', true);
      } else {
        $('.toggler-wrapper input[name="' + item.name + '"][value="' + item.value + '"]').parents('label').children('span.checkbox').removeClass("disabled");
        $('.toggler-wrapper input[name="' + item.name + '"][value="' + item.value + '"]').attr('disabled', false);
      }
    });
  })).done(function (result) {
    if (display_quick_button) {
      count = result.all_count;
      displayFilterQuickResult(count, control);
    }
  });
}

function switchCheckbox(self) {
  var chkbx = self.parents('label:first');

  if (self.hasClass('checkbox__active')) {
    self.removeClass('checkbox__active');
    chkbx.find('input').removeAttr('checked');
    refreshProductsCount(self);
  } else {
    chkbx.find('input').attr('checked', 'checked');
    self.addClass('checkbox__active');
    refreshProductsCount(self);
  }
}

function switchRadioButton(self) {
  var wrapper = self.parents('.toggler-wrapper:first');

  if (self.hasClass('radiobutton__active')) {
    self.removeClass('radiobutton__active');
    refreshProductsCount(self);
  } else {
    wrapper.find('.radiobutton').removeClass('radiobutton__active');
    self.addClass('radiobutton__active');
    refreshProductsCount(self);
  }
}

$(document).on('click', '.product_filter .checkbox:not(.disabled)', function (event) {
  event.preventDefault();
  var self = $(this);
  switchCheckbox(self);
  self = null;
});
$(document).on('click', '.product_filter .radiobutton:not(.disabled)', function (event) {
  event.preventDefault();
  var self = $(this);
  switchRadioButton(self);
  self = null;
});

function displayFilterQuickResult(nums, objToDisplayWith, link) {
  if (typeof link == 'undefined') {
    var link = '#';
  }

  if (_typeof(nums) != undefined) {
    if ($('.quick_results_btn').length <= 0) {
      $('<a href="' + link + '" class="quick_results_btn">показать (' + nums + ')</a>').insertAfter('.product_filter');
    } else {
      $('.quick_results_btn').html('показать (' + nums + ')').attr('href', link);
    }

    if ($(window).width() <= 768) {
      $('.quick_results_btn').click(function (event) {
        event.preventDefault();
        $('.filters__mobile__container__wrapper form').submit();
      });
    } else {
      $('.quick_results_btn').click(function (event) {
        event.preventDefault();
        $('#catalog_filter_form').submit();
      });
    }

    var fixLeft = 0;
    var fixTop = 0;

    if (objToDisplayWith.hasClass('slider-margin')) {
      fixLeft = 30;
      fixTop = 5;
    }

    var topPX = parseInt(objToDisplayWith.offset().top) - parseInt($('.product_filter').offset().top) - 5 - parseInt(fixTop) + 'px';
    var leftPX = parseInt(objToDisplayWith.position().left) + parseInt(objToDisplayWith.outerWidth()) + parseInt(fixLeft) + 'px';

    if ($(window).width() <= 768) {
      fixLeft = $('.quick_results_btn').outerWidth() + 65;
      leftPX = parseInt(objToDisplayWith.position().left) + parseInt(objToDisplayWith.outerWidth()) - parseInt(fixLeft) + 'px';
      fixTop = 188;
      topPX = parseInt(objToDisplayWith.offset().top) - objToDisplayWith.outerHeight() - parseInt(fixTop) + 'px';
    }

    $('.quick_results_btn').css({
      top: topPX,
      left: leftPX
    }).fadeIn(300);
  }
}

function initRangeSliders() {
  $('.slider-margin:not(.noUi-target)').each(function (i, elem) {
    $(elem).attr('id', 'priceRangeSlider_' + i);
    var field_start = $(elem).parent('.range').find('input').eq(0);
    var field_end = $(elem).parent('.range').find('input').eq(1);
    var min_value = parseFloat(field_start.attr('placeholder'));
    var max_value = parseFloat(field_end.attr('placeholder'));
    var start_value = field_start.val() ? parseFloat(field_start.val()) : min_value;
    var end_value = field_end.val() ? parseFloat(field_end.val()) : max_value;
    noUiSlider.create(elem, {
      start: [Math.floor(start_value), Math.ceil(end_value)],
      step: 1,
      format: wNumb({
        decimals: 0
      }),
      range: {
        'min': [Math.floor(min_value)],
        'max': [Math.ceil(max_value)]
      }
    });
    elem.noUiSlider.on('update', function (value) {
      $(elem).parent('.range').find('input').eq(0).val(value[0]);
      $(elem).parent('.range').find('input').eq(1).val(value[1]);

      if (!$(elem).hasClass('range_slider_active_by_js')) {
        $(elem).addClass('range_slider_active_by_js');
      } else {
        if ($(elem).find('.noUi-base').length > 0) {
          rangeSliderReDraw();
        }
      }
    });
  });
}

function rangeSliderReDraw() {
  if ($('.range .slider-margin.noUi-target').length > 0) {
    $('.range .slider-margin.noUi-target').each(function (index) {
      var self = $(this);

      if (self.find('.noUi-base').length <= 0) {
        return false;
      }

      var wholeBar = self.find('.noUi-base');
      var rangeUI = wholeBar.find('.noUi-connects');
      var leftControl = wholeBar.find('.noUi-handle-lower');
      var rightControl = wholeBar.find('.noUi-handle-upper');
      var rightPart = parseInt(wholeBar.outerWidth()) + parseInt(wholeBar.offset().left) - parseInt(rightControl.offset().left);
      var width = parseInt(wholeBar.outerWidth()) + parseInt(wholeBar.offset().left) - parseInt(rightPart) - parseInt(leftControl.offset().left);
      rangeUI.stop().css({
        left: parseInt(leftControl.offset().left) - parseInt(wholeBar.offset().left) + 8 + 'px',
        width: width + 'px'
      });
      self = null;
      rangeUI = null;
      leftControl = null;
      rightControl = null;
      wholeBar = null;
      rightPart = null;
      width = null;
    });
  }
}

$(document).on('keypress', 'input[name="price_range_0"]', function (event) {
  var charCode = event.which ? event.which : event.keyCode;
  return !(charCode > 31 && (charCode < 48 || charCode > 57));
});
$(document).on('keypress', 'input[name="price_range_1"]', function (event) {
  var charCode = event.which ? event.which : event.keyCode;
  return !(charCode > 31 && (charCode < 48 || charCode > 57));
});
$(document).on('keyup', 'input[name="price_range_0"]', function (e) {
  if ($(this).parents('.range').find('.slider-margin').length > 0) {
    var slider = document.getElementById($(this).parents('.range').find('.slider-margin').attr('id'));
    slider.noUiSlider.set([$(this).val(), $(this).parents('.range').find('input[name="price_range_1"]').val()]);
    setTimeout(function () {
      rangeSliderReDraw();
    }, 310);
  }
});
$(document).on('keyup', 'input[name="price_range_1"]', function (e) {
  if ($(this).parents('.range').find('.slider-margin').length > 0) {
    var slider = document.getElementById($(this).parents('.range').find('.slider-margin').attr('id'));
    slider.noUiSlider.set([$(this).parents('.range').find('input[name="price_range_0"]').val(), $(this).val()]);
    setTimeout(function () {
      rangeSliderReDraw();
    }, 310);
  }
});
$(document).on('click', '.filter__reset', function (event) {
  event.preventDefault();
  $('.product_filter .radiobutton__active').trigger('click');
  $('.product_filter .checkbox__active').trigger('click');
  $('input[name="price_range_0"]').val($('input[name="price_range_0"]').attr('placeholder')).trigger('keyup');
  $('input[name="price_range_1"]').val($('input[name="price_range_1"]').attr('placeholder')).trigger('keyup');
  setTimeout(function () {
    rangeSliderReDraw();
    $('.quick_results_btn').fadeOut(300);
  }, 310);
});
$(document).on('click', '.as_select', function (event) {
  event.preventDefault();
  var select_toggler = $(this);
  var f_group = select_toggler.parents('.form-group').eq(0);
  var menu = f_group.find('.select_dropdown__menu').eq(0);

  if (!menu.hasClass('_is_shown')) {
    select_toggler.addClass('active');
    menu.addClass('_is_shown');
    menu.slideDown(300);
  } else {
    select_toggler.removeClass('active');
    menu.removeClass('_is_shown');
    menu.slideUp(300);
  }
});
$(document).on('click', '.select_dropdown__menu a', function (event) {
  event.preventDefault();
  var option = $(this);
  var f_group = option.parents('.form-group').eq(0);
  var menu = f_group.find('.select_dropdown__menu').eq(0);
  f_group.find('input[type="hidden"]').eq(0).val(option.attr('data-option-value'));
  f_group.find('.as_select').eq(0).removeClass('active').html(option.html());
  menu.removeClass('_is_shown').slideUp(300);
  menu.find('a').removeClass('active');
  option.addClass('active');
});
$(document).on("click", ".js-callmeback", function (event) {
  $('.as_select').removeClass('active');
  $('.select_dropdown__menu').removeClass('_is_shown').slideUp(300);
  $.fancybox.open({
    src: '#popup__call_me_back',
    type: 'inline'
  });
  event.preventDefault();
});
$(document).on('click', '#popup__call_me_back form .btn_submit', function (event) {
  event.preventDefault();
  var self = $(this);
  self.prop('disabled', true);
  var data = $('#popup__call_me_back form input').serializeArray();
  var url = $('#popup__call_me_back').data('url');
  $.ajax({
    type: 'post',
    url: url,
    data: data,
    dataType: 'json'
  }).done(function (result) {
    $('#popup__call_me_back form input').removeClass('input_error__state');
    $('#popup__call_me_back form button').removeClass('input_error__state');
    $('.input_error__message').remove();

    if (result['success'] == true) {
      $('#popup__call_me_back form input').val('');
      $('#popup__call_me_back form .dialog__headline').html('Мы скоро Вам перезвоним');
      $.fancybox.close();
      $.fancybox.open({
        src: '#popup__call_me_ok',
        type: 'inline'
      });
      setTimeout(function () {
        $.fancybox.close();
      }, 4000);
    } else {
      for (key in result['form_errors']) {
        var message = '<p class="input_error__message">' + result['form_errors'][key] + '</p>';
        var office_message = '<p class="input_error__message">Выберите офис обслуживания</p>';

        if (key == 'service_office') {
          $('#popup__call_me_back form input[name=' + key + ']').next().addClass('input_error__state');
          $('#popup__call_me_back form input[name=' + key + ']').next().after(office_message);
        } else {
          $('#popup__call_me_back form input[name=' + key + ']').addClass('input_error__state');
          $('#popup__call_me_back form input[name=' + key + ']').after(message);
        }
      }
    }

    self.removeAttr('disabled');
  });
});
$(document).on("click", ".show__popup_advert_subscribe", function (event) {
  $.fancybox.open({
    src: '#popup__advert_subscribe',
    type: 'inline'
  });
  event.preventDefault();
});
$(document).on('click', '#popup__advert_subscribe form .btn_submit', function (event) {
  event.preventDefault();
  var data = $('#popup__advert_subscribe form input').serializeArray();
  var url = $('#popup__advert_subscribe').data('url');
  console.log(url);
  console.log(data);
  $.ajax({
    type: 'post',
    url: url,
    data: data,
    dataType: 'json'
  }).done(function (result) {
    $('#popup__advert_subscribe form input').removeClass('input_error__state');
    $('#popup__advert_subscribe form button').removeClass('input_error__state');
    $('.input_error__message').remove();

    if (result['success'] == true) {
      $('#popup__advert_subscribe form .dialog__headline').html('Подписка оформлена');
      $.fancybox.close();
      $.fancybox.open({
        src: '#popup__advert_subscribe_ok',
        type: 'inline'
      });
      setTimeout(function () {
        $.fancybox.close();
      }, 4000);
    } else {
      for (key in result['form_errors']) {
        var message = '<p class="input_error__message">' + result['form_errors'][key] + '</p>';

        if (key == 'agree') {
          message = '<div class="col-12"><div class="form-group agree-group"><p class="input_error__message">' + result['form_errors'][key] + '</p></div></div>';
          $('#popup__advert_subscribe form input[name=' + key + ']').parents('.col-12:first').after(message);
        } else {
          $('#popup__advert_subscribe form input[name=' + key + ']').addClass('input_error__state');
          $('#popup__advert_subscribe form input[name=' + key + ']').after(message);
        }
      }
    }
  });
});
$(document).on("click", ".show__popup_advert_unsubscribe", function (event) {
  $.fancybox.close();
  $.fancybox.open({
    src: '#popup__advert_unsubscribe',
    type: 'inline'
  });
  event.preventDefault();
});
$(document).on('click', '#popup__advert_unsubscribe form .btn_submit', function (event) {
  event.preventDefault();
  var data = $('#popup__advert_unsubscribe form input').serializeArray();
  var url = $('#popup__advert_unsubscribe').data('url');
  console.log(url);
  $.ajax({
    type: 'post',
    url: url,
    data: data,
    dataType: 'json'
  }).done(function (result) {
    $('#popup__advert_unsubscribe form input').removeClass('input_error__state');
    $('#popup__advert_unsubscribe form button').removeClass('input_error__state');
    $('.input_error__message').remove();

    if (result['success'] == true) {
      $.fancybox.close();
      $.fancybox.open({
        src: '#popup__advert_unsubscribe_email_confirm',
        type: 'inline'
      });
      setTimeout(function () {
        $.fancybox.close();
      }, 6000);
    } else {
      for (key in result['form_errors']) {
        var message = '<p class="input_error__message">' + result['form_errors'][key] + '</p>';

        if (key == 'agree') {
          message = '<div class="col-12"><div class="form-group agree-group"><p class="input_error__message">' + result['form_errors'][key] + '</p></div></div>';
          $('#popup__advert_unsubscribe form input[name=' + key + ']').parents('.col-12:first').after(message);
        } else {
          $('#popup__advert_unsubscribe form input[name=' + key + ']').addClass('input_error__state');
          $('#popup__advert_unsubscribe form input[name=' + key + ']').after(message);
        }
      }
    }
  });
});
$(document).ready(function () {
  if (!$('body').hasClass('partner-mode')) {
    $.ajax({
      type: 'get',
      url: '/customers/ajax_get_offices/',
      dataType: 'json'
    }).done(function (result) {
      result['offices'].forEach(function (element) {
        var html = '<a href="#" data-option-value="' + element['pk'] + '">' + element['name'] + '</a>';
        $('#popup__call_me_back form .select_dropdown__menu').append(html);
      });
    });
  }
});
$(document).on('click', '.btn_close__rubrics__mobile__container', function (event) {
  if ($('.rubrics__mobile__container').length > 0) {
    var container = $('.rubrics__mobile__container');

    if (container.hasClass('rubrics__mobile__container__shown')) {
      container.slideUp(300);
      setTimeout(function () {
        $('.rubrics__mobile__container').removeClass('rubrics__mobile__container__shown');
      }, 310);
    }
  }

  event.preventDefault();
});
$(document).on('click', '.btn_close__filters__mobile__container', function (event) {
  if ($('.filters__mobile__container').length > 0) {
    var container = $('.filters__mobile__container');

    if (container.hasClass('filters__mobile__container__shown')) {
      container.slideUp(300);
      setTimeout(function () {
        $('.filters__mobile__container').removeClass('filters__mobile__container__shown');
      }, 310);
    }
  }

  event.preventDefault();
});
$(document).on('click', '.product__wrapper, .product__wrapper.product__wrapper__cols', function (event) {
  var prod = $(this);

  if (prod.is('[data-link-href]')) {
    var link_href = prod.attr('data-link-href');
    var click_target = $(event.target);

    if (click_target.is('a') || click_target.is('input') || click_target.parents('a').length > 0) {
      return true;
    } else {
      window.location.href = link_href;
    }
  }

  event.preventDefault();
  return false;
});
var mobileHorizotalTabOwls = '';

function initMobileTabsWithGoodsAtMP() {
  var ww = $(window).width();

  if ($('.navigation_tabs__wrapper.mainpage_catalog'.length > 0) && ww <= 768) {
    $('.content__wrapper.content__wrapper__mainpage .products_grid__headline:not(.hit)').slice(2).remove();
    $('<div>', {
      class: 'owl-carousel',
      id: 'mp_mainSliderMobile',
      'data-page': '1'
    }).insertAfter($('.navigation_tabs__wrapper.mainpage_catalog'));
    $('<p>', {
      text: 'Хиты:',
      class: 'products_grid__headline hit',
      id: 'pHits'
    }).insertBefore($('.navigation_tabs__wrapper.mainpage_catalog'));
    mobileTagsOwls = $('.navigation_tabs__wrapper.mainpage_catalog .owl-carousel').owlCarousel(_defineProperty({
      loop: true,
      nav: true,
      dots: false,
      margin: 20,
      autoWidth: false,
      items: 1
    }, "nav", true));
    $('.navigation_tabs__wrapper.mainpage_catalog .owl-carousel').find('.owl-item.active a').addClass('navigation_tab__active');
    mobileTagsOwls.on('initialized.owl.carousel, refreshed.owl.carousel, translated.owl.carousel', function (event) {
      var owl = $(event.target);
      owl.find('.owl-item a').removeClass('navigation_tab__active');
      var active_item = owl.find('.owl-item.active a');
      active_item.addClass('navigation_tab__active');
      var display_id = active_item.attr('data-tab-content');

      if (event.type != 'initialized') {
        ajaxUploadingTabProductsMobile(display_id);
      }
    });
    mobileOwls = $('[id="mp_mainSliderMobile"]').not('.owl-loaded').owlCarousel({
      loop: false,
      nav: false,
      dots: false,
      margin: 20,
      autoWidth: false,
      responsive: {
        0: {
          items: 2,
          margin: 8,
          nav: false
        },
        480: {
          items: 3,
          margin: 8,
          nav: false
        }
      },
      lazyLoad: true,
      onDrag: ajaxUploadingMobileTabProductsOnDragged
    });
    var horizontalFirstTab = $('.products_catalog__wrapper__mainpage.products_catalog__wrapper__shown.product-list.horisontal_tab_products:first');
    horizontalFirstTab.addClass('owl-carousel');
    horizontalFirstTab.data('page', "1");
    mobileHorizotalTabOwls = horizontalFirstTab.not('.owl-loaded').owlCarousel({
      loop: false,
      nav: false,
      dots: false,
      margin: 20,
      autoWidth: false,
      responsive: {
        0: {
          items: 2,
          margin: 8,
          nav: true,
          slideBy: 'page'
        },
        480: {
          items: 3,
          margin: 8,
          nav: false,
          slideBy: 'page'
        }
      },
      lazyLoad: true,
      onDrag: ajaxUploadingMobileTabProductsOnDragged
    });
    $('.navigation_tabs__mobile_only').hide();
    $('.navigation_tabs__wrapper.mainpage_catalog .products_grid__headline:not(.hit)').remove();
  } else if ($('.navigation_tabs__wrapper.mainpage_catalog'.length > 0) && ww > 768) {
    $('.mainpage_catalog a:first').trigger('click');

    if ($('.content__wrapper.content__wrapper__mainpage .products_catalog__wrapper .product__wrapper:not(.product__wrapper__cols)').length > 0) {
      if ($('.content__wrapper.content__wrapper__mainpage .products_catalog__wrapper .product__wrapper:not(.product__wrapper__cols)').length - $('.categoryes__wrapper .product__wrapper').length == 0) {
        return false;
      } else {
        $('.catalog_view__toggler a[data-view-attr="rows"]').trigger('click');
      }
    } else {
      $('.catalog_view__toggler a[data-view-attr="cols"]').trigger('click');
    }
  }
}

$(".burger-menu").click(function () {
  $(this).toggleClass("menu-on");
});
$('.footer-link--call').click(function () {
  $('.mobile-phone-show').toggle(0);
});
$('.footer-link--search').click(function () {
  $('.search-mobile').toggle(0);
  $('.search-mobile input').focus();
});
$('.search-mobile').on('focusout', function () {
  $(this).toggle(1);
});
$('.footer__basket-number').click(function () {
  $('#order_cart').submit();
});
$(document).ready(function () {
  if (typeof $(document).mask === "function") {
    $('.dialog__call_me_back input[name="phone"]').mask('(000) 000-0000');
  }
});
$(document).ready(function () {
  var noselects = document.getElementsByClassName("noselect");

  for (var i = 0; i < noselects.length; ++i) {
    noselects[i].ondragstart = noselect;
    noselects[i].onselectstart = noselect;
    noselects[i].oncontextmenu = noselect;
  }

  function noselect() {
    return false;
  }
});

function transformFooterCatalog() {
  console.log('transform');
  $('.footer-menu__col-first .submenu').append($('.footer-menu__col-second .submenu').children());
  $('.footer-menu__col-second').remove();
}

function handleResize() {
  var width = window.innerWidth;

  if (width < 768) {
    transformFooterCatalog();
    return;
  }
}

window.addEventListener("resize", handleResize);
handleResize();
$(document).ready(function () {
  $('.footer-menu-accordion a.opener').click(function () {
    $(this).parent().find("ul:first").slideToggle();
    $(this).parent().toggleClass('active');
    return false;
  });
});
;
(function (t, i, n, e) {
  "use strict";

  var r,
      o,
      s,
      a,
      l,
      h,
      _c,
      p,
      u,
      d,
      f,
      A,
      m,
      w,
      g,
      y,
      b,
      v,
      x,
      C,
      S,
      E,
      M,
      k,
      H,
      D,
      F,
      T = [].indexOf || function (t) {
    for (var i = 0, n = this.length; n > i; i++) {
      if (i in this && this[i] === t) return i;
    }

    return -1;
  };

  S = "notify", C = S + "js", s = S + "!blank", M = {
    t: "top",
    m: "middle",
    b: "bottom",
    l: "left",
    c: "center",
    r: "right"
  }, m = ["l", "c", "r"], F = ["t", "m", "b"], b = ["t", "b", "l", "r"], v = {
    t: "b",
    m: null,
    b: "t",
    l: "r",
    c: null,
    r: "l"
  }, x = function x(t) {
    var i;
    return i = [], n.each(t.split(/\W+/), function (t, n) {
      var r;
      return r = n.toLowerCase().charAt(0), M[r] ? i.push(r) : e;
    }), i;
  }, D = {}, a = {
    name: "core",
    html: '<div class="' + C + '-wrapper">\n  <div class="' + C + '-arrow"></div>\n  <div class="' + C + '-container"></div>\n</div>',
    css: "." + C + "-corner {\n  position: fixed;\n  margin: 5px;\n  z-index: 1050;\n}\n\n." + C + "-corner ." + C + "-wrapper,\n." + C + "-corner ." + C + "-container {\n  position: relative;\n  display: block;\n  height: inherit;\n  width: inherit;\n  margin: 3px;\n}\n\n." + C + "-wrapper {\n  z-index: 1;\n  position: absolute;\n  display: inline-block;\n  height: 0;\n  width: 0;\n}\n\n." + C + "-container {\n  display: none;\n  z-index: 1;\n  position: absolute;\n}\n\n." + C + "-hidable {\n  cursor: pointer;\n}\n\n[data-notify-text],[data-notify-html] {\n  position: relative;\n}\n\n." + C + "-arrow {\n  position: absolute;\n  z-index: 2;\n  width: 0;\n  height: 0;\n}"
  }, H = {
    "border-radius": ["-webkit-", "-moz-"]
  }, f = function f(t) {
    return D[t];
  }, o = function o(i, e) {
    var r, o, s, a;
    if (!i) throw "Missing Style name";
    if (!e) throw "Missing Style definition";
    if (!e.html) throw "Missing Style HTML";
    return (null != (a = D[i]) ? a.cssElem : void 0) && (t.console && console.warn("" + S + ": overwriting style '" + i + "'"), D[i].cssElem.remove()), e.name = i, D[i] = e, r = "", e.classes && n.each(e.classes, function (t, i) {
      return r += "." + C + "-" + e.name + "-" + t + " {\n", n.each(i, function (t, i) {
        return H[t] && n.each(H[t], function (n, e) {
          return r += "  " + e + t + ": " + i + ";\n";
        }), r += "  " + t + ": " + i + ";\n";
      }), r += "}\n";
    }), e.css && (r += "/* styles for " + e.name + " */\n" + e.css), r && (e.cssElem = y(r), e.cssElem.attr("id", "notify-" + e.name)), s = {}, o = n(e.html), u("html", o, s), u("text", o, s), e.fields = s;
  }, y = function y(t) {
    var i;
    i = l("style"), i.attr("type", "text/css"), n("head").append(i);

    try {
      i.html(t);
    } catch (e) {
      i[0].styleSheet.cssText = t;
    }

    return i;
  }, u = function u(t, i, e) {
    var r;
    return "html" !== t && (t = "text"), r = "data-notify-" + t, p(i, "[" + r + "]").each(function () {
      var i;
      return i = n(this).attr(r), i || (i = s), e[i] = t;
    });
  }, p = function p(t, i) {
    return t.is(i) ? t : t.find(i);
  }, E = {
    clickToHide: !0,
    autoHide: !0,
    autoHideDelay: 5e3,
    arrowShow: !0,
    arrowSize: 5,
    breakNewLines: !0,
    elementPosition: "bottom",
    globalPosition: "top right",
    style: "bootstrap",
    className: "error",
    showAnimation: "slideDown",
    showDuration: 400,
    hideAnimation: "slideUp",
    hideDuration: 200,
    gap: 5
  }, g = function g(t, i) {
    var e;
    return e = function e() {}, e.prototype = t, n.extend(!0, new e(), i);
  }, h = function h(t) {
    return n.extend(E, t);
  }, l = function l(t) {
    return n("<" + t + "></" + t + ">");
  }, A = {}, d = function d(t) {
    var i;
    return t.is("[type=radio]") && (i = t.parents("form:first").find("[type=radio]").filter(function (i, e) {
      return n(e).attr("name") === t.attr("name");
    }), t = i.first()), t;
  }, w = function w(t, i, n) {
    var r, o;
    if ("string" == typeof n) n = parseInt(n, 10);else if ("number" != typeof n) return;
    if (!isNaN(n)) return r = M[v[i.charAt(0)]], o = i, t[r] !== e && (i = M[r.charAt(0)], n = -n), t[i] === e ? t[i] = n : t[i] += n, null;
  }, k = function k(t, i, n) {
    if ("l" === t || "t" === t) return 0;
    if ("c" === t || "m" === t) return n / 2 - i / 2;
    if ("r" === t || "b" === t) return n - i;
    throw "Invalid alignment";
  }, _c = function c(t) {
    return _c.e = _c.e || l("div"), _c.e.text(t).html();
  }, r = function () {
    function t(t, i, e) {
      "string" == typeof e && (e = {
        className: e
      }), this.options = g(E, n.isPlainObject(e) ? e : {}), this.loadHTML(), this.wrapper = n(a.html), this.options.clickToHide && this.wrapper.addClass("" + C + "-hidable"), this.wrapper.data(C, this), this.arrow = this.wrapper.find("." + C + "-arrow"), this.container = this.wrapper.find("." + C + "-container"), this.container.append(this.userContainer), t && t.length && (this.elementType = t.attr("type"), this.originalElement = t, this.elem = d(t), this.elem.data(C, this), this.elem.before(this.wrapper)), this.container.hide(), this.run(i);
    }

    return t.prototype.loadHTML = function () {
      var t;
      return t = this.getStyle(), this.userContainer = n(t.html), this.userFields = t.fields;
    }, t.prototype.show = function (t, i) {
      var n,
          r,
          o,
          s,
          a,
          l = this;
      if (r = function r() {
        return t || l.elem || l.destroy(), i ? i() : e;
      }, a = this.container.parent().parents(":hidden").length > 0, o = this.container.add(this.arrow), n = [], a && t) s = "show";else if (a && !t) s = "hide";else if (!a && t) s = this.options.showAnimation, n.push(this.options.showDuration);else {
        if (a || t) return r();
        s = this.options.hideAnimation, n.push(this.options.hideDuration);
      }
      return n.push(r), o[s].apply(o, n);
    }, t.prototype.setGlobalPosition = function () {
      var t, i, e, r, o, s, a, h;
      return h = this.getPosition(), a = h[0], s = h[1], o = M[a], t = M[s], r = a + "|" + s, i = A[r], i || (i = A[r] = l("div"), e = {}, e[o] = 0, "middle" === t ? e.top = "45%" : "center" === t ? e.left = "45%" : e[t] = 0, i.css(e).addClass("" + C + "-corner"), n("body").append(i)), i.prepend(this.wrapper);
    }, t.prototype.setElementPosition = function () {
      var t, i, r, o, s, a, l, h, c, p, u, d, f, A, g, y, x, C, S, E, H, D, z, Q, B, R, N, P, U;

      for (z = this.getPosition(), E = z[0], C = z[1], S = z[2], u = this.elem.position(), h = this.elem.outerHeight(), d = this.elem.outerWidth(), c = this.elem.innerHeight(), p = this.elem.innerWidth(), Q = this.wrapper.position(), s = this.container.height(), a = this.container.width(), A = M[E], y = v[E], x = M[y], l = {}, l[x] = "b" === E ? h : "r" === E ? d : 0, w(l, "top", u.top - Q.top), w(l, "left", u.left - Q.left), U = ["top", "left"], B = 0, N = U.length; N > B; B++) {
        H = U[B], g = parseInt(this.elem.css("margin-" + H), 10), g && w(l, H, g);
      }

      if (f = Math.max(0, this.options.gap - (this.options.arrowShow ? r : 0)), w(l, x, f), this.options.arrowShow) {
        for (r = this.options.arrowSize, i = n.extend({}, l), t = this.userContainer.css("border-color") || this.userContainer.css("background-color") || "white", R = 0, P = b.length; P > R; R++) {
          H = b[R], D = M[H], H !== y && (o = D === A ? t : "transparent", i["border-" + D] = "" + r + "px solid " + o);
        }

        w(l, M[y], r), T.call(b, C) >= 0 && w(i, M[C], 2 * r);
      } else this.arrow.hide();

      return T.call(F, E) >= 0 ? (w(l, "left", k(C, a, d)), i && w(i, "left", k(C, r, p))) : T.call(m, E) >= 0 && (w(l, "top", k(C, s, h)), i && w(i, "top", k(C, r, c))), this.container.is(":visible") && (l.display = "block"), this.container.removeAttr("style").css(l), i ? this.arrow.removeAttr("style").css(i) : e;
    }, t.prototype.getPosition = function () {
      var t, i, n, e, r, o, s, a;
      if (i = this.options.position || (this.elem ? this.options.elementPosition : this.options.globalPosition), t = x(i), 0 === t.length && (t[0] = "b"), n = t[0], 0 > T.call(b, n)) throw "Must be one of [" + b + "]";
      return (1 === t.length || (e = t[0], T.call(F, e) >= 0 && (r = t[1], 0 > T.call(m, r))) || (o = t[0], T.call(m, o) >= 0 && (s = t[1], 0 > T.call(F, s)))) && (t[1] = (a = t[0], T.call(m, a) >= 0 ? "m" : "l")), 2 === t.length && (t[2] = t[1]), t;
    }, t.prototype.getStyle = function (t) {
      var i;
      if (t || (t = this.options.style), t || (t = "default"), i = D[t], !i) throw "Missing style: " + t;
      return i;
    }, t.prototype.updateClasses = function () {
      var t, i;
      return t = ["base"], n.isArray(this.options.className) ? t = t.concat(this.options.className) : this.options.className && t.push(this.options.className), i = this.getStyle(), t = n.map(t, function (t) {
        return "" + C + "-" + i.name + "-" + t;
      }).join(" "), this.userContainer.attr("class", t);
    }, t.prototype.run = function (t, i) {
      var r,
          o,
          a,
          l,
          h,
          u = this;
      if (n.isPlainObject(i) ? n.extend(this.options, i) : "string" === n.type(i) && (this.options.className = i), this.container && !t) return this.show(!1), e;

      if (this.container || t) {
        o = {}, n.isPlainObject(t) ? o = t : o[s] = t;

        for (a in o) {
          r = o[a], l = this.userFields[a], l && ("text" === l && (r = _c(r), this.options.breakNewLines && (r = r.replace(/\n/g, "<br/>"))), h = a === s ? "" : "=" + a, p(this.userContainer, "[data-notify-" + l + h + "]").html(r));
        }

        return this.updateClasses(), this.elem ? this.setElementPosition() : this.setGlobalPosition(), this.show(!0), this.options.autoHide ? (clearTimeout(this.autohideTimer), this.autohideTimer = setTimeout(function () {
          return u.show(!1);
        }, this.options.autoHideDelay)) : e;
      }
    }, t.prototype.destroy = function () {
      return this.wrapper.remove();
    }, t;
  }(), n[S] = function (t, i, e) {
    return t && t.nodeName || t.jquery ? n(t)[S](i, e) : (e = i, i = t, new r(null, i, e)), t;
  }, n.fn[S] = function (t, i) {
    return n(this).each(function () {
      var e;
      return e = d(n(this)).data(C), e ? e.run(t, i) : new r(n(this), t, i);
    }), this;
  }, n.extend(n[S], {
    defaults: h,
    addStyle: o,
    pluginOptions: E,
    getStyle: f,
    insertCSS: y
  }), n(function () {
    return y(a.css).attr("id", "core-notify"), n(i).on("click", "." + C + "-hidable", function () {
      return n(this).trigger("notify-hide");
    }), n(i).on("notify-hide", "." + C + "-wrapper", function () {
      var t;
      return null != (t = n(this).data(C)) ? t.show(!1) : void 0;
    });
  });
})(window, document, jQuery), $.notify.addStyle("bootstrap", {
  html: "<div>\n<span data-notify-text></span>\n</div>",
  classes: {
    base: {
      "font-weight": "bold",
      padding: "8px 15px 8px 14px",
      "text-shadow": "0 1px 0 rgba(255, 255, 255, 0.5)",
      "background-color": "#fcf8e3",
      border: "1px solid #fbeed5",
      "border-radius": "4px",
      "white-space": "nowrap",
      "padding-left": "25px",
      "background-repeat": "no-repeat",
      "background-position": "3px 7px"
    },
    error: {
      color: "#B94A48",
      "background-color": "#F2DEDE",
      "border-color": "#EED3D7",
      "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAtRJREFUeNqkVc1u00AQHq+dOD+0poIQfkIjalW0SEGqRMuRnHos3DjwAH0ArlyQeANOOSMeAA5VjyBxKBQhgSpVUKKQNGloFdw4cWw2jtfMOna6JOUArDTazXi/b3dm55socPqQhFka++aHBsI8GsopRJERNFlY88FCEk9Yiwf8RhgRyaHFQpPHCDmZG5oX2ui2yilkcTT1AcDsbYC1NMAyOi7zTX2Agx7A9luAl88BauiiQ/cJaZQfIpAlngDcvZZMrl8vFPK5+XktrWlx3/ehZ5r9+t6e+WVnp1pxnNIjgBe4/6dAysQc8dsmHwPcW9C0h3fW1hans1ltwJhy0GxK7XZbUlMp5Ww2eyan6+ft/f2FAqXGK4CvQk5HueFz7D6GOZtIrK+srupdx1GRBBqNBtzc2AiMr7nPplRdKhb1q6q6zjFhrklEFOUutoQ50xcX86ZlqaZpQrfbBdu2R6/G19zX6XSgh6RX5ubyHCM8nqSID6ICrGiZjGYYxojEsiw4PDwMSL5VKsC8Yf4VRYFzMzMaxwjlJSlCyAQ9l0CW44PBADzXhe7xMdi9HtTrdYjFYkDQL0cn4Xdq2/EAE+InCnvADTf2eah4Sx9vExQjkqXT6aAERICMewd/UAp/IeYANM2joxt+q5VI+ieq2i0Wg3l6DNzHwTERPgo1ko7XBXj3vdlsT2F+UuhIhYkp7u7CarkcrFOCtR3H5JiwbAIeImjT/YQKKBtGjRFCU5IUgFRe7fF4cCNVIPMYo3VKqxwjyNAXNepuopyqnld602qVsfRpEkkz+GFL1wPj6ySXBpJtWVa5xlhpcyhBNwpZHmtX8AGgfIExo0ZpzkWVTBGiXCSEaHh62/PoR0p/vHaczxXGnj4bSo+G78lELU80h1uogBwWLf5YlsPmgDEd4M236xjm+8nm4IuE/9u+/PH2JXZfbwz4zw1WbO+SQPpXfwG/BBgAhCNZiSb/pOQAAAAASUVORK5CYII=)"
    },
    success: {
      color: "#468847",
      "background-color": "#DFF0D8",
      "border-color": "#D6E9C6",
      "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAutJREFUeNq0lctPE0Ecx38zu/RFS1EryqtgJFA08YCiMZIAQQ4eRG8eDGdPJiYeTIwHTfwPiAcvXIwXLwoXPaDxkWgQ6islKlJLSQWLUraPLTv7Gme32zoF9KSTfLO7v53vZ3d/M7/fIth+IO6INt2jjoA7bjHCJoAlzCRw59YwHYjBnfMPqAKWQYKjGkfCJqAF0xwZjipQtA3MxeSG87VhOOYegVrUCy7UZM9S6TLIdAamySTclZdYhFhRHloGYg7mgZv1Zzztvgud7V1tbQ2twYA34LJmF4p5dXF1KTufnE+SxeJtuCZNsLDCQU0+RyKTF27Unw101l8e6hns3u0PBalORVVVkcaEKBJDgV3+cGM4tKKmI+ohlIGnygKX00rSBfszz/n2uXv81wd6+rt1orsZCHRdr1Imk2F2Kob3hutSxW8thsd8AXNaln9D7CTfA6O+0UgkMuwVvEFFUbbAcrkcTA8+AtOk8E6KiQiDmMFSDqZItAzEVQviRkdDdaFgPp8HSZKAEAL5Qh7Sq2lIJBJwv2scUqkUnKoZgNhcDKhKg5aH+1IkcouCAdFGAQsuWZYhOjwFHQ96oagWgRoUov1T9kRBEODAwxM2QtEUl+Wp+Ln9VRo6BcMw4ErHRYjH4/B26AlQoQQTRdHWwcd9AH57+UAXddvDD37DmrBBV34WfqiXPl61g+vr6xA9zsGeM9gOdsNXkgpEtTwVvwOklXLKm6+/p5ezwk4B+j6droBs2CsGa/gNs6RIxazl4Tc25mpTgw/apPR1LYlNRFAzgsOxkyXYLIM1V8NMwyAkJSctD1eGVKiq5wWjSPdjmeTkiKvVW4f2YPHWl3GAVq6ymcyCTgovM3FzyRiDe2TaKcEKsLpJvNHjZgPNqEtyi6mZIm4SRFyLMUsONSSdkPeFtY1n0mczoY3BHTLhwPRy9/lzcziCw9ACI+yql0VLzcGAZbYSM5CCSZg1/9oc/nn7+i8N9p/8An4JMADxhH+xHfuiKwAAAABJRU5ErkJggg==)"
    },
    info: {
      color: "#3A87AD",
      "background-color": "#D9EDF7",
      "border-color": "#BCE8F1",
      "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QYFAhkSsdes/QAAA8dJREFUOMvVlGtMW2UYx//POaWHXg6lLaW0ypAtw1UCgbniNOLcVOLmAjHZolOYlxmTGXVZdAnRfXQm+7SoU4mXaOaiZsEpC9FkiQs6Z6bdCnNYruM6KNBw6YWewzl9z+sHImEWv+vz7XmT95f/+3/+7wP814v+efDOV3/SoX3lHAA+6ODeUFfMfjOWMADgdk+eEKz0pF7aQdMAcOKLLjrcVMVX3xdWN29/GhYP7SvnP0cWfS8caSkfHZsPE9Fgnt02JNutQ0QYHB2dDz9/pKX8QjjuO9xUxd/66HdxTeCHZ3rojQObGQBcuNjfplkD3b19Y/6MrimSaKgSMmpGU5WevmE/swa6Oy73tQHA0Rdr2Mmv/6A1n9w9suQ7097Z9lM4FlTgTDrzZTu4StXVfpiI48rVcUDM5cmEksrFnHxfpTtU/3BFQzCQF/2bYVoNbH7zmItbSoMj40JSzmMyX5qDvriA7QdrIIpA+3cdsMpu0nXI8cV0MtKXCPZev+gCEM1S2NHPvWfP/hL+7FSr3+0p5RBEyhEN5JCKYr8XnASMT0xBNyzQGQeI8fjsGD39RMPk7se2bd5ZtTyoFYXftF6y37gx7NeUtJJOTFlAHDZLDuILU3j3+H5oOrD3yWbIztugaAzgnBKJuBLpGfQrS8wO4FZgV+c1IxaLgWVU0tMLEETCos4xMzEIv9cJXQcyagIwigDGwJgOAtHAwAhisQUjy0ORGERiELgG4iakkzo4MYAxcM5hAMi1WWG1yYCJIcMUaBkVRLdGeSU2995TLWzcUAzONJ7J6FBVBYIggMzmFbvdBV44Corg8vjhzC+EJEl8U1kJtgYrhCzgc/vvTwXKSib1paRFVRVORDAJAsw5FuTaJEhWM2SHB3mOAlhkNxwuLzeJsGwqWzf5TFNdKgtY5qHp6ZFf67Y/sAVadCaVY5YACDDb3Oi4NIjLnWMw2QthCBIsVhsUTU9tvXsjeq9+X1d75/KEs4LNOfcdf/+HthMnvwxOD0wmHaXr7ZItn2wuH2SnBzbZAbPJwpPx+VQuzcm7dgRCB57a1uBzUDRL4bfnI0RE0eaXd9W89mpjqHZnUI5Hh2l2dkZZUhOqpi2qSmpOmZ64Tuu9qlz/SEXo6MEHa3wOip46F1n7633eekV8ds8Wxjn37Wl63VVa+ej5oeEZ/82ZBETJjpJ1Rbij2D3Z/1trXUvLsblCK0XfOx0SX2kMsn9dX+d+7Kf6h8o4AIykuffjT8L20LU+w4AZd5VvEPY+XpWqLV327HR7DzXuDnD8r+ovkBehJ8i+y8YAAAAASUVORK5CYII=)"
    },
    warn: {
      color: "#C09853",
      "background-color": "#FCF8E3",
      "border-color": "#FBEED5",
      "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABJlBMVEXr6eb/2oD/wi7/xjr/0mP/ykf/tQD/vBj/3o7/uQ//vyL/twebhgD/4pzX1K3z8e349vK6tHCilCWbiQymn0jGworr6dXQza3HxcKkn1vWvV/5uRfk4dXZ1bD18+/52YebiAmyr5S9mhCzrWq5t6ufjRH54aLs0oS+qD751XqPhAybhwXsujG3sm+Zk0PTwG6Shg+PhhObhwOPgQL4zV2nlyrf27uLfgCPhRHu7OmLgAafkyiWkD3l49ibiAfTs0C+lgCniwD4sgDJxqOilzDWowWFfAH08uebig6qpFHBvH/aw26FfQTQzsvy8OyEfz20r3jAvaKbhgG9q0nc2LbZxXanoUu/u5WSggCtp1anpJKdmFz/zlX/1nGJiYmuq5Dx7+sAAADoPUZSAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfdBgUBGhh4aah5AAAAlklEQVQY02NgoBIIE8EUcwn1FkIXM1Tj5dDUQhPU502Mi7XXQxGz5uVIjGOJUUUW81HnYEyMi2HVcUOICQZzMMYmxrEyMylJwgUt5BljWRLjmJm4pI1hYp5SQLGYxDgmLnZOVxuooClIDKgXKMbN5ggV1ACLJcaBxNgcoiGCBiZwdWxOETBDrTyEFey0jYJ4eHjMGWgEAIpRFRCUt08qAAAAAElFTkSuQmCC)"
    }
  }
});
;
$(document).on('change', '.cart_product__element .counter__wrapper input[name="count"]', function (event) {
  var self = $(this);
  var product = self.parents('.cart_product__element').eq(0);
  var count = product.find('input[name="count"]').val();
  var productId = self.attr('data-product-id');
  var url = product.attr('data-ajax-url-update');
  $.ajax({
    method: 'get',
    url: url,
    data: {
      'product_id': productId,
      'count': count
    },
    dataType: 'json'
  }).done(function (result) {
    if (result.success) {
      product.find('.cart_product__element__total').html(parseFloat(result['product_sum']).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
      $('.total_cart_summary__amount').html(parseFloat(result['total_cost']).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

      if (Object.keys(result['kit_products']).length > 0) {
        $('div[data-product-id="' + productId + '"] .cart_product__element__total').html('');
        Object.keys(result['kit_products']).forEach(function (key, index) {
          $('.kit__element input[data-product-id="' + key + '"]').val(result['kit_products'][key][0]);
          $('.kit__element[data-product-id="' + key + '"] .cart_product__element__total').html(result['kit_products'][key][1]);
        }, result['kit_products']);
      }
    }
  });
  event.preventDefault();
});
$(document).on('click', '.cart_product__element__remove', function (event) {
  var product = $(this).parents('.cart_product__element').eq(0);
  var productId = product.attr('data-product-id');
  var url = product.attr('data-ajax-url-remove');
  $.ajax({
    method: 'get',
    url: url,
    data: {
      'product_id': productId
    },
    dataType: 'json'
  }).done(function (result) {
    if (result['success']) {
      product.fadeOut(300).addClass('js_remove_product');
      $('.cart_product__element').each(function () {
        if ($(this).attr('data-kit-id') == productId) {
          $(this).addClass('js_remove_product');
        }
      });
      $('.cart_kit__complectation__wrapper').each(function () {
        if ($(this).attr('data-kit-id') == productId) {
          $(this).addClass('js_remove_product');
        }
      });
      setTimeout(function () {
        $('.js_remove_product').remove();
        $('.cart_products__wrapper').change();
      }, 350);
      $('.total_cart_summary__amount').html(result['total_cost'].toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
      $('#order-weight strong').html(result['total_weight']);
      $('#order-volume strong').html(result['total_volume']);
      $('#order-truck-count strong').html(result['total_truck_count']);
      $('input[name="truck_count"]').val(parseFloat(result['total_truck_count']).toFixed(2));
      $('#order-overload strong').html(result['total_overload']);
    }
  });
  event.preventDefault();
});
$(document).ready(function () {
  $('.delivery_togglers__wrapper label span.radiobutton').removeClass('radiobutton__active');
  $('input[name="delivery_type"]').each(function (index) {
    var self = $(this);

    if (self.is(':checked')) {
      self.next().addClass('radiobutton__active');
      $('.delivery_type__content__wrapper').fadeOut(10).removeClass('delivery_type__content__wrapper__active');
      $('[id="' + self.parents('label:first').attr('data-content-target') + '"]').fadeIn(200).addClass('delivery_type__content__wrapper__active');
    }
  });
  $('#simple__delivery__payment label span.radiobutton').removeClass('radiobutton__active');
  $('input[name="payment_type2"]').each(function (index) {
    var self = $(this);

    if (self.is(':checked')) {
      self.next().addClass('radiobutton__active');
    }
  });
  $('#self__delivery__payment label span.radiobutton').removeClass('radiobutton__active');
  $('input[name="payment_type"]').each(function (index) {
    var self = $(this);

    if (self.is(':checked')) {
      self.next().addClass('radiobutton__active');
    }
  });
  $('.pickup_point__wrapper label span.radiobutton').removeClass('radiobutton__active');
  $('input[name="pickup_point"]').each(function (index) {
    var self = $(this);

    if (self.is(':checked')) {
      self.next().addClass('radiobutton__active');
    }
  });
  $('.service__wrapper label span.radiobutton').removeClass('radiobutton__active');
  $('input[name="service_office"]').each(function (index) {
    var self = $(this);

    if (self.is(':checked')) {
      self.next().addClass('radiobutton__active');
    }
  });
  $('input[name="is_need_manipulator"]').each(function (index) {
    var self = $(this);

    if (self.is(':checked')) {
      self.next().addClass('delivery_checkbox__active');
    }
  });
  $('input[name="is_need_loaders"]').each(function (index) {
    var self = $(this);

    if (self.is(':checked')) {
      self.next().addClass('delivery_checkbox__active');
      $('.order_loaders__wrapper').css('display', 'block');
      $('input[name="up_to_floor"]').each(function (index) {
        var self = $(this);

        if (self.is(':checked')) {
          self.next().addClass('delivery_checkbox__active');
          $('.order_floor_count__wrapper').css('display', 'block');
        }
      });
    }
  });
  checkPaymentTypeCredit();
});
var routeLength;
$(document).on('change', '.cart_products__wrapper', function () {
  checkPaymentTypeCredit();

  if (typeof recalculateDeliveryCost === "function") {
    setTimeout(function () {
      recalculateDeliveryCost();
    }, 500);
  }
});
$(document).on('change', '.delivery_calculation__wrapper', function () {
  if (typeof recalculateDeliveryCost === "function") {
    recalculateDeliveryCost();
  }
});

function checkPaymentTypeCredit() {
  remove_credit = false;
  $('.cart_product__element').each(function () {
    can_credit = $(this).attr('data-can-credit');

    if (can_credit == 'false') {
      remove_credit = true;
    }
  });
  payment_type_self = $('input[name="payment_type"][value="2"]');
  payment_type_delivery = $('input[name="payment_type2"][value="2"]');

  if (remove_credit) {
    payment_type_self.parent('label').css('display', 'none');
    payment_type_delivery.parent('label').css('display', 'none');

    if (payment_type_self.attr('checked') == 'checked') {
      payment_type_self.removeAttr('checked');
      $('input[name="payment_type"][value="0"]').attr('checked', 'checked');
    }

    if (payment_type_delivery.attr('checked') == 'checked') {
      payment_type_delivery.removeAttr('checked');
      $('input[name="payment_type2"][value="3"]').attr('checked', 'checked');
    }
  } else {
    payment_type_self.parent('label').css('display', 'block');
    payment_type_delivery.parent('label').css('display', 'block');
  }
}

$(document).on('click', '.delivery_togglers__wrapper .radiobutton', function (event) {
  event.preventDefault();
  var self = $(this);
  var wrapper = self.parents('.radiobutton_group:first');

  if (!self.hasClass('radiobutton__active')) {
    wrapper.find('.radiobutton').removeClass('radiobutton__active');
    wrapper.find('input').removeAttr('checked');
    self.addClass('radiobutton__active');
    self.prev().attr('checked', 'checked');
    $('.delivery_type__content__wrapper').fadeOut(10).removeClass('delivery_type__content__wrapper__active');
    $('[id="' + self.parents('label:first').attr('data-content-target') + '"]').fadeIn(200).addClass('delivery_type__content__wrapper__active');
  }

  self = null;
});
$(document).on('click', '.pickup_point__wrapper .radiobutton', function (event) {
  event.preventDefault();
  var self = $(this);
  var wrapper = self.parents('.radiobutton_group:first');

  if (!self.hasClass('radiobutton__active')) {
    $('.pickup_point__wrapper .radiobutton').removeClass('radiobutton__active');
    $('.pickup_point__wrapper input').each(function () {
      $(this).removeAttr('checked');
    });
    self.addClass('radiobutton__active');
    self.prev().attr('checked', 'checked');
  }

  self = null;
});
$(document).on('click', '#self__delivery__payment .radiobutton', function (event) {
  event.preventDefault();
  var self = $(this);
  var wrapper = $('#self__delivery__payment');

  if (!self.hasClass('radiobutton__active')) {
    wrapper.find('.radiobutton').removeClass('radiobutton__active');
    wrapper.find('input').each(function () {
      $(this).removeAttr('checked');
    });
    self.addClass('radiobutton__active');
    self.prev().attr('checked', 'checked');
  }

  self = null;
});
$(document).on('click', '#simple__delivery__payment .radiobutton', function (event) {
  event.preventDefault();
  var self = $(this);
  var wrapper = $('#simple__delivery__payment');

  if (!self.hasClass('radiobutton__active')) {
    wrapper.find('.radiobutton').removeClass('radiobutton__active');
    wrapper.find('input').each(function () {
      $(this).removeAttr('checked');
    });
    self.addClass('radiobutton__active');
    self.prev().attr('checked', 'checked');
  }

  self = null;
});
$(document).on('click', '#simple__delivery__service_office .radiobutton', function (event) {
  event.preventDefault();
  var self = $(this);
  var wrapper = $('#simple__delivery__service_office');

  if (!self.hasClass('radiobutton__active')) {
    wrapper.find('.radiobutton').removeClass('radiobutton__active');
    wrapper.find('input').each(function () {
      $(this).removeAttr('checked');
    });
    self.addClass('radiobutton__active');
    self.prev().attr('checked', 'checked');
  }

  self = null;
});
$(document).on('click', '.delivery_calculation__wrapper span.delivery_checkbox, .delivery_calculation__wrapper_page span.delivery_checkbox', function () {
  self = $(this);

  if (self.hasClass('delivery_checkbox__active')) {
    self.removeClass('delivery_checkbox__active');
    self.prev().removeAttr('checked');

    if (self.hasClass('need_loaders')) {
      $('.order_loaders__wrapper').addClass('order_loaders_wrapper__hidden');
    }

    if (self.hasClass('up_to_floor')) {
      $('.order_floor_count__wrapper').addClass('order_floor_count_wrapper__hidden');
    }
  } else {
    self.addClass('delivery_checkbox__active');
    self.prev().attr('checked', 'checked');

    if (self.hasClass('need_loaders')) {
      $('.order_loaders__wrapper').removeClass('order_loaders_wrapper__hidden');
    }

    if (self.hasClass('up_to_floor')) {
      $('.order_floor_count__wrapper').removeClass('order_floor_count_wrapper__hidden');
    }
  }

  self.trigger('change');
});
$(document).on('click', 'a.stock__wrapper', function (event) {
  var toggler = $(this);
  var url = toggler.attr('data-ajax-url');
  var product_id = toggler.attr('data-stock-container-id').split('-')[1];
  var container = $('#popup-stock-container');
  $.ajax({
    method: 'get',
    url: url,
    data: {
      'product_id': product_id
    },
    dataType: 'html'
  }).done(function (result) {
    container.html(result);
    var modal = $('[id="' + toggler.attr('data-stock-container-id') + '"]');

    if (_typeof(modal) == 'object') {
      if (!modal.hasClass('stock_details__modal__wrapper__active')) {
        $('.stock_details__modal__wrapper.stock_details__modal__wrapper__active').fadeOut(300).removeClass('stock_details__modal__wrapper__active');
        var leftPos = toggler.offset().left - modal.outerWidth() / 2 + 15;
        modal.css({
          top: toggler.offset().top - 15 + 'px',
          left: (leftPos < 0 ? 10 : leftPos) + 'px'
        });
        modal.fadeIn(300).addClass('stock_details__modal__wrapper__active');
      }
    }
  });
  event.preventDefault();
});
$(window).resize(function () {
  if ($('.stock_details__modal__wrapper.stock_details__modal__wrapper__active').length > 0) {
    $('.stock_details__modal__wrapper.stock_details__modal__wrapper__active').fadeOut(300).removeClass('stock_details__modal__wrapper__active');
  }
});
$(document).on('click', '.stock_details__modal__wrapper .stock_details__modal__wrapper__close_btn', function (event) {
  event.preventDefault();
  $(this).parents('.stock_details__modal__wrapper:first').fadeOut(300).removeClass('stock_details__modal__wrapper__active');
});
$(document).ready(function () {
  $('.radiobutton').each(function () {
    if ($(this).prev().attr('checked')) {
      $(this).addClass('radiobutton__active');
    } else {
      $(this).removeClass('radiobutton__active');
    }
  });
});
;
$(document).ready(function (event) {
  var ww = $(window).width();
  var button_mobile_search = $('.button_mobile_search');
  var input_search = $('.search__wrapper .search_input:not(.company_search_input)');
  var search_actions = $('.search__wrapper .search__actions:not(.companies__search__actions)');
  var search_panel_mobile = $('.search_panel__mobile');
  var search_panel_desktop = $('.search_panel__desktop');

  if (ww <= 768) {
    search_panel_desktop.empty();
    $('#search_rubrics').css('display', 'none');
    button_mobile_search.show();
    search_actions.hide();
    input_search.attr('placeholder', 'Поиск');
    input_search.attr('placeholder-default', 'Поиск');
    input_search.attr('placeholder-active', 'Что вы ищите по красной цене?');
  } else {
    search_panel_mobile.empty();
    button_mobile_search.hide();
    search_actions.show();
    input_search.attr('placeholder', 'Что ищем?');
    input_search.attr('placeholder-default', '');
    input_search.attr('placeholder-active', '');
  }
});

function ajax_search(input) {
  if (input.val().length >= 2) {
    var result_container_id = 'success-result-search';
    var is_mobile = $(input).data('mobile');
    var is_mobile_bottom = $(input).data('mobilebottom');

    if (is_mobile) {
      result_container_id = 'success-result-search-mobile';
    } else if (is_mobile_bottom) {
      result_container_id = 'success-result-search-mobile-bottom';
    }

    var _url = $(input).data('url');

    console.log(_url);
    var data = input.serialize();
    $.ajax({
      type: 'post',
      url: _url,
      data: data,
      dataType: 'html'
    }).done(function (result) {
      if (result.replace(/\s/g, '').length > 0) {
        $('#' + result_container_id).html(result);
        $('#' + result_container_id).css('display', 'block');
        $('#' + result_container_id).show();
      } else {
        $('#' + result_container_id).html('');
        $('#' + result_container_id).css('display', 'none');
        $('#' + result_container_id).hide();
      }
    });
  } else {
    console.log('no input');
    $('#success-result-search').empty();
    $('#success-result-search').hide();
    $('#success-result-search-mobile').empty();
    $('#success-result-search-mobile').hide();
    $('#success-result-search-mobile-bottom').empty();
    $('#success-result-search-mobile-bottom').hide();
  }
}

$(document).on('focus keyup paste', '.search_input', function (e) {
  ajax_search($(this));
});
$(document).on('click', '.search__example', function (e) {
  e.preventDefault();
  console.log('example');
  var input = $('.search_input');
  $(input).val($('.search__example span').html());
  ajax_search(input);
});
$(document).on('blur', '.search_input', function (e) {
  $('#success-result-search:not(:hover)').hide();
  $('#success-result-search-mobile:not(:hover)').hide();
  $('#success-result-search-mobile-bottom:not(:hover)').hide();
});
$(document).on('click', '.search__button', function (e) {
  e.preventDefault();
  $('form[name="search"]').submit();
});
$(document).on('click', '.search_price__sorter li a', function (event) {
  var self = $(this);

  if (!self.hasClass('search_price__sorter__selected')) {
    $('.search_price__sorter li a').removeClass('search_price__sorter__selected');
    self.addClass('search_price__sorter__selected');
  }

  searchPriceSort(asc = $(this).attr('id'));
  event.preventDefault();
});

function searchPriceSort(asc) {
  if (asc === undefined) {
    asc = 'sort_asc';
  }

  var sort_by_price = function sort_by_price(a, b) {
    if (asc == 'sort_asc') {
      return parseFloat($(a).attr('data-price')) > parseFloat($(b).attr('data-price')) ? 1 : -1;
    } else {
      return parseFloat($(a).attr('data-price')) < parseFloat($(b).attr('data-price')) ? 1 : -1;
    }
  };

  var wrapper_list = $('.products_catalog__wrapper .product-list').get();
  var wrapper_arr = [].slice.call(wrapper_list);
  wrapper_arr.forEach(function (wrapper) {
    var list = $(wrapper).find('.product-col');
    var show_more = $(wrapper).find('.endless_container');
    var arr = [].slice.call(list).sort(sort_by_price);
    $(wrapper).html('');
    arr.forEach(function (elem) {
      $(wrapper).append(elem);
    });
    $(wrapper).append(show_more);
  });
}

;
$(function () {
  $(".comment_form").click(function () {
    $(this).addClass('clicked');
  });
  $(".search__wrapper").click(function (e) {
    $('#success-result-search').show();
  });
  $(".content__wrapper.searchwrap").click(function () {
    $('#success-result-search').hide();
  });
  $(".comments_link a").click(function (e) {
    e.preventDefault();
    $(this).parent().next(".comment_reply").show();
  });
  $(".comments_stat a").click(function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
  });
  size_li = $(".taglink").length;
  var items = size_li;
  var shown = 10;
  $('.more_tag').click(function (e) {
    e.preventDefault();
    shown = $('.taglink:visible').length + 10;

    if (shown < items) {
      $('.taglink:lt(' + shown + ')').addClass('showtag');
    } else {
      $('.taglink:lt(' + items + ')').addClass('showtag');
      $('.more_tag').hide();
    }
  });
  $('.helpbox_close').click(function (e) {
    e.preventDefault();
    $('.helpbox').remove();
  });
});
;
$(document).on('click', '.product_filter .rubrics_sub__headline__toggler', function (event) {
  var toggler = $(this).find('.sub_toggler');
  var wrapper = $(this).parents('.toggler-wrapper:first').find('.rubrics_sub__headline__wrapper');

  if (!toggler.hasClass('toggler_is_active')) {
    wrapper.slideDown(300);
    toggler.addClass('toggler_is_active');
  } else {
    wrapper.slideUp(300);
    toggler.removeClass('toggler_is_active');
  }

  event.preventDefault();
});
;
$(document).on('click', '.content__wrapper .banner__wrapper a', function (event) {
  var url = $(this).data('ajax-count');
  var image_id = $(this).data('image-id');
  var data = {
    'image_id': image_id
  };
  $.ajax({
    type: 'get',
    url: url,
    data: data,
    dataType: 'json'
  }).done(function (result) {
    console.log(result);
  });
});