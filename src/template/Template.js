import React from "react";
import styled from "styled-components/macro";

const Template = (props) => {
  const { className, style } = props;
  return <Box style={style} className={className}></Box>;
};

const Box = styled.section``;

export default Template;
