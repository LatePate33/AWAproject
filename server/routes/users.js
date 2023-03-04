var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js")
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Not used, get all users after validation and send them to client
router.get('/list', validateToken, (req, res, next) => {
  User.find({})
    .then(users => {
      console.log(users)
      res.json(users);
    })
    .catch(error => {
      console.log(error.message)
    })
});

// Not used, console.log all users and send ok back to client
router.get('/listx', (req, res) => {
  console.log(mongoose.connection.readyState); // check connection status (1-4) // 1 = connected
  User.find({})
    .then(users => {
      console.log(users)
      res.json({ status: "ok" })
    })
    .catch(error => {
      console.log(error.message)
    })
});

// Login 
router.post('/login',
  upload.none(),
  (req, res, next) => {
    console.log(req.body);

    User.findOne({ username: req.body.username }) // check if username exists
      .then(user => {
        if (!user) { // if user doesn't exist
          return res.status(403).json({ message: "Login failed :(" });
        } else {
          bcrypt.compare(req.body.password, user.password, function (err, isMatch) { // check if password is correct
            if (isMatch) {
              const jwtPayload = {
                id: user._id,
                username: user.username
              }
              console.log(process.env.SECRET)
              jwt.sign(
                jwtPayload,
                process.env.SECRET,
                {
                  expiresIn: '2h'
                },
                function (err, token) {
                  console.log(err)
                  res.cookie('token', token, { httpOnly: true }); // send token as a cookie to client, could have used the "authorization" headers
                  res.json({ success: true, token }); // relic from week13 base
                }
              );
            } else {
              return res.status(403).json({ message: "Login failed :(" }); // if user is correct but password is not
            }
          })
        }

      })
      .catch(err => {
        console.log(err.message);

      })

  });

// Not used, test
router.get('/register', (req, res, next) => {
  console.log("Just checking");
  res.json({ status: "Just checking" })
});

// Register
router.post('/register',
  body("username").isLength({ min: 3 }).trim().escape(), // check username is atleast 3 characters
  body("password").isLength({ min: 5 }), // check password is atleast 5 characters
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ username: "Username or password not valid" });
    }
    User.findOne({ username: req.body.username }) // check if username is taken
      .then(user => {
        if (user) {
          return res.status(403).json({ username: "Username already in use" });
        } else {
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
              console.log(hash)
              User.create(
                {
                  username: req.body.username,
                  password: hash
                }
              );
            });
          });
          return res.json({ username: "Success" });
        }
      })
      .catch(err => {
        console.log(err.message);
      })
  });


module.exports = router;
