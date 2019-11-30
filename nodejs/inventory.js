const db = require('../database/models');
const sequelize = require('sequelize');

adjust = function (order) {

    for (let i = 0; i < order.length; i++) {
        db.Product.update({
            stock_quantity: sequelize.literal(`stock_quantity - ${order[i][1]}`)
        }, {
            where: {
                product_name: order[i][0]
            }
        })
    }
}

module.exports = adjust;