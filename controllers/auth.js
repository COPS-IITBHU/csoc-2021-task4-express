
const User = require("../models/user");
const passport = require('passport');



var getLogin = (req, res) => {
  //TODO: render login page
  res.render("login")
};

var postLogin = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return res.render("login");
      }
  
      if (!user) {
        return res.render("login");
      }
  
      req.login(user, (error) => {
        if (error) {
          return res.render("login");
        }
        return res.redirect("/");   
      })
    })(req,res, next);
};


var logout = (req, res) => {
  // TODO: write code to logout user and redirect back to the page
  req.logout(); 
  res.redirect('/');
};

var getRegister = (req, res) => {
  // TODO: render register page
  res.render("register")
  
};

var postRegister = (req, res) => {
  const {username,name, password} = req.body;
  const user = new User();

  user.username = username;
  user.name=name;

  User.register(user, password, (error, user) => {
    if (error) {
     return res.render('register');
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
