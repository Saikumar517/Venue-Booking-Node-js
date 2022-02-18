const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const venue = require("../models/venueEvent");
const User = require("../models/userModel"); // importing the user

exports.singup = (req, res, next) => {
  User.find({ email: req.body.email }) //
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          // converting the password to strings to protect the password
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            }); // if there is no user creating the new user
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                });
              }) // creating the new user
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

exports.singin = (req, res, next) => {
  User.find({ email: req.body.email }) // taking user email from user input
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            // comparing the user password by using
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.getVenues = async (req, res, next) => {
  try {
    const data = await venue //getting available venues
      .find({ customer: req.user._id })
      .populate("customer");
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};
