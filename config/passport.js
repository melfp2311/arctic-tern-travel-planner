const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
//User Model
const User = require("../models/user");

console.log("PASSPORT");
// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {
    console.log("HOLA");
    // When a user tries to sign in this code runs
    User.findOne(
      {
        email: email
      }).then(function(dbUser) {
      console.log(dbUser);
      console.log("USER",dbUser);
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      if (!dbUser.validPassword(password)) {
        return done(null, false, { message: "Incorrect password" })
      }
      return done(null, dbUser);
      // If there is a user with the given email, but the password the user gives us is incorrect
      /*else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }*/
      //Match Password
      /*bcrypt.compare(password,dbUser.password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          return done(null, dbUser)
        } else {
          // If none of the above, return the user
          return done(null, {message: 'Incorrect Password'});
        }
      })*/
    })
    .catch(err => console.log(err));
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Exporting our configured passport
module.exports = passport;