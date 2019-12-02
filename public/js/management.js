import { getProductsInventory } from "./managementBuild.js";
$(document).ready(function () {
    //listener for mobile menu
    if ($("#mobileMenu").css('display') != 'hidden') {
        console.log('mobile menu');

        $("#mobileMenu").on('click', function (event) {
            if ($('.navbar-menu').hasClass('is-active')) {
                $('.navbar-menu').removeClass('is-active')
                console.log('close menu');

            } else {
                $('.navbar-menu').addClass('is-active')
                console.log('open menu');

            }
        })

    }

    //load products view
    //if query url for inventory count get items with less than query value
    let url = window.location.search;
    getProductsInventory(url);

    $('form').on('submit', function (event) {
        event.preventDefault();
        console.log(event);
        console.log('----------');
        //get relevant from data
        let formData = $(this).find($("input"));
        console.log(formData);

        let serializeArray = [];
        //check for empty form fields and push into array
        if (formData[0].value.length > 0 && formData[0].value != 0) {
            console.log(true);
            serializeArray.push(formData[0]);
            for (let i = 1; i < formData.length; i++) {
                console.log('for');
                console.log(formData[i].value.length);
                console.log(formData);


                if (formData[i].value.length > 0) {
                    serializeArray.push(formData[i]);
                    console.log('for if');
                    console.log(formData[i]);
                    console.log(serializeArray);

                }
            }
            console.log('serialize:');
            //post to update database
            $.post("/api/inventory/update", serializeArray, function (data) {
                console.log('returned');
                console.log(data);
                return new Promise(function (resolve, reject) {
                    resolve(getProductsInventory(url));

                }).then(function (resolve) {
                    //add visual confirmation of udate to dom
                    console.log('then');
                    $('input[name=id').after(`<span id='updateSuccess' class='green'> Updated Product</span>`);
                    let productId = $('input[name=id').val();
                    $(`div[data-id=${productId}]`).addClass("success");
                    console.log($(`div[data-id=${productId}]`));

                })
            })

            // updataData()
        } else {
            $('input[name=id]').after(`<span id="erro" class='red'>id field required</span>`);
        }


    })
    //remove err and confirmed changed on input form focus
    $('input[name=id]').on('focus', function () {
        $('#erro').remove();
        $('#updateSuccess').remove();
        let productId = $('input[name=id').val();
        $(`div[data-id=${productId}]`).removeClass('success')

    })

})



