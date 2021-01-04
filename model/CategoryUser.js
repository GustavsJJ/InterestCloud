const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryUserSchema = new Schema({
  userId: {
    desc: "User id",
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  categoryId: {
    desc: "Category id",
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  points: {
    desc: "Users points per category",
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = CategoryUser = mongoose.model(
  "categoryUser",
  CategoryUserSchema
);
