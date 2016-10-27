var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');

// define the schema for our tweet model
var tweetSchema = mongoose.Schema({
    tweet_id : { type : String , unique : true, dropDups: true, required: true},
});

// create the model for tweets and expose it to our app
module.exports = mongoose.model('Tweet', tweetSchema);