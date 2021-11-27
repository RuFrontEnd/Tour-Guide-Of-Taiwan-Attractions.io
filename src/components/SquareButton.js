import React from "react";
import styled from "styled-components/macro";
import { __0D0B0C__ } from "variable/variable";

const SquareButton = (props) => {
  const { className, style, children, onClick } = props;
  return (
    <Box style={style} className={className} onClick={onClick}>
      {children}
    </Box>
  );
};

const Box = styled.button`
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  box-shadow: 0px 4px 3px ${__0D0B0C__(0.3)};
`;

export default SquareButton;
