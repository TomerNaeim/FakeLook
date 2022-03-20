const express = require("express");
const passport = require('passport')
const router = express.Router();
router.use (passport.initialize())
router.use (passport.session())
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = 
"378037402068-hnpf4gt6obl7o2nvdqf3fmfoc55u34qv.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET="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"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5001/auth/google/callback",
    passReqToCallback: true,
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }));
  
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  router.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
    ));

    router.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);
router.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
  });
  
  router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
  });
  router.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
  });


  module.exports = router;