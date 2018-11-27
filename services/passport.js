const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const config = require('../config');


// Create local strategy
// use the email property in the request
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // Verify this email and password, call done with the user
  // if it is the correct email and passoword
  // otherwise call done with false
  User.findOne({ email }, (err, user) => {
    if (err) return done(err);
    if (!user) { return done(null, false); }
    // compare passwords - this is a method we created on the user model
    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(null, false);
      return done(null, user);
    })
  });
});

// setup options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'), // put the token on the authorization header
  secretOrKey: config.secret,
};

// create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // see if the user id in payload exists in database
  // if it does call done(user) with that user, otherwise call done() without a user
  User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false);
    if (user) return done(null, user);
    return done(null, false);
  });
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
