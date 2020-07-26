import device from "current-device";
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import Inputmask from "inputmask";
import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js"

const $wrapper = document.querySelector('.wrapper');
//set min-height
$wrapper.style.minHeight = `${document.documentElement.clientHeight}px`;
window.addEventListener('resize', ()=>{
  $wrapper.style.minHeight = `${document.documentElement.clientHeight}px`;
})







/*==== Start =====*/
document.addEventListener("DOMContentLoaded", ()=>{
  touchHoverEvents();
  popups();
  password();
  calendar();
  //inputmask
  window.phoneMask = Inputmask({
    mask: "+7 999 999-9999",
    showMaskOnHover: false,
    clearIncomplete: false
  }).mask('[name="phone"]');
  window.cardMask = Inputmask({
    mask: "9999-9999-9999-9999",
    showMaskOnHover: false,
    clearIncomplete: false
  }).mask('.input_credit-card input');
  window.dateMask = Inputmask({
    mask: "99/99",
    showMaskOnHover: false,
    clearIncomplete: false
  }).mask('.input_date input');
  window.cvcMask = Inputmask({
    mask: "999",
    showMaskOnHover: false,
    clearIncomplete: false
  }).mask('.input_cvc input');
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

function calendar() {
  //calendar
  flatpickr('.js-calendar input', {
    "locale": Russian,
    disableMobile: "true",
    dateFormat: "d.m.Y",
    appendTo: document.querySelector('.js-calendar'),
    mode: "range",
    nextArrow: '<svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.97652 0.325817C1.76125 0.114994 1.48728 0 1.16438 0C0.518591 0 0 0.49831 0 1.13078C0 1.44701 0.136987 1.7345 0.362036 1.9549L7.21135 8.50958L0.362036 15.0451C0.136987 15.2655 0 15.5626 0 15.8692C0 16.5017 0.518591 17 1.16438 17C1.48728 17 1.76125 16.885 1.97652 16.6742L9.58904 9.39121C9.86301 9.14205 9.99022 8.8354 10 8.5C10 8.1646 9.86301 7.87711 9.58904 7.61838L1.97652 0.325817Z" fill="#F9474E"/></svg>',
    prevArrow: '<svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.02348 16.6742C8.23875 16.885 8.51272 17 8.83562 17C9.48141 17 10 16.5017 10 15.8692C10 15.553 9.86301 15.2655 9.63796 15.0451L2.78865 8.49042L9.63796 1.9549C9.86301 1.7345 10 1.43743 10 1.13078C10 0.498309 9.48141 0 8.83562 0C8.51272 0 8.23875 0.114994 8.02348 0.325817L0.410959 7.60879C0.136986 7.85795 0.00978474 8.1646 0 8.5C0 8.8354 0.136986 9.12289 0.410959 9.38162L8.02348 16.6742Z" fill="#F9474E"/></svg>'
  });

}

