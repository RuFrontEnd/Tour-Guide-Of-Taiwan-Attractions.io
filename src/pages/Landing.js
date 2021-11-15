import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import jsSHA from "jssha";
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
import Tool from "components/Tool";
import { counties } from "variable/city";
import { baseURL } from "variable/variable";
import { pipe } from "utils/pipe";
import { removeRepeatedValue, raisingSortValue } from "utils/array";
import { sortValue } from "utils/sort";
import taipei from "assets/taipei.png";
import taoyuan from "assets/taoyuan.png";
import hsinchu from "assets/hsinchu.png";
import taichung from "assets/taichung.png";
import nantou from "assets/nantou.png";
import chiayi from "assets/chiayi.png";
import tainan from "assets/tainan.png";
import kaohsiung from "assets/kaohsiung.png";
import pingtung from "assets/pingtung.png";
import yilan from "assets/yilan.png";
import hualien from "assets/hualien.png";
import daito from "assets/daito.png";
import offshore from "assets/offshore.png";
import miaoli from "assets/miaoli.png";
import yunlin from "assets/yunlin.jpg";
import changhua from "assets/changhua.jpg";

const categories = ["類別", "景點", "活動"];
const hotAttractions = {
  src: cardImg_tmp,
  title: "合歡山國際暗空公園-星空清境跨年活動",
  area: "臺北市 北投區",
};
const Smalls = {
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

const hotCities = [
  { name: "台　北", src: taipei },
  { name: ["桃　園", "新　竹"], src: [taoyuan, hsinchu] },
  { name: "台　中", src: taichung },
  { name: ["嘉　義", "南　投"], src: [chiayi, nantou] },
  { name: "台　南", src: tainan },
  { name: ["高　雄", "屏　東"], src: [kaohsiung, pingtung] },
  { name: "宜　蘭", src: yilan },
  { name: ["花　蓮", "台　東"], src: [hualien, daito] },
  { name: "彰　化", src: changhua },
  { name: ["苗　栗", "雲　林"], src: [miaoli, yunlin] },
  { name: "澎湖金門馬祖", src: offshore },
];

const hotActivitiesInfo = [
  { src: "", alt: "", title: "", area: "", content: "" },
  { src: "", alt: "", title: "", area: "", content: "" },
  { src: "", alt: "", title: "", area: "", content: "" },
  { src: "", alt: "", title: "", area: "", content: "" },
];

const scenicSpotInfos = [
  { src: "", alt: "", title: "", area: "" },
  { src: "", alt: "", title: "", area: "" },
  { src: "", alt: "", title: "", area: "" },
  { src: "", alt: "", title: "", area: "" },
  { src: "", alt: "", title: "", area: "" },
  { src: "", alt: "", title: "", area: "" },
  { src: "", alt: "", title: "", area: "" },
  { src: "", alt: "", title: "", area: "" },
];

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

const handleClickActivityCard = () => {
  document.body.style.overflow = "hidden";
};

const handleClickDetailModal = () => {
  document.body.style.overflow = "";
};

const handleClickDetailCard = (e) => {
  e.stopPropagation();
};

const getAuthorizationHeader = () => {
  let AppID = "d8a00188d8fc4814922181ed65fc12dd";
  let AppKey = "GsShW2xteF4icnz9hwAWrMNRQFQ";
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  let HMAC = ShaObj.getHMAC("B64");
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return { Authorization: Authorization, "X-Date": GMTString };
};

const getAddresses = (scenicSpots) =>
  scenicSpots.map((scenicSpot) =>
    scenicSpot.Address ? scenicSpot.Address.slice(0, 3) : ""
  );

const filterCities = (addresses) =>
  addresses.filter((address) => address.match(/.{2}市/));

const initNumOfOccurrence = (cities) =>
  cities.map((city) => {
    return {
      name: city,
      value: 0,
    };
  });

const getNumOfCities = (cities, initNumOfCities) => {
  let numOfCities = [...initNumOfCities];
  numOfCities.forEach((numOfCity, index) =>
    cities.forEach((city) => {
      if (numOfCity.name === city) {
        numOfCities[index].value += 1;
      }
    })
  );
  return numOfCities;
};

const descSortNumOfCites = (numOfCities) =>
  numOfCities.sort((prev, next) => next.value - prev.value);

const getTopTenCities = (SortedNumOfCites) =>
  SortedNumOfCites.filter((SortedNumOfCity, index) => index < 10);

const getCityName = (hotCity) => {
  console.log("hotCity", hotCity);
  if (hotCity === "台　北") {
    return "台北市 & 新北市";
  }
};

const Landing = (props) => {
  const { history } = props;
  const navBarHeight = useSelector((state) => state.navBar.height);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [scenicSpots, setScenicSpots] = useState([]);
  const [hotScenicSpots, setHotScenicSpots] = useState([]);
  const [activities, setActivities] = useState([]);
  const [hotActivities, setHotActivities] = useState([]);
  // const [hotCities, setHotCities] = useState([]);

  useEffect(() => {
    fetch(`${baseURL}/v2/Tourism/ScenicSpot`, {
      headers: getAuthorizationHeader(),
      method: "GET",
    })
      .then((res) => res.json())
      .then((datas) => {
        const _scenicSpots = datas.filter(
          (data) =>
            JSON.stringify(data.Picture) !== "{}" &&
            JSON.stringify(data.Picture).includes("PictureUrl1") &&
            data.Address?.slice(3, 6).match(/.{2}[鄉鎮市區]/)
        );
        setScenicSpots(_scenicSpots);
        console.log("_scenicSpots", _scenicSpots);

        let _hotScenicSpots = [];
        for (let i = 0; i < 10; i++) {
          // min = Math.ceil(min);
          // max = Math.floor(max);
          // return
          const A = Math.floor(Math.random() * (100 - 0) + 0);
          _hotScenicSpots.push(_scenicSpots[A]);
        }
        console.log("_hotScenicSpots", _hotScenicSpots);
        setHotScenicSpots(_hotScenicSpots);
      });

    fetch(`${baseURL}/v2/Tourism/Activity`, {
      headers: getAuthorizationHeader(),
      method: "GET",
    })
      .then((res) => res.json())
      .then((datas) => {
        const _activities = datas.filter(
          (data) => JSON.stringify(data.Picture) !== "{}"
        );
        setActivities(_activities);

        const _hotActivities = _activities.filter((data, index) => index < 4);
        setHotActivities(_hotActivities);
      });
  }, []);

  useEffect(() => {
    if (scenicSpots.length !== 0) {
      const cities = pipe(getAddresses, sortValue, filterCities)(scenicSpots);

      const initNumOfCities = pipe(
        removeRepeatedValue,
        initNumOfOccurrence
      )(cities);

      const numOfCities = pipe(
        getNumOfCities,
        descSortNumOfCites,
        getTopTenCities
      )(cities, initNumOfCities);

      const _hotCities = numOfCities.map((numOfCity) => numOfCity);
      console.log("_hotCities", _hotCities);
    }
  }, [scenicSpots]);

  useEffect(() => {
    if (activities.length !== 0) {
      //   const cities = pipe(getAddresses, sortValue, filterCities)(scenicSpots);
      //   const initNumOfCities = pipe(
      //     removeRepeatedValue,
      //     initNumOfOccurrence
      //   )(cities);
      //   const numOfCities = pipe(
      //     getNumOfCities,
      //     descSortNumOfCites,
      //     getTopTenCities
      //   )(cities, initNumOfCities);
      //   const _hotCities = numOfCities.map((numOfCity) => numOfCity);
      //   // setHotCities(_hotCities);
    }
  }, [activities]);

  return (
    <Background>
      <LandingImgBox widthOfShadowLength={"80%"} rotateOfShadow={2}>
        <LandingImg>
          <Tool categories={categories} counties={counties} />
        </LandingImg>
      </LandingImgBox>
      {!isFiltered && !selectedCity && (
        <>
          <Space>
            <Kind title="熱門城市">
              <TriangleTitle />
            </Kind>
            <HotCitiesCarousel responsive={responsive}>
              {hotCities.map((hotCity, index) =>
                index % 2 === 0 ? (
                  <HotCitiy
                    onClick={(e) => {
                      setSelectedCity(getCityName(hotCity.name));
                    }}
                  >
                    <HotCityBoard>
                      <HotCityImg src={hotCity.src} />
                      <HotCityInfo>
                        <HotCityIcon />
                        <HotCityName>{hotCity.name}</HotCityName>
                      </HotCityInfo>
                      <HotCityMask />
                    </HotCityBoard>
                  </HotCitiy>
                ) : (
                  <HotCitiy>
                    <HotCityBoards>
                      <HalfHotCityBoard>
                        <HotCityImg src={hotCity.src[0]} />
                        <HalfHotCityInfo>
                          <HotCityIcon />
                          <HotCityName>{hotCity.name[0]}</HotCityName>
                        </HalfHotCityInfo>
                        <HalfHotCityMask />
                      </HalfHotCityBoard>
                      <HalfHotCityBoard>
                        <HotCityImg src={hotCity.src[1]} />
                        <HalfHotCityInfo>
                          <HotCityIcon />
                          <HotCityName>{hotCity.name[1]}</HotCityName>
                        </HalfHotCityInfo>
                        <HalfHotCityMask />
                      </HalfHotCityBoard>
                    </HotCityBoards>
                  </HotCitiy>
                )
              )}
            </HotCitiesCarousel>
          </Space>

          <Space>
            <Kind title="熱門活動">
              <TriangleTitle />
            </Kind>
            <HotActivitiesCards>
              {hotActivities.map((hotActivity) => (
                <HotActivitiesCardItems key={hotActivity.title}>
                  <ActivityCard
                    info={{
                      src: hotActivity.Picture.PictureUrl1,
                      alt: "圖片",
                      title: hotActivity.Name,
                      area: hotActivity.Location,
                    }}
                    onClick={() => {
                      setIsShowDetail(true);
                      handleClickActivityCard();
                    }}
                  />
                </HotActivitiesCardItems>
              ))}
            </HotActivitiesCards>
          </Space>

          {/* <Space>
            <Kind title="熱門景點">
              <TriangleTitle />
            </Kind>
            <HotActivitiesCards>
              {hotActivitiesInfo.map((hotActivityInfo) => (
                <HotActivitiesCardItems key={hotActivityInfo.title}>
                  <ActivityCard
                    onClick={() => {
                      setIsShowDetail(true);
                      handleClickActivityCard();
                    }}
                  />
                </HotActivitiesCardItems>
              ))}
            </HotActivitiesCards>
          </Space> */}

          {/* <Space>
            <Kind title="熱門活動">
              <TriangleTitle />
            </Kind>
            <SmallCards>
              {hotActivities.map((hotActivity) => (
                <SmallCardItems>
                  <FoodCard
                    info={{
                      src: hotActivity.Picture.PictureUrl1,
                      alt: "圖片",
                      title: hotActivity.Name,
                      area: hotActivity.Location,
                    }}
                  />
                </SmallCardItems>
              ))}
            </SmallCards>
          </Space> */}

          <Space>
            <Kind title="熱門景點">
              <TriangleTitle />
            </Kind>
            <SmallCards>
              {hotScenicSpots.map((hotScenicSpot) => (
                <SmallCardItems>
                  <FoodCard
                    info={{
                      src: hotScenicSpot.Picture.PictureUrl1,
                      alt: "圖片",
                      title: hotScenicSpot.Name,
                      area: `${hotScenicSpot.Address.slice(
                        0,
                        3
                      )} ${hotScenicSpot.Address.slice(3, 6)}`,
                    }}
                  />
                </SmallCardItems>
              ))}
            </SmallCards>
          </Space>
        </>
      )}

      {selectedCity && (
        <Space>
          <Kind title={selectedCity}>
            <TriangleTitle />
          </Kind>
          <SmallCards>
            {scenicSpotInfos.map((scenicSpotInfo) => (
              <SmallCardItems>
                <FoodCard />
              </SmallCardItems>
            ))}
          </SmallCards>
        </Space>
      )}

      {isShowDetail && (
        <DetailModal
          onClick={() => {
            setIsShowDetail(false);
            handleClickDetailModal();
          }}
          navBarHeight={navBarHeight}
        >
          <DetailCard
            onClick={(e) => {
              handleClickDetailCard(e);
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

const HalfHotCityMask = styled.div`
  background-color: black;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 8px;
  left: 7px;
  width: calc(100% - 16px);
  height: calc(100% - 14px);
  opacity: 0.3;
  z-index: 1;
`;

const FoodCard = styled(CardSm)``;

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

const HalfHotCityInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  top: 14px;
  left: 12px;
  width: calc(100% - 24px);
  height: calc(100% - 28px);
  opacity: 0.3;
  z-index: 1;
`;

const HotCityName = styled.p`
  color: ${__FFF__()};
  font-size: 20px;
  font-weight: 300;
  word-break: keep-all;
`;

const HotCityInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 2;
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
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HalfHotCityBoard = styled(Board)`
  position: relative;
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
