import React, { useState, useRef } from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.scss";
import { __FFF__, __FF1D6C__, __FFB72C__, __D2D2D2__ } from "variable/variable";
import { useQuery } from "hooks/useQuery";
import { path } from "variable/path";
import { ReactComponent as Location } from "assets/location.svg";
import { ReactComponent as Triangle } from "assets/triangle_title.svg";
import Space from "layouts/Space";
import taipei from "assets/taipei.png";
import newTaipei from "assets/new_taipei.png";
import taoyuan from "assets/taoyuan.png";
import keelung from "assets/keelung.png";
import hsinchu from "assets/hsinchu.png";
import hsinchuCounty from "assets/hsinchuCounty.jpg";
import taichung from "assets/taichung.png";
import nantou from "assets/nantou.png";
import chiayi from "assets/chiayi.png";
import tainan from "assets/tainan.png";
import kaohsiung from "assets/kaohsiung.png";
import pingtung from "assets/pingtung.png";
import yilan from "assets/yilan.png";
import hualien from "assets/hualien.png";
import taitungCounty from "assets/taitungCounty.png";
import mazu from "assets/mazu.png";
import miaoli from "assets/miaoli.png";
import yunlin from "assets/yunlin.jpg";
import changhua from "assets/changhua.jpg";
import penghu from "assets/penghu.jpg";
import kinmen from "assets/kinmen.jpg";
import Board from "components/Board";
import Category from "components/Category";
import DirectButton from "components/DirectButton";

SwiperCore.use([Navigation]);

const cities = [
  { name: "台　北", value: "Taipei", src: taipei },
  {
    name: ["新　北", "桃　園"],
    value: ["NewTaipei", "Taoyuan"],
    src: [newTaipei, taoyuan],
  },
  { name: "基　隆", value: "Keelung", src: keelung },
  {
    name: ["新　竹", "台　中"],
    value: ["Hsinchu", "Taichung"],
    src: [hsinchu, taichung],
  },
  { name: "台　南", src: tainan, value: "Tainan" },
  {
    name: ["嘉　義", "南　投"],
    value: ["Chiayi", "Nantou"],
    src: [chiayi, nantou],
  },
  { name: "宜　蘭", src: yilan, value: "Yilan" },
  {
    name: ["高　雄", "屏　東"],
    value: ["Kaohsiung", "Pingtung"],
    src: [kaohsiung, pingtung],
  },
  { name: "彰　化", value: "Changhua", src: changhua },
  {
    name: ["苗　栗", "雲　林"],
    value: ["Miaoli", "Yunlin"],
    src: [miaoli, yunlin],
  },
  { name: "外　島", value: "OffshoreIslands", src: penghu },
  {
    name: ["花　蓮", "台　東"],
    value: ["Hualien", "TaitungCounty"],
    src: [hualien, taitungCounty],
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
      //   576: {
      //     slidesPerView: 3,
      //   },
      576: {
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
  const { style, className, onClickBoard = () => {} } = props;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isShowPrevButton, setIsShowPrevButton] = useState(false);
  const [isShowNextButton, setIsShowNextButton] = useState(true);
  const $prevButton = useRef();
  const $nextButton = useRef();

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
        <Kind title="造訪城市">
          <Triangle />
        </Kind>
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
`;

const PrevButton = styled(DirectButton)`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: -60px;
  transform: translateY(-50%);
`;

const Box = styled.div`
  margin-bottom: 60px;
`;

const SwiperBox = styled.div`
  position: relative;
`;

export default withRouter(CityCarousel);
