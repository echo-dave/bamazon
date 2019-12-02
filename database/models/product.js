module.exports = function (sequelize, dataTypes) {
    const Product = sequelize.define('Product', {
        product_name: {
            type: dataTypes.STRING,
            len: [2, 100]
        },
        department_name: {
            type: dataTypes.STRING,
            len: [2, 30]
        },
        price: {
            type: dataTypes.DECIMAL(9, 2),
            allowNull: false
        },
        stock_quantity: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        }
    });
    return Product
}