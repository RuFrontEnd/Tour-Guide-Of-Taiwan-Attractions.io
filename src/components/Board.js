import React from "react";
import styled from "styled-components/macro";
import { __0D0B0C__ } from "variable/variable";

const Board = (props) => {
  const { style, className, children } = props;
  return (
    <Box style={style} className={className}>
      {children}
    </Box>
  );
};

const Box = styled.section`
  background-color: white;
  box-sizing: border-box;
  cursor: pointer;
  width: 150px;
  height: 200px;
  box-shadow:  0px 4px 3px ${__0D0B0C__(0.2)};
`;

export default Board;
