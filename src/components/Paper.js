import React from "react";
import styled from "styled-components/macro";
import { __0D0B0C__ } from "variable/variable";

const Paper = (props) => {
  const {
    style,
    className,
    children,
    widthOfShadowLength,
    rotateOfShadow,
    leftShadowOffsetWidth,
    rightShadowOffsetWidth,
  } = props;
  return (
    <Box
      style={style}
      className={className}
      widthOfShadowLength={widthOfShadowLength}
      rotateOfShadow={rotateOfShadow}
      leftShadowOffsetWidth={leftShadowOffsetWidth}
      rightShadowOffsetWidth={rightShadowOffsetWidth}
    >
      {children}
    </Box>
  );
};

const Box = styled.section`
  background-color: white;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 200px;

  &:before,
  &:after {
    position: absolute;
    z-index: -1;
    content: "";
    bottom: 15px;
    left: ${(props) =>
      props.leftShadowOffsetWidth ? props.leftShadowOffsetWidth : "10px"};
    top: 80%;
    width: ${(props) =>
      props.widthOfShadowLength ? props.widthOfShadowLength : "30%"};
    background: ${__0D0B0C__()};
    box-shadow: 0 15px 10px ${__0D0B0C__()};
    opacity: 0.3;
    transform: ${(props) =>
      props.rotateOfShadow
        ? `rotate(-${props.rotateOfShadow}deg)`
        : "rotate(-3deg)"};
  }

  &:after {
    transform: ${(props) =>
      props.rotateOfShadow
        ? `rotate(${props.rotateOfShadow}deg)`
        : "rotate(3deg)"};
    right: ${(props) =>
      props.rightShadowOffsetWidth ? props.rightShadowOffsetWidth : "10px"};
    left: auto;
  }
`;

export default Paper;
