import React, { useState } from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import { placeholderColor } from "variable/variable";
import GoolgeLogo from "assets/google-logo.svg";
import landing from "assets/landing.png";
import Paper from "components/Paper";
import Board from "components/Board";
import Background from "layouts/Background";
import JauntButton from "components/JauntButton";
import { GoogleLogin } from "react-google-login";

const Landing = (props) => {
  const { history } = props;

  return (
    <Background>
      <Paper
        style={{ width: "100%", height: "536px", padding: "23px 27px" }}
        widthOfShadowLength={"80%"}
        rotateOfShadow={2}
      >
        <LandingImg src={landing} />
      </Paper>
      <Board style={{ width: "202px", height: "245px", padding: "23px 27px" }} />
    </Background>
  );
};

const Box = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// const Logo = styled.img`
//   width: 205px;
//   height: 135px;
//   margin-bottom: 130px;
// `;

const LandingImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default withRouter(Landing);
