import React from "react";
import styled from "styled-components/macro";
import { __0D0B0C__, __D2D2D2__ } from "variable/variable";

const Input = (props) => {
  const {
    className,
    style,
    placeholder = "placeholder...",
    value = "",
    setValue = () => {},
  } = props;
  return (
    <Box
      style={style}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

const Box = styled.input`
  box-sizing: border-box;
  width: 260px;
  padding: 8.5px 24px 8.5px 24px;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 4px 3px ${__0D0B0C__(0.3)};
  font-size: 16px;
  line-height: 23px;
  &::placeholder {
    color: ${__D2D2D2__()};
  }

  &:focus {
    outline: none;
  }
`;

export default Input;
