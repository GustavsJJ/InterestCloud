const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const upload = require("../../middleware/upload");
const bucket = require("../../server");

router.get("/", (req, res) => {
  bucket.find().toArray((err, files) => {
    if (!files || files.length === 0)
      return res.status(404).json("No files exist");
    return res.json(files);
  });
});

router.post("/", upload.single("image"), (req, res) => {
  res.json({ file: req.file });
});

router.delete("/:id", (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  bucket.delete(id, () => {
    res.json({ success: true });
  });
});

router.get("/:id", (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  bucket.find({ _id: id }).toArray((err, files) => {
    if (!files) return res.status(404).json("No such file exist");
    return res.json(files[0]);
  });
});

router.get("/render/:id", (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  bucket.find({ _id: id }).toArray((err, files) => {
    const file = files[0];
    if (!file) return res.status(404).json("No such file exist");
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      const readStream = bucket.openDownloadStreamByName(file.filename);
      readStream.pipe(res);
    } else res.status("404").json("Not an image");
  });
});

module.exports = router;