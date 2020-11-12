const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    desc: "Test item",
    trim: true,
    type: String,
    required: true,
  },
  age: {
    desc: "Age",
    trim: true,
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Item = mongoose.model("item", ItemSchema);
