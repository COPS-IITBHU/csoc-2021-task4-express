const User = require("../models/user")
const passport = require("passport");

var getLogin = (req, res) => {

  res.render('login',{title:'Login',error:''}); 
  //TODO: render login page
};

// var postLogin = (req, res) => {
//   passport.authenticate('local', {
//     successRedirect: '/books',
//     failureRedirect: '/login',
//   })(req, res);
// };


var postLogin = (req, res ,next) => {
  passport.authenticate('local', function (err, user, info) {

    if (err) { console.log(err); }
    if (!user) { 

      return res.render('login',{title:'Login',error:info.message}); }
    req.logIn(user, function(err) {
      if (err) { console.log(err); }
      return res.redirect('/books');
    });
  })(req, res, next);
};




var logout = (req, res) => {
  // TODO: write code to logout user and redirect back to the page
  req.logout();
  res.redirect("/");
};

var getRegister = (req, res) => {
  res.render('register',{title:'Register',error:''}); 
  // TODO: render register page
};

var postRegister = (req, res) => {
  
  // TODO: Register user to User db using passport
  //On successful authentication, redirect to next page
  const {username,password} = req.body
  if(username.length==0 || password.length==0){
    res.render("register",{error:"Username or password field cannot be left empty.",title:'Register'})
  }
  else if(username.length<4){
    res.render("register",{error:"Username  must be atleast 4 characters long",title:'Register'})
    }
  else{
  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      res.render("register",{error:"User with the same username already exists ",title:'Register'})
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/books");
      });
    }
  })}
};

module.exports = {
  getLogin,
  postLogin,
  logout,
  getRegister,
  postRegister,
};
