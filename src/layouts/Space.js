import Radium from "radium";
import React from "react";
import styled from "styled-components/macro";

const ContainerStyledComponent = styled.section`
  padding: 0px 40px;
`;

const Container = Radium(ContainerStyledComponent);

const Space = (props) => {
  const { children, style } = props;
  return <Container style={style}>{children}</Container>;
};

export default Space;
