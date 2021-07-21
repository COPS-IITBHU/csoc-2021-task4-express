const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('./models/user');

module.exports = function(passport) {
    passport.use(new localStrategy(async (username, password, done) => {
   await User.findOne({
       username
     })
   .then(user => {
     if (!user) {
       return done(null, false, { err: 'This username is not registered' });
     }
    bcrypt.compare(password, user.password, (err, userMatched) => {
       if (err) throw err;
       if (userMatched) {
         return done(null, user);
       } else {
         return done(null, false, { err: 'Incorrect Password' });
       }
     });
   })
   .catch(err => {
       console.log(err);
   })
      
  }));


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
