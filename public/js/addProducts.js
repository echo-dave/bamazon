import { addNewProducts } from "./newproductsbuild.js";

$(document).ready(function () {

    $('form').on('submit', function (event) {
        event.preventDefault();
        console.log($(this).serialize());
        $.post("/api/inventory/newproduct", $(this).serialize(), function (product) {
            console.log(product);
            /*        let productArray = [product]
                   console.log('array');
                   console.log(productArray); */

            addNewProducts(product)
        })

    })

})