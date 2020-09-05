lazySizes.cfg.init = false;

$(document).ready(function(){
  touchHoverEvents();
  lazy();
  select.init();
})

const brakepoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
}

//hover/touch custom events
function touchHoverEvents() {
  document.addEventListener('touchstart', event);
  document.addEventListener('touchend', event);
  document.addEventListener('mouseenter', event, true);
  document.addEventListener('mouseleave', event, true);
  document.addEventListener('mousedown', event);
  document.addEventListener('mouseup', event);
  document.addEventListener('contextmenu', event)

  let targets = 'a[class], button, label, tr, .js-3d-object, .selectric-items li, .selectric .label',
      touchEndDelay = 500, //ms    
      touch, 
      timeout;

  function event(event) {
    let $targets = [];
    $targets[0] = event.target!==document?event.target.closest(targets):null;
    let $element = $targets[0], i = 0;

    while($targets[0]) {
      $element = $element.parentNode;
      if($element!==document) {
        if($element.matches(targets)) {
          i++;
          $targets[i] = $element;
        }
      } 
      else {
        break;
      }
    }

    if($targets[0]) {

      //touchstart
      if(event.type=='touchstart') {
        touch = true;
        for(let $target of document.querySelectorAll(targets)) {
          $target.classList.remove('touch');
        }
        for(let $target of $targets) {
          $target.classList.add('touch');
          $target.dispatchEvent(new CustomEvent("customTouchstart",{
            detail: { 
              x: event.touches[0].clientX,
              y: event.touches[0].clientY
            }
          }));
        }
      } 

      //touchend
      else if(event.type=='touchend') {
        setTimeout(()=>{
          touch = false;
          for(let $target of $targets) {
            $target.classList.remove('touch');
            $target.dispatchEvent(new CustomEvent("customTouchend"));
          }
        }, touchEndDelay)
      } 

      //context menu
      else if(event.type=='contextmenu') {
        for(let $target of $targets) {
          $target.classList.remove('touch');
          $target.dispatchEvent(new CustomEvent("customTouchend"));
        }
        touch = false;
      }

      //mouseenter
      if(event.type=='mouseenter' && !touch && $targets[0]==event.target) {
        $targets[0].classList.add('hover');
        $targets[0].dispatchEvent(new CustomEvent("customMouseenter",{
          detail: { 
            x: event.clientX,
            y: event.clientY
          }
        }));
      }

      //mouseleave
      else if(event.type=='mouseleave' && !touch && $targets[0]==event.target) {
        $targets[0].classList.remove('hover');
        $targets[0].classList.remove('focus');
        $targets[0].dispatchEvent(new CustomEvent("customMouseleave"));
      }

      //mousedown
      if(event.type=='mousedown') {
        $targets[0].classList.add('focus');
      } else if(event.type=='mouseup') {
        $targets[0].classList.remove('focus');
      }

    }
  }

}

//lazyloading
function lazy() {
  //add backgrounds
  document.addEventListener('lazybeforeunveil', function(e){
    let el = e.target.tagName,
        bg = e.target.getAttribute('data-src');
    if(el!=='IMG') {
      let bg = e.target.getAttribute('data-src');
      e.target.style.backgroundImage = `url('${bg}')`;
    }
  });
  lazySizes.init();
}

//select
let select = {
  init: function() {
    this.items = $('select');
    if(this.items.length) {
      this.items.selectric({
        disableOnMobile: false,
        nativeOnMobile: false,
        arrowButtonMarkup: '<svg class="icon" viewBox="0 0 12 7" xmlns="http://www.w3.org/2000/svg"><path d="M9.72606 -1.19209e-07L11.1403 1.41421L5.57036 6.98453L4.15614 5.57031L9.72606 -1.19209e-07Z"/><path d="M0 1.41421L1.41421 1.19209e-07L6.98434 5.57047L5.57036 6.98453L0 1.41421Z"/></svg>'
      });
    }
  }
}

