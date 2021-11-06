import React from "react";
import styled from "styled-components/macro";
import { __FFF__ } from "variable/variable";

const Footer = (props) => {
  const { className, style } = props;
  return (
    <Box style={style} className={className}>
      Taiwan Tourguide © Code: Luke_Xie / Design: KT
    </Box>
  );
};

const Box = styled.section`
  display: flex;
  justify-content: center;
  background-color: ${__FFF__()};
  padding: 25.5px 0px;
`;

export default Footer;
