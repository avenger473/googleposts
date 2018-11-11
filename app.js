var express = require('express');
var authRoutes = require('./routes/routes');
var passportSetup = require('./config/passport-setup');
var app = express();
var mongo= require('mongoose');
var keys= require('./config/key');
var cookieSession = require('cookie-session');
var passport = require('passport');

//set view engine*********************
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}));

//initalise passport
app.use(passport.initialize());
app.use(passport.session());


//connect to mongodb
mongo.connect(keys.mongodb.dbURI, () =>{
    console.log('connected to mongodb');
});

//set static files*******************
app.use(express.static('public'));
app.use('/', authRoutes);


app.listen(3000, () => {
    console.log('Listining at 3000');
});