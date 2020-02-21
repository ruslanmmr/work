window.$ = window.jQuery = require('jquery');

import { disablePageScroll, enablePageScroll } from 'scroll-lock';
window.Lazy = require('jquery-lazy');
import "inputmask/lib/extensions/inputmask.numeric.extensions";
import Inputmask from "inputmask/lib/extensions/inputmask.date.extensions";

document.addEventListener('DOMContentLoaded', function(){
  //$images.init();
});


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
  overlay: $('.overlay'),
  state: false,
  flag: true,
  open: function() {
    $nav.state = true;
    $nav.trigger.addClass('active');
    disablePageScroll();
  },
  close: function() {
    $nav.state = false;
    $nav.trigger.removeClass('active');
    enablePageScroll(); 
  },
  init: function() {
    $(document).on('click touchstart mousedown', function(event){
      let btn = $(event.target).closest($nav.trigger),
          nav = $(event.target).closest($nav.el);

      if(btn.length>0 && $nav.state==false && event.type=='click') {
        $nav.open();
      } else if(btn.length>0 && $nav.state==true && event.type=='click') {
        $nav.close();
      } else if(nav.length==0 && (event.type=='touchstart' || event.type=='mousedown')) {
        $nav.close();
      }

    })
    
    $(window).resize(function () {
      if(width()>1200 && $nav.state==true) {
        $nav.close();
      } 
    })

  }
}