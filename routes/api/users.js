const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../../model/User");
const PostUser = require("../../model/PostUser");
const CategoryUser = require("../../model/CategoryUser");
const Comment = require("../../model/Comment");

// middlewares
const auth = require("../../middleware/auth");

// @route POST api/users
// @description Create an user
// @access Private
router.post("/", (req, res) => {
  const { name, surname, email, password } = req.body;

  // Validation
  if (!name || !surname || !email || !password)
    return res.status(400).json("Please enter all fields");
  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email.match(emailRegex))
    return res.status(400).json("Please enter a valid email address");

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json(`User: '${email}' already exists`);
    const newUser = new User({
      name,
      surname,
      email,
      password,
    });
    // Create salt and hash
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
router.get("/deleteSelf", auth, (req, res) => {
  const token = req.header("x-auth-token");
  const userId = getUserIdFromToken(token).userId;

  Comment.deleteMany({ authorId: userId }).then(() => {
    PostUser.deleteMany({ userId }).then(() => {
      CategoryUser.deleteMany({ userId }).then(() => {
        User.findByIdAndDelete(userId).then(() => {
          res.json({ success: true });
        });
      });
    });
  });
});

// @route GET api/users/updateProfile
// @description Updates user profile
// @access Private
router.patch("/updateProfile", auth, (req, res) => {
  const token = req.header("x-auth-token");
  const userId = getUserIdFromToken(token).userId;
  const { name, surname, email } = req.body;
  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  // Validation
  if (!name || !surname || !email)
    return res.status(400).json("Please enter all fields");

  // Checking if address valid
  if (!email.match(emailRegex))
    return res.status(400).json("Please enter a valid email address");

  // Check if email is not duplicate
  User.findOne({ _id: { $ne: userId }, email: email }).then((u) => {
    if (u) return res.status(400).json(`Email "${email}" is already taken`);
  });

  User.findById(userId).then((user) => {
    user.name = name;
    user.surname = surname;
    user.email = email;
    user.save();

    return res.json({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
    });
  });
});

// @route GET api/users/changePassword
// @description Changes user password
// @access Private
router.patch("/changePassword", auth, (req, res) => {
  const token = req.header("x-auth-token");
  const userId = getUserIdFromToken(token).userId;
  const { oldPassword, newPassword } = req.body;

  // Validation
  if (oldPassword === newPassword)
    res.status(400).json("New password cannot be the same as the old password");

  User.findById(userId)
    .then((user) => {
      bcrypt.compare(oldPassword, user.password).then((isMatch) => {
        // if old password does not match
        if (!isMatch)
          return res.status(400).json("Old password is not correct");
        else {
          /// generate salt and hash
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, (err, hash) => {
              if (err) throw err;
              // changes password
              user.password = hash;
              user.save();
              return res.json("Password changed");
            });
          });
        }
      });
    })
    .catch((err) => {
      return res.json("User can not be found");
    });
});

// returns userId if token is valid
const getUserIdFromToken = (token) => {
  if (!token) return;
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const userId = decoded.id;
    return { userId };
  } catch (e) {
    return;
  }
};

module.exports = router;
