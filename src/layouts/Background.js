import React from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";
import { mainColor } from "variable/variable";

const Background = (props) => {
  const navBarHeight = useSelector((state) => state.navBar.height) || 0;
  const { children } = props;
  return <Box navBarHeight={navBarHeight}>{children}</Box>;
};

const Box = styled.section`
  position: relative;
  top: 0;
  left: 0;
  background-color: ${mainColor};
  width: 100%;
  height: ${(props) =>
    props.navBarHeight ? `calc(100% - ${props.navBarHeight}px)` : "100%"};
  z-index: 0;
`;

export default Background;
