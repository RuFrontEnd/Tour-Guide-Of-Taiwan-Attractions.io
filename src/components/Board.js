import React from "react";
import styled from "styled-components/macro";
import { __0D0B0C__, __FF1D6C__ } from "variable/variable";

const Board = (props) => {
  const { style, className, children, onClick, dataValue } = props;
  return (
    <Box
      style={style}
      className={className}
      onClick={onClick}
      data-value={dataValue}
    >
      {children}
    </Box>
  );
};

const Box = styled.section`
  background-color: white;
  box-sizing: border-box;
  cursor: pointer;
  box-shadow: 0px 4px 3px 0px ${__0D0B0C__(0.2)};
  transition: 0.1s;

  /* &:hover {
    box-shadow: 0px 4px 6px 3px ${__0D0B0C__(0.2)};
    transition: 0.1s;
    outline: 1px solid ${__FF1D6C__()};
  } */
`;

export default Board;
