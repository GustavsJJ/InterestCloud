const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../../model/User");

// @route POST api/user
router.post("/", (req, res) => {
  const { name, surname, email, password } = req.body;

  // Validation
  if (!name || !surname || !email || !password)
    return res.status(400).json("Please enter all fields");

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

module.exports = router;
