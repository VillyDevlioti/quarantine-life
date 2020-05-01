import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header/Header";
import TwitterCard from "./Components/TwitterCard/TwitterCard";
import Wrapper from "./Components/Wrapper/Wrapper";
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      username: [],
      profileImage: [],
      screenName: [],
      tweetURL: []
    };
  }

  componentDidMount() {
    //Initializing stuff
    this.callTwitterApi();
    //we gonna be calling the api every x seconds... for now
    //ok not ideal, BUT it's after midnight and I can't be setting up a replica set on
    //mongo right now, maybe later... let me put it on the README file
    this.interval = setInterval(() => {
        this.callTwitterApi();
    }, 3000);
  }
  
  //this is our connection to the back end!
  callTwitterApi = async () => {
    axios.get('/api/tweets')
      .then(res => {
        console.log("res.data", res.data);
        this.setState(res.data);
      })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
   }

  render() {
    return (
      <div>
        <Wrapper>
            <Header>
            {/*this.state.map(elements => (
            <TwitterCard
              data-text = {elements.text} key={this.state.toString()}
            />
            ))*/}
          </Header>
        </Wrapper>
        <div>
            <p>{this.state.text}</p>;
          </div>
      </div>
    )
  }
}

export default App;