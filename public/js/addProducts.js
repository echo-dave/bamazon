$(document).ready(function () {

    $('form').on('submit', function (event) {
        event.preventDefault();
        console.log($(this).serialize());
        $.post("/api/inventory/newproduct", $(this).serialize(), function (res) {

        })

    })

})