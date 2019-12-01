require('dotenv').config();

db = require('./database/models');
const env = process.env.NODE_ENV || "development";
//express server
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static options
let options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['html'],
    maxAge: '1d',
    redirect: false,
}


//routes
app.use(express.static('public', options));

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/api-manage-routes.js")(app);

app.use(function (req, res) {
    res.status(404).sendFile(__dirname + '/public/404.html');
});

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("port " + PORT);
        console.log("environment vars:")
        console.log(env);
    });
});