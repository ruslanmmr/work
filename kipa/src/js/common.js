$(document).ready(function () {
  images.init();
  nav.init()
});

$(window).resize(function () {
  windowW = Math.max(window.innerWidth, document.documentElement.clientWidth);
  images.resize(images.el);
});


let windowW = Math.max(window.innerWidth, document.documentElement.clientWidth);
let images = {
  el: $('.lazy'),
  init: function() {
    if(images.el.length>0) {
      images.el.Lazy({
        effectTime: 0,
        threshold: 500,
        imageBase: false,
        defaultImage: false,
        afterLoad: function(element) {
          images.resize($(element));
        }
      });
    }
  },
  resize: function(element) {
    if(images.el.length>0) {
      element.each(function() {
        let $this = $(this),
            box = $this.parent();
        if(!box.hasClass('cover-box_size-auto')) {
          let boxH = box.height(),
              boxW = box.width();
          setTimeout(function() {
            let imgH = $this.height(),
                imgW = $this.width();
            if ((boxW / boxH) >= (imgW / imgH)) {
              $this.addClass('ww').removeClass('wh');
            } else {
              $this.addClass('wh').removeClass('ww');
            }
            $this.addClass('visible');
          }, 300)
        } else {
          $this.addClass('visible');
        }
      })
    }
  }
}
let nav = {
  element: $('.nav'),
  open: $('.nav-open-button'),
  close: $('.nav-close-button'),
  overlay: $('.overlay'),
  init: function() {
    nav.open.on('click', function() {
      nav.element.addClass('active');
      nav.overlay.fadeIn(300);
    })
    nav.close.on('click', function() {
      nav.element.removeClass('active');
      nav.overlay.fadeOut(300);
    })
    nav.overlay.on('click touchstart', function () {
      nav.element.removeClass('active');
      nav.overlay.fadeOut(300);
    })
  
    $(window).resize(function () {
      if (windowW > 768) {
        nav.element.removeClass('active');
        nav.overlay.fadeOut(300);
      }
    });
  }
}