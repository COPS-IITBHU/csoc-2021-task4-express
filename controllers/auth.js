if(process.env.NODE_ENV!=="production"){
  require('dotenv').config()
}
const db_url=process.env.DB_URI

const mongoose = require('mongoose');
var User = require("../models/user");
var passport = require("passport");
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
  })
  .catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
  })


var getLogin = (req, res) => {
  //TODO: render login page
  res.render("login", { title: "Login" });
};

var postLogin = (req, res) => {
  // TODO: authenticate using passport
  //On successful authentication, redirect to next page
  passport.authenticate("local", function (err, user, info) {
    if (!user) {

      return res.redirect("/login");
    }
    req.logIn(user, function (err) {

      return res.redirect(req.session.returnTo || "/books");
    });
  })(req, res);
};

var logout = (req, res) => {
  // TODO: write code to logout user and redirect back to the page
  req.logout();
  res.redirect("/login");
};

var getRegister = (req, res) => {
  // TODO: render register page
  res.render("register", { title: "Register" });
};

var postRegister = async (req, res) => {
  // TODO: Register user to User db using passport
  //On successful authentication, redirect to next page
  const { username, password } = req.body;

  const newuser = await User.register({ username: username, active: false }, password);
  req.logIn(newuser, function (err) {
    return res.redirect("/");
  });
};

module.exports = {
  getLogin,
  postLogin,
  logout,
  getRegister,
  postRegister
};
