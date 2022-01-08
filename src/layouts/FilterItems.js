import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import { withRouter, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import { counties } from "variable/variable";
import { ReactComponent as Arrow } from "assets/arrow.svg";
import { ReactComponent as ArrowRight } from "assets/arrow_right.svg";
import SmallCards from "layouts/SmallCards";
import DetailModal from "layouts/DetailModal";
import SearchTool from "layouts/SearchTool";
import Pagination from "components/Pagination";

const countiesOptions = counties.map((county) => {
  return {
    value: county.en,
    content: county.zh,
  };
});

const FilterItems = (props) => {
  const { history, firstSmCardsInfos, secondSmCardsInfos, modalInfos } = props;
  const navBarHeight = useSelector((state) => state.navBar.height);
  const $firstTitle = useRef();
  const $secondTitle = useRef();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const _keyword =
    searchParams.get("keyword") === null ? "" : searchParams.get("keyword");
  const _selectedCity =
    searchParams.get("category") === null ? "" : searchParams.get("category");
  const _selectedCategory =
    searchParams.get("city") === null ? "" : searchParams.get("city");

  // 是否捲動到該標題 state
  const [isCanScrollToFirstTitle, setIsCanScrollToFirstTitle] = useState(false);
  const [isCanScrollToSecondtTitle, setIsCanScrollToSecondTitle] =
    useState(false);

  // 篩選相關 state
  const [keyword, setKeyword] = useState(_keyword);
  const [selectedCategories, setSelectedCategories] = useState(_selectedCity);
  const [selectedCity, setSelectedCity] = useState(_selectedCategory); // 下拉選單選擇的城市

  // 活動相關 state
  const [totalActivities, setTotalActivities] = useState([]);
  const [activitiesPage, setActivitiesPage] = useState(1);
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

  const getFilterData = (city, keyword) => {
    console.log("city", city);
    console.log("keyword", keyword);
    const filterPropA = "PictureUrl1";
    const filterPropB = "City";

    firstSmCardsInfos
      .getData(city)
      .then((data) => {
        try {
          const _totalActivities = data.filter(
            (item) =>
              item.Picture.hasOwnProperty(filterPropA) &&
              item.hasOwnProperty(filterPropB) &&
              item[firstSmCardsInfos.keywordName].includes(keyword)
          );
          const _spots = _totalActivities.slice(
            (scenicSpotsPage - 1) * 20,
            scenicSpotsPage * 20
          );
          setTotalActivities(_totalActivities);
          setTotalActivitiesPages(Math.ceil(_totalActivities.length / 20));
          firstSmCardsInfos.setSpots(_spots);
        } catch (err) {
          console.debug("接FirstSmCards資料執行錯誤", err);
        }
      })
      .then(() => {
        setTimeout(() => {
          firstSmCardsInfos.setIsWaiting(false);
        }, 0.5 * 1000);
      }); // 接FirstSmCards資料

    secondSmCardsInfos
      .getData(city)
      .then((data) => {
        try {
          const _totalScenicSpots = data.filter(
            (item) =>
              item.Picture.hasOwnProperty(filterPropA) &&
              item.hasOwnProperty(filterPropB) &&
              item[secondSmCardsInfos.keywordName].includes(keyword)
          );

          const _spots = _totalScenicSpots.slice(
            (scenicSpotsPage - 1) * 20,
            scenicSpotsPage * 20
          );

          setTotalScenicSpots(_totalScenicSpots);
          setTotalScenicSpotsPages(Math.ceil(_totalScenicSpots.length / 20));
          secondSmCardsInfos.setSpots(_spots);
        } catch (err) {
          console.debug("接SecondSmCards資料執行錯誤", err);
        }
      })
      .then(() => {
        setTimeout(() => {
          secondSmCardsInfos.setIsWaiting(false);
        }, 0.5 * 1000);
      }); // 接SecondSmCards資料
  };

  const handleSearch = () => {
    const initialPage = 1;
    firstSmCardsInfos.setIsWaiting(true);
    secondSmCardsInfos.setIsWaiting(true);
    setActivitiesPage(initialPage);
    setScenicSpotsPage(initialPage);
    searchParams.set("keyword", keyword);
    searchParams.set("category", selectedCategories);
    searchParams.set("city", selectedCity);
    searchParams.set("activitiesPage", initialPage);
    searchParams.set("scenicSpotsPage", initialPage);
    const url = new URL(window.location.href);
    url.search = searchParams;
    history.push({
      search: url.search,
    });
  };

  useEffect(() => {
    const listenHistory = history.listen((location) => {
      const searchParams = new URLSearchParams(location.search);
      getFilterData(searchParams.get("city"), searchParams.get("keyword"));
    });
    getFilterData(selectedCity, keyword);
    return () => {
      listenHistory();
    };
  }, []);

  useEffect(() => {
    if (!isCanScrollToFirstTitle) return;
    const url = new URL(window.location.href);
    searchParams.set("activitiesPage", activitiesPage);
    url.search = searchParams;
    const _activities = totalActivities?.slice(
      (activitiesPage - 1) * 20,
      activitiesPage * 20
    );

    firstSmCardsInfos.setIsWaiting(true);
    firstSmCardsInfos.setSpots(_activities);

    window.scrollTo({
      top: $firstTitle.current.offsetTop - (navBarHeight + 10),
      left: 0,
      behavior: "smooth",
    });

    history.push({
      search: url.search,
    });
  }, [activitiesPage]);

  useEffect(() => {
    if (!isCanScrollToSecondtTitle) return;
    const url = new URL(window.location.href);
    searchParams.set("scenicSpotsPage", scenicSpotsPage);
    url.search = searchParams;
    const _scenicSpots = totalScenicSpots?.slice(
      (scenicSpotsPage - 1) * 20,
      scenicSpotsPage * 20
    );

    secondSmCardsInfos.setIsWaiting(true);
    secondSmCardsInfos.setSpots(_scenicSpots);

    window.scrollTo({
      top: $firstTitle.current.offsetTop - (navBarHeight + 10),
      left: 0,
      behavior: "smooth",
    });

    history.push({
      search: url.search,
    });
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
          display:
            searchParams.get("category") === "scenicSpot" ? "none" : "block",
        }}
      >
        <FirstSmCards
          title={firstSmCardsInfos.title}
          titleRef={$firstTitle}
          icon={firstSmCardsInfos.icon}
          spots={firstSmCardsInfos.spots}
          spotName={firstSmCardsInfos.keywordName}
          onClick={(e) => {
            firstSmCardsInfos.onClickCard(e);
          }}
          isWaiting={firstSmCardsInfos.isWaiting}
          countOfWaitingCard={firstSmCardsInfos.countOfWaitingCard}
        />
        {firstSmCardsInfos.spots.length !== 0 && (
          <Paginate
            onClick={() => {
              setIsCanScrollToFirstTitle(true);
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
          display:
            searchParams.get("category") === "activity" ? "none" : "block",
        }}
      >
        <SecondSmCards
          title={secondSmCardsInfos.title}
          titleRef={$secondTitle}
          icon={secondSmCardsInfos.icon}
          spots={secondSmCardsInfos.spots}
          spotName={secondSmCardsInfos.keywordName}
          onClick={(e) => {
            secondSmCardsInfos.onClickCard(e);
          }}
          isWaiting={secondSmCardsInfos.isWaiting}
          countOfWaitingCard={secondSmCardsInfos.countOfWaitingCard}
        />
        {secondSmCardsInfos.spots.length !== 0 && (
          <Paginate
            onClick={(e) => {
              setIsCanScrollToSecondTitle(true);
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
