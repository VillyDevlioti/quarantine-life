  
import React from "react";
import "./Wrapper.css";

//stateless component
const Wrapper = props => 
    <div className="wrapper">
        <div className="container">
            <div className="row">
                {props.children}
            </div>
        </div>
    </div>

export default Wrapper;