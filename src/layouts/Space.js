import React from "react";
import styled from "styled-components/macro";

const Space = (props) => {
  const { children, className,style, full } = props;
  return (
    <Box full={full} style={style} className={className}>
      {children}
    </Box>
  );
};

const Box = styled.section`
  padding: 0px 108px;
  box-sizing: border-box;
  max-width: ${(props) => (props.full ? "auto" : "1280px")};
  margin: auto;
`;

export default Space;
