import React, { useRef } from "react";
import styled from "styled-components/macro";
import Paper from "components/Paper";
import { __ACACAC__, __FF1D6C__, __F6F7FB__ } from "variable/variable";
import { ReactComponent as LocationRef } from "assets/location.svg";
import RectButton from "components/RectButton";
import noImg from "assets/noImg-m.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingCard = (props) => {
  const {
    className,
    style,
    onClick,
    widthOfShadowLength,
    rotateOfShadow,
    leftShadowOffsetWidth,
    rightShadowOffsetWidth,
  } = props;

  return (
    <Container
      style={style}
      className={className}
      onClick={onClick}
      widthOfShadowLength={widthOfShadowLength}
      rotateOfShadow={rotateOfShadow}
      leftShadowOffsetWidth={leftShadowOffsetWidth}
      rightShadowOffsetWidth={rightShadowOffsetWidth}
    >
      <Wrap>
        <ImageBox>
          <Image />
        </ImageBox>
        <Info>
          <Instruction>
            <Title id="LoadingCard-Title" />
            <IntroBox id="LoadingCard-IntroBox">
              <Intro />
              <Intro />
              <Intro />
            </IntroBox>
          </Instruction>
          <Area />
        </Info>
      </Wrap>
    </Container>
  );
};

const Container = styled(Paper)`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 16px;
`;

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 42.5% 57.5%;
`;

const Image = styled(Skeleton)`
  height: 100%;
`;

const ImageBox = styled.div`
  margin-right: 16px;
  aspect-ratio: 1 / 1;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const Instruction = styled.div``;

const Title = styled(Skeleton)`
  width: 50%;
  margin-bottom: 14px;
`;

const Intro = styled(Skeleton)`
  margin: 2.5px 0px;
`;

const IntroBox = styled.div``;

const More = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Area = styled(Skeleton)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Location = styled(LocationRef)`
  & > path {
    fill: ${__FF1D6C__()};
  }
`;

const District = styled.p`
  margin-left: 12px;
`;

const DeatiledButton = styled(RectButton)`
  margin-bottom: 3px;
`;

export default LoadingCard;
