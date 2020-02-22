window.$ = window.jQuery = require('jquery');

import { disablePageScroll, enablePageScroll } from 'scroll-lock';
window.Lazy = require('jquery-lazy');
import device from 'current-device';
import "inputmask/lib/extensions/inputmask.numeric.extensions";
import Inputmask from "inputmask/lib/extensions/inputmask.date.extensions";

document.addEventListener('DOMContentLoaded', function(){
  $images.init();
  $nav.init();
  $mask.init();
  touchHoverEvents()
  
});

function desktop() {
  if($('html').hasClass('desktop')) {
    return true;
  }
}
//window width
function width() {
  return Math.min(window.innerWidth, document.documentElement.clientWidth);
}

function touchHoverEvents() {
  $(document).on('mouseenter mouseleave touchstart touchend mousedown mouseup', 'a,button,.js-touch-hover', function(event) {
    let $target = $(this);
    if(event.type=='touchstart' && !desktop()) {
      $target.addClass('touch');
    } else if(event.type=='mouseenter' && desktop()) {
      $target.addClass('hover');
    } else if(event.type=='mousedown' && desktop()) {
      $target.addClass('focus');
    } else {
      $target.removeClass('touch');
      $target.removeClass('hover');
      $target.removeClass('focus');
    }
  })
}

let $images = {
  init: function() {
    $(window).resize(function(){
      $images.loaded = $('.lazy.loaded');
      $images.resize($images.loaded);
    })
    $images.load();
  },
  load: function() {
    $images.el = $('.lazy').not('.loaded');
    if($images.el.length>0) {
      $images.el.Lazy({
        effectTime: 0,
        threshold: 500,
        imageBase: false,
        defaultImage: false,
        visibleOnly: false,
        afterLoad: function(element) {
          $(element).addClass('loaded');
          $images.resize($(element));
        }
      });
    }
  },
  resize: function(element) {
    element.each(function() {
      let $this = $(this),
          box = $this.parent();
      if(!box.hasClass('cover-box_size-auto')) {
        let boxH = box.innerHeight(),
            boxW = box.innerWidth();
        setTimeout(function() {
          let imgH = $this.innerHeight(),
              imgW = $this.innerWidth();
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
let $nav = {
  trigger: $('.nav-toggle'),
  el: $('.nav'),
  state: false,
  flag: true,
  open: function() {
    $nav.state = true;
    $nav.trigger.addClass('active');
    $nav.el.addClass('active')
    disablePageScroll();
  },
  close: function() {
    $nav.state = false;
    $nav.trigger.removeClass('active');
    $nav.el.removeClass('active');
    enablePageScroll();
  },
  init: function() {
    $nav.trigger.on('click', function(event){
      event.preventDefault();

      if($nav.state==false) {
        $nav.open();
      } else {
        $nav.close();
      }
    })
    
    $(window).resize(function () {
      if(width()>1024 && $nav.state==true) {
        $nav.close();
      } 
    })

  }
}
let $mask = {
  el: document.querySelectorAll('.phone'),
  init: function() {
    if($mask.el!==null) {
      Inputmask({
        mask: "+7 ( 999 ) 999 - 99 - 99",
        clearIncomplete: true
      }).mask($mask.el);
    }
  }
}