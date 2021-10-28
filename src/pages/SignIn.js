import React, { useState } from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import { placeholderColor } from "variable/variable";
import logo from "assets/logo.svg";
import GoolgeLogo from "assets/google-logo.svg";
import Background from "layouts/Background";
import JauntButton from "components/JauntButton";
import { GoogleLogin } from "react-google-login";

const SignIn = (props) => {
  const { history } = props;

  return (
    <Background>
      <Container>
        <Logo src={logo}></Logo>
        <GoogleLogin
          clientId="402772561326-licr3gegb3qbs0ftadu2g0kaf5f0im88.apps.googleusercontent.com"
          render={(renderProps) => (
            <>
              <JauntButton
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                icon={GoolgeLogo}
                text={"Google 登入"}
                style={googleSignInButtonStyle}
                sharpRadius={false}
              />
            </>
          )}
          buttonText="Login"
          onSuccess={() => {
            history.push("/gpsPostion");
          }}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <JauntButton
          text={"訪客登入"}
          style={visitorSignInButtonStyle}
          sharpRadius={false}
          textStyle={visitorSignInButtonTextStyle}
          onClick={() => {
            history.push("/gpsPostion");
          }}
        />
      </Container>
    </Background>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 205px;
  height: 135px;
  margin-bottom: 130px;
`;

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

export default withRouter(SignIn);
