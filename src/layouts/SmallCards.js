import React from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import { __FFF__, __FF1D6C__, __FFB72C__, __D2D2D2__ } from "variable/variable";
import Category from "components/Category";
import CardSm from "components/CardSm";
import Space from "layouts/Space";
import noImg from "assets/no-img.jpg";

const SmallCards = (props) => {
  const { className, style, history, title, icon, spots } = props;

  return (
    <Space className={className} style={style}>
      <Title title={title}>{icon}</Title>
      <Cards>
        {Array.isArray(spots) &&
          spots.map((spot) => (
            <CardBox>
              <SmallCard
                info={{
                  src: spot.Picture?.PictureUrl1
                    ? spot.Picture.PictureUrl1
                    : noImg,
                  alt: "圖片",
                  title: spot.Name,
                  area: `${spot.Address?.slice(0, 3)} ${
                    spot.Address?.slice(3, 6).match(/.{2}[鄉鎮市區]{1}/)
                      ? spot.Address?.slice(3, 6)
                      : ""
                  }`,
                }}
              />
            </CardBox>
          ))}
      </Cards>
    </Space>
  );
};

const SmallCard = styled(CardSm)``;

const CardBox = styled.li`
  margin: 0px 4.5px 35px 4.5px;
  display: flex;
  justify-content: center;

  &:nth-child(5n + 1) {
    margin: 0px 4.5px 35px 0px;
  }

  &:nth-child(5n) {
    margin: 0px 0px 35px 4.5px;
  }
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const Title = styled(Category)`
  margin-bottom: 12px;
`;

export default withRouter(SmallCards);
