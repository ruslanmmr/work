window.onload = function(){
  TouchHoverEvents.init();
  Slider.init();
}

const brakepoints = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1600
}
const $body = document.body;
const $wrapper = document.querySelector('.wrapper');
const speed = 0.5; //seconds


const TouchHoverEvents = {
  targets: 'a, button, label, tr, .jsTouchHover',
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
        for(let $target of $targets) $target.setAttribute('data-touch', '');
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

const Mask = {
  init: function() {
    Inputmask({
      mask: "+7 999 999-9999",
      showMaskOnHover: false,
      clearIncomplete: false
    }).mask('[data-phone]');
  }
}

const Slider = {
  init: function() {
    this.index = 0;
    this.m = 120;
    this.$slides = document.querySelectorAll('.calculator-slide');
    this.$next = document.querySelectorAll('.calculator-slide__next-button');
    this.$back = document.querySelector('.calculator__back-button');

    this.getPrev = ()=>{
      let value = this.index-1;
      return value;
    }
    this.getNext = ()=>{
      let value = this.index+1;
      return value;
    }

    //listeners
    this.$next.forEach(($button)=>{
      $button.addEventListener('click', ()=>{
        if(!this.inAnimation) {
          this.index++;
          this.change();
        }
      })
    })
    this.$back.addEventListener('click', ()=>{
      if(!this.inAnimation) {
        this.index--;
        this.change();
      }
    })

    this.change();

  },

  change: function() {
    this.inAnimation = true;
    if(this.index==0) {
      this.$back.classList.remove('active');
    } else {
      this.$back.classList.add('active');
    }

    if(!this.old || this.old<this.index) {
      this.next();
    } 


    /* gsap.timeline()
      .to($slide, {autoAlpha:1, duration:speed, ease:'power2.inOut'})
      .to($slide, {y:0, duration:speed, ease:'power2.out'}, `-=${speed}`)

    if(this.index==0 || this.index==1 || this.index==2) {
      let y = $slide.getBoundingClientRect().height;
      gsap.timeline()
        .to($next, {autoAlpha:0.3, duration:speed, ease:'power2.inOut'})
        .fromTo($next, {y:y+this.m+this.m}, {y:y+this.m, duration:speed, ease:'power2.out'}, `-=${speed}`)
    } */


  },
  next: function() {
    this.animation = gsap.timeline({paused:true})
    let $slide = this.$slides[this.index],
        $prev_slide = this.$slides[this.getPrev()],
        $next_slide = this.$slides[this.getNext()];

    if(!this.old) {
      let timeline = gsap.timeline()
        .to($slide, {autoAlpha:1, duration:speed, ease:'power2.inOut'})
        .fromTo($slide, {y:this.m}, {y:0, duration:speed, ease:'power2.out'}, `-=${speed}`)
      this.animation.add(timeline, `>`)
    } else {
      let timeline = gsap.timeline()
        .to($prev_slide, {autoAlpha:0, duration:speed, ease:'power2.out'})
        .to($slide, {autoAlpha:1, duration:speed, ease:'power2.inOut'})
        .to($slide, {y:0, duration:speed, ease:'power2.out'}, `-=${speed}`)
      this.animation.add(timeline, `>`)
    }

    if(this.index==0 || this.index==1 || this.index==2) {
      let y = $slide.getBoundingClientRect().height;
      let timeline = gsap.timeline()
        .to($next_slide, {autoAlpha:0.3, duration:speed, ease:'power2.inOut'})
        .fromTo($next_slide, {y:y+this.m+this.m}, {y:y+this.m, duration:speed, ease:'power2.out'}, `-=${speed}`)
      this.animation.add(timeline, `>-${speed-0.1}`)
    }




    this.animation.play();

  }
}
