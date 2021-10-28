import React from "react";
import styled from "styled-components/macro";
import {
  shallowMainColor,
  lightReceivingColor,
  shadowColor,
} from "variable/variable";
import { ReactComponent as FavoritesRef } from "assets/favorites.svg";

const PopulationTag = (props) => {
  const { className } = props;
  return (
    <Container className={className}>
      <Wrap>
        <Favorites />
        <Message>81人想去</Message>
      </Wrap>
    </Container>
  );
};

const Container = styled.section`
  display: inline-block;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  box-shadow: -2px -2px 2px ${lightReceivingColor}, 0px 0px 5px ${shadowColor};
  background-color: ${shallowMainColor};
  padding: 8px 34.5px 8px 38.5px;
  border-radius: 9999px;
`;

const Favorites = styled(FavoritesRef)`
  margin-right: 8px;
`;

const Message = styled.div``;

export default PopulationTag;
