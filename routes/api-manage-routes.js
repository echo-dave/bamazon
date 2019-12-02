const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require("../database/models");
module.exports = function (app) {
    app.get("/api/inventory/products", function (req, res) {

        db.Product.findAll({
            attributes: ['id', ['product_name', 'product'], 'price', ['stock_quantity', 'quantity']]
        }).then(function (Products) {
            res.json(Products);
            console.log(Products);

        })

    })
    //get inventory and get inventory by stock
    app.get('/api/inventory', function (req, res) {
        let query;
        console.log('req params:');
        console.log(req.params);
        console.log('req body');
        console.log(req.body);
        console.log('req query');
        console.log(req.query);


        if (req.query.inventory) {
            console.log(true);

            query = req.query.inventory;
        }
        console.log('query:');
        console.log(query);

        db.Product.findAll({
            attributes: ['id', ['product_name', 'product'], 'price', ['stock_quantity', 'quantity']],
            where: {
                stock_quantity: {
                    [Op.lt]: query
                }
            }
        }).then(function (data) {
            res.json(data);
        })


    })

    app.post('/api/inventory/update', function (req, res) {
        console.log(req.body);
        db.Product.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (data) {
                console.log(data);
                res.send(true)

            })


    })

    //add new products
    app.post('/api/inventory/newproduct', function (req, res) {
        console.log(req.body);
        db.Product.create(
            req.body
        );

        res.end();

    })

}