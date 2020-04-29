var express = require("express");
var logger = require("morgan");
//var mongoose = require("mongoose");
require('dotenv').config();
var Twitter = require('twitter');
var tweetData = require("./models/tweetModel.js");

var PORT = process.env.PORT || process.env.REACT_APP_PORT;
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
  
//put the data on the front end
app.get("/api/tweets", function (req, res) {
    console.log(req);
    //create a stream with tweets by hitting the Twitter API
    client.stream('statuses/filter', {track: '#QuarantineLife'}, function(stream) {
        stream.on('data', function(event) {
            tweetData = {
                text: event.text,
                username: event.user.name,
                profileImage: event.user.profile_image_url_https,
                screenName: event.user.screen_name,
                tweetURL: "https://twitter.com/"+event.user.screen_name+"/status/"+event.id_str
            }   
            JSON.stringify(tweetData);
            console.log(tweetData);
        });
        stream.on('error', function(error) {
            throw error;
        });
    });
    
    const tweets = tweetData;
    console.log(tweets);
    res.send(tweets);
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT);
});
