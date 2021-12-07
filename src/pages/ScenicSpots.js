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

  useEffect(() => {
    console.log("hotActivities", hotActivities);
  }, [hotActivities]);

  useEffect(() => {
    console.log("hotScenicSpots", hotScenicSpots);
  }, [hotScenicSpots]);

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
        keyword={keyword}
        setKeyword={setKeyword}
        onClickSearchButton={() => {
          pushSearchParamAndPushUrl(
            [
              { key: "keyword", value: keyword },
              { key: "category", value: selectedCategories },
              { key: "city", value: selectedCity },
            ],
            `${window.location.origin}/scenicSpots/filter`
          );
        }}
      />
      <CityCarousel
        setSelected={setSelectedCity}
        onClickBoard={(e) => {
          pushSearchParamAndPushUrl(
            [{ key: "city", value: e.currentTarget.dataset.value }],
            `${window.location.origin}/scenicSpots/filter`
          );
        }}
      />
      <HotActivitiesCards
        title="熱門活動"
        activities={hotActivities}
        buttonText={"活動詳情"}
        onClickButton={(e) => {
          const targetId = Number(e.currentTarget.dataset.id);
          const _title = hotActivities[targetId].ActivityName || "暫無";
          const _time =
            `${hotActivities[targetId].StartTime.slice(
              0,
              10
            )} - ${hotActivities[targetId].EndTime.slice(0, 10)}` || "暫無";
          const _fee = "免費";
          const _area = hotActivities[targetId].Address || "暫無";
          const _tel = hotActivities[targetId].Phone || "暫無";
          setIsShowDetail(true);
          setModalInfo({
            title: _title,
            time: _time,
            fee: _fee,
            area: _area,
            tel: _tel,
          });
        }}
      />
      <HotScenicSpotSmCards
        title="熱門景點"
        spots={hotScenicSpots}
        onClick={() => {
          setIsShowDetail(true);
        }}
      />
      <DetailModal
        isShowDetail={isShowDetail}
        setIsShowDetail={setIsShowDetail}
        info={modalInfo}
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
