import React from "react";
import styled from "styled-components/macro";
import {
  shallowMainColor,
  lightReceivingColor,
  shadowColor,
  selectedColor,
  selectedShadowColor,
} from "variable/variable";
import Radium from "radium";

const JauntCircleButton = (props) => {
  const {
    className,
    icon,
    style,
    sharpRadius = true,
    onClick,
    isSelected,
    children,
  } = props;

  return (
    <Container
      className={className}
      style={style}
      sharpRadius={sharpRadius}
      onClick={onClick}
      isSelected={isSelected}
    >
      <Wrap>
        {/* {icon && <Icon src={icon} isSelected={isSelected} />} */}
        {children}
      </Wrap>
    </Container>
  );
};

const ContainerStyledComponent = styled.button`
  background: ${(props) =>
    props.isSelected ? selectedColor : shallowMainColor};
  box-shadow: ${(props) =>
    props.isSelected
      ? selectedShadowColor
      : `-2px -2px 1px ${lightReceivingColor}, 0px 0px 5px ${shadowColor}`};
  border-radius: 50%;
  cursor: pointer;
  padding: 10px;

  svg path {
    fill: ${(props) => props.isSelected && lightReceivingColor};
  }
`;

const Container = Radium(ContainerStyledComponent);

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default JauntCircleButton;
