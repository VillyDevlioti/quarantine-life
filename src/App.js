import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Header from "./Components/Header/Header";

/*
import ElectionHome from "./components/ElectionHome/ElectionHome";
import Quiz from "./components/Quiz/Quiz";
import Login from "./components/Login/Login";
import Mainpage from "./components/Mainpage/Mainpage";
import Signup from "./components/Signup/Signup";
import pageData from "./pageData"; */

class App extends Component {
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
      <Header />
      
    )}}

export default App;