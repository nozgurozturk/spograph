import React, { Component } from "react";
import { SvgLoader } from "react-svgmt";
import { connect } from "react-redux";
import styled from "styled-components";
import _ from "lodash";
import { TweenMax, Linear } from "gsap/all";

import { fetchTracks } from "../actions";

import cover from "../assets/images/cover.svg";
import lp from "../assets/images/lp.svg";

const Wrapper = styled.section`
  height: 80vh;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 10vh;
`;
const Image = styled.div`
  width: 40vw;
`;
const Cover = styled(SvgLoader)`
  position: absolute;
  width: 50vh;
  z-index: -98;
`;
const Lp = styled(SvgLoader)`
  position: absolute;
  width: 50vh;
  z-index: -99;
`;
const Track = styled.div`
  display: flex;
  flex-direction: column;
`;
const Content = styled.h1`
  margin-top: 0;
  margin-bottom: 3vh;
  font-size: ${props => props.size};
  font-weight: 600;
  letter-spacing: 0.2vh;
  color: #3a3a3a;
  text-align: right;
`;
const Colored = styled.span`
  text-decoration: underline;
  color: ${props => props.color};
`;

class TopTrack extends Component {
  componentDidMount() {
    this.props.fetchTracks();
    window.addEventListener("scroll", this.lpAnimation);
    TweenMax.to(document.querySelector(Lp), 4, {
      rotation: "360",
      ease: Linear.easeNone,
      repeat: -1
    });
  }
  lpAnimation = event => {
    const lp = document.querySelector(Lp);
    const axis = lp.getClientRects();
    const y = axis[0].y;
    if (y < 400) {
      TweenMax.to(lp, 2.4, { x: "38vh" });
    }
  };

  render() {
    return (
      <Wrapper>
        <Image>
          <Cover path={cover} />
          <Lp path={lp} />
        </Image>
        <Track>
          <Content size={"4em"}>
            Your #1 track is{" "}
            <Colored color={"#ff4c4f"}>
              {_.get(this.props.tracks[0], "name")}
            </Colored>
          </Content>
          <Content size={"3em"}>
            by{" "}
            <Colored color={"#5f83ff"}>
              {_.get(this.props.tracks[0], "artists[0].name")}
            </Colored>
          </Content>
          <Content size={"3em"}>
            <Colored color={"#5f83ff"}>
              {(Math.floor(_.get(this.props.tracks[0], "duration_ms") * 0.001)).toString()}
            </Colored>{" "}
            seconds
          </Content>
        </Track>
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
