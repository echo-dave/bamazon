const db = require("../database/models");

module.exports = function(app) {
  app.get("/api/products", function(req, res) {
    db.Product.findAll({
      attributes: [
        "id",
        "product_name",
        "department_name",
        "price"
        // ["stock_quantity", "Available"]
      ]
    }).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/submit", function(req, res) {
    console.log(req);
    res.json(req.body);
  });
};
