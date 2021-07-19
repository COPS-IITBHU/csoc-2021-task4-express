var middlewareObj = {};
//middleware object to check if logged in
middlewareObj.isLoggedIn = function (req, res, next) {
    /*
    TODO: Write function to check if user is logged in.
    If user is logged in: Redirect to next page
    else, redirect to login page
    */
    if (!req.isAuthenticated()) {
        req.flash('error_msg', 'You must log in first.');
        return res.redirect("/login");
    }
    return next();
}

middlewareObj.isLoggedOut = function (req, res, next) {
    if (req.isAuthenticated()) return res.redirect("/");
    return next();
}

module.exports = middlewareObj;