import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import lottie from "lottie-web";
import { placeholderColor, notoSans } from "variable/variable";
import Background from "layouts/Background";
import JauntButton from "components/JauntButton";
import mapAnimation from "assets/map_animation.json";
import { getLocation } from "utils/location";

const GPSPostion = (props) => {
  const { history } = props;
  const $Lottie = useRef();
  const [position, setPosition] = useState({});

  useEffect(() => {
    lottie.loadAnimation({
      container: $Lottie.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: mapAnimation,
    });
  }, []);

  useEffect(() => {
    if (JSON.stringify(position) !== "{}") {
      history.push({
        pathname: "/attractions",
        state: { position },
      });
    }
  }, [position]);

  return (
    <Background>
      <Container>
        <Lottie ref={$Lottie} />
        <Hint>請開啟定位，才能使用小旅行， 享有完整的使用體驗</Hint>
        <JauntButton
          text={"開啟定位"}
          style={getLocationButtonStyle}
          sharpRadius={false}
          textStyle={getLocationButtonTextStyle}
          onClick={() => getLocation(setPosition)}
        />
      </Container>
    </Background>
  );
};

const Lottie = styled.div`
  width: 180px;
  height: 180px;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Hint = styled.p`
  color: ${placeholderColor};
  font-family: ${notoSans};
  font-size: 18px;
  margin-bottom: 90px;
  max-width: 252px;
  line-height: 27px;
  text-align: center;
  opacity: 0.6;
`;

const getLocationButtonStyle = {
  width: "385px",
  height: "60px",
  marginBottom: "24px",
  letterSpacing: "5px",
};

const getLocationButtonTextStyle = {
  background: "linear-gradient(to bottom, #38D0B7 100%, #35B3EA 100%)",
  webkitBackgroundClip: "text",
  webkitTextFillColor: "transparent",
};

export default withRouter(GPSPostion);
