var path = require('path');
var appDir = path.dirname(require.main.filename);
var request = require('request');
var moment = require('moment');
var Tweet = require(appDir + '/app/models/tweet');
var User = require(appDir + '/app/models/user');
var unique = require('array-unique');
var inArray = require('in-array');

//var Tweet = mongoose.model('Tweet', Tweet);

var Twitter = require('twitter');

module.exports = function(app, passport, apiAuth){

	app.get('/tweet/user/:id', function(req, res){
		userId = req.params.id;
		token = req.query.token;
		tokenSecret = req.query.tokenSecret;
		
		var client = new Twitter({
			consumer_key: apiAuth.twitterAuth.consumerKey,
			consumer_secret: apiAuth.twitterAuth.consumerSecret,
			access_token_key: token,
			access_token_secret: tokenSecret
		});

		var params = {screen_name: 'nodejs'};
		client.get('statuses/home_timeline', params, function(error, tweets, response) {
		  if (!error) {
		  	tweetsIndex = [];
		  	userList = {};
		    tweets.forEach(function(tweet, index){
		    	if(moment(tweets[index].created_at).isAfter(moment().subtract(1,'days')) ){
		    		if(!(tweet.user.name in userList)){
		    			userList[tweet.user.name] = [];
		    		}
		    		userList[tweet.user.name].push(tweets[index].id_str)
		    	}
		    })
		    res.json(JSON.stringify(userList));
		  }
		});

	});

	app.delete('/tweet/:id', function(req, res){
		tweetId = req.params.id
		userId = req.body.id
		User.findOne({ 'twitter.id' : userId }, function(err, user) {
			if(err){
				return res.json({"kanker":"kanker"})
			}
			savedTweets = user.twitter.savedTweets;

			tweetIndex = savedTweets.indexOf(tweetId)
    		savedTweets.splice(tweetIndex, 1)

			User.update( {'twitter.id':userId}, {$set : {'twitter.savedTweets':savedTweets}}, function(error, truc){
				if(!error){
					return res.json({"ok":"ok"})
				}
			});
		});
		
	});
}