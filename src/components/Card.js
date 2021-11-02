import React from "react";
import styled from "styled-components/macro";
import Paper from "components/Paper";
import { __ACACAC__, __FF1D6C__ } from "variable/variable";
import { ReactComponent as LocationRef } from "assets/location.svg";
import RectButton from "components/RectButton";

const Card = (props) => {
  const {
    className,
    style,
    children = "內文",
    info = { src: "", alt: "", title: "標題", area: "某某市 某某區" },
  } = props;
  return (
    <Container
      style={style}
      className={className}
      widthOfShadowLength={"50%"}
      rotateOfShadow={8}
    >
      <Wrap>
        <Image src={info.src} alt={info.alt} />
        <Info>
          <Content>
            <Title>{info.title}</Title>
            <Intro>{children}</Intro>
          </Content>
          <More>
            <Area>
              <Location />
              <District>{info.area} </District>
            </Area>
            <DeatiledButton>活動詳情</DeatiledButton>
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
`;

const Wrap = styled.div`
  display: flex;
`;

const Image = styled.img`
  background-color: grey;
  width: 187px;
  height: 196px;
  margin-right: 16px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div``;

const Title = styled.h2`
  font-size: 16px;
  margin-bottom: 14px;
  flex-basis: 10px;
`;

const Intro = styled.p`
  color: ${__ACACAC__()};
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 14px;
  max-width: 278px;
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
  margin-right: 10px;
  margin-bottom: 3px;
`;

export default Card;
