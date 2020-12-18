const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

// Middeware
app.use(express.json()); // body parsing

// Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.use("/api/categories", require("./routes/api/categories"));

const connectionString = config.get("mongoURI");
// MongoDB connection
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    module.exports = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "images",
    });
    app.use("/api/images", require("./routes/api/images"));
    app.use("/api/posts", require("./routes/api/posts"));

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

// // Production
// if (process.env.NODE_ENV === "production") {
//   // Static folder
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

// Server listening port
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
