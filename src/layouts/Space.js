import Radium from "radium";
import React from "react";
import styled from "styled-components/macro";

const BoxStyledComponent = styled.section`
  padding: ${(props) => (props.full ? "0px" : "0px 108px")};
`;

const Box = Radium(BoxStyledComponent);

const Space = (props) => {
  const { children, style, full } = props;
  return (
    <Box full={full} style={style}>
      {children}
    </Box>
  );
};

export default Space;
