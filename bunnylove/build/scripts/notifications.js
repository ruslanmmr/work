"use strict";

$(document).ready(function () {
  notify();
}); //test code

function notify() {
  //defaults
  Noty.overrideDefaults({
    layout: 'topRight',
    theme: 'metroui',
    timeout: 3000
  });
  document.addEventListener('click', function (event) {
    var $target = $(event.target);

    if ($target.closest('[data-text]').length) {
      //получили значения каким удобно способом
      var msg = $target.attr('data-text'),
          type = $target.attr('data-type'); //В type и text подставили нужные значения, показали сообщение

      new Noty({
        type: type,
        text: msg
      }).show();
    }
  }); //tooltip

  var tooltips = {
    el: '[data-tippy-content]',
    init: function init() {
      tippy(tooltips.el, {
        duration: 300,
        trigger: 'click',
        placement: 'auto',
        zIndex: 99,
        offset: [0, 15],
        maxWidth: 380
      });
    }
  };
  tooltips.init();
}
//# sourceMappingURL=maps/notifications.js.map
