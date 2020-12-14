const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  postId: {
    desc: "Post Id",
    trim: true,
    type: Schema.Types.ObjectId,
    ref: "post",
  },
  authorId: {
    desc: "Author Id",
    trim: true,
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  text: {
    desc: "Comment description",
    trim: true,
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Comment = mongoose.model("comment", CommentSchema);
