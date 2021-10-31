import React from "react";
import styled from "styled-components/macro";
import { __FF1D6C__ } from "variable/variable";


const RectButton = (props) => {
  const { className, style, children } = props;
  return (
    <Box style={style} className={className}>
      {children}
    </Box>
  );
};

const Box = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid ${__FF1D6C__()};
  color: ${__FF1D6C__()};
`;

export default RectButton;
