import React, { Component } from "react";
import { SvgLoader } from "react-svgmt";
import { connect } from "react-redux";
import styled from "styled-components";
import _ from "lodash";

import { fetchUser } from "../actions";

const Wrapper = styled.section`
  margin-top: 15vh;
`;

const User = styled.h1`
  font-size: 2em;
  font-weight: 600;
  letter-spacing: 0.2vh;
  color: #3a3a3a;
`;
const Paragraph = styled.p`
  font-size: 2em;
  font-weight: 600;
  letter-spacing: 0.2vh;
  color: #3a3a3a;
`;

class Header extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  renderUserName() {
    const displayName = _.get(this.props.user, "display_name");
    const id = _.get(this.props.user, "id");
    if (displayName !== null) {
      return <span>{displayName}</span>;
    } else {
      return <span>{id}</span>;
    }
  }
  render() {
    return (
      <Wrapper>
        <User>Hello, {this.renderUserName()}</User>
        <Paragraph>
          This is your musical taste based on listening music on Spotify
        </Paragraph>
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
