import React, { Component } from "react";
import "./TwitterCard.css";


export default class TwitterCard extends Component {
    render () {
        let tweetText = this.props.text;
        let screenName = this.props.screenName;
        let profileImg = this.props.image;
        let imageAlt = this.props.alt;
        let url = this.props.url;
        return (
            <div className="col-sm-6">
                <div className="twitter-card">
                    <div className="twitter-card-body"> 
                        <img src= {profileImg} alt={imageAlt} />
                        <p>{screenName}</p>
                        <h4>{tweetText}</h4>
                        <br />
                        <a href={url} target="_blank"><p>Link to tweet</p></a>
                    </div>
                </div>
            </div>
        )
    }
}


