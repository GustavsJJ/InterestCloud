const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../../model/User");
const PostUser = require("../../model/PostUser");
const CategoryUser = require("../../model/CategoryUser");

// @route POST api/users
// @description Create an user
// @access Private
router.post("/", (req, res) => {
  const { name, surname, email, password } = req.body;

  // Validation
  if (!name || !surname || !email || !password)
    return res.status(400).json("Please enter all fields");
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(emailRegex)) {
    return res.status(400).json("Please enter a valid email address");
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json(`User: '${email}' already exists`);
    const newUser = new User({
      name,
      surname,
      email,
      password,
    });
    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          // jwt - payload, secret, options
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  surname: user.surname,
                  email: user.email,
                  role: user.role,
                },
              });
            }
          );
        });
      });
    });
  });
});

// @route GET api/users/deleteSelf
// @description Deletes user by userId
// @access Private
router.get("/deleteSelf", (req, res) => {
  const token = req.header("x-auth-token");
  const userId = getUserIdFromToken(token).userId;

  PostUser.findOneAndDelete({ userId }).then(() => {
    CategoryUser.findOneAndDelete({ userId }).then(() => {
      User.findByIdAndDelete(userId).then(() => {
        res.json({ success: true });
      });
    });
  });
});

const getUserIdFromToken = (token) => {
  if (!token) return { status: 401, msg: "No token" };
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const userId = decoded.id;
    return { userId };
  } catch (e) {
    return { status: 400, msg: "Token is not valid" };
  }
};

module.exports = router;
