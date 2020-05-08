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
        isLoading: true,
        isNew: "",
        count: 0
    };
    this.callTwitterApi = this.callTwitterApi.bind(this);
  }

  clearTweets = () => {
    this.setState({ 
      tweets: [], //where API results are stored
      count: 0, //tracking the number of tweets so that we can control the length of the pipeline
    });
  }

  checkIfNew = (res) => {
    //looping through the object to find the element in the table that has the same _id
    let item = this.state.tweets.filter(item=>item._id.includes(res._id));
    //if the same _id is found, that means that there is no new tweet in the pipeline
    if (item.length)
    {    
      console.log("no new tweets");
    }
    else {
      this.state.tweets.unshift(res);
      this.setState({
        isLoading: false,
        isNew: "fadeInLeft", //if a tweet is new, then it needs an animation
        count: this.state.count+1
    });
    }
  }

  async componentDidMount() {
    //Initializing stuff
    this.callTwitterApi();
    //we gonna be calling the api every x seconds... for now
    this.interval = setInterval(() => {
        this.callTwitterApi();
    }, 2000); 
  }

  //this is our connection to the back end!
  callTwitterApi = async () => {
    await axios.get('https://villydevlioti.github.io/quarantine-life/api/tweets')
      .then(res => {
          //pipeline length control
          if (this.state.count === 20){ 
            this.clearTweets();
          }
          //checking if the tweet is new
          this.checkIfNew(res.data);
      })
      .catch (error => {
        this.setState({ error, isLoading: true });
      })
      this.setState({isLoading: true, isNew: ""});
  }

  componentWillUnmount() {
    clearInterval(this.interval);
   }

  render() {
    const stream = this.state.tweets.map((body,i) => (
      <TwitterCard text={body.text} image={body.profileImage} screenName={body.screenName} 
      alt={body.username} url={body.tweetURL} key={body._id} animation={this.state.isNew}/>
    ))
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