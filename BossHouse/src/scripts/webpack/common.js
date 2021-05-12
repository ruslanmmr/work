//lazy
import 'lazysizes';
//gsap
import {gsap} from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
gsap.defaults({
  ease: "power2.inOut", 
  duration: 1
});

import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import Swiper, {Pagination, Lazy} from 'swiper/core';
Swiper.use([Pagination, Lazy]);

const brakepoints = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1600
}
const $body = document.body;
const $wrapper = document.querySelector('.wrapper');
const $header = document.querySelector('.header');

//check device
function mobile() {
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    return true;
  } else {
    return false;
  }
}

document.addEventListener('DOMContentLoaded', ()=> { 
  TouchHoverEvents.init();
  Header.init();
  Nav.init();
  if(mobile()) {
    windowSize.init();
  }
  //scroll
  document.querySelectorAll('[data-scroll]').forEach($this => {
    $this.addEventListener('click', (event)=> {
      let href = $this.getAttribute('href'),
          $target = document.querySelector(href);
      if($target) {
        event.preventDefault();
        if(Nav.state) {
          Nav.close();
        }
        gsap.to(window, {scrollTo: href});
      }
    })
  })
});

window.onload = ()=> {
  //sliders
  let $sliders = document.querySelectorAll('.photo-slider');
  $sliders.forEach($this => {
    new PhotoSlider($this).init();
  })
  //pricing
  let $pricing = document.querySelectorAll('.section-arenda__block');
  $pricing.forEach(($this, index) => {
    new PricingAnimation($this, index).init();
  })
  //map
  let $map = document.querySelector('.contacts-map');
  if($map) {
    new Map($map).init();
  }
  //show page
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
      $targets[0].removeAttribute('data-click');
      $targets[0].removeAttribute('data-hover');
    }
    //mousedown
    if(event.type=='mousedown' && !this.touched && $targets[0]) {
      $targets[0].setAttribute('data-click', '');
    } 
    //mouseup
    else if(event.type=='mouseup' && !this.touched  && $targets[0]) {
      $targets[0].removeAttribute('data-click');
    }
  }
}

const Header = {
  init: function () {
    this.old_scroll = 0;
    window.addEventListener('scroll', () => {
      this.check();
    })
    this.check();
  },
  check: function () {
    let y = window.pageYOffset,
        h = window.innerHeight/2,
        fixed = $header.classList.contains('header_fixed'),
        hidden = $header.classList.contains('header_hidden'),
        $top = $header.querySelector('.header__top');

    let fval = $top.getBoundingClientRect().height;

    if (y > fval && !fixed) {
      $header.classList.add('header_fixed');
    } else if (y<=fval && fixed) {
      $header.classList.remove('header_fixed');
    }

    //листаем вниз
    if(this.old_scroll<y) {
      this.old_flag = y;
      if(y>h && !hidden) {
        $header.classList.add('header_hidden');
      }
    }
    //листаем вверх
    else if(this.old_scroll>y) {
      if(hidden && (y<h || y+200<this.old_flag)) {
        $header.classList.remove('header_hidden');
      }
    }  

    this.old_scroll = y;
  }
}

const Nav = {
  init: function() {
    this.$element = document.querySelector('.mobile-nav');
    this.$items = document.querySelectorAll('.mobile-nav__item')
    this.$toggle = document.querySelector('.nav-toggle-button');

    this.state = true;

    this.animation = gsap.timeline({paused:true})
      .fromTo(this.$element, {autoAlpha:0}, {autoAlpha:1, duration:0.5, ease:'power2.inOut'})
      .fromTo(this.$items, {autoAlpha:0, y:30}, {autoAlpha:1, y:0, ease:'power2.out', duration:0.4, stagger:{amount:0.1}}, '-=0.4')

    this.change = ()=> {
      if(!this.state) {
        this.open();
      } else {
        this.close();
      }
    }

    this.change();
    this.$toggle.addEventListener('click', () => {
      this.change();
    })
  },
  open: function() {
    this.state = true;
    $header.classList.add('header_nav-opened');
    this.$toggle.classList.add('active');
    this.animation.play();
    disablePageScroll();
  },
  close: function() {
    this.state = false;
    $header.classList.remove('header_nav-opened');
    this.$toggle.classList.remove('active');
    this.animation.reverse();
    enablePageScroll();
  }
}

class PhotoSlider {
  constructor($parent) {
    this.$parent = $parent;
  }

  init() {
    this.$slider = this.$parent.querySelector('.swiper-container');
    this.$slides = this.$parent.querySelectorAll('.swiper-slide');
    this.$pagination = this.$parent.querySelector('.swiper-pagination');
    this.$items = this.$parent.querySelectorAll('.photo-slider__head, .photo-slider__decoration');

    this.animation = gsap.timeline({paused:true})
      .fromTo(this.$items[0], {autoAlpha:0}, {autoAlpha:1})
      .fromTo(this.$items[0], {xPercent:-100}, {xPercent:0, ease:'power2.out'}, '-=1')
      .fromTo(this.$items[1], {autoAlpha:0}, {autoAlpha:1}, '-=1')
      .fromTo(this.$items[1], {xPercent:100}, {xPercent:0, ease:'power2.out'}, '-=1')

    this.slider = new Swiper(this.$slider, {
      loop: true,
      touchStartPreventDefault: false,
      longSwipesRatio: 0.1,
      slidesPerView: 1,
      speed: 500,
      lazy: {
        loadOnTransitionStart: true,
        loadPrevNext: true
      },
      pagination: {
        el: this.$pagination,
        clickable: true,
        bulletElement: 'button'
      }
    });

    this.slider.on('slideChange', (swiper)=>{
      if(swiper.realIndex!==0 && !this.state) {
        this.state = true;
        this.animation.timeScale(2).reverse();
      } 
      else if(swiper.realIndex==0 && this.state) {
        this.state = false;
        this.animation.timeScale(1).play();
      }
    });

    this.leave = ()=> {
      if(this.slider.realIndex!==0) {
        let index;
        if(this.slider.realIndex == this.$slides.length-1) {
          index = this.slider.activeIndex + 1;
        } else {
          index = this.slider.activeIndex-this.slider.realIndex;
        }
        this.slider.slideTo(index, 1000);
      }
    }

    this.enter = ()=> {
      if(!this.enterFlag) {
        this.enterFlag = true;
        this.animation.timeScale(1).play();
      }
    }

    this.trigger = ScrollTrigger.create({
      trigger: this.$parent,
      start: "top center",
      end: "bottom center",
      onEnter: ()=> {
        this.enter();
      },
      onEnterBack: ()=> {
        this.enter();
      }
    });

    this.trigger2 = ScrollTrigger.create({
      trigger: this.$parent,
      start: "top bottom",
      end: "bottom top",
      onLeave: ()=> {
        this.leave();
      },
      onLeaveBack: ()=> {
        this.leave();
      }
    });

  }
}

class PricingAnimation {
  constructor($parent, index) {
    this.$parent = $parent;
    this.index = index;
  }

  init() {
    if(!(this.index % 2)) {
      this.animation = gsap.timeline({paused:true})
        .fromTo(this.$parent, {autoAlpha:0}, {autoAlpha:1})
        .fromTo(this.$parent, {xPercent:-100}, {xPercent:0, ease:'power2.out'}, '-=1')
    } else {
      this.animation = gsap.timeline({paused:true})
        .fromTo(this.$parent, {autoAlpha:0}, {autoAlpha:1})
        .fromTo(this.$parent, {xPercent:100}, {xPercent:0, ease:'power2.out'}, '-=1')
    }

    this.enter = ()=> {
      if(!this.enterFlag) {
        this.enterFlag = true;
        this.animation.play();
      }
    }

    this.trigger = ScrollTrigger.create({
      trigger: this.$parent,
      start: "top bottom",
      end: "bottom top",
      onEnter: ()=> {
        this.enter();
      },
      onEnterBack: ()=> {
        this.enter();
      }
    });
  }
}

class Map {
  constructor($parent) {
    this.$parent = $parent;
  }

  init() {
    this.apiKey = this.$parent.getAttribute('data-api');

    let loadMap = ()=> {
      if(typeof ymaps === 'undefined') {
        let callback = ()=> {
          ymaps.ready(createMap);
        }
        let script = document.createElement("script");
        script.type = 'text/javascript';
        script.onload = callback;
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${this.apiKey}&lang=ru_RU`;
        $body.appendChild(script);
      } else {
        createMap();
      }
    }
    
    let createMap = ()=> {
      this.map = new ymaps.Map(this.$parent, {
        center: [43.521203, 39.845547],
        controls: ['zoomControl'],
        zoom: 14
      });
      this.map.behaviors.disable(['scrollZoom']);
      this.placemarks = [];
      this.$map = this.map.container._element;
      this.$map.classList.add('contacts-map__element');
      gsap.fromTo(this.$map, {autoAlpha:0}, {autoAlpha:1})

      let placemark = new ymaps.Placemark(this.map.getCenter(), {
        balloonContent: 'г. Сочи, Новороссийское шоссе, 7А'
      });
      this.map.geoObjects.add(placemark);
    }


    loadMap();
  }
}

const windowSize = {
  init: function() {
    let $el = document.createElement('div');
    $el.style.cssText = 'position:fixed;height:100%;';
    $body.insertAdjacentElement('beforeend', $el);
    let h = $el.getBoundingClientRect().height;

    document.querySelectorAll('.screen').forEach($this => {
      $this.style.height = `${h}px`;
    })
  }
}