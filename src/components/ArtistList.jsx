import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import _ from "lodash";

import { fetchArtists } from "../actions";

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom:20vh;
`;
const Artist = styled.h2`
  margin-top: 0;
  margin-right: 4vh;
  font-weight: 600;

  letter-spacing: 0.2vh;
  color: #3a3a3a;
`;
const Name = styled.span`
text-decoration:underline;
  margin-left: 2vh;
  color: ${props => props.color};
`;
const BoxContainer = styled.span`
  display: inline-flex;
  vertical-align: text-bottom;
  margin-bottom: 8px;
`;
const Box = styled.div`
  margin-right: 1vh;
  float: left;
  width: 100px;
  height: 12px;
  background-color: ${props => props.color};
`;
class ArtistList extends Component {
  componentDidMount() {
    this.props.fetchArtists();
  }
  renderList() {
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
    const array = this.props.artists;
    const arrayStartOne = _.drop(array, [1]);

    return arrayStartOne.map((artists, i) => {
      const randomColor =
        colorArray[Math.floor(Math.random() * colorArray.length)];
      return (
        <Artist key={artists.id}>
          <BoxContainer>
            <Box color={randomColor} />
          </BoxContainer>
          #{i + 2}
          <Name color={randomColor}>{artists.name}</Name>
        </Artist>
      );
    });
  }
  render() {
    return <Wrapper>{this.renderList()}</Wrapper>;
  }
}
const mapStateToProps = state => {
  return { artists: state.artists };
};

export default connect(
  mapStateToProps,
  { fetchArtists }
)(ArtistList);
