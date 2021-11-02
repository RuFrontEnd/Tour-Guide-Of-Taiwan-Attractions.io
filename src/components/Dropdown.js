import React from "react";
import styled from "styled-components/macro";
import { __0D0B0C__ } from "variable/variable";
import selectionArrow from "assets/selectionArrow.svg";

const Dropdown = (props) => {
  const { className, style, options = ["類別", "選項二", "選項三"] } = props;
  return (
    <Box style={style} className={className}>
      {options &&
        options.map((option) => <Option key={option}>{option}</Option>)}
    </Box>
  );
};

const Box = styled.select`
  width: 200px;
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: 2px;
  border-radius: 6px;
  box-shadow: 0px 4px 3px ${__0D0B0C__(0.3)};
  appearance: none;
  background-image: url(${selectionArrow});
  background-repeat: no-repeat;
  background-position: right 16px top 50%;
  text-align: justify;

  &:focus {
    outline: none;
    border: none;
  }
`;

const Option = styled.option``;

export default Dropdown;
