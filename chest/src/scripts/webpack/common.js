import {gsap} from "gsap";
gsap.defaults({
  ease: "power2.inOut"
});

const $body = document.body;
const $wrapper = document.querySelector('.wrapper');

document.addEventListener('DOMContentLoaded', function(){
  TouchHoverEvents.init();
  Scene.init();
})

window.onload = function() {
  $body.classList.add('loaded');
}

const TouchHoverEvents = {
  targets: 'a, button, label, tr, [data-touch-hover]',
  touched: false,
  touchEndDelay: 100, //ms
  init: function() {
    document.addEventListener('touchstart',  (event)=>{this.events(event)});
    document.addEventListener('touchend',    (event)=>{this.events(event)});
    document.addEventListener('mouseenter',  (event)=>{this.events(event)},true);
    document.addEventListener('mouseleave',  (event)=>{this.events(event)},true);
    document.addEventListener('mousedown',   (event)=>{this.events(event)});
    document.addEventListener('mouseup',     (event)=>{this.events(event)});
    document.addEventListener('contextmenu', (event)=>{this.events(event)});

    this.flag = false;
  },
  events: function(event) {
    let $targets = [];
    $targets[0] = event.target!==document?event.target.closest(this.targets):null;
    let $element = $targets[0], i = 0;

    while($targets[0]) {
      $element = $element.parentNode;
      if($element!==document) {
        if($element.matches(this.targets)) {
          i++;
          $targets[i] = $element;
        }
      } 
      else {
        break;
      }
    }

    //touchstart
    if(event.type=='touchstart') {
      this.touched = true;
      if(this.timeout) clearTimeout(this.timeout);
      if($targets[0]) {
        for(let $target of $targets) $target.setAttribute('data-touch', '');
        if(!this.flag) {
          document.querySelector('.hand-icon').classList.add('hidden');
          this.flag = true;
        }
      }
    } 
    //touchend
    else if(event.type=='touchend' || (event.type=='contextmenu' && this.touched)) {
      this.timeout = setTimeout(() => {this.touched = false}, 500);
      if($targets[0]) {
        setTimeout(()=>{
          for(let $target of $targets) {
            $target.dispatchEvent(new CustomEvent("customTouchend"));
            $target.removeAttribute('data-touch');
          }
        }, this.touchEndDelay)
      }
    } 
    
    //mouseenter
    if(event.type=='mouseenter' && !this.touched && $targets[0] && $targets[0]==event.target) {
      $targets[0].setAttribute('data-hover', '');
      if(!this.flag) {
        document.querySelector('.hand-icon').classList.add('hidden');
        this.flag = true;
      }
    }
    //mouseleave
    else if(event.type=='mouseleave' && !this.touched && $targets[0] && $targets[0]==event.target) {
      $targets[0].removeAttribute('data-focus');
      $targets[0].removeAttribute('data-hover');
    }
    //mousedown
    if(event.type=='mousedown' && !this.touched && $targets[0]) {
      $targets[0].setAttribute('data-focus', '');
    } 
    //mouseup
    else if(event.type=='mouseup' && !this.touched  && $targets[0]) {
      $targets[0].removeAttribute('data-focus');
    }
  }
}

const Counter = {
  init: function() {
    this.$timer = document.querySelector(".timer");
    this.$items = document.querySelectorAll(".timer__item-value");
    this.end_date = +new Date() + 3600000;
    this.interval = setInterval(()=>{
      this.timer();
    }, 1000)
  },
  timer: function() {
    let date = +new Date();
    let timeleft = Math.max(0, (this.end_date - date));

    if (timeleft == 0) {
      clearInterval(this.interval);
    } else { 
      this.values = [ 
        Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)),
        Math.round((timeleft % (1000 * 60)) / 1000) 
      ];

      this.$items.forEach(($item, index)=>{
        let val = this.values[index];
        if(val<10) {
          val = '0' + val;
        }
        $item.textContent = val;
      })
    }

    //dots animation
    let $dots = document.querySelectorAll('.timer__item-dots');
    gsap.timeline()
      .to($dots, {autoAlpha:1, duration:0.2, ease:'power2.out'})
      .to($dots, {autoAlpha:0, duration:0.7, ease:'power2.in'})
  }
}

const Scene = {
  init: function() {
    let $chests = document.querySelectorAll('.screen__chest'),
        $bonuses = document.querySelector('.screen__bonuses'),
        $bonus = document.querySelectorAll('.screen__bonus'),
        $final = document.querySelector('.screen-final'),
        $final__items = $final.querySelectorAll('.screen-final__item'),
        $screen = document.querySelector('.screen'),
        step = 0;

    
    let openEvent = ($element) => {
      $body.classList.add('disabled', 'chest-active');

      $element.classList.add('active')

      let x = $element.getBoundingClientRect().x,
          y = $element.getBoundingClientRect().y,
          eh = $element.getBoundingClientRect().height,
          ew = $element.getBoundingClientRect().width,
          cy = $wrapper.getBoundingClientRect().height/2,
          cx = $wrapper.getBoundingClientRect().width/2;
      
      let tx = cx - (x + ew/2),
          ty = cy - (y + eh/2);

      $element.style.zIndex = '1001';

      let shakingAnimation = gsap.timeline({paused:true})
        .fromTo($element, {rotate:0}, {rotate:3, duration:0.075, ease:'power2.out'})
        .to($element, {rotate:-3, duration:0.15})
        .to($element, {rotate:0, duration:0.075, ease:'power2.in'})

      let moveAnimation;
      if(step!==3) {
        moveAnimation = gsap.timeline({paused:true})
          .to($bonuses, {autoAlpha:1, duration:0.5})
          .to($element, {x:tx, y:ty, duration:0.5}, '-=0.5')
          .to($element, {scale:1.5, duration:0.5, ease:'power2.in'})
          .to($element, {autoAlpha:0, duration:0.25, ease:'power2.in'}, '-=0.25')
          .fromTo($bonus[step], {autoAlpha:0, scale:0.8}, {autoAlpha:1, scale:1, duration:0.5, ease:'power2.out'})
      } else {
        moveAnimation = gsap.timeline({paused:true})
          .to($bonuses, {autoAlpha:1, duration:0.5})
          .to($element, {x:tx, y:ty, duration:0.5}, '-=0.5')
          .to($element, {scale:2.5, duration:0.5, ease:'power2.in'})
          .to($element, {autoAlpha:0, duration:0.25, ease:'power2.in'}, '-=0.25')
          .fromTo($bonus[step], {autoAlpha:0, scale:0.5}, {autoAlpha:1, scale:1, duration:0.5, ease:'power2.out'})
      }


      let animationHide = gsap.timeline({paused:true})
        .to([$bonuses, $element, $bonus[step]], {autoAlpha:0, duration:0.5})

      let shakeIteration = 0;
      shakingAnimation.play();
      shakingAnimation.eventCallback('onComplete', ()=> {
        shakeIteration++;
        let val;
        if(step!==3) {
          val = Math.min(3, (1 + shakeIteration/2.5));
        } else {
          val = Math.min(4, (1 + shakeIteration/2));
        }
        shakingAnimation.timeScale(val).play(0);
      })

      moveAnimation.play();
      moveAnimation.eventCallback('onComplete', ()=> {
        shakingAnimation.kill();
        moveAnimation.kill();

        if(step==3) {
          setTimeout(() => {
            lastStep();
          }, 500)
        } else {
          setTimeout(() => {
            animationHide.play().eventCallback('onComplete', ()=> {
              $body.classList.remove('disabled');
            });
            $body.classList.remove('chest-active');
          }, 500);
          step++;
        }
      })
    }

    let lastStep = ()=> {
      Counter.init();
      $body.classList.add('last-step-start');
      setTimeout(() => {
        $body.classList.add('last-step-end');
        $body.classList.remove('disabled', 'last-step-start');

        gsap.timeline()
          .fromTo($final__items, {autoAlpha:0}, {autoAlpha:1, duration:0.75, stagger:{amount:0.25}})
          .fromTo($final__items, {y:20}, {y:0, duration:0.75, ease:'power2.out', stagger:{amount:0.25}}, '-=1')

      }, 500);
    }

    
    $chests.forEach($chest => {
      $chest.addEventListener('click', ()=> {
        openEvent($chest)
      })
    })
  }
  
}