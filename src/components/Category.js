import React from "react";
import styled from "styled-components/macro";

const Category = (props) => {
  const { className, style, children, title } = props;
  return (
    <Box style={style} className={className}>
      {children}
      <Title>{title}</Title>
    </Box>
  );
};

const Box = styled.section`
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const Title = styled.section`
  padding-left: 14px;
`;

export default Category;
