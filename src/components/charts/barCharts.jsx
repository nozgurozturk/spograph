import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";

import Acousticness from "./features/Acousticness";
import Danceability from "./features/Danceability";
import Energy from "./features/Energy";
import Instrumentalness from "./features/Instrumentalness";
import Liveness from "./features/Liveness";
import Loudness from "./features/Loudness";
import Speechiness from "./features/Speechiness";
import Valence from "./features/Valence";

const Wrapper = styled.div`
display:flex;
flex-direction:column;
`;

export default class Barcharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acousticness: 0,
      danceability: 0,
      enery: 0,
      instrumentalness: 0,
      liveness: 0,
      speechiness: 0,
      valance: 0
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.spreadData();
    }, 1200);

  }
  spreadData = () => {
    let a = _.map(this.props.array, o => _.pick(o, ["name", "acousticness"]));
    let d = _.map(this.props.array, o => _.pick(o, ["name", "danceability"]));
    let e = _.map(this.props.array, o => _.pick(o, ["name", "energy"]));
    let i = _.map(this.props.array, o =>
      _.pick(o, ["name", "instrumentalness"])
    );
    let l = _.map(this.props.array, o => _.pick(o, ["name", "liveness"]));
    let lo = _.map(this.props.array, o => _.pick(o, ["name", "loudness"]));
    let s = _.map(this.props.array, o => _.pick(o, ["name", "speechiness"]));
    let v = _.map(this.props.array, o => _.pick(o, ["name", "valence"]));
    this.setState({
      acousticness: a,
      danceability: d,
      energy: e,
      instrumentalness: i,
      liveness: l,
      loudness: lo,
      speechiness: s,
      valence: v
    });
  };
  render() {
    return (
      <Wrapper>
        <Acousticness acousticness={this.state.acousticness} />
        <Danceability danceability={this.state.danceability} />
        <Energy energy={this.state.energy} />
        <Instrumentalness instrumentalness={this.state.instrumentalness} />
        <Liveness liveness={this.state.liveness} />
        <Loudness loudness={this.state.loudness} />
        <Speechiness speechiness={this.state.speechiness} />
        <Valence valence={this.state.valence} />
      </Wrapper>
    );
  }
}
