var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ProductSchema = new Schema({
  // `title` is required and of type String
  name: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },
  // image: {
  //   type: String,
  //   required: true
  // },
  // price: {
  //   type: Number,
  //   required: true
  // },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Product with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Product = mongoose.model("Product", ProductSchema);

// Export the Product model
module.exports = Product;
