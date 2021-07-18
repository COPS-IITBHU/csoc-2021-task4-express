const User = require('../models/user');
const passport = require('passport');

const getLogin = (req, res) => {
  res.render("login", {title : "Login", message : ""});
};

const postLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.render("login", {title : "Login", message : "Some Error Occured, Try Again"});
    }

    if (!user) {
      return res.render("login", {title : "Login", message : "Invalid Credentials"});
    }

    req.login(user, (error) => {
      if (error) {
        return res.render("login", {title : "Login", message : "Some Error Occured, Try Again"});
      }
      return res.redirect("/");
    })
  })(req,res, next);
};

const logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

const getRegister = (req, res) => {
  res.render("register", {title : "Register", message : ""});
};

const postRegister = (req, res) => {
  const {username, password} = req.body;
  const user = new User();
  user.username = username;
  
  User.register(user, password, (error, user) => {
    if (error) {
     return res.render('register', {title : 'Register', message : "User with same username or password already exists"});
    }
    passport.authenticate("local")(req,res, () => {
      res.redirect('/');
    })
  })
};

module.exports = {
  getLogin,
  postLogin,
  logout,
  getRegister,
  postRegister,
};
