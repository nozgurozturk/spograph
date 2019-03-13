import React, { Component } from "react";
import queryString from "query-string";
import axios from "axios";

let parsed = queryString.parse(window.location.search);
let accessToken = parsed.access_token;

export default class SpotifyAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: ""
      },
      tracks: [],
      audioFeatures: []
    };
  }
  getTopTracks = async () => {
    const timeRange = ["long_term", "medium_term", "short_term"];
    if (!accessToken) return;
    const response = await axios.get("https://api.spotify.com/v1/me/top/tracks",{
        headers: { Authorization: "Bearer " + accessToken }
      }
      );
      console.log(response);
    this.setState({
      tracks: response.data.items
    });
  };
  getUserID = async () => {
    if (!accessToken) return;
    let response = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + accessToken }
    });
    this.setState({ user: { name: response.data.id } });
  };
  getAudioFeatures = () => {
    this.state.tracks.forEach(element => {
      const trackID = element.id;
      axios
        .get(`https://api.spotify.com/v1/audio-features/${trackID}`, {
          headers: { Authorization: "Bearer " + accessToken }
        })
        .then(response => {
          const nextTrack = this.state.audioFeatures.concat(response.data);
          this.setState({
            audioFeatures: nextTrack
          });
          console.log(response.data);
        });
    });
  };

  componentDidMount() {
    this.getUserID();
    this.getTopTracks();
    // setTimeout(() => {
    //     this.getAudioFeatures();
    // }, 300);
  }
  render() {
    
    return (
      <div>
        {/* <SpotifyName>{this.state.user.name}</SpotifyName>
        <ul>
          {this.state.tracks.map((item, i) => (
            <li key={i}>{item.name}</li>
          ))}
        </ul>
        <ul>
          {this.state.audioFeatures.map((item, i) => (
            <li key={i}>{item.danceability}</li>
          ))}
        </ul> */}
      </div>
    );
  }
}
