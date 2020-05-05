import React, { Component } from 'react';
import Header from "./Components/Header/Header";
import TwitterCard from "./Components/TwitterCard/TwitterCard";
import Wrapper from "./Components/Wrapper/Wrapper";
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tweets: []
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
    }, 10000);
  }

  //this is our connection to the back end!
  callTwitterApi = async () => {
    axios.get('/api/tweets')
      .then(res => {
          console.log("res.data", res.data);
          this.state.tweets.push(res.data);
          console.log("tweets table", this.state.tweets);
        });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
   }

  render() {
    return (
      <div className="App">
        <Wrapper>
          <Header />
          {this.state.tweets.map((element,i) => (
            <TwitterCard text={element[i].text} username={element[i].username} image={element[i].profileImage} key={i} />
            ))
          }
          </Wrapper>
      </div>
    )
  }
}

export default App;