import React, { Component } from "react";
import {Link} from "react-router-dom";
import { SvgLoader} from "react-svgmt";
import styled from "styled-components";

import person from "../assets/images/landing.svg";
import logo from "../assets/images/logo.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: linear-gradient(
    to right bottom,
    #65e8ff,
    #00cfff,
    #00b2ff,
    #008eff,
    #6c5dff
  );
`;
const Logo = styled(SvgLoader)`
  margin-top: 8vh;
  height: 12vh;
  fill: #f2f2f2;
`;
const Header = styled.h1`
  color: #f2f2f2;
  font-weight: 800;
  font-size: 6vh;
  text-align: center;
  margin: 4vh 0 0 0;
  padding: 0;
  z-index: 99;
`;
const Image = styled(SvgLoader)`
  margin-top: 4vh;
  height: 46vh;
  @media screen and (max-width: 768px) {
    margin-top: -4vh;
  }
`;
const LoginButton = styled.button`
  margin: 2vh 0 8vh 0;
  border: none;
  font-family: circe, sans-serif;
  font-weight: 600;
  font-size: 1.5em;
  padding: 0 5vh 0 5vh;
  color: #f2f2f2;
  height: 10vh;
  border-radius: 5vh;
  background-image: linear-gradient(
    to right,
    #ff4c4f,
    #ff2679,
    #f11ba8,
    #c63dd7,
    #6c5dff
  );
  transition: 400ms;
  &:hover {
    transition: 400ms;
    transform: translateY(-1vh) scale(1.05);
    box-shadow: 0px 4px 8px #1a1a1a;
  }
`;

export default class Landing extends Component {
  render() {
    return (
      <Wrapper>
        <Logo path={logo} />
        <Header>Visualize Your Musical Taste</Header>
        <Image path={person} />
        <Link to="/profile">
        <LoginButton
          onClick={() => {
            window.location = window.location.href.includes("localhost")
              ? "http://localhost:8888/login"
              : null;
          }}
        >
          Login with Spotify
        </LoginButton>
        </Link>
      </Wrapper>
    );
  }
}
