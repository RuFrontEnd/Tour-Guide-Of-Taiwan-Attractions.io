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
    style,
    title,
    activities,
    onClickButton = () => {},
    buttonText,
  } = props;

  return (
    <Space className={className} style={style}>
      <Title title={title}>
        <Triangle />
      </Title>
      <CardsBox>
        {activities.map((activity, activityIndex) => (
          <CardBox key={activity.title}>
            <CardItem
              dataId={activityIndex}
              info={{
                src: activity.Picture.PictureUrl1,
                alt: "圖片",
                title: activity.Name,
                description: activity.Description,
                area: activity.City,
              }}
              buttonText={buttonText}
              onClickButton={(e) => {
                onClickButton(e);
              }}
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
  margin-bottom: 48px;
  display: flex;
  justify-content: center;
`;

const CardsBox = styled.ul`
  display: grid;
  grid-template-columns:1fr 1fr;
`;

const Title = styled(Category)`
  margin-bottom: 12px;
`;

export default withRouter(Cards);
