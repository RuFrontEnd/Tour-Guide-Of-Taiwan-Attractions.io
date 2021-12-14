import React from "react";
import styled from "styled-components/macro";

const Space = (props) => {
  const { children, className, style, full } = props;
  return (
    <Box full={full} style={style} className={className}>
      {children}
    </Box>
  );
};

const Box = styled.section`
  padding: 0px 20px;
  box-sizing: border-box;
  max-width: ${(props) => (props.full ? "auto" : "1104px")};
  margin: auto;

  /* @media (max-width: 1280px) {
    max-width: ${(props) => (props.full ? "auto" : "960px")};
  } */

  @media (max-width: 768px) {
    max-width: ${(props) => (props.full ? "auto" : "720px")};
  }
  /* 
  @media (max-width: 1200px) {
    max-width: ${(props) => (props.full ? "auto" : "900px")};
  }

  @media (max-width: 992px) {
    max-width: ${(props) => (props.full ? "auto" : "720px")};
  }

  @media (max-width: 768px) {
    max-width: ${(props) => (props.full ? "auto" : "576px")};
  } */

  @media (max-width: 425px) {
    padding: 0px 16px;
  }
`;

export default Space;
