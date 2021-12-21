import React, { forwardRef } from "react";
import styled from "styled-components/macro";

const Category = forwardRef((props) => {
  const {
    className,
    style,
    children = <Square />,
    title = "標題",
    ref,
  } = props;
  return (
    <Box style={style} className={className} ref={ref}>
      <Icon>{children}</Icon>
      <Title>{title}</Title>
    </Box>
  );
});

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

const Icon = styled.div``;

const Title = styled.section`
  padding-left: 14px;
  line-height: 28px;
`;

export default Category;
