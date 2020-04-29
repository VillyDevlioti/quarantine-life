import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Header from "./Components/Header/Header";
import TwitterCard from "./Components/TwitterCard/TwitterCard";
import Wrapper from "./Components/Wrapper/Wrapper";
import axios from 'axios';

class App extends Component {
  constructor(props)
  super(props);
  state = {
    text: '',
    username: '',
    profileImage: '',
    screenName: '',
    tweetURL: ''
  };
}
  
  componentDidMount() {
    this.callTwitterApi()
      .then(res => {
        console.log ("response",res)
        //this.setState({ response: res})
      })
      .catch(err => console.log(err));
  }
  
  callTwitterApi = async () => {
    axios.get('/api/tweets')
      .then(res => {
        let tweets = res.data;
        this.setState({ 
          tweets
        });
        
      })
      console.log("state response", this.state);
  }

  render() {
    return (
      <div>
        <Wrapper>
            <Header />
            <TwitterCard />
        </Wrapper>
      </div>
    )
  }
}

export default App;