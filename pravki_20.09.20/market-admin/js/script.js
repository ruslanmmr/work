[...document.querySelectorAll('.with-tooltip')].forEach(function(item, index) {
    const tooltip = item.parentElement.querySelector('.tooltip')
    let offset = [-50, 15];

    if (tooltip.classList.contains('dropdown')) {
        offset = [0, 15]
    } else if (tooltip.classList.contains('header__tooltip')) {
        offset = [-200, 20];
    }
    Popper.createPopper(item, tooltip, {
        placement: 'bottom-start',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset:  offset
                }
            }
        ]
    });
    
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const parent = e.target.closest('.with-tooltip').parentElement,
            tooltip = parent.querySelector('.tooltip');

        tooltip.classList.toggle('show');
        setTimeout(() => tooltip.classList.toggle('can-hide'), 0);
    });
});
[...document.querySelectorAll('.tooltip__close')].forEach(function(item) {
    item.addEventListener('click', function(e) {
        const tooltip = e.target.closest('.tooltip');
        tooltip.classList.toggle('show');
        setTimeout(() => tooltip.classList.toggle('can-hide'), 0);
    });
});


document.documentElement.addEventListener('click', function(event) {
    if (event.target.closest('.can-hide') && !event.target.classList.contains('can-hide')) return;
    if (!document.querySelectorAll('.can-hide').length) return;
    console.log('event :>> ', event);

    [...document.querySelectorAll('.can-hide')].forEach(function(item) {
        item.classList.remove('show');
        item.classList.remove('can-hide');
    })
})


