var middlewareObj = {};
//middleware object to check if logged in
middlewareObj.isLoggedIn = function (req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    return res.redirect("/login");
  } else {
    return next();
  }
};

module.exports = middlewareObj;
