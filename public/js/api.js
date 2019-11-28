$(document).ready(function() {
  $.get("/api/products", function(data) {
    console.log("-------");
    console.log(data);
    console.log("-------");

    // console.log(results[0]);

    for (let i = 0; i < data.length; i++) {
      console.log(data[i].product_name);
      $("#products").append(`
      <div class="columns is-centered" data-id='${data[i].id}'>
      <div class="column is-one-fifth">
      ${data[i].product_name}</div>
      <div class="column is-one-fifth">
      ${data[i].department_name}
      </div>
      <div class="column is-one-fifth">
      ${data[i].price}
      </div
      <div class="column is-narrow">
<div class="control">
<input type="number" class="input quantity" size="2" max-length="2" name="${data[i].product_name}"/>
</div>
      </div>
    

      `);

      /*    for (let [key, value] of Object.entries(data[i])) {
        $(`.columns[data-id='${data[i].id}']`).append(`
        <div class="column is-narrow">
        ${key}: ${value}
      </div>`);
      } */
    }
  });

  $("form").on("submit", function(event) {
    event.preventDefault();
    console.log($(this).serialize());
    $.post("/api/submit", $("form").serialize(), function(order) {
      console.log(order);
    });
  });
});
