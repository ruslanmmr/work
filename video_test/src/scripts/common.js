import { gsap } from "gsap";

window.onload = function(){
  TouchHoverEvents.init();
  video();
}

//hover/touch custom events
const TouchHoverEvents = {
  targets: 'a, button, label, tr, .jsTouchHover, .js-3d-object',
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
        for(let $target of document.querySelectorAll(this.targets)) $target.classList.remove('touch');
        for(let $target of $targets) $target.classList.add('touch');
      }
    } 
    //touchend
    else if(event.type=='touchend' || (event.type=='contextmenu' && this.touched)) {
      this.timeout = setTimeout(() => {this.touched = false}, 500);
      if($targets[0]) {
        setTimeout(()=>{
          for(let $target of $targets) {
            $target.dispatchEvent(new CustomEvent("customTouchend"));
            $target.classList.remove('touch');
          }
        }, this.touchEndDelay)
      }
    } 
    
    //mouseenter
    if(event.type=='mouseenter' && !this.touched && $targets[0] && $targets[0]==event.target) {
      $targets[0].classList.add('hover');
    }
    //mouseleave
    else if(event.type=='mouseleave' && !this.touched && $targets[0] && $targets[0]==event.target) {
      $targets[0].classList.remove('hover', 'focus');
    }
    //mousedown
    if(event.type=='mousedown' && !this.touched && $targets[0]) {
      $targets[0].classList.add('focus');
    } 
    //mouseup
    else if(event.type=='mouseup' && !this.touched  && $targets[0]) {
      $targets[0].classList.remove('focus');
    }
  }
}


function video() {
  let $video = document.querySelector('.video'),
      $triggers = document.querySelectorAll('.controls__stage'),
      $ind = document.querySelectorAll('.controls__indicator'),
      duration = $video.duration,
      stage_duration = duration/7,
      played = false,
      currentIndex = 0,
      interval;

  let ind_anim = gsap.timeline({paused:true})
    .set($ind, {autoAlpha:1})
    .fromTo($ind, {scaleX:0, xPercent:-50}, {scaleX:1, xPercent:0, duration:stage_duration/2, ease:'power2.in'})
    .to($ind, {scaleX:0, xPercent:50, duration:stage_duration/2, ease:'power2.out'})
    


  function disableChange() {
    played = true;
    $triggers.forEach(($trigger, index)=>{
      $trigger.classList.add('disabled');
    })
  }
  function enableChange() {
    played = false;
    $triggers.forEach(($trigger, index)=>{
      $trigger.classList.remove('disabled');
    })
  }

  function play(index) {
    let time = index*stage_duration,
        factor = Math.abs(index-currentIndex);
    
    currentIndex = index;

    if(!played && $video.currentTime<time) {
      disableChange();
      ind_anim.play(0);
      $video.playbackRate = factor;
      $video.play();
      interval = setInterval(()=>{
        if($video.currentTime>=time && played) {
          enableChange();
          $video.pause();
          clearInterval(interval);
        }
      }, 50);
    } 
    else if(!played) {
      disableChange();
      ind_anim.play(0);
      interval = setInterval(()=>{
        $video.currentTime += -0.05*factor;
        if($video.currentTime==0 || $video.currentTime<=time){
          enableChange();
          $video.pause();
          clearInterval(interval);
        }
      }, 50);
    }
  }

  $triggers.forEach(($trigger, index)=>{
    $trigger.addEventListener('click', ()=>{
      $triggers[currentIndex].classList.remove('active');
      $trigger.classList.add('active');
      play(index);
    })
  })



}