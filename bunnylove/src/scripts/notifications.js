$(document).ready(()=>{

  //Дефолтные настрйоки плагинов
  Noty.overrideDefaults({
    layout   : 'topRight',
    theme    : 'metroui',
    timeout: 3000
  });
  tippy.setDefaultProps({
    duration: 300,
    placement: 'auto',
    hideOnClick: true,
    trigger:'click',
    zIndex: 99,
    offset: [0, 15],
    maxWidth: 380
  });

  document.addEventListener('click', (event)=>{
    let $target = $(event.target);
    if($target.closest('[data-alert]').length) {
      let type = $target.attr('data-alert');
      
      //Этот код нужен для запуска первого типа
      //Вручную запустить уведомление (type: 'alert', 'info', 'success', 'error')
      let instance = new Noty({
        type: type,
        text: 'Вы добавили в корзину товары из разных магазинов, время доставки может быть увеличено.'
      })
      instance.show();

    } 
    
    else if($target.closest('[data-message]').length) {
      let theme = $target.attr('data-message');

      //Этот код нужен для запуска второго типа
      //Вручную запустить уведомление (theme: 'alert', 'info', 'success', 'error')
      let instance = tippy($target[0], {
        theme: theme,
        content: 'Вы добавили в корзину товары из разных магазинов, время доставки может быть увеличено.'
      })
      instance.show();

    } 
  })


})