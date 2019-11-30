$(document).ready(function () {
    $.get("/api/products", function (data) {
        console.log("-------");
        console.log(data);
        console.log("-------");

        // console.log(results[0]);

        for (let i = 0; i < data.length; i++) {
            console.log(data[i].product_name);
            $("#products").append(`
      <div class="columns is-centered is-multiline" data-id='${data[i].id}'>
      <div class="column is-one-fifth">
      ${data[i].product_name}</div>
      <div class="column is-one-fifth">
      ${data[i].department_name}
      </div>
      <div class="column is-one-fifth">
      $${data[i].price}
      </div>
      <div class="column is-narrow quantity">
<div class="control">
<input type="number" min="0" class="input quantity" size="2" max-length="2" value="0" name="${data[i].product_name}"/>
</div>
      </div>
      `);
        }
    });

    $("form").on("submit", function (event) {
        event.preventDefault();
        let formData = $(this).find($("input"));
        console.log("------");

        let serializeArray = [];
        for (let i = 0; i < formData.length; i++)
            if (formData[i].value != 0) {
                //console.log("formData");
                //console.log(formData[i].value);
                serializeArray.push(formData[i]);
            }
        console.log('array for post:');
        console.log(serializeArray);

        $.post("/api/submit", serializeArray, function (order) {
            console.log("returned order");

            console.log(order);
            $('.column.stockCount').remove();
            for (let i = 0; i < order.length; i++) {
                $(`.columns[data-id=${order[i].id}]`).append(`<div class="column is-full stockCount is-centered">Sorry, not enough in stock: ${order[i].stock_quantity}</div>`)

            }

        });
    });
});
