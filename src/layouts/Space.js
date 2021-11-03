import React from "react";
import styled from "styled-components/macro";

const Space = (props) => {
  const { children, style, full } = props;
  return (
    <Box full={full} style={style}>
      {children}
    </Box>
  );
};

const Box = styled.section`
  padding: ${(props) => (props.full ? "0px" : "0px 108px")};
`;

export default Space;
