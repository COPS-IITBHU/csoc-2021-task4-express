const express = require("express");
const app = express();
const passport = require('passport')
const User = require('../models/user')

var getLogin = (req, res) => {
  //TODO: render login page
  res.render('login')
};

var postLogin = (req, res) => {
  // TODO: authenticate using passport
  //On successful authentication, redirect to next page
  passport.authenticate('local', {
    sucessRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
};

var logout = (req, res) => {
  // TODO: write code to logout user and redirect back to the page
  req.logOut()
  res.redirect('/login')
};

var getRegister = (req, res) => {
  // TODO: render register page
  res.render('register')
};

var postRegister = (req, res) => {
  // TODO: Register user to User db using passport
  //On successful authentication, redirect to next page
 // user.register(new user({username: req.body.username}), req.body.password, res.redirect('/login'))

 const {username, password} = req.body;
 let err = [];

 if(!username || !password){
   err.push({msg: "Fill all Feilds"});
 }
 if( err.length>0){
   res.render("register", { err });
 } else
 {
   User.findOne({ username: username}).then((user) =>{
     if(user){
       err.push({ msg: "This username is already registered"});
       res.render("login",{ err });
     } else{
      const newUser = new User({
        username,
        password
      });
      newUser
      .save()
      .then((user) => {
        console.log(user);
        res.redirect("/login");
      })
      .catch(err => console.log(err)) ;
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
