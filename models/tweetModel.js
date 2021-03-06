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
    },
    timestamp: {
        type: Date, 
        required: true
    }
 }, 
 //a capped collection so that it doesn't expand to eternity!
 {
     capped: 
    { 
        size: 10240000, 
        max: 5, 
        autoIndexId: true 
    } 
});

var TweetData = mongoose.model("TweetData", TweetSchema);

module.exports = TweetData;