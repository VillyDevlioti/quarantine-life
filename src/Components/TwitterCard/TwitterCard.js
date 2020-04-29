import React from "react";
import "./TwitterCard.css";


const TwitterCard = props => (
    <div className="col-sm-4">
        <div className="card">
            <div className="card-body">
                <h1>card 1</h1>
            </div>
        </div>
    </div>
);

export default TwitterCard;

//        <img alt={props.name} src={props.image} id={props.id}
//onClick={() => props.checkForClicks(props.id)} className='checkForClicks'/>