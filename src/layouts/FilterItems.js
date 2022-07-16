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

const createSearchParam = (
  _keyword,
  _category,
  _city,
  _firstItemsPage,
  _secondItemsPage
) => {
  const searchParams = new URLSearchParams();

  if (_keyword) {
    searchParams.set("keyword", _keyword);
  }
  if (_category) {
    searchParams.set("category", _category);
  }
  if (_city) {
    searchParams.set("city", _city);
  }
  if (_firstItemsPage) {
    searchParams.set("firstItemsPage", _firstItemsPage);
  }
  if (_secondItemsPage) {
    searchParams.set("secondItemsPage", _secondItemsPage);
  }

  return searchParams.toString();
};

const scrollToTitle = (_top) => {
  window.scrollTo({
    top: _top,
    left: 0,
    behavior: "smooth",
  });
};

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
  const PICTURE_URL_ONE = "PictureUrl1";
  const CITY = "City";

  // page variables
  const itemsPerPage = 20;
  const initialPage = 1;

  // 篩選相關 state
  const [keyword, setKeyword] = useState(_keyword);
  const [selectedCategories, setSelectedCategories] = useState(_selectedCity);
  const [selectedCity, setSelectedCity] = useState(_selectedCategory); // 下拉選單選擇的城市

  // 第一區相關 state
  const [firstItemsPage, setFirstItemsPage] = useState(initialPage);
  const [totalFirstItemsPage, setTotalFirstItemsPage] = useState(0);

  // 第二區相關 state
  const [secondItemsPage, setSecondItemsPage] = useState(initialPage);
  const [totalSecondItemsPage, setTotalSecondItemsPage] = useState(0);

  const categories = [
    { value: "", content: "不分類別" },
    { value: "activity", content: firstSmCardsInfos.title },
    { value: "scenicSpot", content: secondSmCardsInfos.title },
  ];

  const searchWord = keyword || "";

  const onChangeFirstPaginate = (e, page) => {
    setFirstItemsPage(page);
    scrollToTitle($firstTitle.current.offsetTop - (navBarHeight + 10));
  };

  const onChangeSecondPaginate = (e, page) => {
    setSecondItemsPage(page);
    scrollToTitle($secondTitle.current.offsetTop - (navBarHeight + 10));
  };

  const getFilterFirstSmCardsInfos = (city, keyword) => {
    try {
      if (city) {
        firstSmCardsInfos
          .getFilterData(city) // getCityActivities
          .then((data) => {
            const _firstSmCardSpots = data.filter(
              (item) =>
                item.Picture.hasOwnProperty(PICTURE_URL_ONE) && // filter non-existing "PictureUrl1" key data
                item.hasOwnProperty(CITY) && // filter non-existing "city" key data
                item[firstSmCardsInfos.keywordName].includes(keyword) // filter data which does not match keyword
            );
            firstSmCardsInfos.setSpots(_firstSmCardSpots);
            setTotalFirstItemsPage(Math.ceil(_firstSmCardSpots.length / 20));

            setTimeout(() => {
              firstSmCardsInfos.setIsWaiting(false);
            }, 0.5 * 1000);
          });
      }
      if (!city) {
        firstSmCardsInfos
          .getAllData() // getCityActivities
          .then((data) => {
            const _firstSmCardSpots = data.filter(
              (item) =>
                item.Picture.hasOwnProperty(PICTURE_URL_ONE) && // filter non-existing "PictureUrl1" key data
                item.hasOwnProperty(CITY) && // filter non-existing "city" key data
                item[firstSmCardsInfos.keywordName].includes(keyword) // filter data which does not match keyword
            );
            firstSmCardsInfos.setSpots(_firstSmCardSpots);
            setTotalFirstItemsPage(Math.ceil(_firstSmCardSpots.length / 20));

            setTimeout(() => {
              firstSmCardsInfos.setIsWaiting(false);
            }, 0.5 * 1000);
          });
      }
    } catch (err) {
      console.debug("接FirstSmCards資料執行錯誤", err);
    }
  };

  const getFilterSecondSmCardsInfos = (city, keyword) => {
    try {
      if (city) {
        secondSmCardsInfos
          .getFilterData(city) // getCityActivities
          .then((data) => {
            const _secondSmCardSpots = data.filter(
              (item) =>
                item.Picture.hasOwnProperty(PICTURE_URL_ONE) && // filter non-existing "PictureUrl1" key data
                item.hasOwnProperty(CITY) && // filter non-existing "city" key data
                item[secondSmCardsInfos.keywordName].includes(keyword) // filter data which does not match keyword
            );
            secondSmCardsInfos.setSpots(_secondSmCardSpots);

            setTotalSecondItemsPage(Math.ceil(_secondSmCardSpots.length / 20));

            setTimeout(() => {
              secondSmCardsInfos.setIsWaiting(false);
            }, 0.5 * 1000);
          });
      }
      if (!city) {
        secondSmCardsInfos
          .getAllData() // getCityActivities
          .then((data) => {
            const _secondSmCardSpots = data.filter(
              (item) =>
                item.Picture.hasOwnProperty(PICTURE_URL_ONE) && // filter non-existing "PictureUrl1" key data
                item.hasOwnProperty(CITY) && // filter non-existing "city" key data
                item[secondSmCardsInfos.keywordName].includes(keyword) // filter data which does not match keyword
            );
            secondSmCardsInfos.setSpots(_secondSmCardSpots);

            setTotalSecondItemsPage(Math.ceil(_secondSmCardSpots.length / 20));

            setTimeout(() => {
              secondSmCardsInfos.setIsWaiting(false);
            }, 0.5 * 1000);
          });
      }
    } catch (err) {
      console.debug("接FirstSmCards資料執行錯誤", err);
    }
  };

  const getFilterData = () => {
    const city = searchParams.get("city");
    const keyword = searchParams.get("keyword");

    getFilterFirstSmCardsInfos(city, searchWord);
    getFilterSecondSmCardsInfos(city, searchWord);
  };

  const handleSearch = () => {
    firstSmCardsInfos.setIsWaiting(true);

    setFirstItemsPage(initialPage);
    setSecondItemsPage(initialPage);

    getFilterFirstSmCardsInfos(selectedCity, searchWord);
    getFilterSecondSmCardsInfos(selectedCity, searchWord);

    history.push({
      search: createSearchParam(keyword, selectedCategories, selectedCity),
    });
  };

  useEffect(() => {
    getFilterData();
  }, []);

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
      onClickSearchButton={handleSearch}
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
          spots={firstSmCardsInfos.spots.slice(
            (firstItemsPage - 1) * itemsPerPage,
            firstItemsPage * itemsPerPage
          )}
          spotName={firstSmCardsInfos.keywordName}
          onClick={(e) => {
            firstSmCardsInfos.onClickCard(e);
          }}
          isWaiting={firstSmCardsInfos.isWaiting}
          countOfWaitingCard={firstSmCardsInfos.countOfWaitingCard}
        />
        {firstSmCardsInfos.spots.length > itemsPerPage && (
          <Paginate
            onChange={onChangeFirstPaginate}
            count={totalFirstItemsPage}
            previousIcon={Arrow}
            nextIcon={ArrowRight}
            page={firstItemsPage}
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
          spots={secondSmCardsInfos.spots.slice(
            (secondItemsPage - 1) * itemsPerPage,
            secondItemsPage * itemsPerPage
          )}
          spotName={secondSmCardsInfos.keywordName}
          onClick={(e) => {
            secondSmCardsInfos.onClickCard(e);
          }}
          isWaiting={secondSmCardsInfos.isWaiting}
          countOfWaitingCard={secondSmCardsInfos.countOfWaitingCard}
        />
        {secondSmCardsInfos.spots.length > itemsPerPage && (
          <Paginate
            onChange={onChangeSecondPaginate}
            count={totalSecondItemsPage}
            previousIcon={Arrow}
            nextIcon={ArrowRight}
            page={secondItemsPage}
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
