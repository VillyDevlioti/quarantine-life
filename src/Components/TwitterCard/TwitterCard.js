import React, { Component } from "react";
import "./TwitterCard.css";


export default class TwitterCard extends Component {
    render () {
        let tweettext = this.props.text;
        let username = this.props.username;
        let profileImg = this.props.image
        return (
            <div className="col-sm-6">
                <div className="twitter-card">
                    <div className="twitter-card-body"> 
                        <img src={profileImg} />
                        <p>{username}</p>
                        <h3>{tweettext}</h3>
                    </div>
                </div>
            </div>
        )
    }
}

//        <img alt={props.name} src={props.image} id={props.id}
//onClick={() => props.checkForClicks(props.id)} className='checkForClicks'/>


