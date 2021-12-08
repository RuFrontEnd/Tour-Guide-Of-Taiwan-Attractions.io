import React, { useState } from "react";
import styled from "styled-components/macro";
import Paper from "components/Paper";
import {
  __ACACAC__,
  __FF1D6C__,
  __007350__,
  __0D0B0C__,
  __FFF__,
} from "variable/variable";
import { ReactComponent as Arrow } from "assets/arrow.svg";
import { ReactComponent as LocationRef } from "assets/location.svg";
import { ReactComponent as ClockRef } from "assets/clock.svg";
import { ReactComponent as StampRef } from "assets/stamp.svg";
import { ReactComponent as TelephoneRef } from "assets/telephone.svg";
import SquareButton from "components/SquareButton";

const DetailCard = (props) => {
  const { className, style, children, info = {}, onClick = () => {} } = props;
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  let countOfImg = 0;
  let imgSrc = "";
  let imgAlt = "";

  if (Array.isArray(info.images)) {
    countOfImg = info.images.length;
    if (info.images[currentImgIndex].hasOwnProperty("src")) {
      imgSrc = info.images[currentImgIndex].src;
    }
    if (info.images[currentImgIndex].hasOwnProperty("alt")) {
      imgAlt = info.images[currentImgIndex].alt;
    }
  }

  const getNextImage = () => {
    console.log("N");
    console.log("countOfImg", countOfImg);
    console.log("currentImgIndex", currentImgIndex);
    console.log("info.images", info.images);
    if (currentImgIndex !== countOfImg - 1) {
      setCurrentImgIndex((currentImgIndex) => currentImgIndex + 1);
    }
    if (currentImgIndex === countOfImg - 1) {
      setCurrentImgIndex(0);
      console.log("TTT");
    }
  };

  const getPrevImage = () => {
    console.log("P");
    console.log("countOfImg", countOfImg);
    console.log("currentImgIndex", currentImgIndex);
    console.log("info.images", info.images);
    if (currentImgIndex === 0) {
      setCurrentImgIndex(countOfImg - 1);
    }
    if (currentImgIndex !== 0) {
      setCurrentImgIndex((currentImgIndex) => currentImgIndex - 1);
    }
  };

  return (
    <Container
      style={style}
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      widthOfShadowLength={"50%"}
      rotateOfShadow={8}
    >
      <Wrap>
        <Image src={imgSrc} alt={imgAlt} />
        <Buttons>
          <LeftSwitchButton onClick={getPrevImage}>
            <LeftArrow />
          </LeftSwitchButton>
          <RightSwitchButton onClick={getNextImage}>
            <RightArrow />
          </RightSwitchButton>
        </Buttons>
        <Info>
          <Title>{info.title}</Title>
          <Intro>{children}</Intro>
          <More>
            <Trait className="detailCard-trait">
              <Clock />
              <Illustrate>{info.time}</Illustrate>
            </Trait>
            <Trait className="detailCard-trait">
              <Stamp />
              <Illustrate>{info.fee}</Illustrate>
            </Trait>
            <Trait className="detailCard-trait">
              <Location />
              <Illustrate>{info.area}</Illustrate>
            </Trait>
            <Trait className="detailCard-trait">
              <Telephone />
              <Illustrate>{info.tel}</Illustrate>
            </Trait>
          </More>
        </Info>
      </Wrap>
    </Container>
  );
};

const Container = styled(Paper)`
  width: auto;
  height: auto;
  padding: 32px;
  box-sizing: border-box;
`;

const Wrap = styled.div`
  display: grid;
`;

const Image = styled.img`
  object-fit: cover;
  background-color: grey;
  width: 612px;
  height: 459px;
  margin-bottom: 22px;
`;

const Buttons = styled.div`
  margin-bottom: 22px;
  justify-self: end;
`;

const LeftArrow = styled(Arrow)``;

const LeftSwitchButton = styled(SquareButton)`
  margin-right: 9px;
`;

const RightArrow = styled(Arrow)`
  transform: rotate(180deg);
  & > path {
    fill: ${__FFF__()};
  }
`;

const RightSwitchButton = styled(SquareButton)`
  margin-left: 9px;
  background-color: ${__0D0B0C__()};
`;

const Info = styled.div``;

const Title = styled.h2`
  font-size: 18px;
  line-height: 26px;
  margin-bottom: 22px;
`;

const Intro = styled.p`
  width: 612px;
  color: ${__0D0B0C__()};
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 14px;
`;

const More = styled.ul`
  display: grid;
  grid-template-areas:
    "a b"
    "c d";

  & > .detailCard-trait:nth-child(1),
  .detailCard-trait:nth-child(2) {
    margin-bottom: 32px;
  }
`;

const Trait = styled.li`
  display: flex;
  align-self: center;
`;

const Location = styled(LocationRef)`
  width: 24px;

  & > path {
    fill: ${__FF1D6C__()};
  }
`;
const Clock = styled(ClockRef)`
  width: 24px;

  & > path {
    fill: ${__FF1D6C__()};
  }
`;

const Stamp = styled(StampRef)`
  width: 24px;

  & > path {
    fill: ${__FF1D6C__()};
  }
`;

const Telephone = styled(TelephoneRef)`
  width: 24px;

  & > path {
    fill: ${__FF1D6C__()};
  }
`;

const Illustrate = styled.p`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-left: 10px;
  color: ${__0D0B0C__()};
`;

export default DetailCard;
