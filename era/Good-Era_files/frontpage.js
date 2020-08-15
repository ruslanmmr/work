$(document).ready(function () {
    $('.category-slider .owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        items: 5,
        responsive: {
            0: {
                nav: false,
                dots: true,
                items: 1
            },
            479: {
                nav: false,
                dots: true,
                items: 3
            },
            768: {
                nav: true,
                dots: false,
                items: 4
            },
            992: {
                nav: true,
                items: 5
            }
        }
    });


    var contentHeight = 2;
    $('#welcome-content').children().each(function(index, value) {
        $this = $(this);
        contentHeight += $this.outerHeight(true);
    });

    var catalogMenu = document.getElementById('catalog-menu');

    if (catalogMenu.scrollHeight > contentHeight) {
        catalogMenu.style.height = contentHeight + 'px';
        menu = $('#catalog-menu');
        var areaHeight = menu.height();

        var lastEl = null;


        // var items = $('li', menu);
        var items = $('.catalog-side__content > ul', menu).first().children('li');
        items.each(function(index, value) {
            $this = $(this);
            var top = $this.position().top;
            var height = $this.height();

            if (top + height > areaHeight && lastEl == null){
                lastEl = $(items[index-1]);
            }
            if (lastEl != null && index > lastEl.index()) {
                $this.addClass('hidden');
                lastEl.addClass('hidden');
            }
        });


        $(lastEl).before('<li class="menu-item more"><a class="btn-border" href="/catalog/">Показать еще</a></li>');

        // $('li.more').on('click', function(event) {
        //     event.preventDefault();
        //     $(this).hide();
        //     menu.find('.hidden').show();
        //     catalogMenu.style.height = 'auto';
        // });

    }

});



