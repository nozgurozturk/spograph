import React, { Component } from "react";
import { BrowserRouter, Route} from "react-router-dom";
import Landing from "./containers/Landing";
import Profile from "./containers/Profile";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Landing}/>
        <Route path="/profile" component={Profile}/>
      </div>
      </BrowserRouter>
    );
  }
}
