import React, { Component } from "react";
import "./TwitterCard.css";


export default class TwitterCard extends Component {
    render () {
        let tweetText = this.props.text;
        let screenName = this.props.screenName;
        let profileImg = this.props.image;
        let imageAlt = this.props.alt;
        return (
            <div className="col-sm-6">
                <div className="twitter-card">
                    <div className="twitter-card-body"> 
                        <img src= {profileImg} alt={imageAlt} />
                        <p>{screenName}</p>
                        <h4>{tweetText}</h4>
                    </div>
                </div>
            </div>
        )
    }
}


