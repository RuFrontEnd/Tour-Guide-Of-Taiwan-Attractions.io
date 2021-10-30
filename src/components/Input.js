import React from "react";
import styled from "styled-components/macro";
import { __0D0B0C__, __D2D2D2__ } from "variable/variable";

const Input = (props) => {
  const { className, style, placeholder } = props;
  return (
    <TypingBar
      style={style}
      className={className}
      placeholder={placeholder}
      onClick={() => {
        console.log("a");
      }}
    />
  );
};

const TypingBar = styled.input`
  padding: 8.5px 0px 8.5px 24px;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 4px 3px ${__0D0B0C__(0.3)};
  &::placeholder {
    color: ${__D2D2D2__()};
  }

  &:focus {
    outline: none;
  }
`;

export default Input;
