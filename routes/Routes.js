var express = require("express");

// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var router = express.Router();

// Require all models
var db = require("../models");

// Routes

// Main route

// A GET route for scraping the amazon website
router.get("/scrape", function (req, res) {
  // First, grab the body of the html with axios
  axios.get("https://www.amazon.com/gp/bestsellers/?ref_=nav_cs_bestsellers").then(function (response) {
    // Then, load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, grab every h2 within an Product tag, and do the following:
    $("div .a-section .a-spacing-mini").each(function (i, element) {
      // Save an empty result object
      var result = {};

      // Select the appropriate and use .children () and .parent () to grab information.
      result.name = $(this)
        .children("img")
        .attr("alt");
      result.link = $(this)
        .parent()
        .attr("href");
      result.image = $(this)
        .children("img")
        .attr("src");
      // result.stars = $(this)
      //   .parent()
      //   .parent()
      //   .children("div .a-icon-row .a-spacing-none")
      //   .children("a")
      //   .attr("title");

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
router.get("/products", function (req, res) {
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

// A POST route for Products in wishlist from the db
router.post("/api/wishlist", function (req, res) {
  var data = req.body;
  db.Wishlist.create(data)
    .then(function (dbWishlist) {
      // View the added result in the console
      console.log(dbWishlist);
    })
    .catch(function (err) {
      // If an error occurred, log it
      console.log(err);
    });
})

// DELETE route for deleting Products in wishlist
router.delete("/api/wishlist/:id", function (req, res) {
  db.Wishlist.deleteOne({

    "_id" : req.params.id

  }).then(function (dbWishlist) {
    res.json(dbWishlist);
  });
});

// UPDATE route for deleting Products in wishlist
router.get('/wishlist', function (req, res) {
  db.Wishlist.find({}).populate("note")
    .then(function (dbWishlist) {
      res.render("wishlist", { products: dbWishlist })
    });
});

router.post("/api/wishlist/:id", function (req, res) {
  db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one Wishlist with an `_id` equal to `req.params.id`. Update the Wishlist to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Wishlist.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbWishlist) {
      // If we were able to successfully update an Wishlist, send it back to the client
      res.json(dbWishlist);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
});
})



// Export routes for server.js to use.
module.exports = router;