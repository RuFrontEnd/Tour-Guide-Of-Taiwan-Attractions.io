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
      <CardUl>
        {activities.map((activity, activityIndex) => (
          <CardLi key={activity.title}>
            <HotActivityCard
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
          </CardLi>
        ))}
      </CardUl>
    </Space>
  );
};

const HotActivityCard = styled(Card)`
  aspect-ratio: 100 / 43;

  & #Card-Intro {
    @media (max-width: 1200px) {
      -webkit-line-clamp: 3;
    }

    @media (max-width: 992px) {
      -webkit-line-clamp: 2;
    }

    @media (max-width: 768px) {
      display: none;
    }

    @media (max-width: 576px) {
      display: -webkit-box;
      -webkit-line-clamp: 2;
    }

    @media (max-width: 425px) {
      display: none;
      /* -webkit-line-clamp: 1; */
    }
  }

  & #Card-Title {
    @media (max-width: 768px) {
      -webkit-line-clamp: 2;
    }
  }

  & #Card-DeatiledButton {
    @media (max-width: 992px) {
      display: none;
    }

    @media (max-width: 576px) {
      display: block;
    }

    @media (max-width: 425px) {
      display: none;
    }
  }
`;

const CardLi = styled.li`
  margin-bottom: 48px;
  display: flex;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;

  & {
    @media (max-width: 992px) {
      margin-bottom: 15px;
    }
  }

  &:nth-child(2n - 1) {
    padding-right: 15px;
    padding-left: 0px;

    @media (max-width: 992px) {
      padding-right: 8.5px;
    }

    @media (max-width: 576px) {
      padding-right: 0px;
    }
  }

  &:nth-child(2n) {
    padding-left: 15px;
    padding-right: 0px;

    @media (max-width: 992px) {
      padding-left: 8.5px;
    }

    @media (max-width: 576px) {
      padding-left: 0px;
    }
  }
`;

const CardUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;

  & {
    @media (max-width: 992px) {
      margin-bottom: 50px;
    }
  }

  & {
    @media (max-width: 576px) {
      grid-template-columns: 1fr;
      margin-bottom: 40px;
    }
  }
`;

const Title = styled(Category)`
  margin-bottom: 12px;
`;

export default withRouter(Cards);
