jQuery(document).ready(function($){

    var searchInput = $('.search_input'),
        searchBtn = searchInput.next('button');

    searchBtn.click(function() {
        var searchInputVal = $(this).prev('.search_input').val();
        if (searchInputVal) {
            var url = searchInput.data('search-url');
            window.location = url + '?q=' + searchInputVal;
        }
    });

    searchInput.keyup(function(event) {
        if (event.keyCode === 13) {
            searchBtn.click();
        }
    });


    if (screen.width > 767) {
        const resultBox = $('.header-search-results');

        $(document).on('focus keyup paste', '.search_input', function(e) {
            var input = $(this);
            if (input.val().length >= 5) {
                $.ajax({
                    type: 'get',
                    url: input.data('search-url'),
                    data: input.serialize(),
                    dataType: 'html'
                }).done( function(result) {
                    if (result.replace(/\s/g,'').length > 0) {
                        resultBox.html(result);
                        resultBox.show();
                        $(document).mouseup(function (e){
                            if (!resultBox.is(e.target) && resultBox.has(e.target).length === 0) {
                                resultBox.hide();
                            }
                        });
                    } else {
                        resultBox.html('');
                        resultBox.hide();
                    }
                });
            } else {
                resultBox.hide().empty();
            }
        });

    }


});
