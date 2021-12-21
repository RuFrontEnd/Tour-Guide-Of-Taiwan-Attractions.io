import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { __D2D2D2__ } from "variable/variable";
import { useSelector } from "react-redux";
import DetailCard from "components/DetailCard";
import disableScroll from "disable-scroll";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import { CSSTransition } from "react-transition-group";

const DetailModal = (props) => {
  const {
    className,
    isShowDetail = false,
    setIsShowDetail = () => {},
    info = {},
    CardHeight,
    children,
  } = props;
  const navBarHeight = useSelector((state) => state.navBar.height);

  useEffect(() => {
    if (isShowDetail) {
      disableScroll.on();
    }
  }, [isShowDetail]);

  return (
    <CSSTransition in={isShowDetail} unmountOnExit>
      <Modal
        // className={`${className} detailModal-modal ${
        //   isShowDetail && "detailModal-modal-active"
        // }`}
        className={className}
        navBarHeight={navBarHeight}
        onClick={() => {
          disableScroll.off();
          setIsShowDetail(false);
        }}
      >
        <DetailCardBox
        // className={`detailModal-modal-detailCardBox ${
        //   isShowDetail && "detailModal-modal-detailCardBox-active"
        // }`}
        >
          <DetailCard info={info} height={CardHeight}>
            {children}
          </DetailCard>
        </DetailCardBox>
        {isShowDetail && <RemoveScrollBar />}
      </Modal>
    </CSSTransition>
  );
};

const Modal = styled.div`
  background-color: ${__D2D2D2__(0.5)};
  backdrop-filter: blur(10px);
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
    display: none;
    background-color: ${__D2D2D2__(0)};
    opacity: 0;
    backdrop-filter: blur(0px);
    transition: 0.25s;
  }

  &.detailModal-modal-active {
    display: flex;
    background-color: ${__D2D2D2__(0.5)};
    backdrop-filter: blur(10px);
    opacity: 1;
    transition: 0.25s;
  }
`;

const DetailCardBox = styled.div`
  padding: 0px 20px;
  &.detailModal-modal-detailCardBox {
    transform: translateY(-20px);
    transition: 0.25s;
  }

  &.detailModal-modal-detailCardBox-active {
    transform: translateY(0px);
    transition: 0.25s;
  }

  & #DetailCard-More {
    max-width: 600px;
    @media (max-width: 576px) {
      grid-template-areas:
        "a"
        "b"
        "c"
        "d";
    }
  }

  & .detailCard-trait:nth-child(1),
  .detailCard-trait:nth-child(2),
  .detailCard-trait:nth-child(3),
  .detailCard-trait:nth-child(4) {
    margin-bottom: 16px;
  }

  & #DetailCard-Image {
    max-width: 600px;
  }

  & #DetailCard-LoadingImage {
    width: 600px;

    @media (max-width: 768px) {
      width: 473px;
    }

    @media (max-width: 576px) {
      width: 256px;
    }
  }

  & #DetailCard-Intro {
    width: 600px;

    @media (max-width: 768px) {
      width: 473px;
    }

    @media (max-width: 576px) {
      width: 256px;
    }
  }
`;

export default DetailModal;
