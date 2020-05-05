import React, { Component } from "react";
import "./TwitterCard.css";


export default class TwitterCard extends Component {
    render () {
        let tweetText = this.props.text;
        let username = this.props.username;
        let profileImg = this.props.image;
        return (
            <div className="col-sm-6">
                <div className="twitter-card">
                    <div className="twitter-card-body"> 
                        <img src= {profileImg} />
                        <p>{username}</p>
                        <h4>{tweetText}</h4>
                    </div>
                </div>
            </div>
        )
    }
}


