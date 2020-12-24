const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostUserSchema = new Schema({
  userId: {
    desc: "User id",
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  postId: {
    desc: "Post id",
    type: Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  viewedDate: {
    desc: "User viewed post",
    type: Date,
    default: Date.now(),
  },
  likedDate: {
    desc: "User liked post",
    type: Date,
    default: undefined,
  },
});

module.exports = PostUser = mongoose.model("postUser", PostUserSchema);
