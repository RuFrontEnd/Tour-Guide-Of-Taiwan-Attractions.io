import React, { useState } from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import { placeholderColor } from "variable/variable";
import GoolgeLogo from "assets/google-logo.svg";
import { ReactComponent as Search } from "assets/search.svg";
import landing from "assets/landing.png";
import Paper from "components/Paper";
import Board from "components/Board";
import Background from "layouts/Background";
import Input from "components/Input";
import SquareButton from "components/SquareButton";
import Dropdown from "components/Dropdown";
import { GoogleLogin } from "react-google-login";

const Landing = (props) => {
  const { history } = props;
  const attractions = ["類別"];

  return (
    <Background>
      <Paper
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
      </Paper>
      <Board
        style={{ width: "202px", height: "245px", padding: "23px 27px" }}
      />
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
