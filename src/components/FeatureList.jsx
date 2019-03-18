import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import _ from "lodash";

import { fetchTracksandFeatures } from "../actions";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const TopTracks = styled.h2`
  margin-top: 0;
  margin-bottom: 4vh;
  font-weight: 800;
  letter-spacing: 0.1vh;
  color: #3a3a3a;
  text-align: left;
`;

const TrackName = styled.span`
  text-decoration: underline;
  color: ${props => props.color};
`;

class FeatureList extends Component {
  componentDidMount() {
    this.props.fetchTracksandFeatures();
  }
  findTrack = () => {
    const array = [];
    this.props.tracks.map(track => {
      const feature = _.find(
        this.props.features,
        feature => feature.id === _.get(track, "id")
      );
      if (!feature) {
        return null;
      }
      _.assign(track, feature);
      array.push(track);
    });
    this.array = array;
  };
  sortList = a => {
    return _.head(_.reverse(_.sortBy(this.array, a)));
  };
  renderList = () => {
    const colorArray = [
      "#FF4C4F",
      "#FF4F89",
      "#FF52C2",
      "#FF55F8",
      "#9D5AFF",
      "#6C5DFF",
      "#5F83FF",
      "#65E8FF",
      "#67FFE6"
    ];
    const ftrList = [
      "acousticness",
      "danceability",
      "energy",
      "instrumentalness",
      "liveness",
      "loudness",
      "speechiness",
      "valence"
    ];
    const pharese = [
      "Most Acoustic Track",
      "Most Suitable Track for Dancing",
      "Most Energetic Track",
      "Most Instrumental Track",
      "Most Performed Live Track",
      "Most Quite Track",
      "Most Loquacious Track",
      "Most Happy Track"
    ];
    this.findTrack();
    return ftrList.map((ftr, i) => {
      const randomColor =
        colorArray[Math.floor(Math.random() * colorArray.length)];
      return (
       
          <TopTracks key={i}>
            {pharese[i]}{" "}
            <a href={_.get(this.sortList(ftr), "uri")}>
              <TrackName color={randomColor}>{_.get(this.sortList(ftr), "name")}</TrackName>
            </a>
            {/* <span> by {_.get(this.sortList(ftr), "artists[0].name")}</span> */}
          </TopTracks>
        
      );
    });
  };
  render() {
    return <Wrapper>{this.renderList()}</Wrapper>;
  }
}
const MapStateToProps = state => {
  return { features: state.features, tracks: state.tracks };
};

export default connect(
  MapStateToProps,
  { fetchTracksandFeatures }
)(FeatureList);
