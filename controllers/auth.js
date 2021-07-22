const passport = require('passport');
const User = require('../models/user');

var getLogin = (req, res) => {
  //TODO: render login page
  res.render('login',{title:'Login',error_message:req.query.message})
};

//  (req, res) => {
  // TODO: authenticate using passport
  //On successful authentication, redirect to next page
  var postLogin = passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : '/login?message=Invalid+Username+or+Password'
  });


var logout = (req, res) => {
  // TODO: write code to logout user and redirect back to the page
  req.logout();
  res.redirect('/');
};

var getRegister = (req, res) => {
  // TODO: render register page
  res.render('register',{title:'Register'});
};

var postRegister = (req, res) => {
  // TODO: Register user to User db using passport
  //On successful authentication, redirect to next page
  try {
  if(!req.body.password || !req.body.username || !req.body.confirmPassword) {
    res.render('register',{title:'Register',error_message:'Please enter all fields'});
    return;
  }
  if (req.body.password != req.body.confirmPassword){
    res.render('register',{title:'Register',error_message:'Password and Confirm Password are not same!'});
    return;
  }
  let newUser = new User({username: req.body.username});
  User.register(newUser,req.body.password,(err,user)=>{
    if (err) {
      res.render('register',{title:'Register',error_message:err.message});
      return;
    }
    console.log(user);
    passport.authenticate('local',{successRedirect:'/',failureRedirect:'/login?message=Authentication+Failed'})(req,res);
  })
  } catch{
    res.render('register',{title:'Register',error_message:'Something went wrong. Please try again later'});
  }
};

module.exports = {
  getLogin,
  postLogin,
  logout,
  getRegister,
  postRegister,
};
