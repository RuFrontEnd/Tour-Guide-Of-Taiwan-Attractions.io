import React from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import SmallCards from "layouts/SmallCards";
import DetailModal from "layouts/DetailModal";
import Cards from "layouts/Cards";
import SearchTool from "layouts/SearchTool";
import CityCarousel from "layouts/CityCarousel";

const HotItems = (props) => {
  const {
    isWaiting,
    history,
    icon,
    searchInfos,
    citySwiperInfos,
    lCardsInfos,
    sCardsInfos,
    modalInfos,
  } = props;
  console.log("searchInfos.selectedCity", searchInfos.selectedCity);

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
      <CitySwiper
        onClickBoard={(e) => {
          history.push({
            pathname: citySwiperInfos.path,
            search: `?category=&keyword=&city=${e.currentTarget.dataset.value}`,
          });
        }}
      />
      <LCards
        title={lCardsInfos.title}
        icon={lCardsInfos.icon}
        activities={lCardsInfos.spots}
        buttonText={lCardsInfos.buttonText}
        onClickButton={(e) => {
          lCardsInfos.onClickButton(e);
        }}
        isWaiting={isWaiting}
        countOfWaitingCard={lCardsInfos.countOfWaitingCard}
      />
      <SCards
        title={sCardsInfos.title}
        icon={sCardsInfos.icon}
        spots={sCardsInfos.spots}
        onClick={(e) => {
          sCardsInfos.onClickButton(e);
        }}
        isWaiting={isWaiting}
        countOfWaitingCard={sCardsInfos.countOfWaitingCard}
      />
      <InfoModal
        isShowDetail={modalInfos.isShowDetail}
        setIsShowDetail={modalInfos.setIsShowDetail}
        info={modalInfos.infos}
      >
        {modalInfos.infos.description}
      </InfoModal>
    </SearchLayout>
  );
};

const CitySwiper = styled(CityCarousel)``;

const InfoModal = styled(DetailModal)``;

const SCards = styled(SmallCards)``;

const LCards = styled(Cards)``;

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

export default withRouter(HotItems);
