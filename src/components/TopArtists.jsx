import React, { Component } from "react";
import { SvgLoader } from "react-svgmt";
import { connect } from "react-redux";
import styled from "styled-components";
import _ from "lodash";

import { fetchArtists } from "../actions";

import band from "../assets/images/Artist.svg";

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
const Band = styled(SvgLoader)`
  position: absolute;
  width: 50vw;
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

class TopArtists extends Component {
  componentDidMount() {
    this.props.fetchArtists();
  }

  render() {
    return (
      <Wrapper>
        <SecondWrapper>
          <Content size={"4em"}>
            Your #1 artist is{" "}
            <Props color={"#FF4C4F"}>
              {_.get(this.props.artists[0], "name")}
            </Props>
          </Content>
          <Band path={band} />
        </SecondWrapper>
        <Properties>
          <Content size={"2em"}>
            <Props color={"#5F83FF"}>
              %{_.get(this.props.artists[0], "popularity")}
            </Props>{" "}
            popularity
          </Content>
          <Content size={"2em"}>
            <Props color={"#5F83FF"}>
              {_.get(this.props.artists[0], "followers.total")}
            </Props>{" "}
            followers
          </Content>
        </Properties>
      </Wrapper>
    );
  }
}
const mapStateToProps = state => {
  return { artists: state.artists };
};
export default connect(
  mapStateToProps,
  { fetchArtists }
)(TopArtists);
