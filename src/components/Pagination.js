import React from "react";
import styled from "styled-components/macro";
import MuiPagination from "@mui/material/Pagination";

const Pagination = (props) => {
  const { className, style, count } = props;
  return (
    <Box style={style} className={className}>
      <MuiPagination count={count} variant="outlined" shape="rounded" />
    </Box>
  );
};

const Box = styled.section``;

export default Pagination;
