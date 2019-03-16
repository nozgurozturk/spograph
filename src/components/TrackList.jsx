import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTracks } from "../actions";
import FeatureList from "./FeatureList";

class TrackList extends Component {
  componentDidMount() {
    this.props.fetchTracks();
  }
  renderList() {
    return this.props.tracks.map(track => {
      return (
        <div key={track.id}>
          <div>{track.name}</div>
          <FeatureList trackID={track.id} />
        </div>
      );
    });
  }
  render() {
    console.log(this.props.tracks);
    return <div>{this.renderList()}</div>;
  }
}
const mapStateToProps = state => {
  return { tracks: state.tracks };
};

export default connect(
  mapStateToProps,
  { fetchTracks }
)(TrackList);
