import React from "react";
import styled from "styled-components/macro";

const Category = (props) => {
  const { className, style, children = <Square />, title = "標題" } = props;
  return (
    <Box style={style} className={className}>
      <Icon>{children}</Icon>
      <Title>{title}</Title>
    </Box>
  );
};

const Square = styled.div`
  width: 100%;
  height: 100%;
  background-color: gray;
`;

const Box = styled.section`
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
`;

const Title = styled.section`
  padding-left: 14px;
  line-height: 28px;
`;

export default Category;
