const multer = require("multer");
const config = require("config");
const GridFsStorage = require("multer-gridfs-storage");
const path = require("path");
const crypto = require("crypto");

// Sets up storage for Multer to upload files
// https://www.npmjs.com/package/multer-gridfs-storage#file
const connectionString = config.get("mongoURI");
const storage = new GridFsStorage({
  url: connectionString,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        const fileInfo = {
          filename: buf.toString("hex") + path.extname(file.originalname),
          bucketName: "images",
        };
        resolve(fileInfo);
      });
    });
  },
});

const fileFilter = (req, file, cb) => {
  // checking if file type is jpg or png
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    return cb(null, true);
  } else return cb(new Error("Invalid file type"), false);
};

const upload = (req, res, next) => {
  multer({
    storage,
    limits: {
      fileSize: 1024 * 1024 * 1, // limits file size to 1MB
    },
    fileFilter, // limits file to be png or jpeg
  }).single("image")(req, res, (err) => {
    // checking if error occured
    if (err && err.message) {
      res.status(400).json(err.message);
    } else next();
  });
};

module.exports = upload;
