import React, { Component } from "react";
import { SvgLoader } from "react-svgmt";
import { connect } from "react-redux";
import styled from "styled-components";
import _ from "lodash";

import { fetchUser } from "../actions";

import lines from "../assets/images/lines.svg";
import logo from "../assets/images/logo.svg";

const Wrapper = styled.section`
  margin-bottom: 20vh;
  display: flex;
  flex-direction: column;
`;
const Logo = styled(SvgLoader)`
  margin-top: 8vh;
  width:200px;
  fill: #1a1a1a;
`;
const User = styled.h1`
  font-size: 4em;
  font-weight: 600;
  letter-spacing: 0.2vh;
  color: #3a3a3a;
  margin-bottom:0;
`;
const Colored = styled.span`
  color: #ff3b7c;
`;
const Paragraph = styled.p`
  font-size: 2em;
  font-weight: 600;
  letter-spacing: 0.2vh;
  color: #3a3a3a;
  width:50vw;
`;
const Image = styled.div`

`;
const Lines = styled(SvgLoader)`
  width: 105vw;
  margin-top:-30vh;
  margin-left: -5vw;
`;

class Header extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  renderUserName() {
    const displayName = _.get(this.props.user, "display_name");
    const id = _.get(this.props.user, "id");
    if (displayName !== null) {
      return <Colored>{displayName}</Colored>;
    } else {
      return <Colored>{id}</Colored>;
    }
  }
  render() {
    return (
      <Wrapper>
        <Logo path={logo} />
        <User>Hello, {this.renderUserName()}</User>
        <Paragraph>
          This is your musical taste based on listening music on Spotify.
        </Paragraph>
        <Image>
          <Lines path={lines} />
        </Image>
      </Wrapper>
    );
  }
}
const mapStateToProps = state => {
  return { user: state.user };
};
export default connect(
  mapStateToProps,
  { fetchUser }
)(Header);
