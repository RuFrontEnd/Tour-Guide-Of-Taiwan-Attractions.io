import React, { useState } from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import { placeholderColor } from "variable/variable";
import Paper from "components/Paper";
import GoolgeLogo from "assets/google-logo.svg";
import Background from "layouts/Background";
import JauntButton from "components/JauntButton";
import { GoogleLogin } from "react-google-login";

const Landing = (props) => {
  const { history } = props;

  return (
    <Background>
      <Box>
        <Paper
          style={{ width: "1000px", height: "200px" }}
          widthOfShadowLength={"800px"}
          rotateOfShadow={2}
        />
      </Box>
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

const googleSignInButtonStyle = {
  width: "385px",
  height: "60px",
  marginBottom: "24px",
};

const visitorSignInButtonStyle = {
  width: "385px",
  height: "60px",
  marginBottom: "24px",
};

const visitorSignInButtonTextStyle = {
  color: placeholderColor,
};

const responseGoogle = (response) => {
  console.log("response", response);
};

export default withRouter(Landing);
