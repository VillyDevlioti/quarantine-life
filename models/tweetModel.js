var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

//variable to keep tweet data
var TweetSchema = new Schema ({
    text: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    screenName: {
        type: String,
        required: true
    },
    tweetURL: {
        type: String,
        required: true
    }
})

var TweetData = mongoose.model("TweetData", TweetSchema);

module.exports = TweetData;