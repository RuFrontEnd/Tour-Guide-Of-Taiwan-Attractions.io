import React, { useState } from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { __FFF__, __FF1D6C__, __FFB72C__, __D2D2D2__ } from "variable/variable";
import { ReactComponent as WelcomeToTaiwan } from "assets/welcomeToTaiwan.svg";
import { ReactComponent as Search } from "assets/search.svg";
import { ReactComponent as Gps } from "assets/gps.svg";
import { ReactComponent as Location } from "assets/location.svg";
import { ReactComponent as TriangleTitle } from "assets/triangle_title.svg";
import { ReactComponent as RectangleTitle } from "assets/rectangle_title.svg";
import landing from "assets/landing.png";
import cardImg_tmp from "assets/cardImg_tmp.png";
import cardSmImg_tmp from "assets/cardSmImg_tmp.png";
import boardImg_tmp from "assets/boardImg_tmp.png";
import Paper from "components/Paper";
import Board from "components/Board";
import Background from "layouts/Background";
import Input from "components/Input";
import SquareButton from "components/SquareButton";
import Dropdown from "components/Dropdown";
import Category from "components/Category";
import Card from "components/Card";
import CardSm from "components/CardSm";
import Space from "layouts/Space";
import DetailCard from "components/DetailCard";
import RectButton from "components/RectButton";

const FoodAndAccommodation = (props) => {
  const { history } = props;
  const navBarHeight = useSelector((state) => state.navBar.height);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const attractions = ["類別"];

  const Infos = [
    { src: "", alt: "", title: "", area: "" },
    { src: "", alt: "", title: "", area: "" },
    { src: "", alt: "", title: "", area: "" },
    { src: "", alt: "", title: "", area: "" },
    { src: "", alt: "", title: "", area: "" },
    { src: "", alt: "", title: "", area: "" },
    { src: "", alt: "", title: "", area: "" },
    { src: "", alt: "", title: "", area: "" },
  ];

  const handleClickActivitySmallCard = () => {
    setIsShowDetail(true);
    document.body.style.overflow = "hidden";
  };

  const handleClickDetailModal = (e) => {
    setIsShowDetail(false);
    document.body.style.overflow = "";
  };

  const handleClickDetailSmallCard = (e) => {
    e.stopPropagation();
  };

  return (
    <Background>
      <LandingImgBox widthOfShadowLength={"80%"} rotateOfShadow={2}>
        <LandingImg>
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
            <CatgoreyDropdown options={attractions} />
            <CityDropdown />
            <GpshButton>
              <GpsIcon height={"24px"} />
            </GpshButton>
          </DropdownBox>
        </LandingImg>
      </LandingImgBox>

      {!isFiltered && (
        <>
          <Space>
            <Kind title="熱門美食">
              <RectangleTitle />
            </Kind>
            <SmallCards>
              {Infos.map((Info) => (
                <SmallCardItems>
                  <FoodSmallCard />
                </SmallCardItems>
              ))}
            </SmallCards>
          </Space>

          <Space>
            <Kind title="推薦住宿">
              <RectangleTitle />
            </Kind>
            <SmallCards>
              {Infos.map((Info) => (
                <SmallCardItems>
                  <FoodSmallCard />
                </SmallCardItems>
              ))}
            </SmallCards>
          </Space>
        </>
      )}

      {isFiltered && (
        <Space>
          <Kind title="美食">
            <RectangleTitle />
          </Kind>
          <SmallCards>
            {Infos.map((Info) => (
              <SmallCardItems>
                <FoodSmallCard />
              </SmallCardItems>
            ))}
          </SmallCards>
        </Space>
      )}

      {isShowDetail && (
        <DetailModal
          onClick={handleClickDetailModal}
          navBarHeight={navBarHeight}
        >
          <DetailCard
            onClick={(e) => {
              handleClickDetailSmallCard(e);
            }}
          />
        </DetailModal>
      )}
    </Background>
  );
};

const DetailModal = styled.div`
  position: fixed;
  z-index: 1001;
  top: ${(props) => `${props.navBarHeight}px`};
  left: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  background-color: ${__D2D2D2__(0.5)};
  width: 100%;
  height: ${(props) => `calc(100% - ${props.navBarHeight}px)`};
`;

const FoodSmallCard = styled(CardSm)``;

const SmallCardItems = styled.li`
  margin: 0px 4.5px 35px 4.5px;
  display: flex;
  justify-content: center;

  &:nth-child(5n + 1) {
    margin: 0px 4.5px 35px 0px;
  }

  &:nth-child(5n) {
    margin: 0px 0px 35px 4.5px;
  }
`;

const SmallCards = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding-bottom: 50px;
`;

const Kind = styled(Category)`
  margin-bottom: 12px;
`;

const GpsIcon = styled(Gps)`
  & > path {
    fill: ${__FFF__()};
    stroke: ${__FFF__()};
  }
`;

const GpshButton = styled(SquareButton)`
  background-color: ${__FFB72C__()};
`;

const CityDropdown = styled(Dropdown)`
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

const LandingImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${landing});
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LandingImgBox = styled(Paper)`
  width: 100%;
  height: 536px;
  padding: 23px 27px;
  margin-bottom: 90px;
`;

export default withRouter(FoodAndAccommodation);
