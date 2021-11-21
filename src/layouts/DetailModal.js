import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { __FFF__, __FF1D6C__, __FFB72C__, __D2D2D2__ } from "variable/variable";
import { useSelector } from "react-redux";
import DetailCard from "components/DetailCard";
import disableScroll from "disable-scroll";
import { RemoveScrollBar } from "react-remove-scroll-bar";

const DetailModal = (props) => {
  const { className, isShowDetail = false, setIsShowDetail = () => {} } = props;
  const navBarHeight = useSelector((state) => state.navBar.height);

  useEffect(() => {
    if (isShowDetail) {
      disableScroll.on();
    }
  }, [isShowDetail]);

  return (
    <Modal
      className={className}
      style={{ display: isShowDetail ? "flex" : "none" }}
      navBarHeight={navBarHeight}
      onClick={() => {
        console.log('a')
        disableScroll.off();
        setIsShowDetail(false);
      }}
    >
      <DetailCard />
      {isShowDetail && <RemoveScrollBar />}
    </Modal>
  );
};

const Modal = styled.div`
  position: fixed;
  z-index: 1001;
  top: ${(props) => `${props.navBarHeight}px`};
  left: 0%;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  background-color: ${__D2D2D2__(0.5)};
  width: 100%;
  height: ${(props) => `calc(100% - ${props.navBarHeight}px)`};
`;

export default DetailModal;
