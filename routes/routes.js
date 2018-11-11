var router = require('express').Router();
var passport = require('passport');
var Posts= require('../modals/user-modals').Posts;
var bodyParser= require('body-parser');

var urlep= bodyParser.urlencoded({extended: false});


var authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    Posts.find({}, function(err, data){
		if(err) throw err;
        res.render('home', {user: req.user, posts:data});
	});
    
});

router.post('/', urlep, (req, res)=> {

    console.log(req.body);
    new Posts({username: req.body.username, post: req.body.post}).save(function(err,data){
		if(err) throw err;
		res.redirect('/');
	});   
});

router.get('/login', (req, res) => {
   
    res.render('login', { user: req.user });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req,res) => {
    res.redirect('/');
    //console.log(req);
});

module.exports = router;