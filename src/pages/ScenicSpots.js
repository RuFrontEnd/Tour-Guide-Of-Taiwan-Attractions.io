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

window.addEventListener("hashchange", function (e) {
  console.log("a");
});

window.addEventListener("locationchange", function () {
  console.log("location changed!");
});

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

export const getEngCountyName = (cityName) => {
  console.log("cityName", cityName);
  let engCountyName = "";
  if (cityName.match(/台北市/)) {
    engCountyName = "Taipei";
  }
  if (cityName.match(/桃園市/)) {
    engCountyName = "Taoyuan";
  }
  if (cityName.match(/新竹市/)) {
    engCountyName = "Hsinchu";
  }
  if (cityName.match(/新北市/)) {
    engCountyName = "NewTaipei";
  }
  if (cityName.match(/嘉義縣/)) {
    engCountyName = "Chiayi";
  }
  if (cityName.match(/南投縣/)) {
    engCountyName = "Nantou";
  }
  if (cityName.match(/台中市/)) {
    engCountyName = "Taichung";
  }
  if (cityName.match(/高雄市/)) {
    engCountyName = "Kaohsiung";
  }
  if (cityName.match(/屏東縣/)) {
    engCountyName = "Pingtung";
  }
  if (cityName.match(/台南市/)) {
    engCountyName = "Tainan";
  }
  if (cityName.match(/花蓮縣/)) {
    engCountyName = "Hualien";
  }
  if (cityName.match(/台東縣/)) {
    engCountyName = "Taoyuan";
  }
  if (cityName.match(/宜蘭縣/)) {
    engCountyName = "Yilan";
  }
  if (cityName.match(/苗栗縣/)) {
    engCountyName = "Miaoli";
  }
  if (cityName.match(/雲林縣/)) {
    engCountyName = "Yunlin";
  }
  if (cityName.match(/彰化縣/)) {
    engCountyName = "Changhua";
  }
  if (cityName.match(/澎湖縣/)) {
    engCountyName = "Penghu";
  }
  if (cityName.match(/金門縣/)) {
    engCountyName = "Kinmen";
  }
  if (cityName.match(/連江縣/)) {
    engCountyName = "Mazu";
  }
  console.log("engCountyName", engCountyName);
  return engCountyName;
};

export const pushToSelectedCity = (history, setSelectedCity, cityName) => {
  console.log("location", window.location);
  const urlRegex = /city_en=[A-Za-z]+&&city_zh=[\w\W]+/;

  const hasUrlParams = urlRegex.test(window.location.search);
  console.log("hasUrlParams", hasUrlParams);
  let pushToUrl = "";
  if (hasUrlParams) {
    console.log("true");
    pushToUrl = window.location.href.replace(
      urlRegex,
      `city_en=${getEngCountyName(cityName)}&&city_zh=${cityName}`
    );
  }
  console.log("pushToUrl", pushToUrl);
  // history.push(
  //   `${window.location.pathname}?city_en=${getEngCountyName(
  //     cityName
  //   )}&&city_zh=${cityName}`
  // );

  setSelectedCity(cityName);
};

// export const pushToSelectedCity = (history, setSelectedCity, cityName) => {
//   console.log("window.location.search", window.location.search);
//   const urlRegex = /city_en=[A-Za-z]+&&city_zh=[\w\W]+/;
//   const hasUrlParams = /city_en=[A-Za-z]+&&city_zh=[\w\W]+/.test(window.location.search);
//   const test = /city_en=[A-Za-z]+&&city_zh=[\w\W]+/.test(window.location.search);
//   console.log('hasUrlParams',hasUrlParams)
//   console.log('test',test)
//   let pushToUrl = "";
//   if (hasUrlParams) {

//     pushToUrl = window.location.href.replace(
//       urlRegex,
//       `city_en=${getEngCountyName(cityName)}&&city_zh=${cityName}`
//     );
//     console.log('pushToUrl',pushToUrl)
//   }
// //  if(!hasUrlParams){
// //   pushToUrl=
// //  }

//   setSelectedCity(cityName);
// };

console.log("location", window.location);

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

  useEffect(() => {
    getActivities().then((_activities) => {
      setActivities(_activities);

      let pictureOwnedActivities = _activities.filter((_activitiy) => {
        return JSON.stringify(_activitiy.Picture) !== "{}";
      });

      let _hotActivities = [
        pictureOwnedActivities[0],
        pictureOwnedActivities[55],
        pictureOwnedActivities[97],
        pictureOwnedActivities[103],
      ];

      setHotActivities(_hotActivities);
    });

    getScenicSpots().then((_scenicSpots) => {
      setScenicSpots(_scenicSpots);

      let pictureOwnedScenicSpots = _scenicSpots.filter((_scenicSpot) => {
        return JSON.stringify(_scenicSpot.Picture) !== "{}";
      });

      let _hotScenicSpots = [
        pictureOwnedScenicSpots[105],
        pictureOwnedScenicSpots[637],
        pictureOwnedScenicSpots[842],
        pictureOwnedScenicSpots[848],
        pictureOwnedScenicSpots[909],
        pictureOwnedScenicSpots[1849],
        pictureOwnedScenicSpots[1868],
        pictureOwnedScenicSpots[2183],
        pictureOwnedScenicSpots[2368],
        pictureOwnedScenicSpots[2500],
      ];

      setHotScenicSpots(_hotScenicSpots);
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

  // useEffect(() => {
  //   history.listen(() => {
  //     console.log('qurey.get("city_zh")', qurey.get("city_zh"));
  //     !qurey.get("city_zh") && setSelectedCity("");
  //     qurey.get("city_zh") && setSelectedCity(qurey.get("city_zh"));
  //   });
  // }, []);

  qurey.get("city_zh");

  useEffect(() => {
    console.log("qurey.get('city_zh')", qurey.get("city_zh"));
  }, []);

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
        onCatgoreyChange={(e) => {
          history.push(
            `${path[0]}?city_en=${getEngCountyName(e.target.value)}&&city_zh=${
              e.target.value
            }`
          );
        }}
        onCountiesChange={(e) => {
          pushToSelectedCity(history, setSelectedCity, e.target.value);
        }}
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
        onClickButton={() => {
          setIsShowDetail(true);
        }}
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
          display:
            selectedCity && selectedCategories !== "景點" ? "block" : "none",
        }}
        title={`${selectedCity === "不分縣市" ? "" : selectedCity} 活動`}
        icon={<Triangle />}
        spots={hotScenicSpots}
      />

      <ScenicSpotSmCards
        style={{
          display:
            selectedCity && !selectedCategories !== "活動" ? "block" : "none",
        }}
        title={`${selectedCity === "不分縣市" ? "" : selectedCity} 景點`}
        icon={<Triangle />}
        spots={activities}
      />

      <DetailModal
        isShowDetail={isShowDetail}
        setIsShowDetail={setIsShowDetail}
      />
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
