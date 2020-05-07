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
    //if the same _id is found, that means that there is no new tweet in the pipeline
    let item = this.state.tweets.filter(item=>item._id.includes(res._id));
    console.log(item);
    if (item.length)
    {    
      console.log("no new tweets");
    }
    else {
      this.state.tweets.unshift(res);
      this.setState({
        isLoading: false,
        count: this.state.count+1
    });
    }
  }

  async componentDidMount() {
    //Initializing stuff
    this.callTwitterApi();
    //we gonna be calling the api every x seconds... for now
    //ok not ideal, BUT it's after midnight and I can't be setting up a replica set on
    //mongo right now, maybe later... let me put it on the README file
    this.interval = setInterval(() => {
        this.callTwitterApi();
    }, 2000); 
  }

  //this is our connection to the back end!
  callTwitterApi = async () => {
    await axios.get('/api/tweets')
      .then(res => {
          console.log("res.data", res.data);
          //pipeline length control
          if (this.state.count === 5){ 
            this.clearTweets();
          }
          //checking if the tweet is new
          this.checkIfNew(res.data);
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
      alt={body.username} url={body.tweetURL} key={body.id}/>
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