const User = require("../models/user");
const passport = require("passport");
const catchAsync = require("../utilities/catchAsync");

var getLogin = (req, res) => {
  res.render("login", { title: "Login" });
};

var postLogin = catchAsync(async (req, res, next) => {
  const redirectTo = req.session.returnTo || "/books";
  delete req.session.returnTo;
  passport.authenticate("local", function (err, user, info) {
    if (!user) {
      req.flash("error", "Invalid username or password");
      return res.redirect("/login");
    }
    req.logIn(user, function (err) {
      req.flash("success", "Logged in successfully");
      return res.redirect(redirectTo);
    });
  })(req, res, next);
});

var logout = (req, res) => {
  req.logout();
  res.redirect("/books");
};

var getRegister = (req, res) => {
  res.render("register", { title: "Register" });
};

var postRegister = catchAsync(async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err) return next(err);
      req.flash("success", "Registered successfully");
      res.redirect("/books");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
});

module.exports = {
  getLogin,
  postLogin,
  logout,
  getRegister,
  postRegister
};
