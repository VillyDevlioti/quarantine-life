import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header/Header";
import TwitterCard from "./Components/TwitterCard/TwitterCard";
import Wrapper from "./Components/Wrapper/Wrapper";
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    text: [],
    username: '',
    profileImage: '',
    screenName: '',
    tweetURL: ''
  };
  
  componentDidMount() {
    //Initializing stuff
    this.callTwitterApi();
    //we gonna be calling the api every x seconds... for now
    //ok not ideal, BUT it's after midnight and I can't be setting up a replica set on
    //mongo right now, maybe later... let me put it on the README file
    this.interval = setInterval(() => {
        this.callTwitterApi();
    }, 4000);
  }
  
  //this is our connection to the back end!
  callTwitterApi = async () => {
    axios.get('/api/tweets')
      .then(res => {
        let tweetsText = this.state.text;
        console.log("res.data", res.data);
        tweetsText.push(res.data.text);
        this.setState({
          username: res.data.username,
          profileImage: res.data.profileImage,
          screenName: res.data.screenName,
          tweetURL: res.data.tweetURL
        }); 
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
            {this.state.text.map(copy => (
            <TwitterCard
              data-text = {copy} key={this.state.toString()}
            />
          ))}
          </Header>
        </Wrapper>
      </div>
    )
  }
}

export default App;