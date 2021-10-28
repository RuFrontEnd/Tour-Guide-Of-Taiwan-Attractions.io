import React from "react";
import styled from "styled-components/macro";
import {
  lightReceivingColor,
  shadowColor,
  seperateBarColor,
} from "variable/variable";
import Radium from "radium";

const SeperateBar = (props) => {
  const { style } = props;
  return <Container style={style} />;
};

const ContainerStyledComponent = styled.section`
  height: 12px;
  background-color: ${seperateBarColor};
  box-shadow: 0px -2px 0px ${lightReceivingColor}, 0px 2px 12px ${shadowColor};
`;

const Container = Radium(ContainerStyledComponent);

export default SeperateBar;
