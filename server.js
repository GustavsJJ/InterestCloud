const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");

const app = express(); // launch express application
const port = process.env.PORT || 5000; // backend port

// Middeware
app.use(express.json()); // body parser

// MongoDB connection
const connectionString = config.get("mongoURI");
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    module.exports = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "images",
    }); // exports gridfs bucket for file upload

    // Routes
    app.use("/api/images", require("./routes/api/images"));
    app.use("/api/posts", require("./routes/api/posts"));
    app.use("/api/users", require("./routes/api/users"));
    app.use("/api/auth", require("./routes/api/auth"));
    app.use("/api/categories", require("./routes/api/categories"));
    app.use("/api/comments", require("./routes/api/comments"));

    console.log("Connection to MongoDB established...");

    // Production
    if (process.env.NODE_ENV === "production") {
      // Static folder
      app.use(express.static("client/build"));
      app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
      });
    }
  })
  .catch((error) => console.log(error));

// Server listening port
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
