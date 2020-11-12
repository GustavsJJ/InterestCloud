const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Item = require("../../model/Item");

// @route GET api/items
// @description Get all Items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route POST api/items
// @description Create an Item
// @access Private
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => res.json(item));
});

// @route DELETE api/items/:id
// @description Delete an Item
// @access Private
router.delete("/:id", auth, (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }))
    .catch((error) => res.status(404).json({ success: false }));
});

// @route PATCH api/items/:id
// @description Update an Item
// @access Private
router.patch("/:id", auth, (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ success: true }))
    .catch((error) => res.status(404).json({ success: false }));
});

module.exports = router;
