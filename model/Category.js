const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    desc: "Category name",
    trim: true,
    type: String,
    required: true,
    unique: true,
  },
  color: {
    desc: "Category color",
    trim: true,
    type: String,
    required: true,
  },
  position: {
    desc: "Category position",
    trim: true,
    type: String,
    required: true,
  },
});

module.exports = Category = mongoose.model("category", CategorySchema);
