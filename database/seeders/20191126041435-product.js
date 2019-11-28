"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Products",
      [
        {
          product_name: "Basketball",
          department_name: "Sports Equipment",
          price: 15.0,
          stock_quantity: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_name: "Sketchpad",
          department_name: "Art Supplies",
          price: 18.0,
          stock_quantity: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_name: "Graphite Pencel Set",
          department_name: "Art Supplies",
          price: 24.0,
          stock_quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_name: "Oil Paint Set",
          department_name: "Aart Supplies",
          price: 89.0,
          stock_quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_name: "Frisbee",
          department_name: "Sports Equipment",
          price: 8.0,
          stock_quantity: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_name: "Football",
          department_name: "Sports Equipment",
          price: 12.0,
          stock_quantity: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_name: "Water Bottle",
          department_name: "Sports Equipment",
          price: 6.0,
          stock_quantity: 9,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_name: "Batteries",
          department_name: "Electronics",
          price: 20.0,
          stock_quantity: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_name: "USB Hard Drive",
          department_name: "Electronics",
          price: 125.0,
          stock_quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_name: "RGB Keyboard",
          department_name: "Electronics",
          price: 150.0,
          stock_quantity: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Product", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
