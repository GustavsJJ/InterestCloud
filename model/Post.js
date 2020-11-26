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
    type: String,
  },
  authorId: {
    desc: "Post author id",
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
