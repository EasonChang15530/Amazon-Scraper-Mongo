// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongojs = require("mongojs");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static content from the "public" directory in this application directory.
app.use(express.static("public"));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// // Database configuration
// var databaseUrl = "scraper";
// var collections = ["scrapedData"];

// // Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function (error) {
//   console.log("Database Error:", error);
// });

// Main route (simple Hello World Message)
app.get('/', function (req, res) {
  res.render('index');
});

// app.get("/displayJSON", function (req, res) {

//   db.scrapedData.find({}, function (error, found) {
//     if (error) {
//       console.log(error);
//     } else {
//       res.json(found);
//     }
//   });
// });

// app.get("/scrape", function (req, res) {

//   axios.get("https://www.nytimes.com").then(function (response) {
//     var $ = cheerio.load(response.data);
//     // var results = [];
//     $("article").each(function (i, element) {
//       var title = $(element).children().text();
//       var link = $(element).find("a").attr("href");

//       var result = {
//         title: title,
//         link: link
//       };
//       console.log(result);
//       db.scrapedData.insert(result);
//     });
//   });
// })
// /* -/-/-/-/-/-/-/-/-/-/-/-/- */

// Start this server so that it can begin listening to client requests.
app.listen(3000, function() {
  // Log (server-side) when this server has started
  console.log("Server listening on: http://localhost:" + 3000);
});