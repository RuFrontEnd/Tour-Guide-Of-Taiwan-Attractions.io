import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { setNavBarHeight } from "redux/navBar/navBarActions";
import styled from "styled-components/macro";
import { navBarColor } from "variable/variable";
import { path } from "variable/path";
import { ReactComponent as Logo } from "assets/logo.svg";
import { ReactComponent as Attraction } from "assets/attraction.svg";
import { ReactComponent as Food } from "assets/food.svg";
import { ReactComponent as Traffic } from "assets/traffic.svg";
import { __FFF__, __FF1D6C__, __FFB72C__, __007350__ } from "variable/variable";
import Space from "layouts/Space";

const NavBar = (props) => {
  const { className, history } = props;
  const dispatch = useDispatch();
  const $NavbarContainer = useRef();

  const transferAddress = (address) => {
    history.push(address);
  };

  useEffect(() => {
    dispatch(setNavBarHeight($NavbarContainer.current.clientHeight));
  }, []);

  return (
    <Container className={className} full>
      <Wrap ref={$NavbarContainer}>
        <TaiwanLogo
          onClick={() => {
            history.push('/scenicspots');
          }}
        />
        <Options>
          <AttractLink
            onClick={() => {
              history.push('/scenicspots');
            }}
          >
            <AttractionIcon />
            活動景點
          </AttractLink>
          <FoodtLink
            onClick={() => {
              transferAddress("/foodAndAccommodation");
            }}
          >
            <FoodIcon />
            美食住宿
          </FoodtLink>
          {/* <TrafficLink
            onClick={() => {
              transferAddress("/foodAndAccommodation");
            }}
          >
            <TrafficIcon />
            景點交通
          </TrafficLink> */}
        </Options>
      </Wrap>
    </Container>
  );
};

const TaiwanLogo = styled(Logo)`
  cursor: pointer;
`;

const TrafficIcon = styled(Traffic)`
  margin-right: 8px;
`;

const FoodIcon = styled(Food)`
  margin-right: 8px;
`;

const AttractionIcon = styled(Attraction)`
  margin-right: 8px;
`;

const TrafficLink = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${__007350__()};
  margin-left: 27px;
  text-decoration: underline;
`;

const FoodtLink = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${__FFB72C__()};
  margin-left: 27px;
  text-decoration: underline;
`;

const AttractLink = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${__FF1D6C__()};
  text-decoration: underline;
`;

const Options = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
`;

const Wrap = styled.div`
  background-color: ${__FFF__()};
  padding: 18px 0px;
  display: flex;
  justify-content: space-between;
`;

const Container = styled(Space)`
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${__FFF__()};
`;

export default withRouter(NavBar);
