import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import _ from "lodash";

import { fetchTracksandFeatures } from "../actions";

import Radarchart from "./charts/radarChart";
import Barchart from "./charts/barCharts";
import Timechart from "./charts/timeChart";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

class Charts extends Component {
  componentDidMount() {
    this.props.fetchTracksandFeatures();
  }
  componentWillUpdate() {
    this.findTrack();
  }
  findTrack = () => {
    const array = [];
    _.map(this.props.tracks, track => {
      const feature = _.find(
        this.props.features,
        feature => feature.id === _.get(track, "id")
      );
      if (!feature) {
        return null;
      }
      _.assign(track, feature);
      array.push(
        _.pick(track, [
          "name",
          "artists[0].name",
          "acousticness",
          "danceability",
          "energy",
          "instrumentalness",
          "liveness",
          "loudness",
          "speechiness",
          "valence",
          "duration_ms"
        ])
      );
    });
    this.array = array;
  };
  render() {
    return (
      <Wrapper>
        <Timechart array={this.array} />
        <Barchart array={this.array} />
        <Radarchart array={this.array} />
      </Wrapper>
    );
  }
}
const MapStateToProps = state => {
  return { features: state.features, tracks: state.tracks };
};

export default connect(
  MapStateToProps,
  { fetchTracksandFeatures }
)(Charts);
