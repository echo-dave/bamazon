import { buildProducts } from "./buildProducts.js";
//rebuild products on category select change
$('#select-category').on('change', function (event) {
    $.get(`/api/products/${$('#select-category').val()}`, function (data) {
        buildProducts(data);
    })
})

