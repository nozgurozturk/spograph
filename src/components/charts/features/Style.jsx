import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  margin-bottom: 2vh;
  font-size: 2em;
  font-weight: 600;
  letter-spacing: 0.2vh;
  color: #3a3a3a;
  text-align: left;
`;
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 992px) {
    flex-direction: column-reverse;
  }
`;
const Chart = styled.div`
  width: 80vw;
  @media only screen and (max-width: 992px) {
    width:100vw;
  }
`;
const Expo = styled.p`
  letter-spacing: 0.1vh;
  font-weight: 600;
  color: #3a3a3a;
  text-align: left;
  width: 20vw;
  @media only screen and (max-width: 992px) {
    width: 100vw;
  }
`;

export { Wrapper, Title, InnerWrapper, Chart, Expo };
