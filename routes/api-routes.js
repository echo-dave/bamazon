const db = require("../database/models");

module.exports = function (app) {
  //get data for front end display
  app.get("/api/products", function (req, res) {
    db.Product.findAll({
      attributes: [
        "id",
        "product_name",
        "department_name",
        "price"
        // ["stock_quantity", "Available"]
      ]
    }).then(function (data) {
      res.json(data);
    });
  });

  //post on order submission
  app.post("/api/submit", function (req, res) {
    console.log(req.body);
    let order = req.body;

    //convert returned object to array to loop through and build search attributes for databse
    //compare quantities between order and database availability
    order = Object.entries(order);
    console.log('order:');
    console.log(order);
    let orderList = [];
    for (let i = 0; i < order.length; i++) {
      orderList.push(order[i][0]);
      console.log("order list:");
      console.log(orderList);
    }

    db.Product.findAll({
      where: {
        product_name: [orderList]
      }
    }).then(function (data) {
      console.log('then order list:');
      console.log(orderList);

      console.log('data');
      console.log(data);

      //pushing low stock items to arrray - stockLevels
      let stockLevels = [];
      for (let i = 0; i < orderList.length; i++) {
        if (data[i].stock_quantity >= order[i][1]) {
          // stockLevels.push(data[i].product_name + " stock good");
        } else {
          stockLevels.push(data[i].product_name);
        }
      }

      //query database for stock levels of the low items for displaying on frontend. 
      //Using id to match columns id attribute
      db.Product.findAll({
        attributes: ['id', 'stock_quantity'],
        where: {
          product_name: stockLevels
        }
      }).then(function (data) {
        res.json(data);

      })
    });
  });
};
