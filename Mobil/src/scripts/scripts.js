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

window.onload = function(){
  gsap.to($wrapper, {autoAlpha:1, duration:speed, ease:'power2.inOut'})
  TouchHoverEvents.init();
  Slider.init();
  Form.init();
  Validation.init();
}


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

const Form = {
  init: function() {
    this.$input_wcount = document.querySelector('#val3');

    //btns
    let $calc_buttons = document.querySelectorAll('[data-input-button]');
    $calc_buttons.forEach(($button)=>{
      $button.addEventListener('click', ()=>{
        let attr = $button.getAttribute('data-input-button'),
            input = $button.getAttribute('for'),
            $input = document.querySelector(`#${input}`),
            max = +$input.getAttribute('data-max');

        if(attr!=='+' && attr!=='-') {
          $input.value = attr;
          $button.classList.add('active');
          $button.parentNode.querySelectorAll('[data-input-button]').forEach(($el)=>{
            if($el!==$button) $el.classList.remove('active');
          })
          //next btn change
          let $next = $button.closest('.calculator-slide').querySelector('.calculator-slide__next-button');
          if($next) {
            $next.classList.add('active');
            if($input.getAttribute('id')=='val3') {
              if(attr=='0') $next.setAttribute('data-slide-next', '1');
              else $next.setAttribute('data-slide-next', '');
            }
          }
        } 
        else {
          let val = +$input.value;
          if(attr=='+' && val<max) {
            $input.value = val+1;
          } else if(attr=='-' && val>1) {
            $input.value = val-1;
          } else {
            $button.classList.add('hidden');
          }
        }
        $input.dispatchEvent(new Event("change"));
      })
    })

    //calc price
    let $calculation_inputs = document.querySelectorAll('[data-calculation-input]'),
        $total = document.querySelector('.calculator-slide__total-price span'),
        $total_input = document.querySelector('#totalprice'),
        $ads_container = document.querySelector('.calculator__ads');
    let checkPrice = ()=> {
      let $ads = document.querySelectorAll('.calculator__ad');
      $ads.forEach(($this)=>{
        $this.remove();
      })
      let total = +document.querySelector('#baseprice').value;
      $calculation_inputs.forEach(($input)=>{
        let price = +$input.getAttribute('data-price'),
            value = +$input.value;
        total+=price*value;
        //допы
        if(value>0) {
          let name = $input.getAttribute('name');
          for(let i=0; i<value; i++) {
            $ads_container.insertAdjacentHTML('beforeend', `<div class="calculator__ad"><span>+${price} $</span> ${name}</div>`)
          }
        }


      })
      $total.textContent = priceCorrecting(total, 2, ',');
      $total_input.value = total;
      //
    }
    $calculation_inputs.forEach(($input)=>{
      $input.addEventListener('change', ()=>{
        checkPrice();
        //windows
        if($input.getAttribute('id')=='val3') {
          let val = +this.$input_wcount.value,
              $val = document.querySelector('.calc-count__value'),
              $calc_minus = document.querySelector('.calc-count__button_minus'),
              $calc_plus = document.querySelector('.calc-count__button_plus'),
              max = +$input.getAttribute('data-max');
          $val.textContent = '0'+$input.value;
          if(val==1)    $calc_minus.classList.add('hidden');
          else          $calc_minus.classList.remove('hidden');
          if(val==max)  $calc_plus.classList.add('hidden');
          else          $calc_plus.classList.remove('hidden');
        }
      })
    })

  },
  on: function(callback, func) {
    if(callback=='changed') {
      this.changed_callback = func;
    }
  }
}

const Slider = {
  init: function() {
    this.m = 120;
    this.$slides = document.querySelectorAll('.calculator-slide');
    this.$next = document.querySelectorAll('[data-slide-next]');
    this.$back = document.querySelector('[data-slide-back]');
    this.animations = [];

    this.step = 0;
    this.steps = [0];

    //listeners
    this.$next.forEach(($button)=>{
      $button.addEventListener('click', ()=>{
        if(!this.inAnimation) {
          let attr = $button.getAttribute('data-slide-next'),
              value;
          let change = ()=>{
            this.step++;
            this.steps[this.step] = this.steps[this.step-1]+1+value;
            this.change();
          }

          if(attr=='validate') {
            if(Validation.checkValid($button.closest('.form'))) {
              value = 0;
              change();
            }
          } else {
            value = !+attr?0:+attr;
            change();
          }
        }
      })
    })
    this.$back.addEventListener('click', ()=>{
      if(!this.inAnimation) {
        this.step--;
        this.change();
      }
    })

    this.change();
  },

  change: function() {
    this.inAnimation = true;
    if(this.steps.length-1>this.step) {
      this.steps.splice(this.step+1, 1);
      this.prev();
    } else {
      this.next();
    }
    if(this.step==0 || this.steps[this.step]==this.$slides.length-1) {
      this.$back.classList.remove('active');
    } else {
      this.$back.classList.add('active');
    }
  },

  last: function () {
    this.step++;
    this.steps[this.step] = this.steps[this.step-1]+1;
    this.change();
  },

  next: function() {
    this.animation = this.animations[this.step] = gsap.timeline({paused:true});
    this.animation.eventCallback('onComplete', ()=>{
      this.inAnimation = false;
    })

    let $slide = this.$slides[this.steps[this.step]],
        $prev_slide = this.$slides[this.steps[this.step-1]],
        $next_slide = this.$slides[this.steps[this.step]+1];

    $slide.classList.add('active');

    if(this.step==0) {
      let timeline = gsap.timeline()
        .to($slide, {autoAlpha:1, duration:speed, ease:'power2.inOut'})
        .fromTo($slide, {y:this.m}, {y:0, duration:speed, ease:'power2.out'}, `-=${speed}`)
      this.animation.add(timeline, `>`)
    } 
    
    else {
      let y = this.m, ease = 'power2.out';
      if($slide.getAttribute('data-slide-opacity')!==null) {
        y = $prev_slide.getBoundingClientRect().height+this.m;
        ease = 'power2.inOut';
      }
      let timeline = gsap.timeline()
        .to($prev_slide, {autoAlpha:0, duration:speed, ease:'power2.inOut'})
        .to($prev_slide, {y:-this.m, duration:speed, ease:'power2.in'}, `-=${speed}`)
        .to($slide, {autoAlpha:1, duration:speed, ease:'power2.inOut'}, `-=${speed-0.1}`)
        .fromTo($slide, {y:y}, {y:0, duration:speed, ease:ease}, `-=${speed}`)
      this.animation.add(timeline, `>`);
      //scale
      if($slide.classList.contains('calculator-slide_congratulation')) {
        let $price = document.querySelector('.calculator-slide__total-price');
        let scale = gsap.fromTo($price, {scale:0.8}, {scale:1, duration:speed, ease:'power2.out'});
        this.animation.add(scale, `>-${speed}`);
      }
    }

    if($next_slide && $next_slide.getAttribute('data-slide-opacity')!==null) {
      let y = $slide.getBoundingClientRect().height;
      let timeline = gsap.timeline()
        .to($next_slide, {autoAlpha:0.2, duration:speed/2, ease:'power2.inOut'})
        .fromTo($next_slide, {y:y+this.m+this.m}, {y:y+this.m, duration:speed/2, ease:'power2.out'}, `-=${speed/2}`)
      this.animation.add(timeline, `>-${speed/3}`)
    }

    this.animation.play();
  },

  prev: function() {
    this.animations[this.step+1].reverse();
    this.animations[this.step+1].eventCallback('onReverseComplete', ()=>{
      this.inAnimation = false;
    })
  }
}

const Validation = {
  init: function() {
    //validation
    this.namspaces = {
      name: 'name',
      phone: 'phone',
      email: 'email',
      text: 'text'
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
      text: {
        presence: {
          allowEmpty: false,
          message: '^Введите ваш ZIP'
        },
        length: {
          minimum: 5,
          tooShort: "^Недостаточно символов (минимум %{count})",
          maximum: 100,
          tooLong: "^Слишком много символов (максимум %{count})"
        }
      }
    };
    this.mask = Inputmask({
      mask: "+7 999 999-9999",
      showMaskOnHover: false,
      clearIncomplete: false
    }).mask("[data-validate='phone']");

    document.addEventListener('submit', (event)=>{
      event.preventDefault();
      let $form = event.target;
      if($form.classList.contains('js-validation') && this.checkValid($form)) {
        //Событие отправки формы
        //код
        //slide
        Slider.last();
      }
    })
    document.addEventListener('input', (event)=>{
      let $input = event.target,
          $form = $input.closest('.form');
      if($form.classList.contains('js-validation')) {
        this.checkValid($form, $input);
      }
    })

  },
  checkValid: function($form, $input) {
    let $inputs = $form.querySelectorAll('input, textarea'),
        values = {},
        constraints = {},
        resault;

    $inputs.forEach(($input)=>{
      let name = $input.getAttribute('name');
      for(let key in this.namspaces) {
        if($input.getAttribute('data-validate')==this.namspaces[key]) {
          values[name] = $input.value;
          constraints[name] = this.constraints[key];
        }
      }
    })

    resault = validate(values, constraints);

    if(resault!==undefined) {
      if($input!==undefined) {
        let flag = true,
            name = $input.getAttribute('name');
        for(let key in resault) {
          if(name==key) {
            flag=false;
          }
        }
        if(flag && $input.parentNode.classList.contains('error')) {
          $input.parentNode.classList.remove('error');
          let $msg = $input.parentNode.querySelector('.input__message');
          gsap.to($msg, {autoAlpha:0, duration:0.3, ease:'power2.inOut'}).eventCallback('onComplete', ()=>{
            $msg.remove();
          })
        }
      } 
      else {
        $inputs.forEach(($input)=>{
          let name = $input.getAttribute('name');
          for(let key in resault) {
            if(name==key) {
              if(!$input.parentNode.classList.contains('error')) {
                $input.parentNode.classList.add('error');
                $input.parentNode.insertAdjacentHTML('beforeend', `<span class="input__message">${resault[key][0]}</span>`);
                gsap.to($input.parentNode.querySelector('.input__message'), {autoAlpha:1, duration:0.3, ease:'power2.inOut'})
              } else {
                $input.parentNode.querySelector('.input__message').textContent = `${resault[key][0]}`;
              }
            }
          }
        })
      }
      return false;
    } else {
      $inputs.forEach(($input)=>{
        $input.parentNode.classList.remove('error');
        let $msg = $input.parentNode.querySelector('.input__message');
        if($msg) {
          gsap.to($msg, {autoAlpha:0, duration:0.3, ease:'power2.inOut'}).eventCallback('onComplete', ()=>{
            $msg.remove();
          })
        }
      })
      return true;
    }
  },
  reset: function($form) {
    let $inputs = $form.querySelectorAll('input, textarea');
    $inputs.forEach(($input)=>{
      $input.value = '';
      let $parent = $input.parentNode;
      if($parent.classList.contains('focused')) {
        $parent.classList.remove('focused');
      }
      if($parent.classList.contains('error')) {
        $parent.classList.remove('error');
        let $msg = $input.parentNode.querySelector('.input__message');
        if($msg) {
          gsap.to($msg, {autoAlpha:0, duration:0.3, ease:'power2.inOut'}).eventCallback('onComplete', ()=>{
            $msg.remove();
          })
        }
      }
    })
  }
}

function priceCorrecting(number, decimals, char=' ') {
  let i, j, kw, kd, km;
  i = parseInt(number = (+number || 0).toFixed(decimals)) + '';
  ((j = i.length) > 3) ? (j = j % 3) : (j = 0)
  km = j ? i.substr(0, j) + char : '';
  kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ' ');
  kd = (decimals ? '.' + Math.abs(number - i).toFixed(decimals).replace(/-/, '0').slice(2) : '');
  return (km + kw + kd).replace(/(0+)$/, '').replace(/[^0-9]$/, '');
}