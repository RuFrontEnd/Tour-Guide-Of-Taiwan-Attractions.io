import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import { __FFF__, __FF1D6C__, __FFB72C__, __D2D2D2__ } from "variable/variable";
import SmallCards from "layouts/SmallCards";
import DetailModal from "layouts/DetailModal";
import Cards from "layouts/Cards";
import SearchTool from "layouts/SearchTool";
import CityCarousel from "layouts/CityCarousel";
import { counties } from "variable/variable";
import { getScenicSpots } from "api/scenicSpots";
import { getActivities } from "api/activities";
import { pushSearchParamAndPushUrl } from "utils/url";

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
  const navBarHeight = useSelector((state) => state.navBar.height);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [hotScenicSpots, setHotScenicSpots] = useState([]);
  const [hotActivities, setHotActivities] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [modalInfo, setModalInfo] = useState([]);

  const putHotActivityInfosToDetailModal = (e) => {
    const targetId = Number(e.currentTarget.dataset.id);
    const _title = hotActivities[targetId].ActivityName || "暫無";
    const _time =
      `${hotActivities[targetId].StartTime.slice(0, 10)} - ${hotActivities[
        targetId
      ].EndTime.slice(0, 10)}` || "暫無";
    const _fee = "免費";
    const _area = hotActivities[targetId].Address || "暫無";
    const _tel = hotActivities[targetId].Phone || "暫無";
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
      time: _time,
      fee: _fee,
      area: _area,
      tel: _tel,
      images: _images,
    });
  };

  const putHotScenicspotInfosToDetailModal = (e) => {
    const targetId = Number(e.currentTarget.dataset.id);
    const _title = hotScenicSpots[targetId].Name || "暫無";
    const _description = hotScenicSpots[targetId].DescriptionDetail;
    const _time = "永久開放";
    const _fee = "免費";
    const _area = hotScenicSpots[targetId].Address || "暫無";
    const _tel = hotScenicSpots[targetId].Phone || "暫無";
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

  console.log("modalInfo", modalInfo);

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
        pushSearchParamAndPushUrl(
          [
            { key: "keyword", value: keyword },
            { key: "category", value: selectedCategories },
            { key: "city", value: selectedCity },
          ],
          `${window.location.origin}/scenicspots/filter`
        );
      }}
    >
      <CitySwiper
        setSelected={setSelectedCity}
        onClickBoard={(e) => {
          pushSearchParamAndPushUrl(
            [{ key: "city", value: e.currentTarget.dataset.value }],
            `${window.location.origin}/scenicspots/filter`
          );
        }}
      />
      <HotActivitiesCards
        title="熱門活動"
        activities={hotActivities}
        buttonText={"活動詳情"}
        onClickButton={(e) => {
          putHotActivityInfosToDetailModal(e);
        }}
      />
      <HotScenicSpotSmCards
        title="熱門景點"
        spots={hotScenicSpots}
        onClick={(e) => {
          putHotScenicspotInfosToDetailModal(e);
        }}
      />
      <InfoModal
        isShowDetail={isShowDetail}
        setIsShowDetail={setIsShowDetail}
        info={modalInfo}
      >
        {modalInfo.description}
      </InfoModal>
    </SearchLayout>
  );
};

const InfoModal = styled(DetailModal)`
`;

const HotScenicSpotSmCards = styled(SmallCards)``;

const HotActivitiesCards = styled(Cards)``;

const SearchLayout = styled(SearchTool)`
  padding-bottom: 50px;
`;

const CitySwiper = styled(CityCarousel)`
  margin-bottom: 60px;
`;

export default withRouter(ScenicSpots);
