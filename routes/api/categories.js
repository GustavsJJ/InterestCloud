const express = require("express");
const router = express.Router();

const Category = require("../../model/Category");

// @route GET api/categories
// @description Get all Posts
// @access Public
router.get("/", (req, res) => {
  Category.find()
    .sort({ position: 1 })
    .select("-position")
    .then((categories) => res.json(categories))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
