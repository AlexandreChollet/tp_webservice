var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    twitter          : {
        id                  : String,
        username            : String,
        displayName         : String,
        token               : String,
        tokenSecret         : String,
        profile_image_url   : String,
        savedTweets         : [String]
    }

});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);