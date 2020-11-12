const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();
const port = process.env.PORT || 5000;

// Middeware
app.use(express.json()); // body parsing

// Routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

const connectionString = config.get("mongoURI");
// MongoDB connection
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connection to MongoDB established..."))
  .catch((error) => console.log(error));

// Server listening port
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
