// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");

// Create an instance of the express app.
var app = express();

var PORT = 3000;

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static content from the "public" directory in this application directory.
app.use(express.static("public"));
// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes.
var routes = require("./routes/Routes.js");
app.use(routes);

// Require all models
var db = require("./models");

// Database configuration

// If deployed, use the deployed database. Otherwise use the local database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/amazonscraperdb";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


// db.sequelize.sync({ force: false }).then(function () {

// Start this server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when this server has started
  console.log("Server listening on: http://localhost:" + PORT);
});