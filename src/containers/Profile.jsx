import React, { Component } from "react";
import { SvgLoader } from "react-svgmt";
import styled from "styled-components";
import { TimelineMax } from "gsap/all";
import CSSPlugin from 'gsap/CSSPlugin';

import Header from "../components/Header";
import TopArtists from "../components/TopArtists";
import TrackList from "../components/TrackList";
import ArtistList from "../components/ArtistList";
import TopTrack from "../components/TopTrack";
import DeepDive from "../components/DeepDive";
import Charts from "../components/Charts";
import Footer from "../components/Footer";

import logo from "../assets/images/logo.svg";

const C = CSSPlugin;

const Container = styled.div`
  margin: 0 5vw 0 5vw;
  display: flex;
  flex-direction: column;
`;

const Loading = styled(SvgLoader)`
  position: absolute;
  margin: auto;
  top: 40vh;
  left: 30vw;
  width: 40vw;
  fill: #1a1a1a;
`;
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 3000);
  }
  loadingAnimation = () => {
    const tl = new TimelineMax({ repeat: -1 });
    const logo = document.querySelector(Loading);
    const circle = logo.querySelectorAll("svg>.circle");
    tl.staggerFrom(circle, 0.2, { opacity: 0, repeat: 1, yoyo: true }, 0.1);
  };
  render() {
    let { isLoading } = this.state;
    return (
      <div>
        {isLoading ? (
          <Loading path={logo} onSVGReady={this.loadingAnimation} />
        ) : (
          <div>
            <Container>
              <Header />
              <TopArtists />
              <ArtistList />
              <TopTrack />
              <TrackList />
              <DeepDive />
              <Charts />
            </Container>
            <Footer />
          </div>
        )}
      </div>
    );
  }
}
