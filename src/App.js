import React, { Component } from "react";
import Charts from "./components/Charts";
import SpotifyAuth from "./components/SpotifyAuth";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Spograph</h2>
        <SpotifyAuth />
        <Charts />
      </div>
    );
  }
}
