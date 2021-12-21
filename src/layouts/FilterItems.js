import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { ReactComponent as Arrow } from "assets/arrow.svg";
import { ReactComponent as ArrowRight } from "assets/arrow_right.svg";
import SmallCards from "layouts/SmallCards";
import DetailModal from "layouts/DetailModal";
import SearchTool from "layouts/SearchTool";
import Pagination from "components/Pagination";
import { getCityScenicSpots } from "api/scenicSpots";
import { getCityActivities } from "api/activities";
import { pushSearchParam } from "utils/url";

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

const FilterItems = (props) => {
  const {
    history,
    searchInfos,
    firstSmCardsInfos,
    secondSmCardsInfos,
    modalInfos,
  } = props;
  // 篩選相關state
  const [selectedCity, setSelectedCity] = useState(null); // 下拉選單選擇的城市
  const [qureyParams, setQureyParams] = useState([]);
  // 活動相關 state
  const [totalActivities, setTotalActivities] = useState([]);
  const [activitiesPage, setActivitiesPage] = useState(0);
  const [totalActivitiesPages, setTotalActivitiesPages] = useState(0);
  // 景點相關 state
  const [totalScenicSpots, setTotalScenicSpots] = useState([]);
  const [scenicSpotsPage, setScenicSpotsPage] = useState(1);
  const [totalScenicSpotsPages, setTotalScenicSpotsPages] = useState(0);

  const getFilterStateFromSearchParam = () => {
    const urlSearchParams = getParamsFromUrl();
    searchInfos.setKeyword(urlSearchParams.keyword);
    searchInfos.setSelectedCategories(urlSearchParams.category);
    setSelectedCity(urlSearchParams.city);
    setScenicSpotsPage(1);
    setActivitiesPage(1);
    setQureyParams({
      keyword: urlSearchParams.keyword,
      category: urlSearchParams.category,
      city: urlSearchParams.city,
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
      firstSmCardsInfos.setSpots(_cityActivities);
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
      secondSmCardsInfos.setSpots(_cityScenicSpots);
    }); // 接景點資料

    setTimeout(() => {
      firstSmCardsInfos.setIsWaiting(false);
      secondSmCardsInfos.setIsWaiting(false);
    }, 1 * 1000);
  }, [qureyParams]);

  useEffect(() => {
    pushSearchParam([{ key: "activitiesPage", value: activitiesPage }]);
    if (selectedCity === null) return;

    const _activities = totalActivities?.slice(
      (activitiesPage - 1) * 20,
      activitiesPage * 20
    );
    firstSmCardsInfos.setSpots(_activities);
    setTimeout(() => {
      firstSmCardsInfos.setIsWaiting(false);
    }, 0.25 * 1000);
  }, [activitiesPage]);

  useEffect(() => {
    pushSearchParam([{ key: "scenicSpotsPage", value: scenicSpotsPage }]);
    if (selectedCity === null) return;
    const _activities = totalActivities?.slice(
      (scenicSpotsPage - 1) * 20,
      scenicSpotsPage * 20
    );
    firstSmCardsInfos.setSpots(_activities);
    const _cityScenicSpots = totalScenicSpots?.slice(
      (scenicSpotsPage - 1) * 20,
      scenicSpotsPage * 20
    );
    secondSmCardsInfos.setSpots(_cityScenicSpots);
    setTimeout(() => {
      secondSmCardsInfos.setIsWaiting(false);
    }, 0.25 * 1000);
  }, [scenicSpotsPage]);

  return (
    <SearchLayout
      categories={searchInfos.categories}
      counties={searchInfos.counties}
      selectedCategories={searchInfos.selectedCategories}
      setSelectedCategories={searchInfos.setSelectedCategories}
      selectedCity={searchInfos.selectedCity}
      setSelectedCity={searchInfos.setSelectedCity}
      keyword={searchInfos.keyword}
      setKeyword={searchInfos.setKeyword}
      onClickSearchButton={(e) => {
        searchInfos.onClickSearchButton(e);
      }}
    >
      <FirstSmCardsBox
        style={{
          display: qureyParams.category === "scenicSpot" ? "none" : "block",
        }}
      >
        <FirstSmCards
          title={`${
            !qureyParams.city
              ? ""
              : qureyParams.city === "不分縣市"
              ? ""
              : qureyParams.city
          } ${firstSmCardsInfos.title}`}
          icon={firstSmCardsInfos.icon}
          spots={firstSmCardsInfos.spots}
          onClick={(e) => {
            firstSmCardsInfos.onClickCard(e);
          }}
          isWaiting={firstSmCardsInfos.isWaiting}
          countOfWaitingCard={firstSmCardsInfos.countOfWaitingCard}
        />
        {firstSmCardsInfos.spots.length !== 0 && (
          <Paginate
            onClick={() => {
              if (totalActivitiesPages !== 1) {
                firstSmCardsInfos.setIsWaiting(true);
              }
            }}
            count={totalActivitiesPages}
            previousIcon={Arrow}
            nextIcon={ArrowRight}
            setPage={setActivitiesPage}
            page={activitiesPage}
          />
        )}
      </FirstSmCardsBox>

      <SecondSmCardsBox
        style={{
          display: qureyParams.category === "activity" ? "none" : "block",
        }}
      >
        <SecondSmCards
          title={`${
            !qureyParams.city
              ? ""
              : qureyParams.city === "不分縣市"
              ? ""
              : qureyParams.city
          } ${secondSmCardsInfos.title}`}
          icon={secondSmCardsInfos.icon}
          spots={secondSmCardsInfos.spots}
          onClick={(e) => {
            secondSmCardsInfos.onClickCard(e);
          }}
          isWaiting={secondSmCardsInfos.isWaiting}
          countOfWaitingCard={secondSmCardsInfos.countOfWaitingCard}
        />
        {secondSmCardsInfos.spots.length !== 0 && (
          <Paginate
            onClick={() => {
              if (totalActivitiesPages !== 1) {
                secondSmCardsInfos.setIsWaiting(true);
              }
            }}
            count={totalScenicSpotsPages}
            previousIcon={Arrow}
            nextIcon={ArrowRight}
            setPage={setScenicSpotsPage}
            page={scenicSpotsPage}
          />
        )}
      </SecondSmCardsBox>

      <DetailModal
        isShowDetail={modalInfos.isShowDetail}
        setIsShowDetail={modalInfos.setIsShowDetail}
        info={modalInfos.infos}
      >
        {modalInfos.infos.description}
      </DetailModal>
    </SearchLayout>
  );
};

const Paginate = styled(Pagination)`
  display: flex;
  justify-content: center;
`;

const SecondSmCards = styled(SmallCards)``;

const SecondSmCardsBox = styled.section``;

const FirstSmCards = styled(SmallCards)``;

const FirstSmCardsBox = styled.section``;

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

export default withRouter(FilterItems);
