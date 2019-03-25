import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Landing from "./containers/Landing";
import Profile from "./containers/Profile";

export default class App extends Component {
  render() {
    return (

      <Router basename="/">
      <div className="App">
        <Route exact path="/" component={Landing}/>
        <Route eact path="/profile" component={Profile} />
        <Route exact path="/profile" component={() => <Redirect to={{ pathname: '/profile' }} />}/>
      </div>
      </Router>

    );
  }
}
