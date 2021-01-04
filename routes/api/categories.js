const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");

const Category = require("../../model/Category");
const CategoryUser = require("../../model/CategoryUser");
const auth = require("../../middleware/auth");

// @route GET api/categories
// @description Get all Categories + points if authenticated
// @access Public
router.get("/", (req, res) => {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) {
    // Send categories
    Category.find()
      .sort({ position: 1 })
      .select("-position")
      .then((categories) => res.json(categories))
      .catch((err) => res.status(400).json(err));
  } else {
    try {
      // Verify token
      const decoded = jwt.verify(token, config.get("jwtSecret"));
      const userId = decoded.id;
      // Send categories with points if authenticated
      Category.find()
        .sort({ position: 1 })
        .select("-position")
        .then((c) => {
          const categories = JSON.parse(JSON.stringify(c));
          CategoryUser.find({ userId }).then((catUsrs) => {
            categories.map((category) => {
              const found = catUsrs.find((cu) => cu.categoryId == category._id);
              category.points = found ? found.points : 0;
            });
            res.json(categories);
          });
        })
        .catch((err) => res.status(400).json(err));
    } catch (e) {
      res.status(400).json("Token is not valid");
    }
  }
});

// @route GET api/categories/addPoints
// @description Adds points to CategoryUser
// @access Private
router.post("/addPoints", auth, (req, res) => {
  const token = req.header("x-auth-token");
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const userId = decoded.id;
    const { categoryId, points } = req.body;
    CategoryUser.findOne({ userId, categoryId })
      .then((catUsr) => {
        catUsr.points =
          catUsr.points + points >= 0 ? catUsr.points + points : 0;
        catUsr.save();
        res.json(catUsr);
      })
      .catch(() => {
        const catUsr = new CategoryUser({ userId, categoryId, points });
        catUsr.save();
        res.json(catUsr);
      });
  } catch {
    res.status(400).json("Token is not valid");
  }
});

// @route GET api/categories/resetPoints
// @description Resets points to CategoryUser
// @access Private
router.get("/resetPoints", auth, (req, res) => {
  const token = req.header("x-auth-token");
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const userId = decoded.id;
    CategoryUser.find({ userId }).then((catUsrs) => {
      catUsrs.map((catUsr) => {
        catUsr.points = 0;
        catUsr.save();
      });
      res.json({ success: true });
    });
  } catch {
    res.status(400).json("Token is not valid");
  }
});

module.exports = router;
