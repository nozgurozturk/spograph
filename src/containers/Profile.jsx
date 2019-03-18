import React, { Component } from "react";
import { SvgLoader } from "react-svgmt";
import styled from "styled-components";

import Header from "../components/Header";
import TopArtists from "../components/TopArtists";
import TrackList from "../components/TrackList";
import ArtistList from "../components/ArtistList";
import TopTrack from "../components/TopTrack";
import DeepDive from "../components/DeepDive";


import logo from "../assets/images/logo.svg";

const Container = styled.div`
  margin: 0 5vw 0 5vw;
`;

const Logo = styled(SvgLoader)`
  margin-top: 8vh;
  height: 8vh;
  fill: #1a1a1a;
`;

export default class Profile extends Component {
  render() {
    return (
      <Container>
        <Logo path={logo} />
        <Header />
        <TopArtists />
        <ArtistList />
        <TopTrack />
        <TrackList />
        <DeepDive />
      </Container>
    );
  }
}
