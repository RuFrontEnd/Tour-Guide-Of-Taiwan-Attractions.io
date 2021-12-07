import React, { useRef } from "react";
import styled from "styled-components/macro";
import Paper from "components/Paper";
import { __ACACAC__, __FF1D6C__ } from "variable/variable";
import { ReactComponent as LocationRef } from "assets/location.svg";
import RectButton from "components/RectButton";
import noImg from "assets/no-img.jpg";

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
        <ImageBox>
          <Image
            src={info.src ? info.src : noImg}
            alt={info.alt}
            ref={$image}
            onError={() => {
              $image.current.src = noImg;
            }}
          />
        </ImageBox>
        <Info>
          <Content>
            <Title>{info.title}</Title>
            <Intro>{info.description}</Intro>
          </Content>
          <More>
            <Area>
              <Location />
              <District>{info.area}</District>
            </Area>
            <DeatiledButton
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
  width: auto;
  height: auto;
  box-sizing: border-box;
  padding: 16px;
  padding-right: 25px;
`;

const Wrap = styled.div`
  display: flex;
`;

const Image = styled.img`
  background-color: grey;
  width: 187px;
  height: 196px;
  object-fit: cover;
`;

const ImageBox = styled.div`
  padding-right: 16px;
  height: 196px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  word-break: break-all;
`;

const Content = styled.div``;

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
  justify-content: space-between;
`;

const Area = styled.div`
  display: flex;
  align-items: center;
  margin-right: 27px;
  font-size: 14px;
  line-height: 21px;
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
