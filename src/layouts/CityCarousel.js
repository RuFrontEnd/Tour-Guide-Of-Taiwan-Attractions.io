import React, { useState, useRef } from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.scss";
import { __FFF__, __FF1D6C__, __FFB72C__, __D2D2D2__ } from "variable/variable";
import { ReactComponent as Location } from "assets/location.svg";
import { ReactComponent as Triangle } from "assets/triangle_title.svg";
import Space from "layouts/Space";
import taipei from "assets/taipei.png";
import newTaipei from "assets/new_taipei.png";
import taoyuan from "assets/taoyuan.png";
import taichung from "assets/taichung.png";
import tainan from "assets/tainan.png";
import kaohsiung from "assets/kaohsiung.png";
import keelung from "assets/keelung.png";
import hsinchu from "assets/hsinchu.png";
import hsinchuCounty from "assets/hsinchuCounty.jpg";
import miaoliCounty from "assets/miaoliCounty.png";
import changhuaCounty from "assets/changhuaCounty.jpg";
import nantouCounty from "assets/nantouCounty.png";
import yunlinCounty from "assets/yunlinCounty.jpg";
import chiayiCounty from "assets/chiayiCounty.png";
import chiayi from "assets/chiayi.jpg";
import pingtungCounty from "assets/pingtungCounty.png";
import yilanCounty from "assets/yilanCounty.png";
import hualienCounty from "assets/hualienCounty.png";
import taitungCounty from "assets/taitungCounty.png";
import kinmenCounty from "assets/kinmenCounty.jpg";
import penghuCounty from "assets/penghuCounty.jpg";
import lienchiangCounty from "assets/lienchiangCounty.png";
import Board from "components/Board";
import Category from "components/Category";
import DirectButton from "components/DirectButton";

SwiperCore.use([Navigation]);

const cities = [
  {
    name: "台北市",
    value: "Taipei",
    src: taipei,
  },
  {
    name: ["新北市", "桃園市"],
    value: ["NewTaipei", "Taoyuan"],
    src: [newTaipei, taoyuan],
  },
  {
    name: "台中市",
    value: "Taichung",
    src: taichung,
  },
  {
    name: ["台南市", "高雄市"],
    value: ["Tainan", "Kaohsiung"],
    src: [tainan, kaohsiung],
  },
  {
    name: "基隆市",
    value: "Keelung",
    src: keelung,
  },
  {
    name: ["新竹市", "新竹縣"],
    value: ["Hsinchu", "HsinchuCounty"],
    src: [hsinchu, hsinchuCounty],
  },
  {
    name: "苗栗縣",
    value: "MiaoliCounty",
    src: miaoliCounty,
  },
  {
    name: ["彰化縣", "南投縣"],
    value: ["ChanghuaCounty", "NantouCounty"],
    src: [changhuaCounty, nantouCounty],
  },
  {
    name: "雲林縣",
    value: "YunlinCounty",
    src: yunlinCounty,
  },
  {
    name: ["嘉義縣", "嘉義市"],
    value: ["ChiayiCounty", "Chiayi"],
    src: [chiayiCounty, chiayi],
  },
  {
    name: "屏東縣",
    value: "PingtungCounty",
    src: pingtungCounty,
  },
  {
    name: ["宜蘭縣", "花蓮縣"],
    value: ["YilanCounty", "HualienCounty"],
    src: [yilanCounty, hualienCounty],
  },
  {
    name: "台東縣",
    value: "TaitungCounty",
    src: taitungCounty,
  },
  {
    name: ["金門縣", "澎湖縣"],
    value: ["KinmenCounty", "PenghuCounty"],
    src: [kinmenCounty, penghuCounty],
  },
  {
    name: "連江縣",
    value: "LienchiangCounty",
    src: lienchiangCounty,
  },
];

const createswiperConfig = (
  prevButtonClassName,
  nextButtonClassName,
  onReachBeginning,
  onReachEnd,
  onFromEdge
) => {
  return {
    spaceBetween: 13,
    slidesPerView: 5,
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
      },
    },
    navigation: {
      prevEl: `.${prevButtonClassName}`,
      nextEl: `.${nextButtonClassName}`,
    },
    onReachBeginning: onReachBeginning,
    onReachEnd: onReachEnd,
    onFromEdge: onFromEdge,
  };
};

const CityCarousel = (props) => {
  const { style, className, onClickBoard = () => {}, icon } = props;
  const [isShowPrevButton, setIsShowPrevButton] = useState(false);
  const [isShowNextButton, setIsShowNextButton] = useState(true);

  const onReachBeginning = () => {
    setIsShowPrevButton(false);
  };

  const onReachEnd = () => {
    setIsShowNextButton(false);
  };

  const onFromEdge = () => {
    setIsShowPrevButton(true);
    setIsShowNextButton(true);
  };

  return (
    <Space style={style} className={className}>
      <Box>
        <Kind title="造訪城市">{icon}</Kind>
        <SwiperBox>
          <PrevButton
            className="custom_prev"
            style={{
              visibility: isShowPrevButton ? "visible" : "hidden",
            }}
          />

          <NextButton
            className="custom_next"
            style={{
              visibility: isShowNextButton ? "visible" : "hidden",
            }}
            direction={"R"}
          />

          <Swiper
            {...createswiperConfig(
              "custom_prev",
              "custom_next",
              onReachBeginning,
              onReachEnd,
              onFromEdge
            )}
          >
            {cities.map((city, index) => (
              <SwiperSlide key={city.name || city.name[0]}>
                {!Array.isArray(city.name) ? (
                  <>
                    <CityBoard
                      dataValue={city.value}
                      onClick={(e) => {
                        onClickBoard(e);
                      }}
                    >
                      <Img src={city.src} />
                      <Info>
                        <Icon />
                        <Name>{city.name}</Name>
                      </Info>
                      <Mask />
                    </CityBoard>
                  </>
                ) : (
                  <>
                    <HalfCityBoard
                      dataValue={city.value[0]}
                      onClick={(e) => {
                        onClickBoard(e);
                      }}
                    >
                      <Img src={city.src[0]} />
                      <HalfInfo>
                        <Icon />
                        <Name>{city.name[0]}</Name>
                      </HalfInfo>
                      <HalfMask />
                    </HalfCityBoard>
                    <HalfCityBoard
                      dataValue={city.value[1]}
                      onClick={(e) => {
                        onClickBoard(e);
                      }}
                    >
                      <Img src={city.src[1]} />
                      <HalfInfo>
                        <Icon />
                        <Name>{city.name[1]}</Name>
                      </HalfInfo>
                      <HalfMask />
                    </HalfCityBoard>
                  </>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperBox>
      </Box>
    </Space>
  );
};

const HalfMask = styled.div`
  background-color: black;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 8px;
  left: 7px;
  width: calc(100% - 16px);
  height: calc(100% - 14px);
  opacity: 0.3;
  z-index: 1;
`;

const HalfInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Mask = styled.div`
  background-color: black;
  box-sizing: border-box;
  position: absolute;
  top: 14px;
  left: 12px;
  width: calc(100% - 24px);
  height: calc(100% - 28px);
  opacity: 0.3;
  z-index: 1;
`;

const Name = styled.p`
  color: ${__FFF__()};
  font-size: 20px;
  font-weight: 300;
  word-break: keep-all;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Icon = styled(Location)`
  width: 16px;
  height: 19px;
  margin-bottom: 7.2px;

  & > path {
    fill: ${__FFF__()};
  }
`;

const Img = styled.img`
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HalfCityBoard = styled(Board)`
  position: relative;
  aspect-ratio: 5 / 3;
  padding: 7px 8px;
  margin-bottom: 5px;
`;

const CityBoard = styled(Board)`
  position: relative;
  aspect-ratio: 40 / 49;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  padding: 14px 12px;
`;

const Kind = styled(Category)`
  margin-bottom: 12px;
`;

const NextButton = styled(DirectButton)`
  position: absolute;
  z-index: 2;
  top: 50%;
  right: -60px;
  transform: translateY(-50%);

  @media (max-width: 1280px) {
    display: none;
  }
`;

const PrevButton = styled(DirectButton)`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: -60px;
  transform: translateY(-50%);

  @media (max-width: 1280px) {
    display: none;
  }
`;

const Box = styled.div`
  margin-bottom: 60px;
`;

const SwiperBox = styled.div`
  position: relative;
`;

export default withRouter(CityCarousel);
