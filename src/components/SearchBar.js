import React from "react";
import styled from "styled-components/macro";
import { ReactComponent as SearchRef } from "assets/placeholder-search.svg";
import {
  inputShadowColor,
  placeholderColor,
  notoSans,
} from "variable/variable";

const Container = styled.section`
  position: relative;
  display: flex;
  align-items: center;
`;

const Search = styled(SearchRef)`
  position: absolute;
  left: 12.5px;
`;

const Input = styled.input`
  border: none;
  box-shadow: 0px 1px 4px ${inputShadowColor};
  box-sizing: border-box;
  padding: 11px 46px;
  width: 368px;
  font-size: 16px;
  line-height: 24px;
  font-family: ${notoSans};
`;

const SearchBar = (props) => {
  const { className } = props;
  return (
    <Container className={className}>
      <Search />
      <Input placeholder="輸入目的地、景點、活動..." />
    </Container>
  );
};

export default SearchBar;
