var mongo = require('mongoose');
var Schema= mongo.Schema;

var userSchema= new Schema({
    username: String,
    googleId: String
});

var postSchema= new Schema({
    username: String,
    post: String
})

module.exports.User= mongo.model('clients', userSchema );
module.exports.Posts= mongo.model('posts', postSchema);

