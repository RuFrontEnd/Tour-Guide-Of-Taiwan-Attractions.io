import React from "react";
import styled from "styled-components/macro";

const Children = (props) => {
  const { className, children } = props;
  return <Box className={className}>{children}</Box>;
};

const Box = styled.section``;

export default Children;
