lazySizes.cfg.preloadAfterLoad = true;

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

window.onload = function(){
  TouchHoverEvents.init();
  Validation.init();
  Modal.init();
  Nav.init();

  let $docs_slider = document.querySelector('.docs-slider');
  if($docs_slider) new DocsSlider($docs_slider).init();

  //scroll
  document.querySelectorAll('[data-scroll]').forEach($this => {
    $this.addEventListener('click', (event)=> {
      let href = $this.getAttribute('href'),
          $target = document.querySelector(href);
      if($target) {
        event.preventDefault();
        let y = $target.getBoundingClientRect().y + window.pageYOffset;
        Scroll.scroll(y, 1);
        if(Nav.state) {
          Nav.close();
        }
      }
    })
  })

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

class DocsSlider {
  constructor($parent) {
    this.$parent = $parent;
  } 
  init() {
    this.$slider = this.$parent.querySelector('.swiper-container');
    this.$prev = this.$parent.querySelector('.swiper-button-prev');
    this.$next = this.$parent.querySelector('.swiper-button-next');

    this.slider = new Swiper(this.$slider, {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 300,
      navigation: {
        prevEl: this.$prev,
        nextEl: this.$next
      },
      lazy: {
        loadOnTransitionStart: true,
        loadPrevNext: true
      }
    });
  }
}

const Validation = {
  init: function () {
    this.namspaces = {
      name: 'name',
      phone: 'phone',
      email: 'email',
      message: 'message'
    }
    this.constraints = {
      name: {
        presence: {
          allowEmpty: false,
          message: '^Введите ваше имя'
        },
        format: {
          pattern: /[A-zА-яЁё ]+/,
          message: '^Введите корректное имя'
        },
        length: {
          minimum: 2,
          tooShort: "^Имя слишком короткое (минимум %{count} символа)",
          maximum: 20,
          tooLong: "^Имя слишком длинное (максимум %{count} символов)"
        }
      },
      phone: {
        presence: {
          allowEmpty: false,
          message: '^Введите ваш номер телефона'
        },
        format: {
          pattern: /^\+7 \d{3}\ \d{3}\-\d{4}$/,
          message: '^Введите корректный номер телефона'
        }
      },
      email: {
        presence: {
          allowEmpty: false,
          message: '^Введите ваш email'
        },
        email: {
          message: '^Неправильный формат email-адреса'
        }
      },
      message: {
        presence: {
          allowEmpty: false,
          message: '^Введите ваше сообщение'
        },
        length: {
          minimum: 2,
          tooShort: "^Сообщение слишком короткое (минимум %{count} символа)",
          maximum: 100,
          tooLong: "^Сообщение слишком длинное (максимум %{count} символов)"
        }
      }
    };

    this.mask = Inputmask({
      mask: "+7 999 999-9999",
      showMaskOnHover: false,
      clearIncomplete: false
    }).mask("[data-validate='phone']");

    gsap.registerEffect({
      name: "fadeMessages",
      effect: ($message) => {
        return gsap.timeline({paused:true})
          .fromTo($message, {autoAlpha: 0}, {autoAlpha:1, duration:0.3, ease:'power2.inOut'})
      }
    });

    document.addEventListener('submit', (event) => {
      let $form = event.target,
          $inputs = $form.querySelectorAll('[data-validate]'),
          $consent = $form.querySelector('[data-consent-checkbox]').checked;

      if($inputs.length) {
        event.preventDefault();
        let flag = 0;
        $inputs.forEach(($input) => {
          if(!this.validInput($input)) flag++;
        })
        if (!flag && $consent) this.submitEvent($form);
      }
    })

    document.addEventListener('input', (event) => {
      let $input = event.target,
          $parent = $input.parentNode,
          $form = $input.closest('form'),
          $submit = $form.querySelector('button');
      if($input.getAttribute('data-consent-checkbox')=='') {
        if($input.checked) {
          $submit.classList.remove('disabled');
        } else {
          $submit.classList.add('disabled');
        }
      }
      if($parent.classList.contains('error')) {
        this.validInput($input);
      }
    })

  },
  validInput: function ($input) {
    let $parent = $input.parentNode,
      type = $input.getAttribute('data-validate'),
      required = $input.getAttribute('data-required') !== null,
      value = $input.value,
      empty = validate.single(value, {
        presence: {
          allowEmpty: false
        }
      }) !== undefined,
      resault;

    for (let key in this.namspaces) {
      if (type == key && (required || !empty)) {
        resault = validate.single(value, this.constraints[key]);
        break;
      }
    }
    //если есть ошибки
    if (resault) {
      if (!$parent.classList.contains('error')) {
        $parent.classList.add('error');
        $parent.insertAdjacentHTML('beforeend', `<span class="input__message">${resault[0]}</span>`);
        let $message = $parent.querySelector('.input__message');
        gsap.effects.fadeMessages($message).play();
      } else {
        $parent.querySelector('.input__message').textContent = `${resault[0]}`;
      }
      return false;
    }
    //если нет ошибок
    else {
      if ($parent.classList.contains('error')) {
        $parent.classList.remove('error');
        let $message = $parent.querySelector('.input__message');
        gsap.effects.fadeMessages($message).reverse(1).eventCallback('onReverseComplete', () => {
          $message.remove();
        });
      }
      return true;
    }
  },
  reset: function ($form) {
    let $inputs = $form.querySelectorAll('input, textarea');
    $inputs.forEach(($input) => {
      let $parent = $input.parentNode;
      $input.value = '';
      if ($parent.classList.contains('error')) {
        $parent.classList.remove('error');
        let $message = $parent.querySelector('.input__message');
        gsap.effects.fadeMessages($message).reverse(1).eventCallback('onReverseComplete', ()=>{
          $message.remove();
        });
      }
    })
  },
  submitEvent: function ($form) {
    let $submit = $form.querySelector('button'),
        $inputs = $form.querySelectorAll('input, textarea');
    $inputs.forEach(($input) => {
      $input.parentNode.classList.add('loading');
    })
    $submit.classList.add('loading');

    let finish = ()=> {
      $inputs.forEach(($input) => {
        $input.parentNode.classList.remove('loading');
      })
      $submit.classList.remove('loading');
      this.reset($form);
      Modal.open(document.querySelector('#modal-succes'));
      setTimeout(()=>{
        Modal.close();
      }, 3000)
    }

    //send
    $.ajax({
      type: "POST",
      url: $($form).attr('action'),
      data: $($form).serialize(),
      success: function(data) {
        console.log(data)
        finish();
      }
    });
  }
}

const Modal = {
  init: function () {
    gsap.registerEffect({
      name: "modal",
      effect: ($modal, $content) => {
        let anim = gsap.timeline({paused: true}).fromTo($modal, {autoAlpha: 0}, {autoAlpha: 1,duration:0.5,ease: 'power2.inOut'})
          .fromTo($content, {y: 20}, {y: 0,duration:1, ease: 'power2.out'}, `-=${0.5}`)
        return anim;
      },
      extendTimeline: true
    });

    document.addEventListener('click', (event) => {
      let $open = event.target.closest('[data-modal="open"]'),
        $close = event.target.closest('[data-modal="close"]'),
        $wrap = event.target.closest('.modal'),
        $block = event.target.closest('.modal-block');

      //open
      if ($open) {
        event.preventDefault();
        let $modal = document.querySelector(`${$open.getAttribute('href')}`);
        this.open($modal);
      }
      //close 
      else if ($close || (!$block && $wrap)) {
        this.close();
      }
    })
  },
  open: function ($modal) {
    let play = () => {
      this.$active = $modal;
      scrollLock.disablePageScroll();
      let $content = $modal.querySelector('.modal-block');
      this.animation = gsap.effects.modal($modal, $content);
      this.animation.play();
    }
    if ($modal) {
      if (this.$active) this.close(play);
      else play();
    }
  },
  close: function (callback) {
    if(this.$active) {
      this.animation.timeScale(2).reverse().eventCallback('onReverseComplete', () => {
        delete this.animation;
        scrollLock.enablePageScroll();
        if (callback) callback();
      })
      delete this.$active;
    }
  }
}

const Scroll = {
  scroll: function(y, speed) {
    let scroll = {y:window.pageYOffset};
    if(speed>0) {
      this.animation = gsap.to(scroll, {y:y, duration:speed, ease:'power2.inOut', onComplete:()=>{
        this.inScroll=false;
        cancelAnimationFrame(this.frame);
      }})
      this.checkScroll = ()=>{
        window.scrollTo(0, scroll.y);
        this.frame = requestAnimationFrame(()=>{this.checkScroll()});
      }
      this.checkScroll();
    } else {
      window.scrollTo(0, y);
    }
  }
}

const Nav = {
  init: function() {
    this.$element = document.querySelector('.mobile-nav');
    this.$items = document.querySelectorAll('.mobile-nav__item')
    this.$toggle = document.querySelector('.nav-toggle-button');

    this.animation = gsap.timeline({paused:true})
      .fromTo(this.$element, {autoAlpha:0}, {autoAlpha:1, duration:0.5, ease:'power2.inOut'})
      .fromTo(this.$items, {autoAlpha:0, y:30}, {autoAlpha:1, y:0, ease:'power2.out', duration:0.4, stagger:{amount:0.1}}, '-=0.5')

    this.change = ()=> {
      if(!this.state) {
        this.open();
      } else {
        this.close();
      }
    }

    this.$toggle.addEventListener('click', () => {
      this.change();
    })
  },
  open: function() {
    this.state = true;
    this.$toggle.classList.add('active');
    this.animation.play();
    Scroll.scroll(0, 0.5);
    scrollLock.disablePageScroll();
  },
  close: function() {
    this.state = false;
    this.$toggle.classList.remove('active');
    this.animation.reverse();
    scrollLock.enablePageScroll();
  }
}