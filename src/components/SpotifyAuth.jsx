import React, { Component } from "react";
import styled from "styled-components";
import queryString from "query-string";
import axios from "axios";

const Auth = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const LoginButton = styled.div`
  width: 150px;
  height: 30px;
  padding: 15px;
  border-radius: 30px;
  background: green;
  vertical-align: middle;
  align-self: auto;
  color: white;
`;
const SpotifyName = styled.h2`
  width: 150px;
`;
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
  getUserID = async () => {
    if (!accessToken) return;
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + accessToken }
    });
    this.setState({ user: { name: response.data.id } });
  };

  getTopTracks = async () => {
    if (!accessToken) return;
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?time_range=long_term",
      {
        headers: { Authorization: "Bearer " + accessToken }
      }
    );
    this.setState({
        tracks: response.data.items
    });
    console.log(response);
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
    setTimeout(() => {
        this.getAudioFeatures();
    }, 300);
    setTimeout(() => {
       
        const array= this.state.audioFeatures;
        let totalAcoustic = 0;
        let totalDance = 0;
        let totalEnergy = 0;
        let totalInstrument = 0;
        let totalLivenes = 0;
        let totalLoudness = 0;
        let totalSpeech = 0;
        let totalValence = 0;
        array.forEach(element => {
            totalAcoustic += element.acousticness;
            totalDance += element.danceability;
            totalEnergy += element.energy;
            totalInstrument += element.instrumentalness;
            totalLivenes += element.liveness;
            totalSpeech += element.speechiness;
            totalValence += element.valence;
        });
        console.log(totalAcoustic/array.length, totalDance/array.length, totalEnergy/array.length, totalInstrument, totalLivenes, totalLoudness, totalSpeech, totalValence)
    }, 1000);
  }
  render() {
    return (
      <Auth>
        <LoginButton
          onClick={() => {
            window.location = window.location.href.includes("localhost")
              ? "http://localhost:8888/login"
              : null;
          }}
        >
          Login Spotify
        </LoginButton>
        <SpotifyName>{this.state.user.name}</SpotifyName>
        <ul>
          {this.state.tracks.map((item, i) => (
            <li key={i}>{item.name}</li>
          ))}
        </ul>
        <ul>
          {this.state.audioFeatures.map((item, i) => (
            <li key={i}>{item.danceability}</li>
          ))}
        </ul>
      </Auth>
    );
  }
}
