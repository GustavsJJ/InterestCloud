const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const config = require("config");

const Post = require("../../model/Post");
const User = require("../../model/User");
const Category = require("../../model/Category");
const PostUser = require("../../model/PostUser");
const CategoryUser = require("../../model/CategoryUser");

const images = require("./images");

// middlewares
const reporter = require("../../middleware/reporter");
const admin = require("../../middleware/admin");

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
  if (sortBy.startsWith("cat-")) sortBy = "category-sort";

  const token = req.header("x-auth-token");
  const userId = getUserIdFromToken(token).userId;
  switch (sortBy) {
    case "user-viewedHistory":
      if (!userId) return res.status(userId.status).json(userId.msg);
      PostUser.find({ userId: userId })
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
        Post.find({ categoryIds: catId })
          .sort({ date: -1 })
          .then((posts) => {
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
// @access Public / Private
router.get("/", (req, res) => {
  const token = req.header("x-auth-token");
  const userId = getUserIdFromToken(token).userId;
  if (!userId) {
    Post.find()
      .sort({ date: -1 })
      .then((posts) => res.json(posts));
  } else {
    CategoryUser.find({ userId, points: { $gt: 0 } })
      .sort({ points: -1 })
      .then((catUsrs) => {
        let period = new Date();
        period.setDate(period.getDate() - 14); // ignores posts that are two weeks old

        PostUser.find({ userId }).then((pstUsrs) => {
          const seenPosts = pstUsrs.map((pu) => pu.postId); // posts that have been seen by the user

          Post.aggregate([
            {
              $match: {
                date: { $gt: period },
                _id: { $nin: seenPosts },
              },
            },
            {
              $lookup: {
                from: "postusers",
                localField: "_id",
                foreignField: "postId",
                as: "views",
              },
            },
            {
              $addFields: {
                views: {
                  $size: "$views",
                },
              },
            },
            { $limit: 25 },
          ]).then((posts) => {
            const categoryOrder = catUsrs.map((c) => c.categoryId.toString());

            // sorts posts by date, category and views
            const sorter = (a, b) => {
              const setCategoryValues = (arr) => {
                return arr.categoryIds
                  .map((catId) => {
                    if (categoryOrder.includes(catId.toString()))
                      return (
                        categoryOrder.length -
                        categoryOrder.indexOf(catId.toString())
                      );
                    else return 0;
                  })
                  .sort((c, d) => d - c);
              };
              const aPost = setCategoryValues(a);
              const bPost = setCategoryValues(b);
              if (a.date.getDate() > b.date.getDate()) return 1;
              if (a.date.getDate() < b.date.getDate()) return -1;
              if (aPost[0] > bPost[0]) return -1;
              if (aPost[0] < bPost[0]) return 1;
              if (aPost[1] > bPost[1]) return -1;
              if (aPost[1] < bPost[1]) return 1;
              if (aPost[2] > bPost[2]) return -1;
              if (aPost[2] < bPost[2]) return 1;
              if (a.views > b.views) return -1;
              if (a.views < b.views) return 1;

              return 0;
            };

            const sortedPosts = posts.sort(sorter);
            res.json(sortedPosts);
          });
        });
      });
  }
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
    Category.find({ _id: { $in: req.body.categories } })
      .sort({
        position: 1,
      })
      .then((categories) => {
        const cat = categories.map((c) => c.id);
        const newPost = new Post({
          title: req.body.title,
          description: req.body.text,
          categoryIds: cat,
          author: user.name + " " + user.surname,
          date: Date.now(),
        });
        newPost.save().then((post) => res.json(post));
      });
  });
});

// @route DELETE api/posts/:id
// @description Delete a Post
// @access Private
router.delete("/:id", admin, (req, res) => {
  const postId = req.params.id;

  PostUser.deleteMany({ postId })
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
          // add 5 points for each post category
          addPointsToCategories(userId, postId, postUser.likedDate ? 5 : -5);
          res.json("Post like status updated");
        } else {
          // if postUser record can not be found
          const newPostUser = new PostUser({
            userId,
            postId,
            likedDate: Date.now(),
          });
          newPostUser.save();
          // add 5 points for each post category
          addPointsToCategories(userId, postId, 5);
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
    // if user is authenticated
    try {
      // Verify token
      const decoded = jwt.verify(token, config.get("jwtSecret"));
      const userId = decoded.id;

      Post.findById(postId)
        .then((post) => {
          // Set Post as viewed
          PostUser.findOne({ userId: userId, postId: postId }).then(
            (postUser) => {
              if (postUser) {
                // if postUser record can be found
                postUser.viewedDate = Date.now();
                postUser.save();
              } else {
                // if postUser record can not be found
                const newPostUser = new PostUser({
                  userId,
                  postId,
                  viewedDate: Date.now(),
                });
                newPostUser.save();
                // add 1 point for each post category
                addPointsToCategories(userId, postId, 1);
                console.log(post);

                findPostAndSend(postId, res);
              }
              return res.json({
                ...post._doc,
                liked: postUser.likedDate ? true : false,
              });
            }
          );
        })
        .catch((e) => {
          return res.json("Post cannot be found");
        });
    } catch (e) {
      findPostAndSend(postId, res);
    }
  } else findPostAndSend(postId, res);
});

const findPostAndSend = (postId, res) => {
  Post.findById(postId)
    .then((post) => res.json(post))
    .catch((e) => res.json({}));
};

const addPointsToCategories = (userId, postId, points) => {
  Post.findById(postId).then((post) => {
    const categoryIds = post.categoryIds;
    categoryIds.forEach((categoryId) => {
      CategoryUser.findOne({ userId, categoryId }).then((catUsr) => {
        if (catUsr) {
          catUsr.points =
            catUsr.points + points >= 0 ? catUsr.points + points : 0;
          catUsr.save();
        } else {
          const catUsr = new CategoryUser({
            userId,
            categoryId,
            points,
          });
          catUsr.save();
        }
      });
    });
  });
};

module.exports = router;
