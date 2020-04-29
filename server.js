var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
require('dotenv').config();
var Twitter = require('twitter');
var tweetData = require("./models/TweetModel.js");

//initializing Twitter client with .env variables
var client = new Twitter({
    consumer_key: process.env.REACT_APP_TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.REACT_APP_TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.REACT_APP_TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.REACT_APP_TWITTER_ACCESS_TOKEN_SECRET
  });

//create a tweetData instance to store all the new tweets that come from the datastream 
var buffer = new tweetData;

// Initialize Express
var app = express();
var PORT = process.env.PORT || process.env.REACT_APP_PORT;

// Middleware
// Morgan logger logs requests
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//Connect to mongo
var mongoDB = process.env.REACT_APP_MONGODB_LOCAL;
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

//create a stream with tweets by hitting the Twitter API
client.stream('statuses/filter', {track: '#QuarantineLife'}, function(stream) {
    stream.on('data', function(event) {
        console.log(event);
        buffer = {
            text: event.text,
            username: event.user.name,
            profileImage: event.user.profile_image_url_https,
            screenName: event.user.screen_name,
            tweetURL: "https://twitter.com/"+event.user.screen_name+"/status/"+event.id_str 
        }
        console.log("buffer",buffer);

        //now write to the DB
        tweetData.create(buffer, (err, found) => err ? console.log(err) : console.log(found))

        //next steps
        //we want to keep the database short and sweet, so we gotta sort by timestamp
        //and remove the oldest one
    });
    stream.on('error', function(error) {
        throw error;
    });
})

app.get('/api/tweets', function (req, res) {
    res.send(buffer);
});

//Listen to the node server
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
});
