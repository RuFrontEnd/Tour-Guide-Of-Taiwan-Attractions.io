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
          <Text>
            Code:
            <Link href="https://github.com/RuFrontEnd" target="_blank"> Luke_Xie</Link>
          </Text>
          <Text>
            Design:
            <Link href="https://www.behance.net/KT_Designer" target="_blank"> KT</Link>
          </Text>
        </Box>
      </Wrap>
    </Container>
  );
};

const Link = styled.a``;

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
