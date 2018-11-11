var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var keys= require('./key');
var User= require('../modals/user-modals').User;

passport.serializeUser(function(user, done) {  //send info for cookie
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id).then((user)=> {
        done(null, user);
    });
});


passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret:keys.google.clientSecret,
    callbackURL: '/google/redirect'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ googleId: profile.id }).then((currentUser)=>{
        if(currentUser){
            console.log('User is: ', currentUser);
            done(null, currentUser);
        }else{

            new User({
                username: profile.displayName,
                googleId: profile.id
            }).save().then((newUser)=> {
                console.log('new user created: ' + newUser);
                done(null, newUser);
            });
        }
    });
  }
));