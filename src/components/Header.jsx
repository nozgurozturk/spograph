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
          Bacon ipsum dolor amet frankfurter shank doner fatback tongue
          leberkas, short loin ribeye pork chop capicola bacon tenderloin beef
          jerky corned beef. Shank salami doner pancetta, jowl rump chicken beef
          ribs ground round spare ribs alcatra bacon. Porchetta frankfurter
          kielbasa pork chop landjaeger. Sausage porchetta venison burgdoggen
          frankfurter, t-bone salami shankle sirloin tail. Chicken buffalo
          turkey sirloin ground round beef. Andouille jerky strip steak spare
          ribs pancetta pork pork chop ribeye prosciutto shankle porchetta
          drumstick. Jowl strip steak buffalo ham cow. Swine tri-tip salami
          chicken hamburger turkey. Pork belly prosciutto brisket chuck swine
          chicken shank cupim tri-tip jerky short ribs short loin shankle.
          Boudin bresaola t-bone, bacon kevin swine short loin prosciutto.
          Brisket jowl pancetta, corned beef landjaeger tail turducken spare
          ribs burgdoggen meatball shankle ground round venison porchetta shank.
          Chuck meatball turducken bresaola pastrami ground round strip steak
          doner beef ribs ball tip. Pastrami picanha brisket, fatback meatball
          t-bone chicken ball tip tri-tip tail tongue venison hamburger.
          Frankfurter pork belly doner filet mignon fatback boudin ball tip rump
          turkey. Beef pig bacon rump, chuck porchetta flank salami kevin
          capicola biltong t-bone beef ribs.
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
