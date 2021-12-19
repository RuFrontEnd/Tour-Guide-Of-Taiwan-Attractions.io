import React from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import { __FFF__, __FF1D6C__, __FFB72C__, __D2D2D2__ } from "variable/variable";
import { ReactComponent as Triangle } from "assets/triangle_title.svg";
import { ReactComponent as Union } from "assets/union.svg";
import Category from "components/Category";
import CardSm from "components/CardSm";
import LoadingCardSm from "components/LoadingCardSm";
import Space from "layouts/Space";
import noImg from "assets/noImg.png";

const SmallCards = (props) => {
  const {
    className,
    style,
    history,
    title,
    icon,
    spots,
    onClick = () => {},
    isWaiting = false,
    countOfWaitingCard,
  } = props;

  const WatingCards = new Array(countOfWaitingCard).fill(null);

  return (
    <Box className={className} style={style}>
      <Title title={title}>{icon ? icon : <Triangle />}</Title>
      <Cards>
        {!isWaiting &&
          Array.isArray(spots) &&
          spots.map((spot, spotIndex) => (
            <CardItem>
              <SmallCard
                onClick={onClick}
                info={{
                  src: spot.Picture?.PictureUrl1
                    ? spot.Picture.PictureUrl1
                    : noImg,
                  alt: "圖片",
                  title: spot.Name,
                  area: spot.City,
                }}
                dataId={spotIndex}
              />
            </CardItem>
          ))}
        {isWaiting &&
          WatingCards.map((WatingCard) => (
            <CardItem>
              <LoadingCardSm />
            </CardItem>
          ))}
      </Cards>
      {!isWaiting && spots.length === 0 && (
        <NoResult>
          <UnionIcon />
          <Message>
            <Oops>Oops!</Oops>
            <Sorry>很抱歉，找不到符合此搜尋相關的內容。</Sorry>
          </Message>
        </NoResult>
      )}
    </Box>
  );
};

const Sorry = styled.p`
  color: ${__D2D2D2__()};
  font-size: 18px;
  line-height: 26px;

  @media (max-width: 576px) {
    font-size: 16px;
  }
`;

const Oops = styled.p`
  margin-bottom: 4px;
  color: ${__FFB72C__()};
  font-size: 20px;
  font-weight: 500;

  @media (max-width: 576px) {
    font-size: 18px;
    text-align: center;
  }
`;

const Message = styled.div``;

const UnionIcon = styled(Union)`
  margin-right: 16px;

  @media (max-width: 576px) {
    margin-right: 0px;
    margin-bottom: 12px;
  }
`;

const NoResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px 0px;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const SmallCard = styled(CardSm)``;

const CardItem = styled.li`
  margin: 0px 4.5px;
  margin-bottom: 35px;
`;

const Cards = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  @media (max-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Title = styled(Category)`
  margin-bottom: 12px;
`;

const Box = styled(Space)``;

export default withRouter(SmallCards);
