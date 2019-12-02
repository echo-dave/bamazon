const path = require('path');
module.exports = function (app) {

    app.get(/(\/index)|(\/home)|(^\/$)/, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get('/css/bulma.css', function (req, res) {
        res.sendFile(path.join(__dirname, '../../node_modules/bulma/css/bulma.css'))
    })

};