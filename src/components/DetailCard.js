import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components/macro";
import Paper from "components/Paper";
import { __FF1D6C__, __0D0B0C__ } from "variable/variable";
import noImg from "assets/noImg.png";
import { ReactComponent as LocationRef } from "assets/location.svg";
import { ReactComponent as ClockRef } from "assets/clock.svg";
import { ReactComponent as StampRef } from "assets/stamp.svg";
import { ReactComponent as TelephoneRef } from "assets/telephone.svg";
import DirectButton from "components/DirectButton";
import Skeleton from "react-loading-skeleton";

const DetailCard = (props) => {
  const { className, style, children, info = {}, onClick = () => {} } = props;
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isImgLoading, setIsImgLoading] = useState(true);
  const $image = useRef();
  let countOfImg = 0;
  let img = "";
  let imgAlt = "";

  if (Array.isArray(info.images)) {
    countOfImg = info.images.length;
    if (info.images[currentImgIndex].hasOwnProperty("src")) {
      img = info.images[currentImgIndex].src;
    }
    if (info.images[currentImgIndex].hasOwnProperty("alt")) {
      imgAlt = info.images[currentImgIndex].alt;
    }
  }

  const getNextImage = () => {
    if (currentImgIndex !== countOfImg - 1) {
      setCurrentImgIndex((currentImgIndex) => currentImgIndex + 1);
    }
    if (currentImgIndex === countOfImg - 1) {
      setCurrentImgIndex(0);
    }
  };

  const getPrevImage = () => {
    if (currentImgIndex === 0) {
      setCurrentImgIndex(countOfImg - 1);
    }
    if (currentImgIndex !== 0) {
      setCurrentImgIndex((currentImgIndex) => currentImgIndex - 1);
    }
  };

  useEffect(() => {
    const myVar = setTimeout(() => {
      if ($image.current.complete === false) {
        $image.current.src = noImg;
        setIsImgLoading(false);
      }
    }, 2 * 1000);

    return () => {
      clearTimeout(myVar);
    };
  }, []);

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
        <LoadingImage style={{ display: isImgLoading ? "block" : "none" }} />
        <Image
          style={{ display: isImgLoading ? "none" : "block" }}
          ref={$image}
          src={img}
          alt={imgAlt}
          onLoad={() => {
            setTimeout(() => {
              setIsImgLoading(false);
            }, 1 * 1000);
          }}
        />
        {info.images.length > 1 && (
          <Buttons>
            <LeftDirectButton onClick={getPrevImage} />
            <RightDirectButton onClick={getNextImage} direction={"R"} />
          </Buttons>
        )}
        <Info>
          <Title>{info.title}</Title>
          <Intro>{children}</Intro>
          <More id="DetailCard-More">
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

const LoadingImage = styled(Skeleton)`
  aspect-ratio: 3/2;
  object-fit: cover;
  width: 100%;
  max-height: 400px;
  margin-bottom: 18.5px;
`;

const Image = styled.img`
  aspect-ratio: 3/2;
  object-fit: cover;
  background-color: grey;
  width: 100%;
  max-height: 400px;
  margin-bottom: 18.5px;
`;

const Buttons = styled.div`
  margin-bottom: 18.5px;
  justify-self: end;
`;

const LeftDirectButton = styled(DirectButton)`
  margin: 4.5px;
`;

const RightDirectButton = styled(DirectButton)`
  margin: 4.5px;
`;

const Info = styled.div``;

const Title = styled.h2`
  font-size: 18px;
  line-height: 26px;
  margin-bottom: 22px;
`;

const Intro = styled.p`
  max-width: 600px;
  max-height: 120px;
  overflow-y: auto;
  color: ${__0D0B0C__()};
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 14px;
  letter-spacing: 0.25px;
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
  line-height: 21px;
`;

export default DetailCard;
