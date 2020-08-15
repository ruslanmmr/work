// feedback message request form handler
$('#feedback-message-request-form').on('submit', function(event) {
    event.preventDefault();
    var form = $(this);
    form.find('input[name="url"]').val(window.location.pathname);

    var data = form.serializeArray();
    $.ajax({
        type: 'POST',
        url: form.attr('action'),
        data: data,
        dataType: 'json'
    }).done(function(response) {
        formDoneAction(form, response);
    });
});


// call-merequest form handler
$('form.callme-request-form').on('submit', function(event) {
    event.preventDefault();
    var form = $(this);
    var data = form.serializeArray();
    $.ajax({
        type: 'POST',
        url: form.attr('action'),
        data: data,
        dataType: 'json'
    }).done(function(response) {
        formDoneAction(form, response);
    });
});

function formDoneAction(form, response) {
    form.find('.error-text').each( function() {
        $(this).remove();
    });
    form.find('.form-group').each( function() {
        $(this).removeClass('form-group--error');
    });
    if (response.success) {
        form.find('input, textarea').val('');
        $.fancybox.close();
        $.fancybox.open('<h3>Ваше сообщение отправлено!</h3>');
    } else {
        for (var f in response.errors) {
            var msg = '<span class="error-text">'+response.errors[f]+'</span>';
            var input = form.find('[name="' + f + '"]');
            var formGroup = input.parent('.form-group');
            formGroup.addClass('form-group--error');
            formGroup.append(msg);
        }
    }

}
