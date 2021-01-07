const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");

const auth = require("../../middleware/auth");
const Comment = require("../../model/Comment");
const User = require("../../model/User");

// @route GET api/comments/:postId
// @description Get all comments for post
// @access Public
router.get("/:postId", (req, res) => {
  const postId = req.params.postId;
  Comment.find({ postId })
    .sort({ date: -1 })
    .populate("authorId", "name surname")
    .limit(25)
    .then((comments) => {
      res.json(comments);
    });
});

// @route GET api/comments/:postId
// @description Creates a comment for post
// @access Private
router.post("/:postId", auth, (req, res) => {
  const postId = req.params.postId;
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, config.get("jwtSecret"));
  const userId = decoded["id"];
  const comment = req.body.comment;

  // if string lenght is empty
  if (![...comment].length)
    return res.status(400).json("Comment must have at least one symbol");
  // if string lenght is above 250 characters
  if ([...comment].length > 250)
    return res.status(400).json("Comment has too symbols");

  const newComment = new Comment({
    postId,
    authorId: userId,
    text: comment,
    date: Date.now(),
  });
  newComment.save().then(() => {
    User.findById(userId)
      .select("name surname")
      .then((user) => {
        const comment = { ...newComment._doc, authorId: user };
        res.json(comment);
      });
  });
});

module.exports = router;
