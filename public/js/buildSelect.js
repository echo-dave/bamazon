$(document).ready(function () {

    $.get("api/categories", function (categories) {

        for (let i = 0; i < categories.length; i++) {
            $('#select-category').append(`
        <option value='${categories[i].department_name}'>${categories[i].department_name}</option>
        `)
        }

    })
})