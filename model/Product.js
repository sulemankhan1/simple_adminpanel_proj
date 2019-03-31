const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // reference to user
    ref: "users"
  },
  category: {
    type: Schema.Types.ObjectId, // reference to Categories
    ref: "categories"
  },
  name: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  desc: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Product = mongoose.model("products", productsSchema);
