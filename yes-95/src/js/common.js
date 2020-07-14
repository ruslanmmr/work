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


/*==== Start =====*/
document.addEventListener("DOMContentLoaded", ()=>{

});


document.querySelector('.wrapper').insertAdjacentText('afterbegin', document.documentElement.clientHeight);