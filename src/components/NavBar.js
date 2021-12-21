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
    <Container className={className}>
      <Wrap>
        <Box ref={$NavbarContainer}>
          <TaiwanLogo
            onClick={() => {
              history.push("/scenicspots");
            }}
          />
          <Options>
            <AttractLink
              onClick={() => {
                history.push("/scenicspots");
              }}
            >
              <AttractionIcon />
              <Text>活動景點</Text>
            </AttractLink>
            <FoodtLink
              onClick={() => {
                transferAddress("/food");
              }}
            >
              <FoodIcon />
              <Text>美食住宿</Text>
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
        </Box>
      </Wrap>
    </Container>
  );
};

const TaiwanLogo = styled(Logo)`
  cursor: pointer;
`;

const FoodIcon = styled(Food)`
  margin-right: 8px;
  @media (max-width: 425px) {
    margin-right: 0px;
  }
`;

const AttractionIcon = styled(Attraction)`
  margin-right: 8px;
  @media (max-width: 425px) {
    margin-right: 0px;
  }
`;

const TrafficLink = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${__007350__()};
  margin-left: 27px;
  text-decoration: underline;
`;

const Text = styled.p`
  @media (max-width: 425px) {
    display: none;
  }
`;

const Link = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: underline;
`;

const FoodtLink = styled(Link)`
  color: ${__FFB72C__()};
`;

const AttractLink = styled(Link)`
  color: ${__FF1D6C__()};
  margin-right: 27px;
  @media (max-width: 576px) {
    margin-right: 20px;
  }
`;

const Options = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
`;

const Box = styled.div`
  background-color: ${__FFF__()};
  display: flex;
  justify-content: space-between;
  padding-top: 18px;
  padding-bottom: 18px;
`;

const Wrap = styled(Space)``;

const Container = styled.div`
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${__FFF__()};
`;

export default withRouter(NavBar);
