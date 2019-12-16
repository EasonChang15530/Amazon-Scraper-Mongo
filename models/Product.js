var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  // stars: {
  //   type: String,
  //   required: true
  // },
  
});

// This creates our model from the above schema, using mongoose's model method
var Product = mongoose.model("Product", ProductSchema);

// Export the Product model
module.exports = Product;
