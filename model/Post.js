const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    desc: "Post title",
    trim: true,
    type: String,
  },
  description: {
    desc: "Post description",
    trim: true,
    type: String,
  },
  date: {
    desc: "Post date",
    type: Date,
    default: Date.now(),
  },
  categoryIds: {
    desc: "Post categories",
    type: [String],
    required: true,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
