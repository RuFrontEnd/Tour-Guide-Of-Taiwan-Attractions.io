import React from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import { __FFF__, __FF1D6C__, __FFB72C__, __D2D2D2__ } from "variable/variable";
import Tool from "layouts/Tool";
import Background from "layouts/Background";

const SearchTool = (props) => {
  const {
    className,
    children,
    categories,
    counties,
    selectedCategories,
    setSelectedCategories,
    selectedCity,
    setSelectedCity,
    keyword,
    setKeyword,
    onClickSearchButton = () => {},
  } = props;
  const navBarHeight = useSelector((state) => state.navBar.height);

  return (
    <Background className={className}>
      <NavBarHeight height={navBarHeight} />
      <Tool
        categories={categories}
        counties={counties}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        keyword={keyword}
        setKeyword={setKeyword}
        onClickSearchButton={onClickSearchButton}
      />
      {children}
    </Background>
  );
};

const NavBarHeight = styled.div`
  height: ${(props) => props.height}px;
`;

export default SearchTool;
