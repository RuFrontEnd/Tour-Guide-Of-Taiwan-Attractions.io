import React, { useRef } from "react";
import styled from "styled-components/macro";
import Paper from "components/Paper";
import { __ACACAC__, __FF1D6C__, __F6F7FB__ } from "variable/variable";
import { ReactComponent as LocationRef } from "assets/location.svg";
import RectButton from "components/RectButton";
import noImg from "assets/noImg-m.png";

const Card = (props) => {
  const {
    className,
    style,
    onClick,
    info = { src: "", alt: "", title: "標題", area: "某某市 某某區" },
    buttonText = "",
    onClickButton = () => {},
    dataId,
  } = props;

  const $image = useRef();

  return (
    <Container
      style={style}
      className={className}
      onClick={onClick}
      widthOfShadowLength={"50%"}
      rotateOfShadow={8}
    >
      <Wrap>
        <Image
          src={info.src ? info.src : noImg}
          alt={info.alt}
          ref={$image}
          onError={() => {
            $image.current.src = noImg;
          }}
        />
        <Info>
          <div>
            <Title>{info.title}</Title>
            <Intro id="Card-Intro">{info.description}</Intro>
          </div>
          <More>
            <Area>
              <Location />
              <District>{info.area}</District>
            </Area>
            <DeatiledButton
              id="Card-DeatiledButton"
              onClick={(e) => {
                onClickButton(e);
              }}
              dataId={dataId}
            >
              {buttonText}
            </DeatiledButton>
          </More>
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
  display: flex;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  object-fit: cover;
  aspect-ratio: 1 / 1;
  background-color: ${__F6F7FB__()};
  max-width: 100%;
  height: auto;
  margin-right: 16px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 16px;
  margin-bottom: 14px;
  flex-basis: 10px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

const Intro = styled.p`
  color: ${__ACACAC__()};
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 14px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
`;

const More = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Area = styled.div`
  display: flex;
  align-items: center;
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

export default Card;
