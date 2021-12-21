import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import { counties } from "variable/variable";
import { ReactComponent as Arrow } from "assets/arrow.svg";
import { ReactComponent as ArrowRight } from "assets/arrow_right.svg";
import SmallCards from "layouts/SmallCards";
import DetailModal from "layouts/DetailModal";
import SearchTool from "layouts/SearchTool";
import Pagination from "components/Pagination";
import { pushSearchParam } from "utils/url";

const countiesOptions = counties.map((county) => {
  return {
    value: county.en,
    content: county.zh,
  };
});

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
  const { history, firstSmCardsInfos, secondSmCardsInfos, modalInfos } = props;
  const navBarHeight = useSelector((state) => state.navBar.height);
  const $firstTitle = useRef();
  const $secondTitle = useRef();

  // 篩選相關state
  const [keyword, setKeyword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(null);
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

  const categories = [
    { value: "", content: "不分類別" },
    { value: "activity", content: firstSmCardsInfos.title },
    { value: "scenicSpot", content: secondSmCardsInfos.title },
  ];

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

  const handleSearch = () => {
    firstSmCardsInfos.setIsWaiting(true);
    secondSmCardsInfos.setIsWaiting(true);

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

  useEffect(() => {
    history.listen(() => {
      getFilterStateFromSearchParam();
    }); // 監聽上一頁 / 下一頁
    getFilterStateFromSearchParam();
  }, []);

  useEffect(() => {
    if (selectedCity === null) return;
    firstSmCardsInfos.getData(selectedCity).then((data) => {
      const _totalActivities = data.filter(
        (item) =>
          item.Picture.hasOwnProperty("PictureUrl1") &&
          item.hasOwnProperty("City") &&
          item.Name.includes(qureyParams.keyword)
      );

      const _spots = _totalActivities.slice(
        (scenicSpotsPage - 1) * 20,
        scenicSpotsPage * 20
      );

      setTotalActivities(_totalActivities);
      setTotalActivitiesPages(Math.ceil(_totalActivities.length / 20));
      firstSmCardsInfos.setSpots(_spots);
    }); // 接FirstSmCards資料

    secondSmCardsInfos.getData(selectedCity).then((data) => {
      const _totalScenicSpots = data.filter(
        (item) =>
          item.Picture.hasOwnProperty("PictureUrl1") &&
          item.hasOwnProperty("City") &&
          item.Name.includes(qureyParams.keyword)
      );

      const _spots = _totalScenicSpots.slice(
        (scenicSpotsPage - 1) * 20,
        scenicSpotsPage * 20
      );

      setTotalScenicSpots(_totalScenicSpots);
      setTotalScenicSpotsPages(Math.ceil(_totalScenicSpots.length / 20));
      secondSmCardsInfos.setSpots(_spots);
    }); // 接SecondSmCards資料

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
      categories={categories}
      counties={countiesOptions}
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
      selectedCity={selectedCity}
      setSelectedCity={setSelectedCity}
      keyword={keyword}
      setKeyword={setKeyword}
      onClickSearchButton={(e) => {
        handleSearch(e);
      }}
    >
      <FirstSmCardsBox
        style={{
          display: qureyParams.category === "scenicSpot" ? "none" : "block",
        }}
      >
        <FirstSmCards
          title={firstSmCardsInfos.title}
          titleRef={$firstTitle}
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
            onClick={(e) => {
              firstSmCardsInfos.setIsWaiting(true)
              if (totalActivitiesPages !== 1 && e.target.ariaLabel !== null) {
                window.scrollTo({
                  top: $firstTitle.current.offsetTop - (navBarHeight + 10),
                  left: 0,
                  behavior: "smooth",
                });
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
          title={secondSmCardsInfos.title}
          titleRef={$secondTitle}
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
            onClick={(e) => {
              if (totalActivitiesPages !== 1 && e.target.ariaLabel !== null) {
                secondSmCardsInfos.setIsWaiting(true)
                window.scrollTo({
                  top: $secondTitle.current.offsetTop - (navBarHeight + 10),
                  left: 0,
                  behavior: "smooth",
                });
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
