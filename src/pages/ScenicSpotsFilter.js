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
import SearchTool from "layouts/SearchTool";
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
import { getCityActivities } from "api/activities";
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

const countOfWaitingCard = 20;

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

export const getParamsFromUrl = () => {
  const searchParams = new URLSearchParams(window.location.search.slice("1"));
  const _keyword = searchParams.get("keyword");
  const _category = searchParams.get("category");
  const _city = searchParams.get("city");
  return {
    keyword: _keyword,
    category: _category,
    city: _city,
  };
};

const ScenicSpots = (props) => {
  const { history, location } = props;
  const qurey = useQuery();
  const navBarHeight = useSelector((state) => state.navBar.height);
  // 篩選相關state
  const [keyword, setKeyword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null); // 下拉選單選擇的城市
  const [qureyParams, setQureyParams] = useState([]);
  // 活動相關 state
  const [totalActivities, setTotalActivities] = useState([]);
  const [activitiesPage, setActivitiesPage] = useState(0);
  const [totalActivitiesPages, setTotalActivitiesPages] = useState(0);
  const [cityActivities, setCityActivities] = useState([]);
  // 景點相關 state
  const [totalScenicSpots, setTotalScenicSpots] = useState([]);
  const [scenicSpotsPage, setScenicSpotsPage] = useState(1);
  const [totalScenicSpotsPages, setTotalScenicSpotsPages] = useState(0);
  const [cityScenicSpots, setCityScenicSpots] = useState([]);
  // modal詳細資訊
  const [modalInfo, setModalInfo] = useState([]);
  // 顯示狀態
  const [isLoading, setIsLoading] = useState(true);
  const [isShowDetail, setIsShowDetail] = useState(false);

  const getFilterStateFromSearchParam = () => {
    const urlSearchParams = getParamsFromUrl();
    console.log("urlSearchParams", urlSearchParams);
    setKeyword(urlSearchParams.keyword);
    setSelectedCategories(urlSearchParams.category);
    setSelectedCity(urlSearchParams.city);
    setScenicSpotsPage(1);
    setActivitiesPage(1);
    setQureyParams({
      keyword: urlSearchParams.keyword,
      category: urlSearchParams.category,
      city: urlSearchParams.city,
    });
  };

  const putCityActivityInfosToDetailModal = (e) => {
    const targetId = Number(e.currentTarget.dataset.id);
    const _title = cityActivities[targetId].ActivityName || "暫無";
    const _description = cityActivities[targetId].Description;
    const _time =
      `${cityActivities[targetId].StartTime.slice(0, 10)} - ${cityActivities[
        targetId
      ].EndTime.slice(0, 10)}` || "暫無";
    const _fee = "免費";
    const _area = cityActivities[targetId].Address || "暫無";
    const _tel = cityActivities[targetId].Phone || "暫無";
    const filterPictureKeys = Object.keys(
      cityActivities[targetId].Picture
    ).filter((key) => key.match(/PictureUrl[0-9]+/));
    const _images = filterPictureKeys.map((filterPictureKey) => {
      return {
        src: cityActivities[targetId].Picture[filterPictureKey],
        alt: "圖片",
      };
    });

    setIsShowDetail(true);
    setModalInfo({
      title: _title,
      description: _description,
      time: _time,
      fee: _fee,
      area: _area,
      tel: _tel,
      images: _images,
    });
  };

  const putCityScenicspotInfosToDetailModal = (e) => {
    const targetId = Number(e.currentTarget.dataset.id);
    const _title = cityScenicSpots[targetId].Name || "暫無";
    const _description = cityScenicSpots[targetId].Description;
    const _time = "永久開放";
    const _fee = "免費";
    const _area = cityScenicSpots[targetId].Address || "暫無";
    const _tel = cityScenicSpots[targetId].Phone || "暫無";
    const filterPictureKeys = Object.keys(
      cityScenicSpots[targetId].Picture
    ).filter((key) => key.match(/PictureUrl[0-9]+/));
    const _images = filterPictureKeys.map((filterPictureKey) => {
      return {
        src: cityScenicSpots[targetId].Picture[filterPictureKey],
        alt: "圖片",
      };
    });

    setIsShowDetail(true);
    setModalInfo({
      title: _title,
      description: _description,
      time: _time,
      fee: _fee,
      area: _area,
      tel: _tel,
      images: _images,
    });
  };

  useEffect(() => {
    history.listen(() => {
      getFilterStateFromSearchParam();
    }); // 監聽上一頁 / 下一頁
    getFilterStateFromSearchParam();
  }, []);

  useEffect(() => {
    if (selectedCity === null) return;
    getCityActivities(selectedCity).then((data) => {
      const _totalActivities = data.filter(
        (item) =>
          item.Picture.hasOwnProperty("PictureUrl1") &&
          item.hasOwnProperty("City")
      );
      setTotalActivities(_totalActivities);
      setTotalActivitiesPages(Math.ceil(_totalActivities.length / 20));
      let _cityActivities = [];
      if (data.length !== 0 && !qureyParams.keyword) {
        _cityActivities = _totalActivities.slice(
          (scenicSpotsPage - 1) * 20,
          scenicSpotsPage * 20
        );
      } // 篩選城市
      if (data.length !== 0 && qureyParams.keyword) {
        _cityActivities = _totalActivities
          .filter((_totalActivities) => {
            return _totalActivities.ActivityName.includes(qureyParams.keyword);
          })
          .slice((scenicSpotsPage - 1) * 20, scenicSpotsPage * 20);
      } // 搜尋功能
      setCityActivities(_cityActivities);
    }); // 接活動資料

    getCityScenicSpots(selectedCity).then((data) => {
      const _totalScenicSpots = data.filter(
        (item) =>
          item.Picture.hasOwnProperty("PictureUrl1") &&
          item.hasOwnProperty("City")
      );
      setTotalScenicSpots(_totalScenicSpots);
      setTotalScenicSpotsPages(Math.ceil(_totalScenicSpots.length / 20));
      let _cityScenicSpots = [];
      if (data.length !== 0 && !qureyParams.keyword) {
        _cityScenicSpots = _totalScenicSpots.slice(
          (scenicSpotsPage - 1) * 20,
          scenicSpotsPage * 20
        );
      } // 篩選城市
      if (data.length !== 0 && qureyParams.keyword) {
        _cityScenicSpots = _totalScenicSpots
          .filter((_totalScenicSpot) =>
            _totalScenicSpot.ScenicSpotName.includes(qureyParams.keyword)
          )
          .slice((scenicSpotsPage - 1) * 20, scenicSpotsPage * 20);
      } // 搜尋功能
      setCityScenicSpots(_cityScenicSpots);
    }); // 接景點資料

    setTimeout(() => {
      setIsLoading(false);
    }, 1 * 1000);
  }, [qureyParams]);

  useEffect(() => {
    pushSearchParam([{ key: "scenicSpotsPage", value: scenicSpotsPage }]);
    if (selectedCity === null) return;
    const _activities = totalActivities?.slice(
      (scenicSpotsPage - 1) * 20,
      scenicSpotsPage * 20
    );
    setCityActivities(_activities);
    const _cityScenicSpots = totalScenicSpots?.slice(
      (scenicSpotsPage - 1) * 20,
      scenicSpotsPage * 20
    );
    setCityScenicSpots(_cityScenicSpots);
  }, [scenicSpotsPage]);

  useEffect(() => {
    pushSearchParam([{ key: "activitiesPage", value: activitiesPage }]);
    if (selectedCity === null) return;
    const _activities = totalActivities?.slice(
      (activitiesPage - 1) * 20,
      activitiesPage * 20
    );
    setCityActivities(_activities);
  }, [activitiesPage]);

  useEffect(() => {
    console.log("cityActivities", cityActivities);
  }, [cityActivities]);

  return (
    <SearchLayout
      categories={categories}
      counties={countiesOptions}
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
      selectedCity={selectedCity}
      setSelectedCity={setSelectedCity}
      keyword={keyword}
      setKeyword={setKeyword}
      onClickSearchButton={() => {
        setIsLoading(true);
        pushSearchParam([
          { key: "keyword", value: keyword },
          { key: "category", value: selectedCategories },
          { key: "city", value: selectedCity },
          { key: "scenicSpotsPage", value: scenicSpotsPage },
          { key: "activitiesPage", value: activitiesPage },
        ]);
        setQureyParams({
          keyword: keyword,
          category: selectedCategories,
          city: selectedCity,
        });
        setScenicSpotsPage(1);
      }}
    >
      <Activity
        style={{
          display: qureyParams.category === "scenicSpot" ? "none" : "block",
        }}
      >
        <ActivitySmCards
          title={`${
            qureyParams.city === "不分縣市" ? "" : qureyParams.city
          } 活動`}
          icon={<Triangle />}
          spots={cityActivities}
          onClick={(e) => {
            putCityActivityInfosToDetailModal(e);
          }}
          isWaiting={isLoading}
          countOfWaitingCard={countOfWaitingCard}
        />
        {cityActivities.length !== 0 && (
          <Paginate
            count={totalActivitiesPages}
            previousIcon={Arrow}
            nextIcon={ArrowRight}
            setPage={setActivitiesPage}
            page={activitiesPage}
          />
        )}
      </Activity>

      <ScenicSpot
        style={{
          display: qureyParams.category === "activity" ? "none" : "block",
        }}
      >
        <ScenicSpotSmCards
          title={`${
            qureyParams.city === "不分縣市" ? "" : qureyParams.city
          } 景點`}
          icon={<Triangle />}
          spots={cityScenicSpots}
          onClick={(e) => {
            putCityScenicspotInfosToDetailModal(e);
          }}
          isWaiting={isLoading}
          countOfWaitingCard={countOfWaitingCard}
        />
        {cityScenicSpots.length !== 0 && (
          <Paginate
            count={totalScenicSpotsPages}
            previousIcon={Arrow}
            nextIcon={ArrowRight}
            setPage={setScenicSpotsPage}
            page={scenicSpotsPage}
          />
        )}
      </ScenicSpot>

      <DetailModal
        isShowDetail={isShowDetail}
        setIsShowDetail={setIsShowDetail}
        info={modalInfo}
      >
        {modalInfo.description}
      </DetailModal>
    </SearchLayout>
  );
};

const Paginate = styled(Pagination)`
  display: flex;
  justify-content: center;
`;

const ScenicSpotSmCards = styled(SmallCards)``;

const ScenicSpot = styled.section``;

const ActivitySmCards = styled(SmallCards)``;

const Activity = styled.section``;

const NavBarHeight = styled.div`
  height: ${(props) => props.height}px;
`;

const SearchLayout = styled(SearchTool)`
  padding-bottom: 50px;

  #Tool-Title {
    @media (max-width: 992px) {
      display: none;
    }
  }

  #Tool-LandingImgBox {
    @media (max-width: 992px) {
      margin-bottom: 35px;
    }
  }
`;

export default withRouter(ScenicSpots);
