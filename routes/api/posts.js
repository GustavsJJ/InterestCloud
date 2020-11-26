const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Post = require("../../model/Post");

// @route GET api/posts
// @description Get all Posts
// @access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts));
});

// @route POST api/posts
// @description Create a Post
// @access Private
router.post("/", (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  newPost.save().then((post) => res.json(post));
});

// @route DELETE api/posts/:id
// @description Delete a Post
// @access Private
router.delete("/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }))
    .catch((error) => res.status(404).json({ success: false }));
});

// @route PATCH api/posts/:id
// @description Update a Post
// @access Private
router.patch("/:id", (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ success: true }))
    .catch((error) => res.status(404).json({ success: false }));
});

module.exports = router;
