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
      text: [],
      username: [],
      profileImage: "",
      screenName: "",
      tweetURL: ""
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
          this.setState({
            username: res.data.username,
            profileImage: res.data.profileImage,
            screenName: res.data.screenName,
            tweetURL: res.data.tweetURL,
            id: res.data._id
          }); 
        this.state.text.push(res.data.text);
        //this.state.username.push(res.data.username);
        console.log("text", this.state.text);
        console.log("username", this.state.username);
        console.log("profileImage", this.state.profileImage);
        console.log("tweetURL", this.state.tweetURL);
        console.log("id", this.state.id);
        });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
   }

  render() {
    return (
      <div className="App">
        <Wrapper>
            <Header>
            </Header>
            {this.state.text.map((tweet,i) => (
              <TwitterCard text={tweet} username={this.state.username} image={this.state.profileImage} key={i} />
            ))}
        </Wrapper>
      </div>
    )
  }
}

export default App;