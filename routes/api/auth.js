const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const router = express.Router();

const User = require("../../model/User");

// @route POST api/auth
// @description Login
// @access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password)
    return res.status(400).json("Please enter all fields");

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json("User does not exist");

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json("Invalid credentials");

      // jwt - payload, secret, options
      jwt.sign(
        { id: user.id, role: user.role },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// @route GET api/auth/user
// @description user info
// @access Private

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
