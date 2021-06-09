document.addEventListener("DOMContentLoaded", function(event) {
  TouchHoverEvents.init();
  map();
});

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
        for(let $target of document.querySelectorAll(this.targets)) $target.classList.remove('touch');
        for(let $target of $targets) {
          $target.dispatchEvent(new CustomEvent("Touchstart"));
          $target.setAttribute('data-touch', '');
        }
      }
    } 
    //touchend
    else if(event.type=='touchend' || (event.type=='contextmenu' && this.touched)) {
      this.timeout = setTimeout(() => {this.touched = false}, 500);
      if($targets[0]) {
        setTimeout(()=>{
          for(let $target of $targets) {
            $target.dispatchEvent(new CustomEvent("Touchend"));
            $target.removeAttribute('data-touch');
          }
        }, this.touchEndDelay)
      }
    } 
    
    //mouseenter
    if(event.type=='mouseenter' && !this.touched && $targets[0] && $targets[0]==event.target) {
      $targets[0].setAttribute('data-hover', '');
      $targets[0].dispatchEvent(new CustomEvent("Mouseenter"));
    }
    //mouseleave
    else if(event.type=='mouseleave' && !this.touched && $targets[0] && $targets[0]==event.target) {
      $targets[0].removeAttribute('data-focus');
      $targets[0].removeAttribute('data-hover');
      $targets[0].dispatchEvent(new CustomEvent("Mouseleave"));
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

function map() {
  let $groups = document.querySelectorAll('.map-section__group'),
      $labels = document.querySelectorAll('.map-section__label'),
      $links = document.querySelectorAll('.map-section__link'),
      $modals = document.querySelectorAll('.modal'),
      $close = document.querySelectorAll('.modal__close'),
      $wrapper = document.querySelector('.map-section__wrapper'),
      activeIndex,
      animation,
      flag = window.innerWidth >=1024?true:false;

  let changeModalPosition = () => {
    if(window.innerWidth>=1024) {
      $modals.forEach($modal => {
        let index = $modal.getAttribute('data-modal'),
            $label = document.querySelector(`[data-label='${index}'] .map-section__label-content`),
            y = $label.getBoundingClientRect().y + window.pageYOffset,
            x = $label.getBoundingClientRect().x,
            h = $label.getBoundingClientRect().height,
            w = $label.getBoundingClientRect().width;
  
        $modal.style.left = `${x+w+15}px`;
        $modal.style.top = `${y+h/2}px`;
      })
    }
  }

  let openModalDesktop = (event) => {
    let index = event.target.closest('[data-index]').getAttribute('data-index'),
        $modal = document.querySelector(`[data-modal='${index}']`), 
        y = $modal.getBoundingClientRect().y + window.pageYOffset,
        h = $modal.getBoundingClientRect().height;

    if(activeIndex && activeIndex!==index) closeModalDesktop();

    gsap.to(window, {duration:0.3, scrollTo:y+h/2-window.innerHeight/2, ease:'power2.inOut'});

    $modal.classList.add('active');

    activeIndex = index;
  }

  let closeModalDesktop = () => {
    let $modal = document.querySelector(`[data-modal='${activeIndex}']`);
    $modal.classList.remove('active');
    activeIndex = undefined;
  }

  let openModalMobile = (event) => {
    let index = event.target.closest('[data-link]').getAttribute('data-link'),
        $modal = document.querySelector(`[data-modal='${index}']`),
        //
        scrollY = $wrapper.getBoundingClientRect().y + window.pageYOffset;

    scrollLock.disablePageScroll();

    let open = () => {
      $modal.classList.add('active');

      let $image = $modal.querySelector('.modal__region .image'),
          $region = document.querySelector(`[data-index='${index}']`);

      gsap.set($image, {clearProps: "all"});

      let y1 = $image.getBoundingClientRect().y,
          x1 = $image.getBoundingClientRect().x,
          w1 = $image.getBoundingClientRect().width,
          h1 = $image.getBoundingClientRect().height,
          y2 = $region.getBoundingClientRect().y,
          x2 = $region.getBoundingClientRect().x,
          w2 = $region.getBoundingClientRect().width,
          h2 = $region.getBoundingClientRect().height;


      let y = (y2+h2/2) - (y1+h1/2),
          x = (x2+w2/2) - (x1+w1/2),
          scale = h2/h1;

      animation = gsap.timeline()
        .fromTo($image, {y:y, x:x, scale:scale}, {y:0, x:0, scale:1, duration:1, ease:'power2.inOut'},'+=0.15')
    }
    
    gsap.to(window, {duration:0.3, scrollTo:scrollY, ease:'power2.inOut', onComplete:() => {
      open();
    }});

    activeIndex = index;
  }

  let closeModalMobile = () => {
    scrollLock.enablePageScroll();
    let $modal = document.querySelector(`[data-modal='${activeIndex}']`);
    $modal.classList.remove('active');
    if(animation) animation.timeScale(3).reverse();
    activeIndex = undefined;
  }

  
  $links.forEach($link => {
    $link.addEventListener('click', openModalMobile);
  })
  $groups.forEach($group => {
    $group.addEventListener('click', openModalDesktop);
  })
  $close.forEach($this => {
    $this.addEventListener('click', closeModalMobile);
  })
  document.addEventListener('click', (event) => {
    let $modal = event.target!==document?event.target.closest('[data-modal], [data-index], [data-link]'):null;
    if(!$modal && activeIndex) closeModalDesktop();
  })
  window.addEventListener('resize', () => {
    if(window.innerWidth >=1024 && !flag && activeIndex) {
      flag = true;
      closeModalDesktop();
    } else if(window.innerWidth < 1024 && flag && activeIndex) {
      flag = false;
      closeModalMobile();
    }
  })
  
  $groups.forEach($group => {
    let events = (event) => {
      let index = $group.getAttribute('data-index'),
          $label = document.querySelector(`[data-label='${index}']`);

      if(event.type=='Mouseenter' || event.type=='Touchstart') {
        $label.classList.add('is-active');
      } else if(event.type=='Mouseleave' || event.type=='Touchend') {
        $label.classList.remove('is-active');
      }
    }
    $group.addEventListener('Mouseenter', events);
    $group.addEventListener('Mouseleave', events);
    $group.addEventListener('Touchstart', events);
    $group.addEventListener('Touchend',   events);
  })

  changeModalPosition();
  window.addEventListener('resize', changeModalPosition);
}