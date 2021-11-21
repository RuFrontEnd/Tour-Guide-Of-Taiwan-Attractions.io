import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { withRouter, Link } from "react-router-dom";
import { path } from "variable/path";
import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { __FFF__, __FF1D6C__, __FFB72C__, __D2D2D2__ } from "variable/variable";
import { getAuthorizationHeader } from "variable/auth";
import { getRandomInt } from "utils/random";
import { useQuery } from "hooks/useQuery";
import { ReactComponent as WelcomeToTaiwan } from "assets/welcomeToTaiwan.svg";
import { ReactComponent as Search } from "assets/search.svg";
import { ReactComponent as Gps } from "assets/gps.svg";
import { ReactComponent as Location } from "assets/location.svg";
import { ReactComponent as Triangle } from "assets/triangle_title.svg";
import { ReactComponent as direction } from "assets/direction.svg";
import landing from "assets/landing.png";
import cardImg_tmp from "assets/cardImg_tmp.png";
import cardSmImg_tmp from "assets/cardSmImg_tmp.png";
import detailCard_tmp from "assets/detailCard_tmp.png";
import boardImg_tmp from "assets/boardImg_tmp.png";
import SmallCards from "layouts/SmallCards";
import DetailModal from "layouts/DetailModal";
import Cards from "layouts/Cards";
import Tool from "layouts/Tool";
import CityCarousel from "layouts/CityCarousel";
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

import { baseURL, counties } from "variable/variable";
import { getScenicSpots } from "api/scenicSpots";
import { getActivities } from "api/activities";
import { pipe } from "utils/pipe";
import { removeRepeatedValue, raisingSortValue } from "utils/array";
import { sortValue } from "utils/sort";

const categories = ["類別", "景點", "活動"];

export const handleClickActivityCard = () => {
  document.body.style.overflow = "hidden";
};

export const handleClickDetailModal = () => {
  document.body.style.overflow = "";
};

export const handleClickDetailCard = (e) => {
  e.stopPropagation();
};

export const getAddresses = (scenicSpots) =>
  scenicSpots.map((scenicSpot) =>
    scenicSpot.Address ? scenicSpot.Address.slice(0, 3) : ""
  );

export const filterCities = (addresses) =>
  addresses.filter((address) => address.match(/.{2}市/));

export const initNumOfOccurrence = (cities) =>
  cities.map((city) => {
    return {
      name: city,
      value: 0,
    };
  });

export const getNumOfCities = (cities, initNumOfCities) => {
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

export const descSortNumOfCites = (numOfCities) =>
  numOfCities.sort((prev, next) => next.value - prev.value);

export const getTopTenCities = (SortedNumOfCites) =>
  SortedNumOfCites.filter((SortedNumOfCity, index) => index < 10);

export const getCityName = (cityName) => {
  if (cityName === "新　竹") {
    return "新竹市 & 新竹縣";
  }
  return cityName;
};

export const getCountyName = (cityName) => {
  let county = {};
  console.log("cityName", cityName);
  if (cityName.match(/台　北/)) {
    county = { en: "Taipei", zh: "台北市" };
  }
  if (cityName.match(/桃　園/)) {
    county = { en: "Taoyuan", zh: "桃園市" };
  }
  if (cityName.match(/新　竹/)) {
    county = { en: "Hsinchu", zh: "新竹市" };
  }
  if (cityName.match(/新　北/)) {
    county = { en: "NewTaipei", zh: "新北市" };
  }
  if (cityName.match(/嘉　義/)) {
    county = { en: "Chiayi", zh: "嘉義縣" };
  }
  if (cityName.match(/南　投/)) {
    county = { en: "Nantou", zh: "南投縣" };
  }
  if (cityName.match(/台　中/)) {
    county = { en: "Taichung", zh: "台中市" };
  }
  if (cityName.match(/高　雄/)) {
    county = { en: "Kaohsiung", zh: "高雄市" };
  }
  if (cityName.match(/屏　東/)) {
    county = { en: "Pingtung", zh: "屏東縣" };
  }
  if (cityName.match(/台　南/)) {
    county = { en: "Tainan", zh: "台南市" };
  }
  if (cityName.match(/花　蓮/)) {
    county = { en: "Hualien", zh: "花蓮縣" };
  }
  if (cityName.match(/台　東/)) {
    county = { en: "Taoyuan", zh: "台東縣" };
  }
  if (cityName.match(/宜　蘭/)) {
    county = { en: "Yilan", zh: "宜蘭縣" };
  }
  if (cityName.match(/苗　栗/)) {
    county = { en: "Miaoli", zh: "苗栗縣" };
  }
  if (cityName.match(/雲　林/)) {
    county = { en: "Yunlin", zh: "雲林縣" };
  }
  if (cityName.match(/彰　化/)) {
    county = { en: "Changhua", zh: "彰化縣" };
  }
  if (cityName.match(/澎　湖/)) {
    county = { en: "Penghu", zh: "澎湖縣" };
  }
  if (cityName.match(/金　門/)) {
    county = { en: "Kinmen", zh: "金門縣" };
  }
  if (cityName.match(/馬　祖/)) {
    county = { en: "Mazu", zh: "連江縣" };
  }
  return county;
};

export const getFilterCityQureyString = (hotCityName) => {
  return `${path[0]}?city_en=${getCountyName(hotCityName).en}&&city_zh=${
    getCountyName(hotCityName).zh
  }`;
};

export const switchToSelectedCity = (history, setSelectedCity, cityName) => {
  history.push(getFilterCityQureyString(cityName));
  setSelectedCity(getCountyName(cityName).zh);
};

const ScenicSpots = (props) => {
  const { history, location } = props;
  const qurey = useQuery();
  const navBarHeight = useSelector((state) => state.navBar.height);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState("類別");
  const [selectedCity, setSelectedCity] = useState(qurey.get("city_zh")); // 下拉選單選擇的城市
  const [scenicSpots, setScenicSpots] = useState([]);
  const [cityScenicSpots, setCityScenicSpots] = useState([]);
  const [hotScenicSpots, setHotScenicSpots] = useState([]);
  const [activities, setActivities] = useState([]);
  const [hotActivities, setHotActivities] = useState([]);

  const filterCityScenicSpots = (hotCityName, scenicSpots) => {
    setSelectedCity(getCityName(hotCityName));

    let _cityScenicSpots = scenicSpots.filter((scenicSpot) => {
      return scenicSpot.Address?.slice(0, 3) === getCountyName(hotCityName);
    });
    setCityScenicSpots(_cityScenicSpots);
  };

  useEffect(() => {
    getActivities().then((_activities) => {
      console.log("_activities", _activities);
      setActivities(_activities);

      let _hotActivities = [];
      for (let i = 0; i < 4; i++) {
        let randomNum = getRandomInt(0, _activities.length);
        _hotActivities.push(_activities[randomNum]);
      }
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
    }
  }, [scenicSpots]);

  useEffect(() => {
    history.listen(() => {
      !qurey.get("city_zh") && setSelectedCity("");
    });
  }, []);

  useEffect(() => {
    console.log("selectedCity", selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    console.log("selectedCategories", selectedCategories);
  }, [selectedCategories]);

  useEffect(() => {
    console.log("activities", activities);
  }, [activities]);

  useEffect(() => {
    console.log("hotActivities", hotActivities);
  }, [hotActivities]);

  return (
    <Background>
      <NavBarHeight height={navBarHeight} />
      <Tool
        categories={categories}
        counties={counties}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      <CityCarousel
        style={{
          display: qurey.get("city_zh") && selectedCity ? "none" : "block",
        }}
        setSelected={setSelectedCity}
      />

      <HotActivitiesCards
        style={{
          display: qurey.get("city_zh") && selectedCity ? "none" : "block",
        }}
        title="熱門活動"
        activities={hotActivities}
        buttonText={"活動詳情"}
      />

      <HotScenicSpotSmCards
        style={{
          display: qurey.get("city_zh") && selectedCity ? "none" : "block",
        }}
        title={"熱門景點"}
        icon={<Triangle />}
        spots={hotScenicSpots}
      />

      <ActivitySmCards
        style={{
          display: selectedCategories === "景點" ? "none" : "block",
        }}
        title={`${selectedCity === "不分縣市" ? "" : selectedCity} 活動`}
        icon={<Triangle />}
        spots={hotScenicSpots}
      />

      {/* <ScenicSpotSmCards
        style={{
          display: selectedCategories === "活動" ? "none" : "block",
        }}
        title={`${selectedCity === "不分縣市" ? "" : selectedCity} 景點`}
        icon={<Triangle />}
        spots={activities}
      /> */}

      <DetailModal />
    </Background>
  );
};

const ScenicSpotSmCards = styled(SmallCards)``;

const ActivitySmCards = styled(SmallCards)``;

const HotScenicSpotSmCards = styled(SmallCards)``;

const HotActivitiesCards = styled(Cards)``;

const NavBarHeight = styled.div`
  height: ${(props) => props.height}px;
`;

export default withRouter(ScenicSpots);
