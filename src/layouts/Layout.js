import Radium from "radium";
import React from "react";
import styled from "styled-components/macro";

const Layout = (props) => {
  const { children, style } = props;
  return <Container style={style}>{children}</Container>;
};

const ContainerStyledComponent = styled.section`
  max-width: 910px;
  margin: auto;
`;

const Container = Radium(ContainerStyledComponent);

export default Layout;
