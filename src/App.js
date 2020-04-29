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
    this.callTwitterApi()
      .then(res => {
        //console.log ("response",res)
        this.setState({res})
      })
      .catch(err => console.log(err));
  }
  
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