import React from "react";
import styled from "styled-components/macro";
import MuiPagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const Pagination = (props) => {
  const {
    className,
    style,
    count,
    setPage = () => {},
    previousIcon,
    nextIcon,
  } = props;
  return (
    <Box style={style} className={className}>
      <MuiPagination
        onChange={(e, page) => {
          setPage(page);
        }}
        count={count}
        variant="outlined"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            components={{
              previous: previousIcon ? previousIcon : "",
              next: nextIcon ? nextIcon : "",
            }}
            {...item}
          />
        )}
      />
    </Box>
  );
};

const Box = styled.section``;

export default Pagination;
