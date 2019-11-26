const db = require('../database/models');

module.exports = function (app) {
app.get("/api/products", function(req,res){
    db.Product.findAll().then(function(data){
        res.json(data);
    });
});

}