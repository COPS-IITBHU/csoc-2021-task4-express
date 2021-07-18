const User = require("../models/user")
const passport = require("passport");

var getLogin = (req, res) => {

  res.render('login',{title:'Login'}); 
  //TODO: render login page
};

var postLogin = (req, res) => {
  console.log(req.body);
  // TODO: authenticate using passport
  //On successful authentication, redirect to next page
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
      res.redirect("/login");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/books");
      });
    }
  });
};

var logout = (req, res) => {
  // TODO: write code to logout user and redirect back to the page
  req.logout();
  res.redirect("/");
};

var getRegister = (req, res) => {
  res.render('register',{title:'Register'}); 
  // TODO: render register page
};

var postRegister = (req, res) => {
  console.log(req.body);
  // TODO: Register user to User db using passport
  //On successful authentication, redirect to next page

  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/books");
      });
    }
  });
};

module.exports = {
  getLogin,
  postLogin,
  logout,
  getRegister,
  postRegister,
};
