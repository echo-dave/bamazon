const db = require("../database/models");
//const sequelize = require('sequelize');
const inventory = require('../nodejs/inventory')
module.exports = function (app) {
  //get data for front end display
  app.get("/api/products", function (req, res) {
    db.Product.findAll({
      attributes: [
        "id",
        "product_name",
        "department_name",
        "price"
      ],
      order: [['department_name', 'ASC'], ['product_name', 'ASC']]
    }).then(function (data) {
      res.json(data);
    });
  });

  //post on order submission
  app.post("/api/submit", function (req, res) {
    console.log('req body:');
    console.log(req.body);
    let order = req.body;

    //convert returned object to array to loop through and build search attributes [orderList] for databse
    //compare quantities between order and database availability
    order = Object.entries(order);
    console.log('order:');
    console.log(order);
    let orderList = [];
    for (let i = 0; i < order.length; i++) {
      orderList.push(order[i][0]);
    }
    console.log("order query list:");
    console.log(orderList);
    db.Product.findAll({
      where: {
        product_name: [orderList]
      }
    }).then(function (data) {
      console.log('data');
      console.log(data);

      //pushing low stock items to arrray - stockLevels
      let stockLevels = [];
      for (let i = 0; i < orderList.length; i++) {
        if (data[i].stock_quantity < order[i][1]) {
          stockLevels.push(data[i].product_name);
        } else {

        }
      }

      //query database for stock levels of the low items for displaying on frontend. 
      //Using id to match columns id attribute
      //if sotckLevels length is > 0 then we are short on stock
      if (stockLevels.length > 0) {
        db.Product.findAll({
          attributes: ['id', 'stock_quantity'],
          where: {
            product_name: stockLevels
          }
        }).then(function (data) {
          res.json([0, data]);
        })
      } else {
        //we have stock and need to send subtotal and total pricing to frontend
        let total = 0;
        for (let i = 0; i < order.length; i++) {
          let subTotal = data[i].price * order[i][1]
          order[i].push(subTotal.toFixed(2))
          total += subTotal;
        }
        //total = total.toFixed(2);
        //set total to maintain 2 decimal places
        res.send([1, order, total.toFixed(2)])
        console.log('order details');
        console.log(order, total);
        //adjust database quantities
        adjust(order, data);
      }

    });


  });
  //category toggle
  app.get('/api/products/:category', function (req, res) {
    console.log(req.params);

    db.Product.findAll({
      where: {
        department_name: req.params.category
      },
      order: [['product_name', 'ASC']]
    }).then(function (data) {
      res.json(data);
    })

  })

  //get categories to build selector
  app.get('/api/categories', function (req, res) {
    db.sequelize.query("SELECT DISTINCT department_name FROM Products")
      .then(function (categories) {
        res.json(categories[0]);

      })

  })

};
