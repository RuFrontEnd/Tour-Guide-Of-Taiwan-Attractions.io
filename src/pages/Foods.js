import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { counties } from "variable/variable";
import { getHotels } from "api/hotels";
import { getFoods } from "api/foods";
import { pushSearchParamAndPushUrl } from "utils/url";
import { ReactComponent as Rectangle } from "assets/rectangle.svg";
import HotItems from "layouts/HotItems";

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

const Foods = (props) => {
  // 篩選條件
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [keyword, setKeyword] = useState("");
  // 顯示資料
  const [hotHotels, setHotHotels] = useState([]);
  const [hotFoods, setHotFoods] = useState([]);
  const [modalInfo, setModalInfo] = useState([]);
  // 顯示狀態
  const [isLoading, setIsLoading] = useState(true);
  const [isShowDetail, setIsShowDetail] = useState(false);

  const putHotHotelInfosToDetailModal = (e) => {
    const targetId = Number(e.currentTarget.dataset.id);
    const _title = hotHotels[targetId]?.HotelName || "";
    const _description = hotHotels[targetId]?.Description || "";
    const _time = hotHotels[targetId]?.OpenTime || "24小時開放";
    const _fee = hotHotels[targetId]?.Spec || "暫無資訊";
    const _area = hotHotels[targetId]?.Address || "請聯絡主辦方詢問地點";
    const _tel = hotHotels[targetId]?.Phone || "暫無資訊";
    const filterPictureKeys = Object.keys(hotHotels[targetId]?.Picture).filter(
      (key) => key.match(/PictureUrl[0-9]+/)
    );
    const _images = filterPictureKeys.map((filterPictureKey) => {
      return {
        src: hotHotels[targetId].Picture[filterPictureKey],
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

  const putHotFoodsInfosToDetailModal = (e) => {
    const targetId = Number(e.currentTarget.dataset.id);
    const _title = hotFoods[targetId].Name || "";
    const _description = hotFoods[targetId]?.Description || "";
    const _time = hotFoods[targetId]?.OpenTime || "暫無資訊";
    const _fee = hotFoods[targetId]?.Class || "其他";
    const _area = hotFoods[targetId]?.Address || "請聯絡主辦方詢問地點";
    const _tel = hotFoods[targetId]?.Phone || "暫無資訊";
    const filterPictureKeys = Object.keys(hotFoods[targetId].Picture).filter(
      (key) => key.match(/PictureUrl[0-9]+/)
    );
    const _images = filterPictureKeys.map((filterPictureKey) => {
      return {
        src: hotFoods[targetId].Picture[filterPictureKey],
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
    pushSearchParamAndPushUrl(
      [
        { key: "keyword", value: keyword },
        { key: "category", value: selectedCategories },
        { key: "city", value: selectedCity },
      ],
      `${window.location.origin}/foods/filter`
    );
  };

  const HotItemsProps = {
    isWaiting: isLoading,
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
    citySwiperInfos: {
      path: `${window.location.origin}/foods/filter`,
    },
    lCardsInfos: {
      title: "熱門住宿",
      icon: <Rectangle />,
      spots: hotHotels,
      buttonText: "活動詳情",
      onClickButton: putHotHotelInfosToDetailModal,
      countOfWaitingCard: 4,
    },
    sCardsInfos: {
      title: "熱門美食",
      icon: <Rectangle />,
      spots: hotFoods,
      onClickButton: putHotFoodsInfosToDetailModal,
      countOfWaitingCard: 10,
    },
    modalInfos: {
      isShowDetail: isShowDetail,
      setIsShowDetail: setIsShowDetail,
      infos: modalInfo,
    },
  };

  useEffect(() => {
    getHotels().then((_activities) => {
      let pictureOwnedActivities = _activities.filter((_activitiy) => {
        return JSON.stringify(_activitiy.Picture) !== "{}";
      });

      let _hotActivities = [
        pictureOwnedActivities[18],
        pictureOwnedActivities[2111],
        pictureOwnedActivities[3218],
        pictureOwnedActivities[3570],
      ];

      setHotHotels(_hotActivities);
    });

    getFoods().then((_scenicSpots) => {
      let pictureOwnedScenicSpots = _scenicSpots.filter((_scenicSpot) => {
        return JSON.stringify(_scenicSpot.Picture) !== "{}";
      });

      let _hotScenicSpots = [
        pictureOwnedScenicSpots[12],
        pictureOwnedScenicSpots[104],
        pictureOwnedScenicSpots[208],
        pictureOwnedScenicSpots[412],
        pictureOwnedScenicSpots[518],
        pictureOwnedScenicSpots[669],
        pictureOwnedScenicSpots[742],
        pictureOwnedScenicSpots[847],
        pictureOwnedScenicSpots[960],
        pictureOwnedScenicSpots[1204],
      ];

      setHotFoods(_hotScenicSpots);
    });
  }, []);

  useEffect(() => {
    if (hotHotels.length !== 0 && hotFoods.length !== 0)
      setTimeout(() => {
        setIsLoading(false);
      }, 1 * 1000);
  }, [hotHotels, hotFoods]);

  return <HotItems {...HotItemsProps} />;
};

export default withRouter(Foods);
