// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

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

// Database configuration

// If deployed, use the deployed database. Otherwise use the local database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/amazonscraperdb";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes

// Main route
app.get('/', function (req, res) {
  res.render('index');
});

// A GET route for scraping the amazon website
app.get("/scrape", function (req, res) {
  // First, grab the body of the html with axios
  axios.get("https://www.amazon.com/s?k=Houseware&ref=nb_sb_noss_2").then(function (response) {
    // Then, load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, grab every h2 within an Product tag, and do the following:
    $(".sg-col-inner").each(function (i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.name = $(this)
        .children("h2")
        .children("a")
        .text();
      result.link = $(this)
        .children("h2")
        .children("a")
        .attr("href");
      // result.image = $(this)
      //   .children("img")
      //   .attr("src");
      // result.price = $(this)
      //   .children(".a-price")
      //   .children(".a-offscreen")
      //   .text();

      // Create a new Product using the `result` object built from scraping
      db.Product.create(result)
        .then(function (dbProduct) {
          // View the added result in the console
          console.log(dbProduct);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

// Route for getting all Products from the db
app.get("/products", function (req, res) {
  // Grab every document in the Products collection
  db.Product.find({})
    .then(function (dbProduct) {
      // If we were able to successfully find Products, send them back to the client
      res.json(dbProduct);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Start this server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when this server has started
  console.log("Server listening on: http://localhost:" + PORT);
});