import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { SvgLoader } from "react-svgmt";
import styled from "styled-components";
import {TweenMax} from "gsap/all"

import { fetchArtists } from "../actions";

import artist from "../assets/images/artist.svg";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom:20vh;
`;
const Content = styled.h1`
  margin-bottom: 2vh;
  font-size: ${props => props.size};
  font-weight: 600;
  letter-spacing: 0.2vh;
  color: #3a3a3a;
  text-align:right;
  @media only screen and (max-width: 992px) {
    text-align:left;
  }
`;
const Header = styled.div`
margin-bottom:0vh;
`;
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  @media only screen and (max-width: 992px) {
    flex-direction: column-reverse;
  }
`;
const Band = styled(SvgLoader)`
  margin-top: -30vh;
  height: 90vh;
  z-index: -99;
`;
const Properties = styled.div`
  display: flex;
  flex-direction: column;
  height:40vh;
`;
const Colored = styled.span`
  text-decoration: underline;
  color: ${props => props.color};
`;

class TopArtists extends Component {
  componentDidMount() {
    this.props.fetchArtists();
    window.addEventListener('scroll', this.lightAnimation)
  }
  lightAnimation=(event)=>{
    const band = document.querySelector(Band);
    const axis = band.getClientRects();
    const y = axis[0].y
    const light = band.querySelectorAll("svg>polygon");
    if(y<70){
      TweenMax.to(light, 2.4, {opacity:1});
    } 
  }

  render() {
    return (
      <Wrapper>
        <Header>
          <Content size={"4em"}>
            Your #1 artist is{" "}
            <Colored color={"#FF4C4F"}>
              {_.get(this.props.artists[0], "name")}
            </Colored>
          </Content>
        </Header>
        <InnerWrapper>
          <Band path={artist} onSVGReady={this.lightAnimation}/>
          <Properties>
            <Content size={"3em"}>
              <Colored color={"#5F83FF"}>
                %{_.get(this.props.artists[0], "popularity")}
              </Colored>{" "}
              popularity
            </Content>
            <Content size={"3em"}>
              <Colored color={"#5F83FF"}>
                {_.get(this.props.artists[0], "followers.total")}
              </Colored>{" "}
              followers
            </Content>
          </Properties>
        </InnerWrapper>
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
