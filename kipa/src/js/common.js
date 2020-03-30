$(document).ready(function () {
  images.init();
  nav.init();
  calc.init();
  $checkbox.init();
});

$(window).resize(function () {
  windowW = Math.max(window.innerWidth, document.documentElement.clientWidth);
  images.resize(images.el);
});


let windowW = Math.max(window.innerWidth, document.documentElement.clientWidth);
let images = {
  el: $('.lazy'),
  init: function() {
    if(images.el.length>0) {
      images.el.Lazy({
        effectTime: 0,
        threshold: 500,
        imageBase: false,
        defaultImage: false,
        afterLoad: function(element) {
          images.resize($(element));
        }
      });
    }
  },
  resize: function(element) {
    if(images.el.length>0) {
      element.each(function() {
        let $this = $(this),
            box = $this.parent();
        if(!box.hasClass('cover-box_size-auto')) {
          let boxH = box.height(),
              boxW = box.width();
          setTimeout(function() {
            let imgH = $this.height(),
                imgW = $this.width();
            if ((boxW / boxH) >= (imgW / imgH)) {
              $this.addClass('ww').removeClass('wh');
            } else {
              $this.addClass('wh').removeClass('ww');
            }
            $this.addClass('visible');
          }, 300)
        } else {
          $this.addClass('visible');
        }
      })
    }
  }
}
let nav = {
  element: $('.nav'),
  open: $('.nav-open-button'),
  close: $('.nav-close-button'),
  overlay: $('.overlay'),
  init: function() {
    nav.open.on('click', function() {
      nav.element.addClass('active');
      nav.overlay.fadeIn(300);
    })
    nav.close.on('click', function() {
      nav.element.removeClass('active');
      nav.overlay.fadeOut(300);
    })
    nav.overlay.on('click touchstart', function () {
      nav.element.removeClass('active');
      nav.overlay.fadeOut(300);
    })
  
    $(window).resize(function () {
      if (windowW > 768) {
        nav.element.removeClass('active');
        nav.overlay.fadeOut(300);
      }
    });
  }
}


//num
$(document).on('change input', 'input', function(event) {
  let $target = $(this);
  if($target.hasClass('number-only')) {
    $target.val( $target.val().replace(/\D/, '') )
  }
})

//calc
let calc = {
  element: $('.calc-count-block'),
  init: function() {
    this.element.each(function() {
      let $this = $(this),
          $plus = $this.find('.js-plus'),
          $minus = $this.find('.js-minus'),
          $input = $this.find('input'),
          val = +$input.val();
      
      check();
      $plus.on('click', function() {
        val++;
        check();
      })
      $minus.on('click', function() {
        val--;
        check();
      })
      $input.on('change input', function() {
        setTimeout(function() {
          val = +$input.val();
          check();
        },100)
      })

      function check() {
        console.log(val)
        if(val<1 || val==1) {
          val=1;
          $minus.addClass('disabled');
        } else {
          $minus.removeClass('disabled');
        }
        $input.val(val);
      }
    })
  }
}

//checkboxes
window.$checkbox = {
  init: function() {
    $checkbox.check();

    $(document).on('click', '.checkbox', function() {
      $checkbox.check();
    })
    
    $(document).on('click', '.radio', function() {
      $checkbox.check();
    })

  },
  check: function() {
    $('.checkbox, .radio').each(function() {
      let input = $(this).find('input');
      if(input.prop('disabled')) {
        $(this).addClass('disabled');
      } else {
        $(this).removeClass('disabled');
      }
      if(input.prop('checked')) {
        $(this).addClass('checked');
      } else {
        $(this).removeClass('checked');
      }
    })
  }
}