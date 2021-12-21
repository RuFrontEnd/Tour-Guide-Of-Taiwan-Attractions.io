import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { ReactComponent as Rectangle } from "assets/rectangle.svg";
import FilterItems from "layouts/FilterItems";
import { counties } from "variable/variable";
import { getCityHotels } from "api/hotels";
import { getCityFoods } from "api/foods";
import { pushSearchParam } from "utils/url";

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

const FoodsFilter = (props) => {
  const { history } = props;
  // 篩選相關state
  const [keyword, setKeyword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null); // 下拉選單選擇的城市
  const [qureyParams, setQureyParams] = useState([]);
  // 活動相關 state
  const [totalActivities, setTotalActivities] = useState([]);
  const [activitiesPage, setActivitiesPage] = useState(0);
  const [cityActivities, setCityActivities] = useState([]);
  // 景點相關 state
  const [totalScenicSpots, setTotalScenicSpots] = useState([]);
  const [scenicSpotsPage, setScenicSpotsPage] = useState(1);
  const [cityScenicSpots, setCityScenicSpots] = useState([]);
  // modal詳細資訊
  const [modalInfo, setModalInfo] = useState([]);
  // 顯示狀態
  const [isLoading, setIsLoading] = useState(true);
  const [isShowDetail, setIsShowDetail] = useState(false);

  const getFilterStateFromSearchParam = () => {
    const urlSearchParams = getParamsFromUrl();
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
    const _title = cityActivities[targetId].HotelName || "暫無";
    const _description = cityActivities[targetId].Description;
    const _time = "永久開放";
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
    console.log("cityScenicSpots", cityScenicSpots);
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

  const handleSearch = () => {
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
  };

  const filterItemsProps = {
    isWaiting: isLoading,
    setIsWaiting: setIsLoading,
    searchInfos: {
      categories: categories,
      counties: countiesOptions,
      selectedCategories: selectedCategories,
      setSelectedCategories: setSelectedCategories,
      selectedCity: selectedCity,
      setSelectedCity: setSelectedCity,
      keyword: keyword,
      setKeyword: setKeyword,
      onClickSearchButton: handleSearch,
    },
    firstSmCardsInfos: {
      title:'住宿',
      icon: <Rectangle />,
      spots: cityActivities,
      setSpots: setCityActivities,
      onClickCard: putCityActivityInfosToDetailModal,
      countOfWaitingCard: 20,
    },
    secondSmCardsInfos: {
      title:'美食',
      icon: <Rectangle />,
      spots: cityScenicSpots,
      setSpots: setCityScenicSpots,
      onClickCard: putCityScenicspotInfosToDetailModal,
      countOfWaitingCard: 20,
    },
    modalInfos: {
      isShowDetail: isShowDetail,
      setIsShowDetail: setIsShowDetail,
      infos: modalInfo,
    },
  };

  useEffect(() => {
    history.listen(() => {
      getFilterStateFromSearchParam();
    }); // 監聽上一頁 / 下一頁
    getFilterStateFromSearchParam();
  }, []);

  useEffect(() => {
    if (selectedCity === null) return;
    getCityHotels(selectedCity).then((data) => {
      const _totalActivities = data.filter(
        (item) =>
          item.Picture.hasOwnProperty("PictureUrl1") &&
          item.hasOwnProperty("City")
      );
      setTotalActivities(_totalActivities);
      let _cityActivities = [];
      if (data.length !== 0 && !qureyParams.keyword) {
        _cityActivities = _totalActivities.slice(
          (scenicSpotsPage - 1) * 20,
          scenicSpotsPage * 20
        );
      } // 篩選城市
      if (data.length !== 0 && qureyParams.keyword) {
        _cityActivities = _totalActivities
          .filter((_totalActivities) =>
            _totalActivities.HotelName.includes(qureyParams.keyword)
          )
          .slice((scenicSpotsPage - 1) * 20, scenicSpotsPage * 20);
      } // 搜尋功能
      setCityActivities(_cityActivities);
    }); // 接活動資料

    getCityFoods(selectedCity).then((data) => {
      const _totalScenicSpots = data.filter(
        (item) =>
          item.Picture.hasOwnProperty("PictureUrl1") &&
          item.hasOwnProperty("City")
      );
      setTotalScenicSpots(_totalScenicSpots);
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
            _totalScenicSpot.Name.includes(qureyParams.keyword)
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

  return <FilterItems {...filterItemsProps} />;
};

export default withRouter(FoodsFilter);
