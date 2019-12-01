import { buildProducts } from "./buildProducts.js";
$(document).ready(function () {
    //get initial data
    $.get("/api/products", function (data) {
        console.log("-------");
        console.log(data);
        console.log("-------");
        buildProducts(data);
    });


    $("form").on("submit", function (event) {
        event.preventDefault();
        let formData = $(this).find($("input"));
        console.log("------");
        //build an array of non zero quantity items
        let serializeArray = [];
        for (let i = 0; i < formData.length; i++)
            if (formData[i].value != 0 && formData[i].value != '') {
                serializeArray.push(formData[i]);
            }
        console.log('array for post:');
        console.log(serializeArray);

        $.post("/api/submit", serializeArray, function (order) {
            console.log("returned order");
            $('.column.stockCount').remove();
            // if 0 then we didn't have enough stock - loop through and post messages
            console.log(order);
            if (order[0] == 0) {
                for (let i = 0; i < order[1].length; i++) {
                    $(`.columns[data-id=${order[1][i].id}]`).append(`<div class="column is-full stockCount is-centered">Sorry, not enough in stock: ${order[1][i].stock_quantity}</div>`)

                }
            } else {
                //otherwise we must have enoug stock so we're posting confirmation as modal
                $('#modal').addClass("is-active");
                $('#orderDetails').empty();
                for (let i = 0; i < order[1].length; i++) {
                    $('#orderDetails').append(`
                    <div class="columns">
                    <div class="column">${order[1][i][0]}</div>
                    <div class="column">${order[1][i][1]}</div>
                    <div class="column">$${order[1][i][2]}</div>
                    </div>
                    `)
                }
                $('#orderDetails').append(`
                <div class="columns>
                <div class="column>Total: $${order[2]}</div>
                </div>`)
            }

        });
    });

    $('.modal-background,.modal-close').on("click", function () {
        $('#modal').removeClass("is-active");
        $('input').val('0');
    });
});

