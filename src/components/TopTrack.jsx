import React, { Component } from "react";
import { SvgLoader } from "react-svgmt";
import { connect } from "react-redux";
import styled from "styled-components";
import _ from "lodash";

import { fetchTracks } from "../actions";

import track from "../assets/images/Cover.svg";

const Wrapper = styled.section`
  height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;
const SecondWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Track = styled(SvgLoader)`
  position: absolute;
  width: 25vw;
  z-index: -99;
`;
const Content = styled.h1`
  font-size: ${props => props.size};
  font-weight: 600;
  letter-spacing: 0.2vh;
  color: #3a3a3a;
`;

const Properties = styled.h1`
  display: flex;
  flex-direction: column;
`;
const Props = styled.span`
  text-decoration: underline;
  color: ${props => props.color};
`;

class TopTrack extends Component {
  componentDidMount() {
    this.props.fetchTracks();
  }

  render() {
    return (
      <Wrapper>
        <SecondWrapper>
          <Content size={"4em"}>
            Your #1 track is{" "}
            <Props color={"#FF4C4F"}>
         
              {_.get(this.props.tracks[0], "name")}
            </Props>
          </Content>
          <Track path={track} />
        </SecondWrapper>
        <Properties>
          <Content size={"2em"}>
            by{" "}
            <Props color={"#5F83FF"}>
              {_.get(this.props.tracks[0], "artists[0].name")}
            </Props>
          </Content>
          <Content size={"2em"}>
            <Props color={"#5F83FF"}>
              {Math.floor(_.get(this.props.tracks[0], "duration_ms")*0.001)}
            </Props>{" "}
            seconds
          </Content>
        </Properties>
      </Wrapper>
    );
  }
}
const mapStateToProps = state => {
  return { tracks: state.tracks };
};
export default connect(
  mapStateToProps,
  { fetchTracks }
)(TopTrack);
