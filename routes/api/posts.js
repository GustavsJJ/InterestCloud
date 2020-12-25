const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const config = require("config");

const Post = require("../../model/Post");
const User = require("../../model/User");
const PostUser = require("../../model/PostUser");

const images = require("./images");

// middlewares
const reporter = require("../../middleware/reporter");
const Category = require("../../model/Category");

// Gets user by token from MongoDB
const getUserIdFromToken = (token) => {
  if (!token) return { status: 401, msg: "No token" };
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const userId = decoded.id;
    return { userId };
  } catch (e) {
    return { status: 400, msg: "Token is not valid" };
  }
};

// @route GET api/posts/sortBy=:sortBy
// @description Get posts sorted by sortBy parameter
// @access Public
router.get("/sortBy=:sortBy", (req, res) => {
  let sortBy = req.params.sortBy;
  if (sortBy.startsWith("cat-")) {
    sortBy = "category-sort";
  }

  switch (sortBy) {
    case "user-viewedHistory":
      const token = req.header("x-auth-token");
      const userId = getUserIdFromToken(token);
      if (!userId) return res.status(userId.status).json(userId.msg);
      PostUser.find({ userId: userId.userId })
        .sort({ viewedDate: -1 })
        .populate("postId")
        .then((postUser) => {
          return res.json(postUser.map((pu) => pu.postId));
        });
      break;
    case "category-sort":
      const categoryName = req.params.sortBy.replace("cat-", "");
      Category.findOne({ name: categoryName }).then((category) => {
        const catId = category.id;
        Post.find({ categoryIds: catId }).then((posts) => {
          return res.json(posts);
        });
      });
      break;
    default:
      Post.find()
        .sort({ date: -1 })
        .then((posts) => res.json(posts));
  }
});

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
      date: Date.now(),
    });
    newPost.save().then((post) => res.json(post));
  });
});

// @route DELETE api/posts/:id
// @description Delete a Post
// @access Private
router.delete("/:id", (req, res) => {
  const postId = req.params.id;

  PostUser.deleteMany({ postId: postId })
    .then(() => {
      Post.findById(postId)
        .then((post) => {
          const imageId = post.imageId;
          post.deleteOne();
          if (imageId) {
            images
              .deleteImage(imageId)
              .then((msg) => {
                return res.json({ success: true });
              })
              .catch(() => {
                res.status(500).json({ success: false });
              });
          } else return res.json({ success: true });
        })
        .catch((error) => res.status(404).json({ success: false }));
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

// @route GET api/posts/:id
// @description Like a post by id
// @access Public

router.get("/:id/like", (req, res) => {
  const postId = req.params.id;
  const token = req.header("x-auth-token");
  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, config.get("jwtSecret"));
      const userId = decoded.id;
      // Set Post as liked
      PostUser.findOne({ userId: userId, postId: postId }).then((postUser) => {
        if (postUser) {
          // if postUser record can be found
          // checks if post is liked or unliked
          postUser.likedDate = postUser.likedDate ? undefined : Date.now();
          postUser.save();
          res.json("Post like status updated");
        } else {
          // if postUser record can not be found
          const newPostUser = new PostUser({
            userId,
            postId,
            likedDate: Date.now(),
          });
          newPostUser.save();
          res.json("Post like status updated");
        }
      });
    } catch (e) {
      return res.status(400).json("Token has expired or is invalid");
    }
  } else
    return res.status(401).json("You must be logged in to perform this action");
});

// @route GET api/posts/:id
// @description Get Post by id
// @access Public
router.get("/:id", (req, res) => {
  const postId = req.params.id;
  const token = req.header("x-auth-token");
  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, config.get("jwtSecret"));
      const userId = decoded.id;
      // Set Post as viewed
      PostUser.findOne({ userId: userId, postId: postId }).then((postUser) => {
        if (postUser) {
          // if postUser record can be found
          postUser.viewedDate = Date.now();
          postUser.save();
          Post.findById(postId)
            .then((post) => {
              return res.json({
                ...post._doc,
                liked: postUser.likedDate ? true : false,
              });
            })
            .catch((error) => {
              return res.status(404).json("Post cannot be found");
            });
        } else {
          // if postUser record can not be found
          const newPostUser = new PostUser({
            userId,
            postId,
            viewedDate: Date.now(),
          });
          newPostUser.save();
          findPostAndSend(postId, res);
        }
      });
    } catch (e) {
      findPostAndSend(postId, res);
    }
  } else findPostAndSend(postId, res);
});

const findPostAndSend = (postId, res) => {
  Post.findById(postId)
    .then((post) => res.json(post))
    .catch((error) => res.status(404).json("Post cannot be found"));
};

module.exports = router;
