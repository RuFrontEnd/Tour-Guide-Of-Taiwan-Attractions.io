import React from "react";
import styled from "styled-components/macro";
import { navBarColor, lightReceivingColor } from "variable/variable";
import { ReactComponent as Logo } from "assets/logo.svg";
import { ReactComponent as Portrait } from "assets/portrait.svg";
import { ReactComponent as Filter } from "assets/filter.svg";
import { ReactComponent as Search } from "assets/search.svg";
import { ReactComponent as Favorites } from "assets/favorites.svg";
import { ReactComponent as Calendar } from "assets/calendar.svg";
import { ReactComponent as Camera } from "assets/camera.svg";
import { ReactComponent as Setting } from "assets/setting.svg";
import Space from "layouts/Space";
import JauntCircleButton from "components/JauntCircleButton";
import SearchBar from "components/SearchBar";

const NavBar = (props) => {
  const { className } = props;
  return (
    <Space style={NavBarStyle} className={className}>
      <Container>
        <Wrap>
          <Logo />
          <Options>台灣景點 美食住宿 景點交通</Options>
        </Wrap>
      </Container>
    </Space>
  );
};

const Container = styled.section`
  padding: 18px 0px;
`;

const Wrap = styled.div`
  display: grid;
  grid-template-areas: "a b";
  grid-template-columns: 1fr 1fr;
`;

const Options = styled.div`
  grid-area: 'b';
  align-self: center;
  justify-self: end;
`;

const JauntCircleButtonStyleComponent = styled(JauntCircleButton)`
  margin: 0px 6px;
`;

const SearchButton = styled(JauntCircleButtonStyleComponent)``;

const FavButton = styled(JauntCircleButtonStyleComponent)``;

const CalenderButton = styled(JauntCircleButtonStyleComponent)``;

const CameraButton = styled(JauntCircleButtonStyleComponent)``;

const SettingButton = styled(JauntCircleButtonStyleComponent)``;

const NavBarStyle = {
  backgroundColor: navBarColor,
  opacity: 0.8,
};

export default NavBar;
