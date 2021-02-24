// cart forms for not authenticated users
$(document).on('change', 'input[name="how_to_buy"]', function(e) {
  var self = $(this);
  if (self.is(':checked')) {
      var form = self.val();
      $('.radio__form-wrapper').slideUp(300);
      if (form == 'login') {
          $('.cart__login-form').slideDown(300);

      } else if (form == 'registration') {
          $('.cart__registration-form').slideDown(300);
      }
      form = null;
  }
  self = null;
});
// add class for empty fields
$(document).on('blur', '.modal-form .form-field-required', function(e) {
   var self = $(this);
   var value = self.val();
   if (value === null || value === undefined || value == '') {
       self.addClass('empty-warning');
   } else {
       self.removeClass('empty-warning');
   }
   self = null;
});

function addPageEventListeners()  {
  // add star after required fields
  $('.form-field-required').after('<span class="required-sign">*</span>');

  /// Hide arrow to top button
  var backtotop = $('.back-to-top');
  $(window).scroll(function(){
      backtotop['fade'+ ($(this).scrollTop() > 500 ? 'In': 'Out')](400);
  });
  ////// category_products //////

  // feedback slider
  // $('.feedback-slider-xs').bxSlider({
  //     pager: false,
  //     auto: true,
  //     slideWidth: 250,
  //     adaptiveHeight: true,
  //     nextSelector: '#fs-next',
  //     prevSelector: '#fs-prev'
  // });

  // show dropdown menu
  $(".category ul:first > li > .js-dropdown").on('mouseover', function (event) {
      var self = $(this);
      $(".category ul > li .menu-panel").slideUp(100);
      self.parent('li').find('.menu-panel').fadeIn(450);
      self = null;
  });
  // hide dropdown menu
  $(".category ul:first > li").on('mouseleave', function (event) {
      $(".category ul > li .menu-panel").slideUp(100);
  });

  $(document).ready(function () {
      $("a[rel=group], .fancybox").fancybox({
          "overlayShow": true,
          "overlayOpacity": 0.8,
          "overlayColor": '#777',
      });
  });

  $(".js-dropdown").click(function () {

      /*        $(".js-dropdown").removeClass('panel-show');
       var curentPanel = $(this).next();

       if($(this).hasClass('panel-show')){
       $(this).addClass('panel-hide').removeClass('panel-show');
       }else{
       $(this).addClass('panel-show').removeClass('panel-hide');
       }*/

  });

  // $('.gallery__slider').zoom();

  $(".read-more").on('click', function (event) {
      event.preventDefault();
      var that = this,
          modClass = 'comment--open',
          parentRow = $(this).closest(".table-row"),
          currentComment = $(parentRow).find('.comment');
      if (currentComment.hasClass(modClass)) {
          currentComment.removeClass(modClass);
          $(that).html('<i></i>Читать <br> полностью');
      } else {
          currentComment.addClass(modClass);
          $(that).html('<i></i>Свернуть');
      }
  });

  $(".scrollbar").scroller();
  $('.select').fancySelect();

  $(".slider-margin").each(function (i, elem) {
      var field_start = $(elem).parent('.range').find('input').eq(0);
      var field_end = $(elem).parent('.range').find('input').eq(1);
      var min_value = parseFloat(field_start.attr('placeholder'));
      var max_value = parseFloat(field_end.attr('placeholder'));
      var start_value = field_start.val() ? parseFloat(field_start.val()) : min_value;
      var end_value = field_end.val() ? parseFloat(field_end.val()) : max_value;
      $(elem).noUiSlider({
          start: [start_value, end_value],
          format: wNumb({
              decimals: 0
          }),
          range: {
              'min': min_value,
              'max': max_value
          }
      });
      $(elem).on('slide', function(e, a, b){
          var value = $(elem).val();
          $(elem).parent('.range').find('input').eq(0).val(value[0]);
          $(elem).parent('.range').find('input').eq(1).val(value[1]);
      });
  });

  $('.nav li.open').parents('li').addClass('open');

  $('.accordion__title').on('click', function (e) {
      var parentItem = $(this).parent('.accordion__item'),
      contentItem = parentItem.find('.accordion__text');
      window.parentItem = parentItem;
      if (parentItem.hasClass('active')) {
          parentItem.removeClass('active');
          contentItem.slideUp(200);
      } else {
          parentItem.addClass('active');
          contentItem.slideDown(200);
          var oID = parentItem.attr('id');
      }
  });

  $('.bxslider').bxSlider({
      /*pagerCustom: '#bx-pager',*/
      controls: true,
      auto: true,
      autoControls: true,
      pause: $('.bxslider').data('pause'),
      onSliderLoad: function(){
          $(".front-slider .bx-wrapper").css("visibility", "visible");
      }
  });

  /*    $('.gallery__slider').bxSlider({
   mode: 'fade',
   pagerCustom: '.gallery__pager',
   auto: true,
   autoControls: true,
   nextSelector: '.gallery__nav--next',
   prevSelector: '.gallery__nav--prev',
   nextText: '→',
   prevText: '←'
   });*/

  let carousel = $('.gallery__pager').bxSlider({
      slideWidth: 80,
      maxSlides: 100,
      infiniteLoop: false,
      hideControlOnEnd: true,
      moveSlides: 1,
      slideMargin: 10,
      pager: false,
      nextSelector: '.gallery__nav--next',
      prevSelector: '.gallery__nav--prev',
      nextText: '→',
      prevText: '←',
      onSliderLoad: function(currentIndex) {
          if (currentIndex == 0) {
              $('.gallery__nav--prev').hide();
          }
      },
      onSlideAfter: function (){
          if($(".bx-next").hasClass("disabled")) {
              $('.gallery__nav--next').hide();
              $('.gallery__nav--prev').show();
          }
          if ($(".bx-prev").hasClass("disabled")) {
              $('.gallery__nav--next').show();
              $('.gallery__nav--prev').hide();
          }
      },
  });
  let slider = $('.gallery__slider').bxSlider({
      captions: true,
      controls: false,
      pager: false,
      mode: 'fade'
  });
  $('.gallery__item').on('click', function (event) {
      event.preventDefault();
      var indexPos = $(this).data('slide-index');
      $('.gallery__slider').find('a').hide();
      $('.gallery__slider').find('[data-slide-index='+indexPos+']').show();
  });

  $('.block-news').bxSlider({
      nextSelector: '#new-next',
      prevSelector: '#new-prev',
      nextText: '→',
      prevText: '←',
      pagerCustom: '#news-pager'
  });
  $('.teaser-slider').bxSlider({
      pager: false,
      auto: true,
      minSlides: 3,
      maxSlides: 4,
      slideWidth: 195,
      slideMargin: 30,
      nextSelector: '#teaser__next',
      prevSelector: '#teaser__prev',
      nextText: '→',
      prevText: '←'
      //pagerCustom: '#teaser__pager'
  });
  $('.related-slider').bxSlider({
      pager: false,
      auto: true,
      slideWidth: 170,
      nextSelector: '.related__next',
      prevSelector: '.related__prev',
      nextText: '→',
      prevText: '←'
  });
  $('.recent-slider').bxSlider({
      pager: false,
      auto: true,
      adaptiveHeight: true,
      nextSelector: '.recent__next',
      prevSelector: '.recent__prev',
      nextText: '→',
      prevText: '←'
  });
  $('.week-product-slider').bxSlider({
      pager: false,
      auto: false,
      adaptiveHeight: true,
  });

  // submit by search icon
  $('.search__form svg').on('click', function (e) {
      $(this).parents('form').submit();
  });

  /* табы */
  $(".tabs__link").on('click', function (e) {
      e.preventDefault();

      var item = $(this),
          contentItem = $('.tabs__item'),
          itemPosition = item.index();

      contentItem.eq(itemPosition)
          .addClass('active')
          .siblings()
          .removeClass('active');

      item.addClass('active')
          .siblings()
          .removeClass('active');

      // teasers display configuration
      var teasersCounter = contentItem.eq(itemPosition).find('.new-item').length;
      if((teasersCounter > 0)&&(teasersCounter > 8)) {
          window['group-index'] = 1;
          window['teaser-counter'] = 0;
          contentItem.eq(itemPosition).find('.new-item').each(function(index, key) {
              var self = $(this);
              if(window['teaser-counter'] >= 8) {
                  window['teaser-counter'] = 0;
                  window['group-index'] = window['group-index']+1;
              }
              self.attr('teaser-group', window['group-index']);
              if(window['group-index'] == 1) {
                 self.fadeIn(150);
              } else {
                  self.fadeOut(0);
              }
              window['teaser-counter'] += 1;
              self = null;
          });
          $('.teaser-list').attr('style', 'height:580px;');
      }
      window['group-index'] = null;
      window['teaser-counter'] = null;
  });
  $(".tabs__link").first().click();

  $('.related-products').each(function (index) {
      var relatedProductsTeasersCounter = $(this).find('.new-card, .new-item-action').length;
      if (relatedProductsTeasersCounter > 0 && relatedProductsTeasersCounter > 4) {
          var relatedGroupIndexName = 'related-group-index-' + index;
          var relatedTeaserCounterName = 'related-teaser-counter-' + index;
          window[relatedGroupIndexName] = 1;
          window[relatedTeaserCounterName] = 0;
          $(this).find('.new-card, .new-item-action').each(function (index, key) {
              var self = $(this);
              if (window[relatedTeaserCounterName] >= 4) {
                  window[relatedTeaserCounterName] = 0;
                  window[relatedGroupIndexName] = window[relatedGroupIndexName] + 1;
              }
              self.attr('teaser-group', window[relatedGroupIndexName]);
              if (window[relatedGroupIndexName] == 1) {
                  self.fadeIn(150);
              } else {
                  self.fadeOut(0);
              }
              window[relatedTeaserCounterName] += 1;
              self = null;
          });
      }
      // teasers pagination
      $('.pager-large a', this).on('click', function (event) {
          var self = $(this);
          var contentItem = self.parents('.tabs__item.active');
          var currentGroup = parseInt(contentItem.find('.pager-large li.active a').attr('data-go-to'));
          var gotoGroup = self.attr('data-go-to');

          if (gotoGroup) {
              // count of slides without next and prev links
              var groupsCount = parseInt(contentItem.find('.pager-large li:not(.tabs-view-all)').length) - 2;
              switch(gotoGroup) {
                  default:
                      gotoGroup = parseInt(gotoGroup);
                      if (gotoGroup < 0) {
                          gotoGroup = groupsCount;
                      } else if(gotoGroup > groupsCount) {
                          gotoGroup = 1;
                      }
                  break;
                  case 'prev':
                      gotoGroup = currentGroup - 1;
                      if(gotoGroup < 1) {
                          gotoGroup = groupsCount;
                      }
                  break;
                  case 'next':
                      gotoGroup = currentGroup + 1;
                      if(gotoGroup > groupsCount) {
                          gotoGroup = 1;
                      }
                  break;
              }
              if (gotoGroup > 1) {
                  contentItem.find('.pager-large a[data-go-to="prev"]').css('display', 'block');
              } else {
                  contentItem.find('.pager-large a[data-go-to="prev"]').css('display', 'none');
              }
              if (gotoGroup < groupsCount) {
                  contentItem.find('.pager-large a[data-go-to="next"]').css('display', 'block');
              } else {
                  contentItem.find('.pager-large a[data-go-to="next"]').css('display', 'none');
              }

              contentItem.find('.teaser[teaser-group="'+currentGroup+'"]').fadeOut(0);
              contentItem.find('.teaser[teaser-group="'+gotoGroup+'"]').fadeIn(1000);
              contentItem.find('.new-card[teaser-group="'+currentGroup+'"]').fadeOut(0);
              contentItem.find('.new-card[teaser-group="'+gotoGroup+'"]').fadeIn(1000);
              contentItem.find('.pager-large li').removeClass('active');
              contentItem.find('.pager-large a[data-go-to="'+gotoGroup+'"]').parent('li').addClass('active');
              contentItem = null;
              currentGroup = null;
              gotoGroup = null;
              self = null;
              return false;
          }

      });
  });

  // teasers pagination
  $('.tabs__content__main .pager-large a').on('click', function (event) {
      var self = $(this);
      var contentItem = $('.tabs__item.active');
      var currentGroup = parseInt(contentItem.find('.pager-large li.active a').attr('data-go-to'));
      var gotoGroup = self.attr('data-go-to');

      if (gotoGroup) {
          // count of slides without next and prev links
          var groupsCount = parseInt(contentItem.find('.pager-large li:not(.tabs-view-all)').length) - 2;
          switch(gotoGroup) {
              default:
                  gotoGroup = parseInt(gotoGroup);
                  if (gotoGroup < 0) {
                      gotoGroup = groupsCount;
                  } else if(gotoGroup > groupsCount) {
                      gotoGroup = 1;
                  }
              break;
              case 'prev':
                  gotoGroup = currentGroup - 1;
                  if(gotoGroup < 1) {
                      gotoGroup = groupsCount;
                  }
              break;
              case 'next':
                  gotoGroup = currentGroup + 1;
                  if(gotoGroup > groupsCount) {
                      gotoGroup = 1;
                  }
              break;
          }
          contentItem.find('.teaser[teaser-group="'+currentGroup+'"]').fadeOut(0);
          contentItem.find('.teaser[teaser-group="'+gotoGroup+'"]').fadeIn(1000);
          contentItem.find('.new-item[teaser-group="'+currentGroup+'"]').fadeOut(0);
          contentItem.find('.new-item[teaser-group="'+gotoGroup+'"]').fadeIn(1000);
          contentItem.find('.pager-large li').removeClass('active');
          $('.pager-large a[data-go-to="'+gotoGroup+'"]').parent('li').addClass('active');
          contentItem = null;
          currentGroup = null;
          gotoGroup = null;
          self = null;
          return false;
      }

  });

  /*     поиск
   $(".search").click(function(e){
   e.preventDefault();
   $(".fixed-bg")
   .fadeIn(200);
   $(".search-popup")
   .fadeIn(200);

   });    */
  $(".search-close").click(function (e) {
      e.preventDefault();
      $(".fixed-bg")
          .fadeOut(200);
      $(".search-popup")
          .fadeOut(200);

  });

  // новости: сортировка
  $('#news-sorting :radio, #promo-sorting :radio, #search-sorting :radio').on('click change', function () {
      window.location.href = $(this).val();
  });


  /*     поиск
   $(".search").click(function(e){
   e.preventDefault();
   $(".fixed-bg")
   .fadeIn(200);
   $(".search-popup")
   .fadeIn(200);

   });    */
  $(".search-close").click(function (e) {
      e.preventDefault();
      $(".fixed-bg")
          .fadeOut(200);
      $(".search-popup")
          .fadeOut(200);

  });

  // новости: сортировка
  $('#news-sorting :radio').on('click change', function () {
      window.location.href = $(this).val();
  });

  // удаление отзыва о товаре
  // ссылка удаления отзыва о товаре должна иметь класс review_delete
  $('a.review_delete').click(function (e) {
      e.preventDefault();
      var _this = this;
      if (confirm('Удалить этот отзыв о товаре?')) {
          $.get($(this).attr('href'), function (response) {
              $(_this).closest('.list__item').remove();
              if ($('.feedback-list .list__item').length == 0) {
                  window.location.href = window.location.pathname;
              }
          });
      }
  });

  // добавление товара в избранное
  // ссылки добавления товара в избранное должны иметь класс add_to_favorites
  $(document)
      .on('click', '.add_to_favorites, .recent-teaser .teaser__footer .teaser__like', function (e) {
      e.preventDefault();
      var _this = $(this);
          var url = _this.is('a') ? _this.attr('href') : _this.data('action-url');

      $.getJSON(url, function (response) {
          _this.notify(response.message, response.result);
          $('.favorites_count').html(response.count);
          _this.css('background-color', '#fbe9ea');
      });
  });

  // удаление товара из избранного
  // ссылки удаления товара из избранного должны иметь класс remove_from_favorites
  $('a.remove_from_favorites').click(function (e) {
      e.preventDefault();
      var _this = this;
      if (confirm('Удалить товар из избранного?')) {
          $.getJSON($(this).attr('href'), function (response) {
              if (response.result == 'success') {
                  $(_this).closest('.list__item').remove();
                  if ($('.wishlist-list .list_item').length == 0) {
                      window.location.href = window.location.pathname;
                  }
              }
              $('.favorites_count').html(response.count);
          });
      }
  });

  ////// Cart //////
  // delivery
  $('.cash-method').on('click', function (e) {
      e.preventDefault();
      var self = $(this);
      $('.need-change-wrap').addClass('show');
      if (self.hasClass('active')) {
          self.removeClass('active');
          $('.method').removeClass('inactive');
          $('.need-change-wrap').removeClass('show');
      } else if (self.hasClass('inactive')) {
          self.removeClass('inactive').addClass('active');
          $('.method').not(self).addClass('inactive').removeClass('active');
      } else {
          self.addClass('active').removeClass('inactive');
          $('.method').not(self).addClass('inactive');
      }
      var currentType = $('.method.active').data('type');
      $('#id_payment_type_custom').val(currentType);
      if (currentType) {
          var show = (currentType === 'upon_receive');
          $('div.upon_receive_only').toggle(show).find('input').val('').attr('required', show);
      }
  });

  initComparisonFormSubmit();
  // добавление товара в корзину
  // ссылки добавления товара в корзину должны иметь класс add_to_cart
  $(document).on('click' , 'a.add_to_cart, .recent-teaser .teaser__footer .teaser__cart',  function (e) {
      e.preventDefault();
      var $this = $(this);
      var teaserFooter = $this.parent();
      var ajax_loader = $(teaserFooter).find('.teaser__shadow');
      ajax_loader.css('display', 'block');
      teaserFooter.children(':not(.teaser__shadow)').css('opacity', '0');
      $.getJSON($this.attr('href'), function (response) {
          ajax_loader.css('display', 'none');
          teaserFooter.children().css('opacity', '1');
          if (response.modal) {
              var url_modal = URLS.static + 'modal.html'
              $.get(url_modal, function (modal_template) {
                  var modal = $(modal_template)
                  modal.find('.dialog__title').text('')  // TODO: нужен ли заголовок?
                  modal.find('.dialog_content').html(response.message);
                  $('body').prepend('<div class="feedback-win"></div>').prepend(modal);
              });
          } else {
              $this.notify(response.message, response.result);
          }
          if (response.result == 'success') {
              teaserFooter.empty();
              teaserFooter.append('<a href="' + URLS.cart + '" class="checkout-btn">Оформить заказ</a>');
              if (response.extra_message) {
                  $.notify.addStyle('red-different-shops', {
                      html:
                      '<div class="notifyjs-wrapper notifyjs-hidable" style="z-index:99999;">' +
                          '<div class="notifyjs-arrow"></div>' +
                              '<div class="notify-message notify-message_error">' +
                                  '<svg viewBox="0 0 19 20" fill="none" stroke="currentColor">' +
                                      '<path d="M13.7775 14.5256L4.72707 5.4741" stroke-width="2"></path>' +
                                      '<path d="M13.7775 5.47442L4.72656 14.5254" stroke-width="2"></path>' +
                                  '</svg>' +
                                  '<div data-notify-text="extra_message" style="margin:20px; font-size:15px;"></div>' +
                              '</div>' +
                          '</div>' +
                      '</div>'
                  });
                  $.notify({
                      extra_message: response.extra_message
                  },
                  {
                      style: 'red-different-shops',
                      autoHideDelay: 5000
                  });
              }
              if(window.yaCounter10771960 !== undefined) {
                  window.yaCounter10771960.reachGoal('ADDTOCART');
              }
              $('.cart_count').html(response.count);
              $('.menu-cart-count').html(response.count);
              $('.cart_price').html(response.total_price);
              var notify_js = $('.notifyjs-corner');
              var left = parseInt((window.screen.width - notify_js.width()) / 2) + 'px';
              notify_js.css({'top': '45%', 'left': left});
          }
      });
  });

  // обновление кол-ва товара
  // ссылка обновления кол-ва товара должна иметь класс qty__control
  $('a.qty__control').click(function (e) {
      e.preventDefault();
      var $this = $(this);
      //Дефолтные настрйоки плагинов
      Noty.overrideDefaults({
        layout: 'topRight',
        theme: 'metroui',
        timeout: 3000
      });
      tippy.setDefaultProps({
        duration: 300,
        placement: 'auto',
        hideOnClick: true,
        trigger: 'click',
        zIndex: 99,
        offset: [0, 15],
        maxWidth: 380
      });
      $.getJSON($(this).attr('href'), function (response) {
          if (response.message) {
              var theme = response.result;
              var _instance = tippy($this[0], {
                  theme: theme,
                  content: response.message
              });
              _instance.show();
          }
          if (response.result == 'success') {
              $this.siblings('.qty__input').val(response.quantity);
              $this.parent().parent().parent().find('.cart-product-price-new')
                  .html('<strong>' + response.product_price_total + ' ₽</strong>')
              $('.base_price').html(response.base_price)
              $('.total_price, .cart_total_price, .cart_price').html(response.total_price)
          }
      });
  });

  $(document).on('click', 'a[href="' + URLS.feedback + '"]', function (e) {
      e.preventDefault();
      $(".feedback-win").remove();
      if (document.location.pathname != URLS.feedback) {
          $.get($(this).attr('href'), function (response) {
              $('body').prepend('<div class="feedback-win"></div>' + $(response).find('#call_me_back_modal')[0].outerHTML);
              //initializePhoneMasks();
          });
      }
  });

  $(document).on('click', 'a[href="' + URLS.feedback_feedback + '"]', function (e) {
      e.preventDefault();
      if (document.location.pathname != URLS.feedback_feedback) {
          $.get($(this).attr('href'), function (response) {
              $('body').prepend('<div class="feedback-win"></div>' + $(response).find('#write_to_us_modal')[0].outerHTML);
              //initializePhoneMasks();
          });
      }
  });

  $(document).on('click', '#unbind_promo_code', function(e){
      $(this).closest('form').find('[name="unbind_promo_code"]').val('1');
  });

  var df = $('#delivery_form');
  console.log(df);
  if (df.length > 0) {
      // Django adds "required" attribute, it's not needed.
      df.find('*').removeAttr('required');
      function show_delivery_form(delivery_type) {
          $('.delivery__form').hide();
          if (delivery_type) {
              df.find('.fields').show();
              $('#delivery_form_' + delivery_type).show();
          } else {
              df.find('.fields').hide();
          }
      }

      var dt_checkboxes = df.find('[name="delivery_type"]');
      dt_checkboxes.on('click change', function (e) {
          e.stopPropagation();
          show_delivery_form($(this).val());
      }).trigger('change');
      dt_checkboxes.filter(':checked').trigger('change');

      df.find('[name="delivery_time_frame"]').on('click change', function () {
          if ($(this).val() == 'exact time') {
              $('[name="delivery_exact_time"]').closest('.form__item').show();
          } else {
              $('[name="delivery_exact_time"]').closest('.form__item').hide();
          }
      }).change();

      df.on('submit', function() {
          var delivery_type = dt_checkboxes.filter(':checked').val();
          // remove all unneeded delivery forms before submitting
          df.find('.delivery__form').filter(function(){
              return $(this).attr('id') != 'delivery_form_' + delivery_type;
          }).remove();
          return true;
      });
  }

  $('.form-sub').on('submit', '#subscription_form', function (e) {
      e.preventDefault();
      var url = $(this).attr('action');
      $.post(url, $(this).serialize(), function (response) {
          $('.form-sub').html(response);
      });
  });

  function initializePhoneMasks() {
      $('[name="phone"]').not('.no-mask').mask('+7 (000) 000-0000');
  }

  //initializePhoneMasks();

  // placeholder
  $(document).on('blur focus keyup', '.with-placeholder', function (e) {
      var self = $(this);
      switch(e.type) {
          case 'focusout':
              if(self.val()=='') {
                  self.val(self.attr('data-placeholder'));
              }
          break;
          case 'focusin':
              if(self.val()==self.attr('data-placeholder')) {
                  self.val('');
              }
          break;
          case 'keyup':
              if(self.attr('name')=='phone') {
                  self.val(self.val().replace(/[^\d]/,''));
              }
          break;
      }
      self = null;
  });

  // rate
  $(document).on('mouseover mouseleave click', '.add-review-form .rating span', function(event) {
      var self = $(this);
      switch(event.type) {
          case 'mouseover':
              $('.add-review-form .rating span').removeClass('on');
              self.addClass('on');
              self.prevAll('span').addClass('on');
          break;
          case 'mouseleave':
              $('.add-review-form .rating span').not('.active').removeClass('on');
              $('.add-review-form .rating span.active').addClass('on');
          break;
          case 'click':
              $('.add-review-form .rating span').removeClass('on');
              $('.add-review-form .rating span').removeClass('active');
              self.addClass('active');
              self.addClass('on');
              self.prevAll('span').addClass('active');
              self.prevAll('span').addClass('on');
              $('input[name=rating]').val(self.attr('data-ratio'));
          break;
      }
      self = null;
  });

  // radio btn sex selection
  $(document).on('click', '.radio-btn-wrapper', function(event) {
      var self = $(this);
      $('.radio-btn-wrapper').removeClass('active');
      self.addClass('active');
      $('input[name=sex]').val(self.attr('data-value'));
      self = null;
  });

  // select the proper sex radio button on load
  $('.radio-btn-wrapper[data-value="' + $('input[name=sex]').val() + '"]').trigger('click');

  if(!!$('.card-info-wrapper .num').length) {
      $('.card-info-wrapper .num').html($('.card-info-wrapper .num').html().replace(/(\d)(?=(\d{4})+(?!\d))/g, "$1 "));
  }

  $(".show-new-review-form").on('click', function (event) {
      var self = $(this);
      var form = $('.add-review-wrapper');
      if(!form.hasClass('minified')) {
          if(!!$('.reviews-block .table-list .table-row').length) {
              $('.reviews-block').slideDown(350);
          }
          form.addClass('minified');
          form.slideUp(350);
      } else {
          if(!!$('.reviews-block .table-list .table-row').length) {
              $('.reviews-block').slideUp(350);
          }
          form.removeClass('minified');
          form.slideDown(350);
      }
      form = null;
      self = null;
  });

  $('.add-review-form').submit(function(e){
      e.preventDefault();
      var form = this;
      $.ajax({
          type: "POST",
          url: $(this).attr('action'),
          data: $(this).serialize(),
          dataType: "json",
          success: function(response) {
              $(form).html('<span class="success">Ваш отзыв добавлен и будет показан на сайте сразу после прохождения модерации.</span>');
          },
          error: function(response) {
              var fields = {'text': 'Текст отзыва', 'name': 'Ваше имя'};
              var message = 'Пожалуйста, исправьте ошибки: \n\n';
              if ('__all__' in response.responseJSON.errors) {
                  message = response.responseJSON.errors['__all__'].join(', ');
              } else {
                  for (var f in response.responseJSON.errors) {
                      message += fields[f] + ': ' + response.responseJSON.errors[f].join(', ') + '\n';
                  }
              }
              $(form).find(':submit').notify(message, { position: "right" });
          }
      });
  });


  $('#catalog_filter_form').submit(function (e) {
      $(this).find(".range").each(function () {
          let range = $(this).find("input");
          if ($(range[0]).val() && $(range[1]).val() === "") {
              $(range[1]).val(Math.ceil($(range[1]).attr('placeholder')));
          }
          if ($(range[0]).val() === "" && $(range[1]).val()) {
              $(range[0]).val(Math.floor($(range[0]).attr('placeholder')));
          }
      });

      $(this).find('input').each(function () {
          if ($(this).val().length === 0) {
              $(this).remove();
          }
      });
  });

  var defFiltersWrappers = $('.filter__item.__default');
  defFiltersWrappers.each(function () {
      var innerInputs = $(this).find('input[type="checkbox"]');
      innerInputs.each(function () {
          var fiParent = $(this).parents('.filter__item');
          if (!!$(this).is(':checked')) {
              fiParent.removeClass('__closed').addClass('__opened __skipThis').find('.toggler-wrapper').slideDown(10);

          } else {
              fiParent.not('.__skipThis').find('.toggler-wrapper').slideUp(10).addClass('whatTheHell');
              fiParent.not('.__skipThis').addClass('__closed').removeClass('__default');
          }
      });
  });

  $(document).on('click', 'a[href="' + URLS.newsletter_subscribe + '"]', function (e) {
      e.preventDefault();
      if ($(this).attr('data-user-registred') === "1"){
          $.get($(this).attr('href'), function (response) {
              $('body').prepend('<div class="modal-bg"></div>' + $(response).find('.modal')[0].outerHTML);
          })
      } else {
          window.location = URLS.register;
      }
  });


  $('#rbkmoney_payment_simple').on('click', function (e) {
  e.preventDefault();
  var checkout = RbkmoneyCheckout.configure({
      invoiceID: invoiceID,
      invoiceAccessToken: invoiceAccessToken,
      name: nameShop,
      description: invoiceDescription,
      // initialPaymentMethod: 'bankCard',
      finished: function () {
          window.location.href = redirectURL;
      }
  });
  checkout.open();
  });

  $('#discount_form').submit(function(e){
      e.preventDefault();
      var form = $(this);
      var promo_code = $('#id_promo_code').val();
      $.post(form.attr('action'), form.serialize(), function(data) {
          $('.cart-page').replaceWith(data);
          addPageEventListeners();
          $('#id_promo_code').val(promo_code);
      });
  });
}


$(document).ready(function() {
  addPageEventListeners();
});

$(window).on('resize', function() {
  adaptYaMap($(window).width());
});
function adaptYaMap(w) {
  if(parseInt(w)<=1160) {
      $('ymaps').first().width('730px');
  } else {
      $('ymaps').first().width('100%');
  }
}

jQuery(document).ready(function ($) {
  var dropshippingMark = $('#form_items').attr('dropshipping_mark');
  if(dropshippingMark==='true') {
  $('#id_delivery_date').datepicker($.extend({
          minDate: deliveryTime
      },
      $.datepicker.regional['ru'],
      $.datepicker.formatDate( "yy-mm-dd")
  ));
  } else {
      $('#id_delivery_date').datepicker($.extend({
          minDate: 0
      },
      $.datepicker.regional['ru'],
      $.datepicker.formatDate( "yy-mm-dd")
  ));
  }

});

$(document).on('click', '.filter__item .toggler', function(event) {
  var self = $(this);
  var filterItem = self.parents('.filter__item');
  var togglerWrapper = filterItem.find('.toggler-wrapper');
  if (!filterItem.hasClass('__closed') && !filterItem.hasClass('__opened')) {
      filterItem.addClass('__closed');
      togglerWrapper.slideUp(150);

  } else if (filterItem.hasClass('__closed')) {
      filterItem.removeClass('__closed');
      filterItem.addClass('__opened');
      togglerWrapper.slideDown(150);

  } else if (filterItem.hasClass('__opened')) {
      filterItem.removeClass('__opened');
      filterItem.addClass('__closed');
      togglerWrapper.slideUp(150);
  }
  togglerWrapper = null;
  filterItem = null;
  self = null;
});

$(function () {
  // remove voice of jivochat
  function jivo_onLoadCallback() {
      if (document.jivo_container) {
              document.jivo_container.HTMLAudioElement.prototype.play = function () {};
      }
  }
  jivo_onLoadCallback();
});

$(document).on('click', '.anchor__tabs a', function(e) {
  var self = $(this);
  if (!self.hasClass('active')) {
      $('.anchor__tabs a').removeClass('active');
      self.addClass('active');
      $('html, body').animate({
          scrollTop: $(self.attr('href')).offset().top
      }, 400);
  }
  self = null;
  e.preventDefault();
});

$(document).on('click', '.back-to-top', function(e) {
  $('html, body').animate({ scrollTop: 0 }, 400);
});

$(function () {
  var backtotop = $('.back-to-top');
  $(window).scroll(function(){
      backtotop['fade'+ ($(this).scrollTop() > 500 ? 'In': 'Out')](400);
  });
});

$(document).on('click touchstart touch vclick tap', '.modal-bg', function (e) {
  $('.modal').remove();
  $('.modal-bg').remove();
});

$(document).on('click touchstart touch vclick', '.modal__close', function (e) {
  $('.modal').remove();
  $('.modal-bg').remove();
});

$(document).on('click touchstart touch vclick', '#yes_18', function (e) {
  e.preventDefault();
  $('.modal-bg').remove();
  $('.modal-age-warning').remove();
  Cookies.set('adult', true, { expires: 365 , path: '/'});
});

$(document).on('click touchstart touch vclick', '#no_18', function (e) {
  e.preventDefault();
  document.location.href = 'https://www.google.com/#q=как+быстро+повзрослеть';
});

$(function () {
  // open fieldsets if options checked
  var inputs = $('#catalog_filter_form input[class="checkbox"]');

  inputs.each(function () {
      var fieldset = $(this).parents('.filter__item');
      if ($(this).attr('checked') == 'checked') {
          fieldset.removeClass('__closed').addClass('__opened').children('.toggler-wrapper').show();
      }
  });
});


// fix menu flashing
$(".category ul:first > li").on('mouseover', function (event) {
var self = $(this);
if (self.hasClass('_active')) {
  return false;
}
self.addClass('_active');
$(".category ul > li .menu-panel").stop(10).fadeOut(100);
self.find('.menu-panel').fadeIn(100);
self = null;
});
$(".category ul:first > li").on('mouseleave', function (event) {
$(this).removeClass('_active');
$(".category ul > li .menu-panel").stop(10).fadeOut(100);
});

// make menu sticky
// $(document).ready(function() {
// 	window.menuTopBorderPosDef = 0;
// 	mainMenuPosToggler();

// 	$(window).scroll(function () {
// 		mainMenuPosToggler();
// 	});
// });

// function mainMenuPosToggler() {
//     if ($(window).width() > 768) {
//         if (parseInt(window.menuTopBorderPosDef) == 0) {
//             window.menuTopBorderPosDef = $('nav.category').offset().top;
//         }
//         var windowScrollTopPos = $(window).scrollTop();
//         var menuWrapper = $('nav.category');
//         if (parseInt(windowScrollTopPos) >= parseInt(window.menuTopBorderPosDef)) {
//             if (!menuWrapper.hasClass('_sticky_menu')) {
//                 menuWrapper.addClass('_sticky_menu');
//             }
//             $('.page__logo__scroll').css('display', 'block');
//         } else if (parseInt(windowScrollTopPos) < parseInt(window.menuTopBorderPosDef)) {
//             menuWrapper.removeClass('_sticky_menu');
//             $('.page__logo__scroll').css('display', 'none');
//         }
//         windowScrollTopPos = null;
//         menuWrapper = null;
//     }
// }



/* modals manipulation */
$(document).on('click', '.modals', function(e) {
e.preventDefault();
var self = $(this);
var modal = $('[id='+self.attr('data-modal-id')+']');
if(modal.hasClass('dialog--open')) {
  modal.addClass('dialog--close');
  modal.removeClass('dialog--open');

} else {
  modal.addClass('dialog--open');
  modal.removeClass('dialog--close');
  modal.find('.dialog_form').slideDown(50);
  modal.find('.dialog_success').slideUp(50);
}
modal = null;
self = null;
});
$(document).on('click', '.close-modal , .dialog .dialog__overlay , .close-x', function(event) {
  $(".feedback-win, #call_me_back_modal, #write_to_us_modal").remove();
var self = $(this);
var modal = self.parents('.dialog');
if(modal.hasClass('dialog--open')) {
  modal.addClass('dialog--close');
  modal.removeClass('dialog--open');
  modal.find('.dialog_form').slideDown(50);
  modal.find('.dialog_success').slideUp(50);
}
modal = null;
self = null;
});

function getFilteredProductsCount(control){
  var form = $('#catalog_filter_form');
  var data = form.serializeArray();
  data.pop('availability');
  data.push({name: 'count_only', value: true});
  $.ajax({
      type: 'GET',
      url: form.attr('action'),
      data: $.param(data)
  }).done( function(result) {
      redrawFilterQuickResults(control, result);
  });
}

$(document).on('click', '.product_filter input[type="checkbox"]', function() {
  // If a products counter is needed use:
// getFilteredProductsCount($(this));
  redrawFilterQuickResults($(this));
});
$(document).on('change', '.product_filter .range', function() {
  // If a products counter is needed use:
// getFilteredProductsCount($(this));
  redrawFilterQuickResults($(this));
});

// обработка нажатия на кнопку быстрого фильтра (показать результаты - отправка формы фильтров)
$(document).on('click', '.filter_quick_results', function(event) {
$(this).parents('form').submit();
});

// поиск в пунктах фильтра с чекбоксами
$(document).on('input', '.checkbox-filter-search', function(e) {
  var self = $(this);
  var search = $.trim($(self).val().toUpperCase());
  if (search.length > 0) {
      $(self).parent('.brand-filter-search').next('.scroller').find('.checkbox-item').each( function(index, element) {
          var label = $(element).find('label.label--checkbox');
          var label_text = $(label).text();
          var hide = false;
          if (label_text.toUpperCase().indexOf(search) == -1) {
              hide = true;
          }
          if (hide) {
              $(element).hide();
          } else {
              $(element).show();
          }
          var label = null;
          var label_text = null;
      })
  } else {
      $(self).parent('.brand-filter-search').next('.scroller').find('.checkbox-item').each( function(index, element) {
          $(element).show();
      })
  }
  self = null;
  search = null;
  search_array = null;
});

function redrawFilterQuickResults(obj, count) {
var btn = $('.filter_quick_results');
// чтобы на малых разрешениях кнопка не показывалась
// как в примере с dns фильтром каталога
if ($(window).width() <= 768) {
  btn.removeClass('__opened');
  btn.fadeOut(300);
  return false;
}
if (!btn.hasClass('__opened')) {
  btn.addClass('__opened');
  btn.fadeIn(300);
}
var counter = btn.find('span');
if (typeof count == 'number') {
  counter.html('&nbsp;('+count+')');
} else {
      counter.html('');
  }
if (typeof obj == 'object') {
  btn.css({
    right: (0 - 15 - btn.outerWidth()) ,
    top: (obj.offset().top - (btn.height() / 2) - ($('.product_filter').offset().top))
  });
}
counter = null;
btn = null;
}

$(document).ready(function () {
  $('.filter_quick_results').click(function (e) {
      e.preventDefault();
      $('#catalog_filter_form').submit();
  });

  // FAQ article slide down on load page
  if (!!document.location.hash) {
      let parentItem = $(document.location.hash);
      let contentItem = parentItem.find('.accordion__text');
      parentItem.addClass('active');
      contentItem.slideDown(200);
  }
});

// For GA
$(document).on('click', '#call_me_back_modal_button', function (e) {
  dataLayer.push({'event':  'zvonok'});
});

// For GA
$(document).on('submit', '#feedback_form', function (e) {
  dataLayer.push({'event':  'vopros'});
});

// For GA
$(document).on('click', '#buy_sertificate_button', function (e) {
  dataLayer.push({'event':  'certifikat'});
});

// For GA
$(document).on('submit', '.mod_form__register', function (e) {
  dataLayer.push({'event':  'register'});
});

//Blinking title when click another tab
const mainTitle = document.title;
const blinkTitle1 = "*** ВЛЮБЛЁННЫЙ КРОЛИК ***"
const blinkTitle2 = "*** ИНТИМ-МАГАЗИН ***"
const timeToBlink = 3000;
let timerId;

window.onblur = function () {
  document.title = blinkTitle1;
  timerId = setInterval(function () {
      if (document.title === blinkTitle1) {
          document.title = blinkTitle2;
      } else {
          document.title = blinkTitle1;
      }
  }, timeToBlink);
};

window.onfocus = function () {
  clearInterval(timerId);
  document.title = mainTitle;
};
$(document).ready(function () {
  function init_show_filter() {
      $('a.filter-mobile-btn').click(function (e) {
          e.preventDefault();
          $('div.filter-mobile').toggle();
      });
  }

  function init_categories() {
      $('.custom-select').change(function() {
          category_id = $(this).val();
          load_data();
      });
  }

  function init_diff_only() {
      $('.radio-f').change(function() {
          diff_only = $(this).val();
          load_data();
      });
  }

  function init_delete() {
      $('a.delete-from-comparison').click(function(e) {
          e.preventDefault();
          var url = $(this).prop('href');
          var product_id = $(this).data('product_id');
          var csrfmiddlewaretoken = $("input[name=csrfmiddlewaretoken]").val();
          $.post(url, {'product_id': product_id, 'csrfmiddlewaretoken': csrfmiddlewaretoken}, function(data) {
              load_data();
              $('#products_comparison_count').text(data.length);
          })
      });
  }

  function init_slider() {
      var currentPosition = 0;
      var allProducts = $('div.comparison-product').length;
      var showProducts = 4;
      var set_position_count = $('.set_position').length;

      function show_parts(position) {
          var set_position = $('.set_position');
          if (set_position.is(':visible')) {
              if (position == 0) {
                  $('.pager-large .prev span, .pager-large .next a').css({'display': 'block'});
                  $('.pager-large .prev a, .pager-large .next span').hide();
              } else if (position == (set_position_count - 1)) {
                  $('.pager-large .prev span, .pager-large .next a').hide();
                  $('.pager-large .prev a, .pager-large .next span').css({'display': 'block'});
              } else {
                  $('.pager-large .prev a, .pager-large .next a').css({'display': 'block'});
                  $('.pager-large .prev span, .pager-large .next span').hide();
              }
              set_position.removeClass('active').eq(position).addClass('active');
              var all_info = $('div.comparative-data-col, div.comparison-product').hide();
              for (var index = 0; index < all_info.length; index += allProducts) {
                  var start = index + (showProducts * position);
                  if ((showProducts * position + showProducts) >= allProducts) {
                      var end = start + allProducts - (showProducts * position);
                  } else {
                      var end = start + showProducts;
                  }
                  all_info.slice(start, end).show();
              }
          }
      }

      show_parts(0);
      $('.prev a').click(function (e) {
          e.preventDefault();
          if (currentPosition > 0) {
              currentPosition -= 1;
              show_parts(currentPosition);
          }
      });
      $('.next a').click(function (e) {
          e.preventDefault();
          if (currentPosition < (set_position_count - 1)) {
              currentPosition += 1;
              show_parts(currentPosition);
          }
      });
      $('.set_position a').click(function (e) {
          e.preventDefault();
          currentPosition = parseInt($(this).data('go-to'));
          show_parts(currentPosition);
      });
  }

  function load_data() {
      var send_data = {'category_id': category_id, 'diff_only': diff_only};
      $.get(window.location.href, send_data, function (data) {
          $('div.content-comparison').html(data);
          init_categories();
          init_diff_only();
          init_delete();
          init_show_filter();
          init_slider();
      });
  }

  init_slider();
  init_categories();
  init_diff_only();
  init_delete();
  init_show_filter();
});

$(document).ready(function () {
  $(".fancybox").fancybox({
      afterShow: function () {
          if ('ontouchstart' in document.documentElement) {
              $('.fancybox-nav').css('display', 'none');
              $('.fancybox-wrap').swipe({
                  swipe: function (event, direction) {
                      if (direction === 'left' || direction === 'up') {
                          $.fancybox.prev(direction);
                      } else {
                          $.fancybox.next(direction);
                      }
                  }
              });
          }
      }
  });
});

$(document).ready(function () {
  function show_confirmation_phone_time() {
      var show = $('input[name=confirmation_method]:checked').val() == 'phone'
      $('#id_confirmation_phone_time').prop('required', show)
      $('#confirmation-container').toggle(show);

  }
  $('input[name=confirmation_method]').click(function () {
      show_confirmation_phone_time();
  });
  show_confirmation_phone_time();
});

$(document).ready(function () {
  $(".fa-show-id_password").click(function() {

      $(this).toggleClass("fa-black");
      var input = $($(this).data("toggle"));
      if (input.attr("type") == "password") {
          input.attr("type", "text");
      } else {
          input.attr("type", "password");
      }
  });
});

function customFeedbackFormCallback() {
  var form = $('#feedback_form');
  var url = form.attr('action');
  $.post(url, form.serialize(), function (response) {
      var form = $(response).find('#feedback_form');
      if (form.length > 0) {
          $('#feedback_form').html(form.html());
          //initializePhoneMasks();
      } else {
          $('#feedback_form').parent('.dialog_form').find('.dialog__title').hide();
          $('#feedback_form').parent('.dialog_form').find('.icon_ok').removeClass('icon_ok_hidden');
          $('#feedback_form').html($(response).find('.success').html());
      }
  });
}

$(document).ready(function () {
  if (window.invoiceID) {
      $(window).on('load', function() {
          var checkout = RbkmoneyCheckout.configure({
              invoiceID: invoiceID,
              invoiceAccessToken: invoiceAccessToken,
              name: nameShop,
              description: invoiceDescription,
              // initialPaymentMethod: 'bankCard',
              finished: function () {
                  window.location.href = redirectURL;
              }
          });
          $('#payment_open').click(function () {
              checkout.open();
          }).click();
      });
  }
});

function initComparisonFormSubmit() {
  $('form.product-comparison-form').submit(function(e) {
      e.preventDefault();
      var form = $(this);
      var product_id = form.find('input[name="product_id"]').val();
      var action = form.prop('action');
      // var csrfmiddlewaretoken = form.find('input[name="csrfmiddlewaretoken"]').val();
      var reverse_action = form.data('action-reverse');
      // $.post(action, {'product_id': product_id, 'csrfmiddlewaretoken': csrfmiddlewaretoken}, function(data) {
      $.post(action, {'product_id': product_id}, function(data) {
          $('#products_comparison_count').text(data.length);
          $('.products_comparison_count').text(data.length);
          form.prop('action', reverse_action);
          form.data('action-reverse', action);
          form.find('.comparison-buttons').toggle();
      });
  });
}

$(document).ready(function () {
mobileSearch();
});

function mobileSearch() {
var $open = $('.mobile-search-open'),
    $close = $('.mobile-search__close'),
    $block = $('.mobile-search');
$open.add($close).on('click', function (event) {
  event.preventDefault();
  if ($(this).is($open)) {
      $block.addClass('active');
  } else {
      $block.removeClass('active');
  }
});
}
