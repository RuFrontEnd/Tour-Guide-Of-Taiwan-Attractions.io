import React from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import { __FFF__, __FF1D6C__, __FFB72C__, __D2D2D2__ } from "variable/variable";
import { ReactComponent as Triangle } from "assets/triangle_title.svg";
import Category from "components/Category";
import CardSm from "components/CardSm";
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
  } = props;

  return (
    <Box className={className} style={style}>
      <Title title={title}>{icon ? icon : <Triangle />}</Title>
      <Cards>
        {Array.isArray(spots) &&
          spots.map((spot, spotIndex) => (
            <CardBox>
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
            </CardBox>
          ))}
      </Cards>
    </Box>
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

const Box = styled(Space)`
  cursor: pointer;
`;

export default withRouter(SmallCards);
