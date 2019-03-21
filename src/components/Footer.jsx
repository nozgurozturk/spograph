import React, { Component } from "react";
import { SvgLoader } from "react-svgmt";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  background-color: #1a1a1a;
  height: 10vh;
  justify-content:space-between;
`;
const A = styled.a`
    margin:auto 5vw;
  font-weight: 400;
  color: #fafafa;
  text-decoration: none;
`;
const P = styled.p`
margin:auto 5vw;
  font-weight: 400;
  color: #fafafa;
`;
export default class Footer extends Component {
  render() {
    return (
      <Wrapper>
        <A href="https://www.nozgurozturk.com" target="blank">
          N.Ozgur Ozturk
        </A>
        <P>All data is provided by Spotify Web Api</P>
      </Wrapper>
    );
  }
}
