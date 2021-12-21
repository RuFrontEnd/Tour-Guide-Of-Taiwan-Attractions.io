import React from "react";
import styled from "styled-components/macro";
import { __0D0B0C__ } from "variable/variable";

const Paper = (props) => {
  const {
    style,
    className,
    id,
    children,
    widthOfShadowLength,
    rotateOfShadow,
    leftShadowOffsetWidth,
    rightShadowOffsetWidth,
    onClick = () => {},
    dataId,
  } = props;
  return (
    <Box
      style={style}
      className={className}
      id={id}
      onClick={onClick}
      widthOfShadowLength={widthOfShadowLength}
      rotateOfShadow={rotateOfShadow}
      leftShadowOffsetWidth={leftShadowOffsetWidth}
      rightShadowOffsetWidth={rightShadowOffsetWidth}
      children={children}
      data-id={dataId}
    >
      {children}
    </Box>
  );
};

const Box = styled.section`
  display: inline-block;
  background-color: white;
  position: relative;
  box-sizing: border-box;

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
    transform: skewY(-2.5deg);
    /* transform: ${(props) =>
      props.rotateOfShadow
        ? `rotate(-${props.rotateOfShadow}deg)`
        : "rotate(-3deg)"}; */
  }

  &:after {
    transform: skewY(2.5deg);
    /* transform: ${(props) =>
      props.rotateOfShadow
        ? `rotate(${props.rotateOfShadow}deg)`
        : "rotate(3deg)"}; */
    right: ${(props) =>
      props.rightShadowOffsetWidth ? props.rightShadowOffsetWidth : "10px"};
    left: auto;
  }
`;

export default Paper;
