import React, { useState } from "react";
import styled from "styled-components/macro";
import {
  __ACACAC__,
  __FF1D6C__,
  __007350__,
  __0D0B0C__,
  __FFF__,
} from "variable/variable";
import { ReactComponent as Arrow } from "assets/arrow.svg";
import SquareButton from "components/SquareButton";

const DirectButton = (props) => {
  const {
    className,
    style,
    children,
    info = {},
    onClick = () => {},
    direction = "L",
  } = props;

  return (
    <Button className={className} onClick={onClick}>
      {direction === "L" && <LeftArrowIcon />}
      {direction === "R" && <RightArrowIcon />}
      {direction === "U" && <UpArrowIcon />}
      {direction === "D" && <DownArrowIcon />}
    </Button>
  );
};

const Icon = styled(Arrow)``;

const Button = styled(SquareButton)`
  transition: 0.2s;
  &:hover {
    background-color: ${__0D0B0C__()};
    transition: 0.2s;
  }

  &:hover svg > path {
    fill: ${__FFF__()};
    transition: 0.2s;
  }
`;

const DownArrowIcon = styled(Icon)`
  transform: rotate(-90deg);
`;

const UpArrowIcon = styled(Icon)`
  transform: rotate(90deg);
`;

const RightArrowIcon = styled(Icon)`
  transform: rotate(180deg);
`;

const LeftArrowIcon = styled(Icon)``;

export default DirectButton;
