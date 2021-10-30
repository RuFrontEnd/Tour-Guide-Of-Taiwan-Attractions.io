import React from "react";
import styled from "styled-components/macro";
import { mainColor } from "variable/variable";

const Background = (props) => {
  const { children } = props;
  return <Box>{children}</Box>;
};

const Box = styled.section`
  position: relative;
  background-color: ${mainColor};
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export default Background;
