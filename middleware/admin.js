const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

// Checks if user is admin
function admin(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) {
    return res.status(401).json("No token, action denied");
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const userId = decoded["id"];

    User.findOne({ _id: userId }).then((user) => {
      if (user.role === "admin") {
        req.user = decoded;
        next();
      } else res.status(401).json("Unauthorized action");
    });
  } catch (e) {
    res.status(400).json("Token is not valid");
  }
}

module.exports = admin;
