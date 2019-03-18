import React, { Component } from "react";
import styled from "styled-components";
import { SvgLoader } from "react-svgmt";
import _ from "lodash";
import {TweenMax, Power2} from "gsap/all";

import FeatureList from "../components/FeatureList";

import deepDive from "../assets/images/deep-dive.svg";

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  margin-bottom: 20vh;
  justify-content:space-between;
`;
const TracksWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ImageWrapper = styled.div`
  justify-self:flex-end;

  width: 40vw;
`;
const Header = styled.h1`
  margin-top: 0;
  margin-bottom: 10vh;
  font-weight: 800;
  letter-spacing: 0.2vh;
  color: #3a3a3a;
  text-align: left;
  font-size: ${props => props.size};
  width: 50vw;
`;
const Sm = styled(SvgLoader)`
  margin-top: -40vh;
  height: 280vh;
  z-index: -99;
`;

export default class DeepDive extends Component {
  rectAnimation=()=>{
    const jb = document.querySelector(Sm)
    const rect = jb.querySelectorAll("svg>rect");
    const negative = [-1, 1]
    rect.forEach(element => {
      TweenMax.to(element,   (1,2-Math.random())*4 , {y:(negative[Math.floor(Math.random()*2)])*30+"vh",ease: Power2.easeOut, repeat:-1, yoyo:true})
    });
  }
  render() {
    return (
      <Wrapper>
        <TracksWrapper>
          <Header size={"8em"}>Let's look deeper</Header>
          <Header size={"2em"}>Your Top #20 Track’s</Header>
          <FeatureList />
        </TracksWrapper>
        <ImageWrapper>
          <Sm path={deepDive} onSVGReady={this.rectAnimation}/>
        </ImageWrapper>
      </Wrapper>
    );
  }
}
