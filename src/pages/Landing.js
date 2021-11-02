import React, { useState } from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import { placeholderColor } from "variable/variable";
import GoolgeLogo from "assets/google-logo.svg";
import { ReactComponent as Search } from "assets/search.svg";
import { ReactComponent as Triangle } from "assets/triangle.svg";
import landing from "assets/landing.png";
import cardImg_tmp from "assets/cardImg_tmp.png";
import cardSmImg_tmp from "assets/cardSmImg_tmp.png";
import detailCard_tmp from "assets/detailCard_tmp.png";
import Paper from "components/Paper";
import Board from "components/Board";
import Background from "layouts/Background";
import Input from "components/Input";
import SquareButton from "components/SquareButton";
import Dropdown from "components/Dropdown";
import Category from "components/Category";
import Card from "components/Card";
import CardSm from "components/CardSm";
import DetailCard from "components/DetailCard";

const Landing = (props) => {
  const { history } = props;
  const attractions = ["類別"];
  const hotAttractions = {
    src: cardImg_tmp,
    title: "合歡山國際暗空公園-星空清境跨年活動",
    area: "臺北市 北投區",
  };
  const hotFoods = {
    src: cardSmImg_tmp,
    title: "正濱漁港懷舊碼頭",
    area: "基隆市中正區",
  };
  const detail = {
    src: detailCard_tmp,
    title: "合歡山國際暗空公園-星空清境跨年活動",
    time: "開放式空間，無時間限制",
    fee: "免費",
    area: "基隆市中山區湖海路一、二段(協和街)",
    tel: "886-2-24287664",
  };

  return (
    <Background>
      <Board />
      <Card />
      <CardSm />
      <Category />
      <DetailCard />
      <Paper />
      {/* <Paper
        style={{ width: "100%", height: "536px", padding: "23px 27px" }}
        widthOfShadowLength={"80%"}
        rotateOfShadow={2}
      >
        <Box>
          <Title>
            <MainTitle>Welcome To</MainTitle>
            <ViceTitle>Taiwan</ViceTitle>
            <Remark>台北、台中、台南、屏東、宜蘭……遊遍台灣</Remark>
          </Title>
          <Input placeholder="搜尋關鍵字" />
          <SquareButton>
            <Search width={"16px"} />
          </SquareButton>
          <Dropdown options={attractions} />
        </Box>
      </Paper> */}
      {/* <DetailCard style={{ margin: "50px" }} info={detail}>
        南投縣與各單位多年於合歡山舉辦清境高山跨年晚會活動，今年將活動主軸由傳統跨年晚會轉化成為台灣高山星空遊程之體驗活動，在擁有東南亞區最佳的星空觀測環境。奇特造型，值得深入觀賞體會。
      </DetailCard>
      <CardSm
        style={{ width: "206px", height: "auto", margin: "50px 50px" }}
        info={hotFoods}
      />
      <Card
        style={{ width: "513px", height: "auto", margin: "50px px" }}
        info={hotAttractions}
      >
        南投縣與各單位多年於合歡山舉辦清境高山跨年晚會活動，今年將活動主軸由傳統跨年晚會轉化成為台灣高山星空遊程之體驗活動，以剛通過美國IDA認證的華語區第一座國際暗空公園作為宣傳主題，在擁有東南的的...
      </Card>
      <Board
        style={{ width: "202px", height: "245px", padding: "23px 27px" }}
      />
      <Category title={"熱門城市"}>
        <Triangle />
      </Category> */}
    </Background>
  );
};

const Box = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${landing});
  background-size: cover;
  background-position: center center;
`;

// const Logo = styled.img`
//   width: 205px;
//   height: 135px;
//   margin-bottom: 130px;
// `;

const Title = styled.div``;

const MainTitle = styled.h1``;

const ViceTitle = styled.h1``;

const Remark = styled.p``;

export default withRouter(Landing);
