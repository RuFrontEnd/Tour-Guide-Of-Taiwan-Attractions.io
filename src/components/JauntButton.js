import React from "react";
import styled from "styled-components/macro";
import {
  shallowMainColor,
  lightReceivingColor,
  shadowColor,
  textColor,
  notoSans,
  selectedColor,
} from "variable/variable";
import Radium from "radium";

const JauntButton = (props) => {
  const {
    className,
    icon = false,
    style,
    sharpRadius = true,
    textStyle,
    text = "text",
    onClick,
    disabled,
    isSelected,
  } = props;

  return (
    <Container
      className={className}
      style={style}
      sharpRadius={sharpRadius}
      onClick={onClick}
      disabled={disabled}
      isSelected={isSelected}
    >
      <Wrap>
        {icon && <Icon src={icon} />}
        <Text style={textStyle} isSelected={isSelected}>
          {text}
        </Text>
      </Wrap>
    </Container>
  );
};

const ContainerStyledComponent = styled.button`
  background: ${(props) =>
    props.isSelected ? selectedColor : shallowMainColor};
  box-shadow: 0px 2px 8px 0px ${shadowColor},
    -3px -2px 2px 0px ${lightReceivingColor};
  border-radius: ${(props) => (props.sharpRadius ? "8px" : "10px")};
  cursor: pointer;
`;

const Container = Radium(ContainerStyledComponent);

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  margin-right: 10px;
`;
const TextStyledComponent = styled.p`
  color: ${(props) => (props.isSelected ? lightReceivingColor : textColor)};
  font-family: ${notoSans};
  font-size: 20px;
  font-weight: 400;
`;

const Text = Radium(TextStyledComponent);

export default JauntButton;
