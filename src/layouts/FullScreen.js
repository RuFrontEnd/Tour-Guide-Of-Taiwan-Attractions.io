import React from "react";
import styled from "styled-components/macro";
import { mainColor } from "variable/variable";

const Container = styled.section`
  width: 100%;
  height: 100%;
`;

const FullScreen = (props) => {
  const { children } = props;
  return <Container>{children}</Container>;
};

export default FullScreen;
