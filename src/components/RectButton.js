import React from "react";
import styled from "styled-components/macro";
import { __FFF__, __FF1D6C__ } from "variable/variable";

const RectButton = (props) => {
  const {
    className,
    style,
    children = "方形按鈕",
    onClick = () => {},
    dataId,
  } = props;
  return (
    <Box style={style} className={className} onClick={onClick} data-id={dataId}>
      {children}
    </Box>
  );
};

const Box = styled.button`
  cursor: pointer;
  width: 120px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid ${__FF1D6C__()};
  color: ${__FF1D6C__()};
  transition: 0.2s;

  &:hover {
    background-color: ${__FF1D6C__()};
    color: ${__FFF__()};
  }
`;

export default RectButton;
