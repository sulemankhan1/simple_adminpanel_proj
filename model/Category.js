const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // reference to user
    ref: "users"
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Category = mongoose.model("categories", categorySchema);
