// Dependencies //
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

// Variables //
var app = express();
var PORT = process.env.PORT || 8081;

// Middleware //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


// Application routes //
require("./app/routing/htmlRoutes.js")(app);
require("./app/routing/apiRoutes.js")(app);

// Start listening //
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
})