import device from "current-device";
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import Inputmask from "inputmask";

const $wrapper = document.querySelector('.wrapper');
//set min-height
$wrapper.style.minHeight = `${document.documentElement.clientHeight}px`;
window.addEventListener('resize', ()=>{
  $wrapper.style.minHeight = `${document.documentElement.clientHeight}px`;
})
//inputmask
window.mask = Inputmask({
  mask: "+7 999 999-9999",
  showMaskOnHover: false,
  clearIncomplete: false
}).mask('[name="phone"]');






/*==== Start =====*/
document.addEventListener("DOMContentLoaded", ()=>{
  touchHoverEvents();
  popups();
  password();
});


//custom touch/hover events
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

//modals/popups
function popups() {
  let $trigger = document.querySelectorAll('[data-popup]');

  $trigger.forEach(($this)=>{
    $this.addEventListener('click', (event)=>{
      event.preventDefault();
  
      let id = $this.getAttribute('href'),
          $popup = document.querySelector(`${id}`);
      
      if($popup) {
        $popup.classList.add('active');
        disablePageScroll();
        let $close = $popup.querySelectorAll('[data-close]');
        $close.forEach(($this)=>{
          $this.addEventListener('click', ()=>{
            $popup.classList.remove('active');
            enablePageScroll();
          })
        })
      }
      
    })
  })


  /* $trigger.on('click', function(event) {
    event.preventDefault();
    $popup = $($(this).attr('href'));
    if($popup.length) {
      $popup.addClass('active');
    }
  })

  $popup.on('click', function(event) {
    if(!$(event.target).closest('.popup-block__container').length) {
      $(this).removeClass('active');
    }
  }) */

}

//password
function password() {
  let $trigger = document.querySelectorAll('.js-pass-toggle');
  $trigger.forEach(($this)=>{
    $this.addEventListener('click', ()=>{
      let $input = $this.parentNode.querySelector('input'),
        type = $input.getAttribute('type') == "text" ? "password" : 'text';

      $input.setAttribute('type', type);
      if($this.classList.contains('active')) {
        $this.classList.remove('active');
      } else {
        $this.classList.add('active');
      }
    })
  })
}