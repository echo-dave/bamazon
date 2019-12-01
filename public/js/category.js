import { buildProducts } from "./buildProducts.js";
$('#select-category').on('change', function (event) {
    $.get(`/api/products/${$('#select-category').val()}`, function (data) {
        buildProducts(data);
    })
})

