import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { ReactComponent as Rectangle } from "assets/rectangle.svg";
import FilterItems from "layouts/FilterItems";
import { getCityHotels } from "api/hotels";
import { getCityFoods } from "api/foods";

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
  const [cityActivities, setCityActivities] = useState([]);
  // 景點相關 state
  const [cityScenicSpots, setCityScenicSpots] = useState([]);
  // modal詳細資訊
  const [modalInfo, setModalInfo] = useState([]);
  // 顯示狀態
  const [isFirstCardsLoading, setIsFirstCardsLoading] = useState(true);
  const [isSecondCardsLoading, setIsSecondCardsLoading] = useState(true);
  const [isShowDetail, setIsShowDetail] = useState(false);

  const putCityActivityInfosToDetailModal = (e) => {
    const targetId = Number(e.currentTarget.dataset.id);
    const _title = cityActivities[targetId]?.HotelName || "";
    const _description = cityActivities[targetId]?.Description || "";
    const _time = cityActivities[targetId]?.OpenTime || "24小時開放";
    const _fee = cityActivities[targetId]?.Spec || "免費";
    const _area = cityActivities[targetId]?.Address || "請聯絡主辦方詢問地點";
    const _tel = cityActivities[targetId]?.Phone || "暫無資訊";
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
    const _title = cityScenicSpots[targetId].Name || "";
    const _description = cityScenicSpots[targetId].Description || "";
    const _time = cityScenicSpots[targetId]?.OpenTime || "暫無資訊";
    const _fee = cityScenicSpots[targetId]?.Class || "其他";
    const _area = cityScenicSpots[targetId]?.Address || "請聯絡主辦方詢問地點";
    const _tel = cityScenicSpots[targetId]?.Phone || "暫無資訊";
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

  const filterItemsProps = {
    firstSmCardsInfos: {
      isWaiting: isFirstCardsLoading,
      setIsWaiting: setIsFirstCardsLoading,
      title: "住宿",
      icon: <Rectangle />,
      spots: cityActivities,
      setSpots: setCityActivities,
      onClickCard: putCityActivityInfosToDetailModal,
      countOfWaitingCard: 20,
      getData: getCityHotels,
    },
    secondSmCardsInfos: {
      isWaiting: isSecondCardsLoading,
      setIsWaiting: setIsSecondCardsLoading,
      title: "美食",
      icon: <Rectangle />,
      spots: cityScenicSpots,
      setSpots: setCityScenicSpots,
      onClickCard: putCityScenicspotInfosToDetailModal,
      countOfWaitingCard: 20,
      getData: getCityFoods,
    },
    modalInfos: {
      isShowDetail: isShowDetail,
      setIsShowDetail: setIsShowDetail,
      infos: modalInfo,
    },
  };

  return <FilterItems {...filterItemsProps} />;
};

export default withRouter(FoodsFilter);
