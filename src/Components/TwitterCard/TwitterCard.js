import React, { Component } from "react";
import "./TwitterCard.css";


export default class TwitterCard extends Component {
    render () {
        let tweettext = this.props.text;
        return (
            <div className="col-sm-4">
                <div className="twitter-card">
                    <div className="twitter-card-body"> 
                        <h3>{tweettext}</h3>
                    </div>
                </div>
            </div>
        )
    }
}

//        <img alt={props.name} src={props.image} id={props.id}
//onClick={() => props.checkForClicks(props.id)} className='checkForClicks'/>


