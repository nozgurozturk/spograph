import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFeature } from "../actions";

class FeatureList extends Component {
  componentDidMount() {
    this.props.fetchFeature(this.props.trackID);
  }
  
  render() {
      const {feature} = this.props;
      if(!feature){
          return null;
      }

    return <div key={this.props.trackID}>{feature.acousticness} + {feature.danceability}</div>;
  }
}
const MapStateToProps = (state, ownProps) => {
  return { feature: state.features.find(feature => feature.id === ownProps.trackID) };
};

export default connect(
  MapStateToProps,
  { fetchFeature }
)(FeatureList);
