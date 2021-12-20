import React from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import SmallCards from "layouts/SmallCards";
import DetailModal from "layouts/DetailModal";
import Cards from "layouts/Cards";
import SearchTool from "layouts/SearchTool";

const HotItems = (props) => {
  const {
    isWaiting,
    searchInfos,
    lCardsInfos,
    sCardsInfos,
    modalInfos,
  } = props;

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
      <LCards
        title={lCardsInfos.title}
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
