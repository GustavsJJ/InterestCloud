const multer = require("multer");
const config = require("config");
const GridFsStorage = require("multer-gridfs-storage");
const path = require("path");
const crypto = require("crypto");

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
const upload = multer({ storage });

module.exports = upload;
