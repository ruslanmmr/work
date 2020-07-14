import device from "current-device";
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

//lazylaod
import 'lazysizes';
lazySizes.cfg.lazyClass = 'lazy';
lazySizes.cfg.loadedClass = 'loaded';
lazySizes.cfg.preloadAfterLoad = true;
document.addEventListener('lazybeforeunveil', function(e){
  let el = e.target.tagName,
      bg = e.target.getAttribute('data-src');
  if(el!=='IMG') {
    let bg = e.target.getAttribute('data-src');
    e.target.style.backgroundImage = 'url(' + bg + ')';
  }
});

const $wrapper = document.querySelector('.wrapper');
//set min-height
$wrapper.style.minHeight = `${document.documentElement.clientHeight}px`;


/*==== Start =====*/
document.addEventListener("DOMContentLoaded", ()=>{
  touchHoverEvents();
  headerOverscroll();
});

function touchHoverEvents() {
  document.addEventListener('touchstart', event);
  document.addEventListener('touchend', event);

  document.addEventListener('mouseover', event);
  document.addEventListener('mouseout', event);

  document.addEventListener('mousedown', event);
  document.addEventListener('mouseup', event);
  
  document.addEventListener('contextmenu', event)

  let $elements = 'a, button, label, input, textarea',
      touch,
      timeout;

  function event(event) {
    if(event.target!==document) {
      let $target = event.target.closest($elements);
      if($target!==null) {

        if(event.type=='touchstart') {
          for(let $this of document.querySelectorAll($elements)) {
            $this.classList.remove('touch');
          }
          touch = true;
          clearTimeout(timeout)
          $target.classList.add('touch');
        } else if(event.type=='touchend') {
          $target.classList.remove('touch');
          timeout = setTimeout(()=>{
            touch = false;
          }, 1000)
        } else if(event.type=='contextmenu') {
          $target.classList.remove('touch');
          timeout = setTimeout(()=>{
            touch = false;
          }, 1000)
        }

        if(event.type=='mouseover' && !touch) {
          $target.classList.add('hover');
        } else if(event.type=='mouseout' && !touch) {
          $target.classList.remove('hover');
          $target.classList.remove('focus');
        }
        
        if(event.type=='mousedown') {
          $target.classList.add('focus');
        } else if(event.type=='mouseup') {
          $target.classList.remove('focus');
        }

      } else {
        for(let $this of document.querySelectorAll($elements)) {
          $this.classList.remove('touch');
        }
      }
    }
  }

}

function headerOverscroll() {
  let $header = document.querySelector('.header');

  window.addEventListener('scroll', checkState);

  checkState();
  function checkState() {
    if(window.pageYOffset>0) {
      $header.classList.add('header_absolute');
    } else {
      $header.classList.remove('header_absolute');
    }
  }
}