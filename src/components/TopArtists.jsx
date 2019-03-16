import React, { Component } from "react";
import { SvgLoader } from "react-svgmt";
import { connect } from "react-redux";
import styled from "styled-components";
import _ from "lodash";

import { fetchArtists } from "../actions";

class TopArtists extends Component {
  componentDidMount() {
    this.props.fetchArtists();
  }
  renderTopArtist() {
    return <h1>{_.get(this.props.artists[0], "name")}</h1>
  }
  render() {
    return <div>{this.renderTopArtist()}</div>;
  }
}
const mapStateToProps = state => {
  return { artists: state.artists };
};
export default connect(
  mapStateToProps,
  { fetchArtists }
)(TopArtists);
