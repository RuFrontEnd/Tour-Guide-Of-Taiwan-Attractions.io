import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { __FFF__, __FF1D6C__, __FFB72C__, __D2D2D2__ } from "variable/variable";
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
