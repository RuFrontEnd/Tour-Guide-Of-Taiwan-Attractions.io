import React from "react";
import styled from "styled-components/macro";
import { __FFF__ } from "variable/variable";
import Space from "layouts/Space";

const Footer = (props) => {
  const { className, style } = props;
  return (
    <Container style={style} className={className}>
      <Wrap>
        <Box>
          <Text>Taiwan Tourguide ©</Text>
          <Text>Code: Luke_Xie</Text>
          <Text>Design: KT</Text>
        </Box>
      </Wrap>
    </Container>
  );
};

const Text = styled.p`
  padding: 0px 2px;
  @media (max-width: 425px) {
    padding: 4px 2px;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 25.5px 0px;

  @media (max-width: 425px) {
    flex-direction: column;
  }
`;

const Wrap = styled(Space)``;

const Container = styled.section`
  background-color: ${__FFF__()};
`;

export default Footer;
