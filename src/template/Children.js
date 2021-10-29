import React from "react";
import styled from "styled-components/macro";

const Children = (props) => {
  const { className, style, children } = props;
  return (
    <Box style={style} className={className}>
      {children}
    </Box>
  );
};

const Box = styled.section``;

export default Children;
