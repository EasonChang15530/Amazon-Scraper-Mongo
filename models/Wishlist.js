var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var WishlistSchema = new Schema({
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
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  },
});

// This creates our model from the above schema, using mongoose's model method
var Wishlist = mongoose.model("Wishlist", WishlistSchema);

// Export the Wishlist model
module.exports = Wishlist;
