import React from "react";
import styled from "styled-components/macro";
import { navBarColor, lightReceivingColor } from "variable/variable";
import navBarLogo from "assets/navBar-logo.svg";
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
          <Logo src={navBarLogo} />
          <Tools>
            <MemberButton>
              <Portrait />
            </MemberButton>
            <SearchBar />
            <FilterButton isSelected={true}>
              <Filter />
            </FilterButton>
          </Tools>
          <Options>
            <SearchButton isSelected={true}>
              <Search isSelected={true} />
            </SearchButton>
            <FavButton>
              <Favorites />
            </FavButton>
            <CalenderButton>
              <Calendar />
            </CalenderButton>
            <CameraButton>
              <Camera />
            </CameraButton>
            <SettingButton>
              <Setting />
            </SettingButton>
          </Options>
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
  grid-template-columns: 1fr 1fr 1fr;
`;

const Logo = styled.img``;

const MemberButton = styled(JauntCircleButton)`
  margin-right: 12px;
`;

const FilterButton = styled(JauntCircleButton)`
  margin-left: 12px;
  padding: 14px;
`;

const Tools = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
`;

const Options = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
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
