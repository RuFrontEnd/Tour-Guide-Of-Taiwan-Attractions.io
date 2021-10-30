import React from "react";
import styled from "styled-components/macro";
import { mainColor } from "variable/variable";

const Container = styled.section`
  position: relative;
  background-color: ${mainColor};
  width: 100%;
  height: 100%;
  z-index: -100;
`;

const Background = (props) => {
  const { children } = props;
  return <Container>{children}</Container>;
};

export default Background;
