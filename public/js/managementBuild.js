
function managementBuildProducts(products) {
    console.log('empty buld');
    //clear containers before rebuilding
    $('.content + #products').remove();
    $('.content').empty();

    $('.content').append(`<div id="prodHeader" class="columns is-centered product_head"></div>`)
    for (let i = 0; i < Object.entries(products[0]).length; i++) {
        $('#prodHeader').append(`<div class="column is-one-quarter">
        ${Object.entries(products[0])[i][0]}
        </div>`)
    }
    $('#productContent').after(`<div id="products" class="container"></div>`)
    //build products i as array of object j as array of key value pairs
    for (let i = 0; i < products.length; i++) {
        $('#products').append(`<div data-id='${Object.entries(products[i])[0][1]}' class="columns is-centered"></div>`)

        for (let j = 0; j < Object.entries(products[0]).length; j++) {
            $(`div[data-id=${Object.entries(products[i])[0][1]}]`).append(`<div class="column is-one-quarter">
            ${Object.entries(products[i])[j][1]}
            `)
        }

    }
    return 'true';
}


function getProductsInventory(url) {
    let inventory = url.split("=")[1];
    console.log('low inventory count');
    console.log(inventory);

    return new Promise(function (resolve, reject) {
        resolve(getProducts(inventory));
    }).then(function (data) {
        console.log('getProductsInventory')
        console.log(data)
    })
}

function getProducts(inventory) {
    if (inventory) {
        inventory = "/?inventory=" + inventory;
        console.log('query url');
        console.log(inventory);


        return $.get("/api/inventory" + inventory, function (products) {
            console.log('get low inventory');
            return new Promise(function (resolve, reject) {
                resolve(managementBuildProducts(products))
            }).then(function (data) {
                console.log('getProducts');
                console.log((data));
                return data;

            })

        })

    } else {

        $.get("/api/inventory/products", function (products) {
            //build headers [0] first row, i as key value pair, 0 column name
            managementBuildProducts(products)
        })
    }
}

export { managementBuildProducts, getProducts, getProductsInventory }