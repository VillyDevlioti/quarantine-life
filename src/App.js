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
        tweets: [],
        isLoading: true
    };
    this.callTwitterApi = this.callTwitterApi.bind(this);
  }

  async componentDidMount() {
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
    await axios.get('/api/tweets')
      .then(res => {
          console.log("res.data", res.data);
          this.state.tweets.push(res.data);
          this.setState({isLoading: false});
          console.log("tweets table", this.state.tweets);
        })
        .catch (error => {
          this.setState({ error, isLoading: true });
        });
        this.setState({isLoading: true});
  }

  componentWillUnmount() {
    clearInterval(this.interval);
   }

  render() {
    const stream = this.state.tweets.map((body,i) => (
      <TwitterCard text={body.text} image={body.profileImage} screenName={body.screenName} 
      alt={body.username} url={body.tweetURL} key={i}/>))
    return (
      <div className="App">
        <Wrapper>
          <Header />
            { stream }
          </Wrapper>
      </div>
    )
  }
}

export default App;