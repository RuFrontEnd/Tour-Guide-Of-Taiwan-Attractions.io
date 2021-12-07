import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { __FFF__, __FF1D6C__, __FFB72C__, __D2D2D2__ } from "variable/variable";
import { useSelector } from "react-redux";
import DetailCard from "components/DetailCard";
import disableScroll from "disable-scroll";
import { RemoveScrollBar } from "react-remove-scroll-bar";

const DetailModal = (props) => {
  const {
    className,
    isShowDetail = false,
    setIsShowDetail = () => {},
    info = {},
    children,
  } = props;
  const navBarHeight = useSelector((state) => state.navBar.height);

  useEffect(() => {
    if (isShowDetail) {
      disableScroll.on();
    }
  }, [isShowDetail]);

  return (
    <Modal
      className={`${className} detailModal-modal ${
        isShowDetail && "detailModal-modal-active"
      }`}
      navBarHeight={navBarHeight}
      onClick={() => {
        disableScroll.off();
        setIsShowDetail(false);
      }}
    >
      <DetailCardBox
        className={`detailModal-modal-detailCardBox ${
          isShowDetail && "detailModal-modal-detailCardBox-active"
        }`}
      >
        <DetailCard info={info}>{children}</DetailCard>
      </DetailCardBox>
      {isShowDetail && <RemoveScrollBar />}
    </Modal>
  );
};

const Modal = styled.div`
  position: fixed;
  z-index: 1001;
  top: ${(props) => `${props.navBarHeight}px`};
  left: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${(props) => `calc(100% - ${props.navBarHeight}px)`};
  transition: 0.5s;

  &.detailModal-modal {
    visibility: hidden;
    background-color: ${__D2D2D2__(0)};
    opacity: 0;
    backdrop-filter: blur(0px);
    transition: 0.25s;
  }

  &.detailModal-modal-active {
    visibility: visible;
    background-color: ${__D2D2D2__(0.5)};
    backdrop-filter: blur(10px);
    opacity: 1;
    transition: 0.25s;
  }
`;

const DetailCardBox = styled.div`
  &.detailModal-modal-detailCardBox {
    transform: translateY(-20px);
    transition: 0.25s;
  }

  &.detailModal-modal-detailCardBox-active {
    transform: translateY(0px);
    transition: 0.25s;
  }
`;

export default DetailModal;
