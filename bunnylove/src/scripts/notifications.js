$(document).ready(()=>{
  notify();
})

//test code
function notify() {
  //defaults
  Noty.overrideDefaults({
    layout   : 'topRight',
    theme    : 'metroui',
    timeout: 3000
  });

  document.addEventListener('click', (event)=>{
    let $target = $(event.target);
    if($target.closest('.button').length) {
      //получили значения каким удобно способом
      let msg = $target.attr('data-text'), 
          type = $target.attr('data-type');
      
      //В type и text подставили нужные значения, показали сообщение
      new Noty({
        type: type,
        text: msg
      }).show();
    }
  })

}