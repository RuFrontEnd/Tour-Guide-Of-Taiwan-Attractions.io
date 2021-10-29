import React from "react";
import styled from "styled-components/macro";
import { navBarColor, lightReceivingColor } from "variable/variable";
import { ReactComponent as Logo } from "assets/logo.svg";
import { ReactComponent as Filter } from "assets/filter.svg";
import { ReactComponent as Search } from "assets/search.svg";
import { ReactComponent as Attraction } from "assets/attraction.svg";
import { ReactComponent as Food } from "assets/food.svg";
import { ReactComponent as Traffic } from "assets/traffic.svg";
import { ReactComponent as Camera } from "assets/camera.svg";
import { ReactComponent as Setting } from "assets/setting.svg";
import Space from "layouts/Space";
import JauntCircleButton from "components/JauntCircleButton";
import SearchBar from "components/SearchBar";

const NavBar = (props) => {
  const { className } = props;
  return (
    <Space style={NavBarStyle} className={className}>
      <Box>
        <Logo />
        <Options>
          <Attraction />
          台灣景點
          <Food />
          美食住宿
          <Traffic />
          景點交通
        </Options>
      </Box>
    </Space>
  );
};

const Box = styled.div`
  padding: 18px 0px;
  display: grid;
  grid-template-areas: "a b";
  grid-template-columns: 1fr 1fr;
`;

const Options = styled.div`
  grid-area: "b";
  align-self: center;
  justify-self: end;
`;

const NavBarStyle = {
  backgroundColor: navBarColor,
  opacity: 0.8,
};

export default NavBar;
