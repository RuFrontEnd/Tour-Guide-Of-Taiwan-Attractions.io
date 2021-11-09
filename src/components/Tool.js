import React from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { __FFF__, __FF1D6C__, __FFB72C__, __D2D2D2__ } from "variable/variable";
import { ReactComponent as WelcomeToTaiwan } from "assets/welcomeToTaiwan.svg";
import { ReactComponent as Search } from "assets/search.svg";
import { ReactComponent as Gps } from "assets/gps.svg";

import Input from "components/Input";
import SquareButton from "components/SquareButton";
import Dropdown from "components/Dropdown";

const Tool = (props) => {
  const { history, style, className, categories, counties } = props;

  return (
    <Box style={style} className={className}>
      <Title>
        <WelcomeToTaiwan />
        <Remark>台北、台中、台南、屏東、宜蘭……遊遍台灣</Remark>
      </Title>
      <SearchBox>
        <SearchBar placeholder="搜尋關鍵字" />
        <SearchButton>
          <SearchIcon width={"16px"} />
        </SearchButton>
      </SearchBox>
      <DropdownBox>
        <CatgoreyDropdown options={categories} />
        <CountiesDropdown options={counties} />
        <GpshButton>
          <GpsIcon height={"24px"} />
        </GpshButton>
      </DropdownBox>
    </Box>
  );
};

const Box = styled.section``;

const GpsIcon = styled(Gps)`
  & > path {
    fill: ${__FFF__()};
    stroke: ${__FFF__()};
  }
`;

const GpshButton = styled(SquareButton)`
  background-color: ${__FFB72C__()};
`;

const CountiesDropdown = styled(Dropdown)`
  width: 219px;
  margin-right: 6px;
`;

const CatgoreyDropdown = styled(Dropdown)`
  width: 219px;
  margin-right: 7px;
`;

const DropdownBox = styled.div`
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(Search)`
  & > path {
    fill: ${__FFF__()};
    stroke: ${__FFF__()};
  }
`;

const SearchButton = styled(SquareButton)`
  background-color: ${__FF1D6C__()};
`;

const SearchBar = styled(Input)`
  width: 445px;
  margin-right: 6px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Remark = styled.p`
  color: ${__FFF__()};
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
`;

const Title = styled.div`
  margin-bottom: 16px;
`;

export default withRouter(Tool);
