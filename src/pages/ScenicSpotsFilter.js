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
import { ReactComponent as Arrow } from "assets/arrow.svg";
import { ReactComponent as ArrowRight } from "assets/arrow_right.svg";
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
import Pagination from "components/Pagination";

import { baseURL, counties } from "variable/variable";
import { getCityScenicSpots } from "api/scenicSpots";
import { getActivities } from "api/activities";
import { pipe } from "utils/pipe";
import { pushSearchParam } from "utils/url";
import { removeRepeatedValue, raisingSortValue } from "utils/array";
import { sortValue } from "utils/sort";

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

export const searchAndFilter = (
  history,
  selectedCategories,
  selectedCity,
  keyword,
  setQureyParams
) => {
  history.push({
    pathname: "/scenicSpots/filter",
    search: `?category=${selectedCategories}&city=${selectedCity}`,
  });
  setQureyParams({
    category: selectedCategories,
    city: selectedCity,
  });
};

export const getParamsFromUrl = () => {
  const searchParams = new URLSearchParams(window.location.search.slice("1"));
  const _qureyCategory = searchParams.get("category");
  const _qureyCity = searchParams.get("city");
  return { qureyCategory: _qureyCategory, qureyCity: _qureyCity };
};

const ScenicSpots = (props) => {
  const { history, location } = props;
  const qurey = useQuery();
  const navBarHeight = useSelector((state) => state.navBar.height);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null); // 下拉選單選擇的城市
  const [totalScenicSpots, setTotalScenicSpots] = useState(0);
  const [scenicSpotsPage, setScenicSpotsPage] = useState(1);
  const [totalScenicSpotsPages, setTotalScenicSpotsPages] = useState(0);
  const [cityScenicSpots, setCityScenicSpots] = useState([]);
  const [activities, setActivities] = useState([]);
  const [qureyParams, setQureyParams] = useState([]);
  const [keyword, setKeyword] = useState("");

  const handleFilterState = () => {
    const parmas = getParamsFromUrl();
    setSelectedCategories(parmas.qureyCategory);
    setSelectedCity(parmas.qureyCity);
    setQureyParams({
      category: parmas.qureyCategory,
      city: parmas.qureyCity,
    });
  };

  useEffect(() => {
    history.listen(() => {
      handleFilterState();
    });
    handleFilterState();
  }, []);

  useEffect(() => {
    if (selectedCity === null) return;
    getCityScenicSpots(selectedCity).then((data) => {
      setTotalScenicSpotsPages(Math.ceil(data.length / 20));
      setTotalScenicSpots(data);
      const _cityScenicSpots = data.slice(
        (scenicSpotsPage - 1) * 20,
        scenicSpotsPage * 20
      );
      setCityScenicSpots(_cityScenicSpots);
    });
  }, [selectedCity]);

  useEffect(() => {
    pushSearchParam("scenicSpotsPage", scenicSpotsPage);
    // const searchParams = new URLSearchParams(window.location.search.slice("1"));
    // if (searchParams.has("scenicSpotsPage")) {
    //   searchParams.delete("scenicSpotsPage");
    //   history.push({
    //     pathname: "/scenicSpots/filter",
    //     search: `${searchParams}&scenicSpotsPage=${scenicSpotsPage}`,
    //   });
    // }
    // if (!searchParams.has("scenicSpotsPage")) {
    //   history.push({
    //     pathname: "/scenicSpots/filter",
    //     search: `${searchParams}&scenicSpotsPage=${scenicSpotsPage}`,
    //   });
    // }
    if (selectedCity === null) return;
    const _cityScenicSpots = totalScenicSpots.slice(
      (scenicSpotsPage - 1) * 20,
      scenicSpotsPage * 20
    );
    console.log("_cityScenicSpots", _cityScenicSpots);
    setCityScenicSpots(_cityScenicSpots);
  }, [scenicSpotsPage]);

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
          searchAndFilter(
            history,
            selectedCategories,
            selectedCity,
            "",
            setQureyParams
          );
        }}
        // onCatgoreyChange={(e) => {

        //   pushToSelectedCategorey(
        //     history,
        //     setSelectedCategories,
        //     e.target.value
        //   );
        // }}
        // onCountiesChange={(e) => {
        //   pushToSelectedCity(history, setSelectedCity, e.target.value);
        // }}
      />

      <ActivitySmCards
        // style={{
        //   display:
        //     selectedCity && selectedCategories !== "景點" ? "block" : "none",
        // }}
        title={`${selectedCity === "不分縣市" ? "" : selectedCity} 活動`}
        icon={<Triangle />}
        // spots={}
      />
      <Paginate
        count={totalScenicSpotsPages}
        previousIcon={Arrow}
        nextIcon={ArrowRight}
        setPage={setScenicSpotsPage}
      />

      <ScenicSpotSmCards
        // style={{
        //   display:
        //     selectedCity && !selectedCategories !== "活動" ? "block" : "none",
        // }}
        title={`${selectedCity === "不分縣市" ? "" : selectedCity} 景點`}
        icon={<Triangle />}
        spots={cityScenicSpots}
      />

      <DetailModal
        isShowDetail={isShowDetail}
        setIsShowDetail={setIsShowDetail}
      />
    </Background>
  );
};

const Paginate = styled(Pagination)`
  display: flex;
  justify-content: center;
`;

const ScenicSpotSmCards = styled(SmallCards)``;

const ActivitySmCards = styled(SmallCards)``;

const HotScenicSpotSmCards = styled(SmallCards)``;

const HotActivitiesCards = styled(Cards)``;

const NavBarHeight = styled.div`
  height: ${(props) => props.height}px;
`;

export default withRouter(ScenicSpots);
