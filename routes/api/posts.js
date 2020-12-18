const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const reporter = require("../../middleware/reporter");
const config = require("config");

const Post = require("../../model/Post");
const User = require("../../model/User");
const images = require("./images");

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
router.post("/", reporter, (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, config.get("jwtSecret"));
  const userId = decoded["id"];

  if (!req.body.title || !req.body.text)
    return res.status(400).json("Please enter all fields");

  if (!req.body.categories.length)
    return res.status(400).json("Please select at least one category");

  if (req.body.categories.length > 3)
    return res.status(400).json("No more than three categories are allowed");

  User.findOne({ _id: userId }).then((user) => {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.text,
      categoryIds: req.body.categories,
      author: user.name + " " + user.surname,
    });
    newPost.save().then((post) => res.json(post));
  });
});

// @route DELETE api/posts/:id
// @description Delete a Post
// @access Private
router.delete("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      const imageId = post.imageId;
      if (imageId)
        images
          .deleteImage(imageId)
          .then((msg) => {
            post.deleteOne();
            return res.json({ success: true });
          })
          .catch(() => {
            res.status(500).json({ success: false });
          });
      return res.json({ success: true });
    })
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

// @route GET api/posts
// @description Get Post by id
// @access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((error) => res.status(404).json("Post cannot be found"));
});

module.exports = router;
