var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var request = require('request');
require('dotenv').config();
var Twitter = require('twitter');
//var mongoDB = "mongodb+srv://jeremygill:password123@factivismcluster-2ye5e.gcp.mongodb.net/membersdb?retryWrites=true&w=majority";

var PORT = 3001;
var client = new Twitter({
    consumer_key: process.env.REACT_APP_TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.REACT_APP_TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.REACT_APP_TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.REACT_APP_TWITTER_ACCESS_TOKEN_SECRET
  });

// Requires the User model for accessing the Users collection
//var user = require("./models/userModel.js");

// Initialize Express
var app = express();

// Middleware
// Morgan logger logs requests
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Connect to mongo
/* mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection; */

//db.on("error", console.error.bind(console, "MongoDB connection error"));

//hit the api
/* var options = {
		'method': 'GET',
		'url': 'https://api.twitter.com/1.1/statuses/user_timeline.json?q=QuarantineLife',
		'headers': {
				'Content-Type': 'application/json',
                //'Authorization': 'OAuth oauth_consumer_key="QJ2uhV9Imkz7LGb18Bi6ZIiZr",oauth_token="112385571-ZkF5QqfaramarerBnjfGBQYdrJPBbQw1n2lRsi1Y",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1587860695",oauth_nonce="3URsbkRh3bH",oauth_version="1.0",oauth_signature="W2jCtgJrua8hribDYCqmFYIBmbU%3D"'
                'Authorization': 'OAuth oauth_consumer_key="QJ2uhV9Imkz7LGb18Bi6ZIiZr",oauth_token="112385571-ZkF5QqfaramarerBnjfGBQYdrJPBbQw1n2lRsi1Y",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1587860695",oauth_nonce="3URsbkRh3bH",oauth_version="1.0",oauth_signature="W2jCtgJrua8hribDYCqmFYIBmbU%3D"'
            }
};

request(options, function (error, response) { 
		if (error) throw new Error(error);
        console.log(response.body);
        console.log(oauth_consumer_key);
}); */

client.stream('statuses/filter', {track: '#QuarantineLife'}, function(stream) {
    stream.on('data', function(event) {
      console.log(event.text);
      console.log(event.user.name);
      console.log(event.user.profile_image_url_https);
      console.log("https://twitter.com/"+event.user.screen_name+"/status/"+event.id_str);
    });
   
    stream.on('error', function(error) {
      throw error;
    });
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT);
});
