export function buildProducts(data) {
    //build dom for shop items
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
}