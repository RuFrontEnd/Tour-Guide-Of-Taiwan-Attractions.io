import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNavBarHeight } from "redux/navBar/navBarActions";
import styled from "styled-components/macro";
import { navBarColor } from "variable/variable";
import { ReactComponent as Logo } from "assets/logo.svg";
import { ReactComponent as Attraction } from "assets/attraction.svg";
import { ReactComponent as Food } from "assets/food.svg";
import { ReactComponent as Traffic } from "assets/traffic.svg";
import { __FFF__ } from "variable/variable";
import Space from "layouts/Space";

const NavBar = (props) => {
  const { className } = props;
  const dispatch = useDispatch();
  const $NavbarContainer = useRef();

  useEffect(() => {
    dispatch(setNavBarHeight($NavbarContainer.current.clientHeight));
  }, []);

  return (
    <Container className={className} full>
      <Wrap ref={$NavbarContainer}>
        <Logo />
        <Options>
          <Attraction />
          台灣景點
          <Food />
          美食住宿
          <Traffic />
          景點交通
        </Options>
      </Wrap>
    </Container>
  );
};

const Options = styled.div`
  grid-area: "b";
  align-self: center;
  justify-self: end;
`;

const Wrap = styled.div`
  background-color: ${__FFF__()};
  padding: 18px 0px;
  display: grid;
  grid-template-areas: "a b";
  grid-template-columns: 1fr 1fr;
`;

const Container = styled(Space)`
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${__FFF__()};
`;

export default NavBar;
