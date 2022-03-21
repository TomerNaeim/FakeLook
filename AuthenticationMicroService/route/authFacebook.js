const express = require("express");
const passport = require('passport')
const router = express.Router();
router.use (passport.initialize())
router.use (passport.session())
const facebookStrategy = require('passport-facebook').Strategy



passport.use(new facebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID        : "374942954259057",
    clientSecret    : "8ddab276df065d5ca2aa8b8a81330267",
    callbackURL     : "http://localhost:5001/facebook/callback"

},// facebook will send back the token and profile
function(token, refreshToken, profile, done) {

    console.log(profile)
    return done(null,profile)
}));

    router.get('/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
        passport.serializeUser(function(user, done) {
            done(null);
        });
        
        // used to deserialize the user
        passport.deserializeUser(function(id, done) {
            return done(null)
        });
        
        router.get('/profile',(req,res) => {
            res.send("you are authenticated")
        })
        
        router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email,user_photos' }));
        
        module.exports = router;