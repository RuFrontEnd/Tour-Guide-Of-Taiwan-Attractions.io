import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { counties } from "variable/variable";
import { getScenicSpots } from "api/scenicSpots";
import { getActivities } from "api/activities";
import { searchItems } from "utils/search";
import { ReactComponent as Triangle } from "assets/triangle_title.svg";
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

const ScenicSpots = (props) => {
  const { history } = props;
  // 篩選條件
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [keyword, setKeyword] = useState("");
  // 顯示資料
  const [hotScenicSpots, setHotScenicSpots] = useState([]);
  const [hotActivities, setHotActivities] = useState([]);
  const [modalInfo, setModalInfo] = useState([]);
  // 顯示狀態
  const [isLoading, setIsLoading] = useState(true);
  const [isShowDetail, setIsShowDetail] = useState(false);

  const putHotActivityInfosToDetailModal = (e) => {
    const targetId = Number(e.currentTarget.dataset.id);
    const _title = hotActivities[targetId]?.ActivityName || "";
    const _description = hotActivities[targetId]?.Description || "";
    const _time =
      `${hotActivities[targetId]?.StartTime?.slice(0, 10)} - ${hotActivities[
        targetId
      ]?.EndTime?.slice(0, 10)}` || "24小時開放";
    const _fee = hotActivities[targetId]?.Charge || "免費";
    const _area = hotActivities[targetId].Address || "請聯絡主辦方詢問地點";
    const _tel = hotActivities[targetId]?.Phone || "暫不提供";
    const filterPictureKeys = Object.keys(
      hotActivities[targetId].Picture
    ).filter((key) => key.match(/PictureUrl[0-9]+/));
    const _images = filterPictureKeys.map((filterPictureKey) => {
      return {
        src: hotActivities[targetId].Picture[filterPictureKey],
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

  const putHotScenicspotInfosToDetailModal = (e) => {
    const targetId = Number(e.currentTarget.dataset.id);
    const _title = hotScenicSpots[targetId]?.Name || "";
    const _description = hotScenicSpots[targetId]?.DescriptionDetail || "";
    const _time = hotScenicSpots[targetId]?.OpenTime || "24小時開放";
    const _fee = "免費";
    const _area = hotScenicSpots[targetId].Address || "請聯絡主辦方詢問地點";
    const _tel = hotScenicSpots[targetId]?.Phone || "暫無";
    const filterPictureKeys = Object.keys(
      hotScenicSpots[targetId].Picture
    ).filter((key) => key.match(/PictureUrl[0-9]+/));
    const _images = filterPictureKeys.map((filterPictureKey) => {
      return {
        src: hotScenicSpots[targetId].Picture[filterPictureKey],
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
    searchItems(
      "/scenicspots/filter",
      keyword,
      selectedCategories,
      selectedCity,
      history
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
      path: "/scenicspots/filter",
    },
    lCardsInfos: {
      title: "熱門活動",
      icon: <Triangle />,
      spots: hotActivities,
      spotName: "ActivityName",
      buttonText: "活動詳情",
      onClickButton: putHotActivityInfosToDetailModal,
      countOfWaitingCard: 4,
    },
    sCardsInfos: {
      title: "熱門景點",
      icon: <Triangle />,
      spots: hotScenicSpots,
      spotName: "ScenicSpotName",
      onClickButton: putHotScenicspotInfosToDetailModal,
      countOfWaitingCard: 10,
    },
    modalInfos: {
      isShowDetail: isShowDetail,
      setIsShowDetail: setIsShowDetail,
      infos: modalInfo,
    },
  };

  useEffect(() => {
    getActivities().then((_activities) => {
      let pictureOwnedActivities = _activities.filter((_activitiy) => {
        return JSON.stringify(_activitiy.Picture) !== "{}";
      }); // filter activities responses which picture has picture

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

  useEffect(() => {
    if (hotScenicSpots.length !== 0 && hotActivities.length !== 0)
      setTimeout(() => {
        setIsLoading(false);
      }, 1 * 1000);
  }, [hotScenicSpots, hotActivities]);

  return <HotItems {...HotItemsProps} />;
};

export default withRouter(ScenicSpots);
