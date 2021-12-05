import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import MulitCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { __FFF__, __FF1D6C__, __FFB72C__, __D2D2D2__ } from "variable/variable";
import { useQuery } from "hooks/useQuery";
import { path } from "variable/path";
import { ReactComponent as Location } from "assets/location.svg";
import { ReactComponent as Triangle } from "assets/triangle_title.svg";
import Board from "components/Board";
import Category from "components/Category";
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
import daito from "assets/daito.png";
import mazu from "assets/mazu.png";
import miaoli from "assets/miaoli.png";
import yunlin from "assets/yunlin.jpg";
import changhua from "assets/changhua.jpg";
import penghu from "assets/penghu.jpg";
import kinmen from "assets/kinmen.jpg";

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
    value: ["Hualien", "Daito"],
    src: [hualien, daito],
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const getCountyName = (cityName) => {
  let county = {};
  if (cityName.match(/台　北/)) {
    county = { en: "Taipei", zh: "台北市" };
  }
  if (cityName.match(/新　北/)) {
    county = { en: "NewTaipei", zh: "新北市" };
  }
  if (cityName.match(/桃　園/)) {
    county = { en: "Taoyuan", zh: "桃園市" };
  }
  if (cityName.match(/基　隆/)) {
    county = { en: "Keelung", zh: "基隆市" };
  }
  if (cityName.match(/新竹市/)) {
    county = { en: "Hsinchu", zh: "新竹市" };
  }
  if (cityName.match(/新竹縣/)) {
    county = { en: "HsinchuCounty", zh: "新竹縣" };
  }
  if (cityName.match(/嘉　義/)) {
    county = { en: "Chiayi", zh: "嘉義縣" };
  }
  if (cityName.match(/南　投/)) {
    county = { en: "Nantou", zh: "南投縣" };
  }
  if (cityName.match(/台　中/)) {
    county = { en: "Taichung", zh: "台中市" };
  }
  if (cityName.match(/高　雄/)) {
    county = { en: "Kaohsiung", zh: "高雄市" };
  }
  if (cityName.match(/屏　東/)) {
    county = { en: "Pingtung", zh: "屏東縣" };
  }
  if (cityName.match(/台　南/)) {
    county = { en: "Tainan", zh: "台南市" };
  }
  if (cityName.match(/花　蓮/)) {
    county = { en: "Hualien", zh: "花蓮縣" };
  }
  if (cityName.match(/台　東/)) {
    county = { en: "Taoyuan", zh: "台東縣" };
  }
  if (cityName.match(/宜　蘭/)) {
    county = { en: "Yilan", zh: "宜蘭縣" };
  }
  if (cityName.match(/苗　栗/)) {
    county = { en: "MiaoliCounty", zh: "苗栗縣" };
  }
  if (cityName.match(/雲　林/)) {
    county = { en: "Yunlin", zh: "雲林縣" };
  }
  if (cityName.match(/彰　化/)) {
    county = { en: "ChanghuaCounty", zh: "彰化縣" };
  }
  if (cityName.match(/澎　湖/)) {
    county = { en: "Penghu", zh: "澎湖縣" };
  }
  if (cityName.match(/金　門/)) {
    county = { en: "Kinmen", zh: "金門縣" };
  }
  if (cityName.match(/馬　祖/)) {
    county = { en: "Mazu", zh: "連江縣" };
  }
  return county;
};

export const getFilterCityQureyString = (hotCityName) => {
  return `${path[0]}?city_en=${getCountyName(hotCityName).en}&&city_zh=${
    getCountyName(hotCityName).zh
  }`;
};

const CityCarousel = (props) => {
  const { style, className, onClickBoard = () => {} } = props;

  return (
    <Space style={style} className={className}>
      <Kind title="造訪城市">
        <Triangle />
      </Kind>
      <Carousel responsive={responsive}>
        {cities.map((city, index) =>
          index % 2 === 0 ? (
            <CarouselItem>
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
            </CarouselItem>
          ) : (
            <CarouselItem>
              <CityBoards>
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
              </CityBoards>
            </CarouselItem>
          )
        )}
      </Carousel>
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
  width: 100%;
  height: 120px;
  padding: 7px 8px;
  margin-bottom: 5px;
`;

const CityBoards = styled(Board)`
  width: 100%;
  height: 100%;
`;

const CityBoard = styled(Board)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  width: 100%;
  height: 245px;
  padding: 14px 12px;
`;

const CarouselItem = styled.div`
  padding: 0px 6.5px;
`;

const Carousel = styled(MulitCarousel)`
  height: 245px;
  padding-bottom: 60px;
`;

const Kind = styled(Category)`
  margin-bottom: 12px;
`;

export default withRouter(CityCarousel);
