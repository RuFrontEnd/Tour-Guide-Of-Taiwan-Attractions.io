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
    page,
    previousIcon,
    nextIcon,
    onClick,
  } = props;
  return (
    <Box style={style} className={className}>
      <MuiPagination
        onClick={onClick}
        onChange={(e, page) => {
          setPage(page);
        }}
        count={count}
        page={page}
        variant="outlined"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            id={item.innerHtml}
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
