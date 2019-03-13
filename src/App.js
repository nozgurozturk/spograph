import React, { Component } from "react";
import Landing from "./containers/Landing";
import SpotifyAuth from "./components/SpotifyAuth";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Landing></Landing>
        <SpotifyAuth />
      </div>
    );
  }
}
