import React, { useState } from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { __FFF__, __FF1D6C__, __FFB72C__ } from "variable/variable";
import { ReactComponent as WelcomeToTaiwan } from "assets/welcomeToTaiwan.svg";
import { ReactComponent as Search } from "assets/search.svg";
import { ReactComponent as Gps } from "assets/gps.svg";
import { ReactComponent as Location } from "assets/location.svg";
import { ReactComponent as TriangleTitle } from "assets/triangle_title.svg";
import { ReactComponent as RectangleTitle } from "assets/rectangle_title.svg";
import landing from "assets/landing.png";
import cardImg_tmp from "assets/cardImg_tmp.png";
import cardSmImg_tmp from "assets/cardSmImg_tmp.png";
import detailCard_tmp from "assets/detailCard_tmp.png";
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

const Landing = (props) => {
  const { history } = props;
  const attractions = ["類別"];
  const hotAttractions = {
    src: cardImg_tmp,
    title: "合歡山國際暗空公園-星空清境跨年活動",
    area: "臺北市 北投區",
  };
  const hotFoods = {
    src: cardSmImg_tmp,
    title: "正濱漁港懷舊碼頭",
    area: "基隆市中正區",
  };
  const detail = {
    src: detailCard_tmp,
    title: "合歡山國際暗空公園-星空清境跨年活動",
    time: "開放式空間，無時間限制",
    fee: "免費",
    area: "基隆市中山區湖海路一、二段(協和街)",
    tel: "886-2-24287664",
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Background>
      {/* <Board />
      <Card />
      <CardSm />
      <Category />
      <DetailCard />
      <Paper />
      <Dropdown />
      <Input />
      <RectButton />
      <SquareButton /> */}
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
      <Space>
        <Kind title="熱門城市">
          <TriangleTitle />
        </Kind>

        <HotCitiesCarousel responsive={responsive}>
          <HotCitiy>
            <HotCityBoard>
              <HotCityImg src={landing} />
              <HotCityInfo>
                <HotCityIcon />
                <HotCityName>台北市</HotCityName>
              </HotCityInfo>
              <HotCityMask />
            </HotCityBoard>
          </HotCitiy>

          <HotCitiy>
            <HotCityBoards>
              <HalfHotCityBoard>
                <HotCityImg src={landing} />
              </HalfHotCityBoard>
              <HalfHotCityBoard>
                <HotCityImg src={landing} />
              </HalfHotCityBoard>
            </HotCityBoards>
          </HotCitiy>

          <HotCitiy>
            <HotCityBoard />
          </HotCitiy>

          <HotCitiy>
            <HotCityBoards>
              <HalfHotCityBoard />
              <HalfHotCityBoard />
            </HotCityBoards>
          </HotCitiy>

          <HotCitiy>
            <HotCityBoard />
          </HotCitiy>

          <HotCitiy>
            <HotCityBoards>
              <HalfHotCityBoard />
              <HalfHotCityBoard />
            </HotCityBoards>
          </HotCitiy>

          <HotCitiy>
            <HotCityBoard />
          </HotCitiy>

          <HotCitiy>
            <HotCityBoards>
              <HalfHotCityBoard />
              <HalfHotCityBoard />
            </HotCityBoards>
          </HotCitiy>
        </HotCitiesCarousel>
      </Space>
      {/* <DetailCard style={{ margin: "50px" }} info={detail}>
        南投縣與各單位多年於合歡山舉辦清境高山跨年晚會活動，今年將活動主軸由傳統跨年晚會轉化成為台灣高山星空遊程之體驗活動，在擁有東南亞區最佳的星空觀測環境。奇特造型，值得深入觀賞體會。
      </DetailCard>
      <CardSm
        style={{ width: "206px", height: "auto", margin: "50px 50px" }}
        info={hotFoods}
      />
      <Card
        style={{ width: "513px", height: "auto", margin: "50px px" }}
        info={hotAttractions}
      >
        南投縣與各單位多年於合歡山舉辦清境高山跨年晚會活動，今年將活動主軸由傳統跨年晚會轉化成為台灣高山星空遊程之體驗活動，以剛通過美國IDA認證的華語區第一座國際暗空公園作為宣傳主題，在擁有東南的的...
      </Card>
      <Board
        style={{ width: "202px", height: "245px", padding: "23px 27px" }}
      />
      <Category title={"熱門城市"}>
        <Triangle />
      </Category> */}

      <Space>
        <Kind title="熱門活動">
          <TriangleTitle />
        </Kind>
        <HotActivitiesCards>
          <HotActivitiesCardItems>
            <ActivityCard />
          </HotActivitiesCardItems>
          <HotActivitiesCardItems>
            <ActivityCard />
          </HotActivitiesCardItems>
          <HotActivitiesCardItems>
            <ActivityCard />
          </HotActivitiesCardItems>
          <HotActivitiesCardItems>
            <ActivityCard />
          </HotActivitiesCardItems>
        </HotActivitiesCards>
      </Space>

      <Space>
        <Kind title="熱門餐飲">
          <RectangleTitle />
        </Kind>
        <HotFoodCards>
          <HotFoodCardItems>
            <FoodCard />
          </HotFoodCardItems>
          <HotFoodCardItems>
            <FoodCard />
          </HotFoodCardItems>
          <HotFoodCardItems>
            <FoodCard />
          </HotFoodCardItems>
          <HotFoodCardItems>
            <FoodCard />
          </HotFoodCardItems>
          <HotFoodCardItems>
            <FoodCard />
          </HotFoodCardItems>
          <HotFoodCardItems>
            <FoodCard />
          </HotFoodCardItems>
          <HotFoodCardItems>
            <FoodCard />
          </HotFoodCardItems>
          <HotFoodCardItems>
            <FoodCard />
          </HotFoodCardItems>
          <HotFoodCardItems>
            <FoodCard />
          </HotFoodCardItems>
        </HotFoodCards>
      </Space>
    </Background>
  );
};

const FoodCard = styled(CardSm)``;

const HotFoodCardItems = styled.li`
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

const HotFoodCards = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding-bottom: 50px;
`;

const ActivityCard = styled(Card)`
  width: 100%;
`;

const HotActivitiesCardItems = styled.li`
  margin: 0px 10.5px 48px 0px;
  display: flex;
  justify-content: center;

  &:nth-child(odd) {
    margin: 0px 10.5px 48px 0px;
  }

  &:nth-child(even) {
    margin: 0px 0px 48px 10.5px;
  }
`;

const HotActivitiesCards = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-bottom: 35px;
`;

const HotCityMask = styled.div`
  background-color: black;
  box-sizing: border-box;
  position: absolute;
  width: calc(100% - 24px);
  height: calc(100% - 28px);
  opacity: 0.3;
  z-index: 0;
`;

const HotCityName = styled.p`
  color: ${__FFF__()};
`;

const HotCityInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const HotCityIcon = styled(Location)`
  width: 16px;
  height: 19px;
  margin-bottom: 7.2px;

  & > path {
    fill: ${__FFF__()};
  }
`;

const HotCityImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HalfHotCityBoard = styled(Board)`
  width: 100%;
  height: 120px;
  padding: 7px 8px;
  margin-bottom: 5px;
`;

const HotCityBoards = styled(Board)`
  width: 100%;
  height: 100%;
`;

const HotCityBoard = styled(Board)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  width: 100%;
  height: 245px;
  padding: 14px 12px;
`;

const HotCitiy = styled.div`
  padding: 0px 6.5px;
`;

const HotCitiesCarousel = styled(Carousel)`
  height: 245px;
  padding-bottom: 60px;
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

export default withRouter(Landing);
