import React from "react";
import styled from "styled-components/macro";

const Template = (props) => {
  const { className } = props;
  return <Box className={className}></Box>;
};

const Box = styled.section``;

export default Template;
