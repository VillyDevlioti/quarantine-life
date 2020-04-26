import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Header from "./Components/Header/Header";
import TwitterCard from "./Components/TwitterCard/TwitterCard";
//import Wrapper from "./Components/Wrapper/Wrapper";
//import axios from 'axios';

class App extends Component {

  state = {
    tweets: []
  };

  retrieveTweets = tweets => {

  }
  render() {
    return (
      
/*       <Router>
        <div>
          <Switch>
            <Route exact path="/" render={() => <Mainpage pageData={pageData}/>}/>
            <Route exact path="/candidates" render={() => <Candidates pageData={pageData}/>}/>
            <Route exact path="/electionhome/:id" render={() => <ElectionHome pageData={pageData}/>}/>
            <Route exact path="/quiz" render={() => <Quiz pageData={pageData}/>}/>
            <Route exact path="/login" render={() => <Login pageData={pageData}/>}/>
            <Route exact path="/signup" render={() => <Signup pageData={pageData}/>}/>
          </Switch>
          </div>
      </Router> */
      <div>
      <Header />
      <TwitterCard />
      {console.log(process.env.REACT_APP_TWITTER_CONSUMER_KEY)}
      </div>
      
      
    )
  }
}

export default App;