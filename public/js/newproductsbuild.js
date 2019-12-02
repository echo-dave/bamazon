

//build output from array of objects
function addNewProducts(products) {
    console.log('empty buld');
    //clear containers before rebuilding
    $('#prodHeader').remove();

    $('.content').append(`<div id="prodHeader" class="columns is-centered product_head"></div>`)
    for (let i = 1; i < Object.entries(products[0]).length; i++) {
        $('#prodHeader').append(`<div class="column is-one-quarter">
        ${Object.entries(products[0])[i][0]}
        </div>`)
    }
    $('#productContent').after(`<div id="products" class="container"></div>`)
    //build products i as array of object j as array of key value pairs
    for (let i = 0; i < products.length; i++) {
        $('#products').append(`<div data-id='${Object.entries(products[i])[0][1]}' class="columns is-centered"></div>`)

        for (let j = 1; j < Object.entries(products[0]).length; j++) {
            $(`div[data-id=${Object.entries(products[i])[0][1]}]`).append(`<div class="column is-one-quarter">
            ${Object.entries(products[i])[j][1]}
            `)
        }

    }
}

export { addNewProducts }