var middlewareObj={};

middlewareObj.isLoggedIn=function(req,res,next){
    if (!req.user) {
        return res.redirect('/login');
    }
    next();
}

module.exports=middlewareObj;