var express = require("express");
var app = express();
var bcrypt = require("bcryptjs");
var passport = require("passport");
var mongoose = require("mongoose");
var User = require("../models/user");

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));

var getLogin = (req, res) => {
  //TODO: render login page

  res.render("login", { title: "Login" });
};

var postLogin = (req, res, next) => {
  // TODO: authenticate using passport
  //On successful authentication, redirect to next page
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })(req, res, next);
};

var logout = (req, res) => {
  // TODO: write code to logout user and redirect back to the page
  req.logout();
  res.redirect("/login");
};

var getRegister = (req, res) => {
  res.render("register");
};

var postRegister = async (req, res, next) => {
  // TODO: Register user to User db using passport
  //On successful authentication, redirect to next page
  const { username, password, password2 } = req.body;
  let err = [];

  if (!username || !password || !password2) {
    err.push({ message: "Please fill all fields correctly" });
  }

  if (password !== password2) {
    err.push({ message: "Passwords do not match" });
  }

  if (err.length > 0) {
    res.render("register", { err });
  } else {
    User.findOne({ username: username }).then((user) => {
      if (user) {
        err.push({ message: "This username is already registered" });
        res.render("register", { err });
      } else {
        const newUser = new User({
          username,
          password,
        });
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            newUser.password = hash;

            newUser
              .save()
              .then((user) => {
                res.redirect("/login");
                console.log(user);
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};

module.exports = {
  getLogin,
  postLogin,
  logout,
  getRegister,
  postRegister,
};
