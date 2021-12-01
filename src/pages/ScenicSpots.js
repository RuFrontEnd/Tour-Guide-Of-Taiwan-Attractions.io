import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import { __FFF__, __FF1D6C__, __FFB72C__, __D2D2D2__ } from "variable/variable";
import SmallCards from "layouts/SmallCards";
import DetailModal from "layouts/DetailModal";
import Cards from "layouts/Cards";
import Tool from "layouts/Tool";
import CityCarousel from "layouts/CityCarousel";
import Background from "layouts/Background";
import { counties } from "variable/variable";
import { getScenicSpots } from "api/scenicSpots";
import { getActivities } from "api/activities";

const categories = [
  { value: "", content: "不分類別" },
  { value: "scenicSpot", content: "景點" },
  { value: "activity", content: "活動" },
];

const countiesOptions = counties.map((county) => {
  return {
    value: county.en,
    content: county.zh,
  };
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

const ScenicSpots = (props) => {
  const { history } = props;
  const navBarHeight = useSelector((state) => state.navBar.height);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [hotScenicSpots, setHotScenicSpots] = useState([]);
  const [hotActivities, setHotActivities] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    getActivities().then((_activities) => {
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

  return (
    <Background>
      <NavBarHeight height={navBarHeight} />
      <Tool
        categories={categories}
        counties={countiesOptions}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        onClickSearchButton={() => {
          history.push({
            pathname: "/scenicSpots/filter",
            search: `?category=${selectedCategories}&city=${selectedCity}&keyword=${keyword}`,
          });
        }}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <CityCarousel onClickBoard={(e) => {}} setSelected={setSelectedCity} />
      <HotActivitiesCards
        title="熱門活動"
        activities={hotActivities}
        buttonText={"活動詳情"}
        onClickButton={() => {
          setIsShowDetail(true);
        }}
      />
      <HotScenicSpotSmCards
        title="熱門景點"
        spots={hotScenicSpots}
        onClick={() => {
          setIsShowDetail(true);
          console.log("a");
        }}
      />
      <DetailModal
        isShowDetail={isShowDetail}
        setIsShowDetail={setIsShowDetail}
      />
    </Background>
  );
};

const HotScenicSpotSmCards = styled(SmallCards)``;

const HotActivitiesCards = styled(Cards)``;

const NavBarHeight = styled.div`
  height: ${(props) => props.height}px;
`;

export default withRouter(ScenicSpots);
