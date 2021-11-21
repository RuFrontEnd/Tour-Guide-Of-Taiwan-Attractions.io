import React from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import { __FFF__, __FF1D6C__, __FFB72C__, __D2D2D2__ } from "variable/variable";
import { ReactComponent as Triangle } from "assets/triangle_title.svg";
import Category from "components/Category";
import Card from "components/Card";
import Space from "layouts/Space";

const Cards = (props) => {
  const {
    className,
    title,
    activities,
    clickButton,
    buttonText,
  } = props;

  return (
    <Space className={className}>
      <Title title={title}>
        <Triangle />
      </Title>
      <CardsBox>
        {activities.map((activity) => (
          <CardBox key={activity.title}>
            <CardItem
              info={{
                src: activity.Picture.PictureUrl1,
                alt: "圖片",
                title: activity.Name,
                area: activity.Location,
              }}
              onClick={() => {
                clickButton();
              }}
              buttonText={buttonText}
            />
          </CardBox>
        ))}
      </CardsBox>
    </Space>
  );
};

const CardItem = styled(Card)`
  width: 100%;
`;

const CardBox = styled.li`
  margin: 0px 10.5px 48px 0px;
  display: flex;
  justify-content: center;

  &:nth-child(odd) {
    margin: 0px 10.5px 48px 0px;
  }

  &:nth-child(even) {
    margin: 0px 0px 48px 10.5px;
  }
`;

const CardsBox = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Title = styled(Category)`
  margin-bottom: 12px;
`;

export default withRouter(Cards);
