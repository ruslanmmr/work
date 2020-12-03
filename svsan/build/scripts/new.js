"use strict";

window.popup = {
  init: function init() {
    this.$trigger = $('[data-popup-open]');
    this.$close = $('[data-popup-close]');
    this.$trigger.on('click', function (event) {
      event.preventDefault();
      var $popup = $($(this).attr('href'));

      if ($popup.length) {
        popup.open($popup);
      }
    });
    $(document).on('click', function (event) {
      var $target = $(event.target);

      if ($target.closest(popup.$close).length || $target.closest('.popup').length && $target.closest('.popup-block__container').length == 0) {
        event.preventDefault();
        var $popup = $target.closest('.popup').length ? $target.closest('.popup') : $('.city-question-popup');
        popup.close($popup);
      }
    });
  },
  open: function open($popup) {
    var _this = this;

    var event = function event() {
      _this.active = $popup;
      $popup.addClass('active');
    };

    if (this.active) {
      popup.close(this.active, function () {
        event();
      });
    } else {
      event();
    }
  },
  close: function close($popup, callback) {
    var _this2 = this;

    $popup.removeClass('active');
    setTimeout(function () {
      _this2.active = undefined;
      typeof callback === 'function' && callback();
    }, 250);
  }
};
$(document).ready(function () {
  popup.init();
});
//# sourceMappingURL=maps/new.js.map
