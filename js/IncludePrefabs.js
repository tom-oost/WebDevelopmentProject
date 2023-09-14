$(function () {
    var includes = $('[data-include]')
    $.each(includes, function () {
        var file = 'Prefab/' + $(this).data('include') + '.html'
        $(this).load(file)
    })
})