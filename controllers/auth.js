var User = require('../models/user')
const passport = require('passport');
var getLogin = (req, res) => {
  //TODO: render login page
  res.render("login", {title: "Books | Library"});
};

var postLogin = (req, res,next) => {
  // TODO: authenticate using passport
  //On successful authentication, redirect to next page
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
};

var logout = (req, res) => {
  // TODO: write code to logout user and redirect back to the page
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
};

var getRegister = (req, res) => {
  // TODO: render register page
  res.render("register", {title: "Books | Library"});
};

function throwerr_or_render(req,errors,res,username,email,password,password2){
  if(errors.length){
    res.render('register',{ errors, username,email,password,password2,title: "Books | Library"})
    return;
  }
  const newUser = new User({
    username,email,password,password2
  })
  newUser.save()
    .then( user => {
      req.flash(
        'success_msg',
        'You are now registered and can log in'
      );
      res.redirect('/login')
    })
    .catch( err => {
      console.log(err);
      res.send('An unexpected error occured.');
    })
}

var postRegister = (req, res) => {
  // TODO: Register user to User db using passport
  //On successful authentication, redirect to next page
  var {username,email,password,password2} = req.body;
  let errors = []
  if(username.search(' ')!=-1)errors.push({ msg: 'Username cannot have spaces.' })
  if(password!==password2)errors.push({ msg: 'The two passwords did not matched.' })
  else if(password.length<8)errors.push({ msg: 'The password should be atleast 8 characters long' })

  User.findOne({ email: email }).then( user => {
    if(user) errors.push({msg: 'Email already registered.'})  
    throwerr_or_render(req,errors,res,username,email,password,password2);
  }).catch(err => throwerr_or_render(req,errors,res,username,email,password,password2))
};

module.exports = {
  getLogin,
  postLogin,
  logout,
  getRegister,
  postRegister,
};
