import React, { useState } from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { __FFF__, __FF1D6C__, __FFB72C__, __D2D2D2__ } from "variable/variable";
import { ReactComponent as WelcomeToTaiwan } from "assets/welcomeToTaiwan.svg";
import { ReactComponent as Search } from "assets/search.svg";
import { ReactComponent as Gps } from "assets/gps.svg";
import { ReactComponent as Location } from "assets/location.svg";
import { ReactComponent as TriangleTitle } from "assets/triangle_title.svg";
import { ReactComponent as RectangleTitle } from "assets/rectangle_title.svg";
import landing from "assets/landing.png";
import cardImg_tmp from "assets/cardImg_tmp.png";
import cardSmImg_tmp from "assets/cardSmImg_tmp.png";
import boardImg_tmp from "assets/boardImg_tmp.png";
import Paper from "components/Paper";
import Board from "components/Board";
import Background from "layouts/Background";
import Input from "components/Input";
import SquareButton from "components/SquareButton";
import Dropdown from "components/Dropdown";
import Category from "components/Category";
import Card from "components/Card";
import CardSm from "components/CardSm";
import Space from "layouts/Space";
import DetailCard from "components/DetailCard";
import RectButton from "components/RectButton";
import Tool from "layouts/Tool";

const FoodAndAccommodation = (props) => {
  const { history } = props;
  const navBarHeight = useSelector((state) => state.navBar.height);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const attractions = ["類別"];

  const Infos = [
    { src: "", alt: "", title: "", area: "" },
    { src: "", alt: "", title: "", area: "" },
    { src: "", alt: "", title: "", area: "" },
    { src: "", alt: "", title: "", area: "" },
    { src: "", alt: "", title: "", area: "" },
    { src: "", alt: "", title: "", area: "" },
    { src: "", alt: "", title: "", area: "" },
    { src: "", alt: "", title: "", area: "" },
  ];

  const handleClickActivitySmallCard = () => {
    setIsShowDetail(true);
    document.body.style.overflow = "hidden";
  };

  const handleClickDetailModal = (e) => {
    setIsShowDetail(false);
    document.body.style.overflow = "";
  };

  const handleClickDetailSmallCard = (e) => {
    e.stopPropagation();
  };

  return (
    <Background>
      <NavBarHeight height={navBarHeight} />
      <Tool
        // categories={categories}
        // counties={countiesOptions}
        // selectedCategories={selectedCategories}
        // setSelectedCategories={setSelectedCategories}
        // selectedCity={selectedCity}
        // setSelectedCity={setSelectedCity}
        // onClickSearchButton={() => {
        //   if (selectedCategories !== "none" || selectedCity !== "none") {
        //     history.push({
        //       pathname: "/scenicSpots/filter",
        //       search: `?category=${selectedCategories}&city=${selectedCity}`,
        //     });
        //   }
        // }}
      />

      {!isFiltered && (
        <>
          <Space>
            <Kind title="熱門美食">
              <RectangleTitle />
            </Kind>
            <SmallCards>
              {Infos.map((Info) => (
                <SmallCardItems>
                  <FoodSmallCard />
                </SmallCardItems>
              ))}
            </SmallCards>
          </Space>

          <Space>
            <Kind title="推薦住宿">
              <RectangleTitle />
            </Kind>
            <SmallCards>
              {Infos.map((Info) => (
                <SmallCardItems>
                  <FoodSmallCard />
                </SmallCardItems>
              ))}
            </SmallCards>
          </Space>
        </>
      )}

      {isFiltered && (
        <Space>
          <Kind title="美食">
            <RectangleTitle />
          </Kind>
          <SmallCards>
            {Infos.map((Info) => (
              <SmallCardItems>
                <FoodSmallCard />
              </SmallCardItems>
            ))}
          </SmallCards>
        </Space>
      )}

      {isShowDetail && (
        <DetailModal
          onClick={handleClickDetailModal}
          navBarHeight={navBarHeight}
        >
          <DetailCard
            onClick={(e) => {
              handleClickDetailSmallCard(e);
            }}
          />
        </DetailModal>
      )}
    </Background>
  );
};

const DetailModal = styled.div`
  position: fixed;
  z-index: 1001;
  top: ${(props) => `${props.navBarHeight}px`};
  left: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  background-color: ${__D2D2D2__(0.5)};
  width: 100%;
  height: ${(props) => `calc(100% - ${props.navBarHeight}px)`};
`;

const FoodSmallCard = styled(CardSm)``;

const SmallCardItems = styled.li`
  margin: 0px 4.5px 35px 4.5px;
  display: flex;
  justify-content: center;

  &:nth-child(5n + 1) {
    margin: 0px 4.5px 35px 0px;
  }

  &:nth-child(5n) {
    margin: 0px 0px 35px 4.5px;
  }
`;

const SmallCards = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding-bottom: 50px;
`;

const Kind = styled(Category)`
  margin-bottom: 12px;
`;

const NavBarHeight = styled.div`
  height: ${(props) => props.height}px;
`;

export default withRouter(FoodAndAccommodation);
