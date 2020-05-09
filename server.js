var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
require('dotenv').config();
var Twitter = require('twitter');
var tweetData = require("./models/TweetModel.js");
const proxy = require('http-proxy-middleware')

//initializing Twitter client with .env variables
var client = new Twitter({
    consumer_key: process.env.REACT_APP_TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.REACT_APP_TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.REACT_APP_TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.REACT_APP_TWITTER_ACCESS_TOKEN_SECRET
  });

//create a tweetData instance to store all the new tweets that come from the datastream 
var buffer = new tweetData();

// Initialize Express
var app = express();
var PORT = process.env.PORT || process.env.REACT_APP_PORT;

module.exports = function(app) {
    // add other server routes to path array
    app.use(proxy(['/api' ], { target: 'http://localhost:'+process.env.PORT }));
} 

// Middleware
// Morgan logger logs requests
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//delete if it doesn't work
(process.env.NODE_ENV === "production") ? app.use(express.static("build")) : app.use(express.static("public"));

//Connect to mongo
var mongoDB = process.env.REACT_APP_MONGODB_LIVE;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

//create a stream with tweets by hitting the Twitter API, this will run all the time, independently
//in order to ensure a real time look and feel
client.stream('statuses/filter', {track: '#QuarantineLife'}, function(stream) {
    stream.on('data', function(event) {
        console.log(event.created_at);
        buffer = {
            text: event.text,
            username: event.user.name,
            profileImage: event.user.profile_image_url_https,
            screenName: event.user.screen_name,
            tweetURL: "https://twitter.com/"+event.user.screen_name+"/status/"+event.id_str,
            timestamp: new Date (event.created_at)
        }
        console.log("buffer:",buffer);

        //now write to the DB, so that we can push and add to the front end
        //note: the collection in the database is capped, in order to keep it manageable
        tweetData.create(buffer, (err, found) => err ? console.log(err) : console.log("database entry:", found))
    });
    stream.on('error', function(error) {
        throw error;
    });
})

app.get('/', function (req, res) {
    res.redirect('/api/tweets');
})

app.get('/api/tweets', function (req, res) {
   //this is where we get the data from the database and push it to the front end. 
   //we will call the DB through a simple find call
   //to scale up we will be using change streams functionalities inherent to mongodb
   //but for now calling axios on the front end every couple of seconds will do the trick!
    tweetData.findOne({}, [], { $orderby : { 'created_at' : -1 } }, function(err, post) {
        console.log(post);
        res.send(post);
    });
});

//Listen to the node server
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
});
