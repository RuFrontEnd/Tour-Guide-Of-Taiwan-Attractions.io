import React from "react";
import styled from "styled-components/macro";
import Paper from "components/Paper";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingCardSm = (props) => {
  const {
    className,
    style,
    onClick = () => {},
    dataId,
    widthOfShadowLength,
    rotateOfShadow,
    leftShadowOffsetWidth,
    rightShadowOffsetWidth,
  } = props;

  return (
    <Box
      style={style}
      className={className}
      widthOfShadowLength={"50%"}
      rotateOfShadow={8}
      onClick={onClick}
      dataId={dataId}
      widthOfShadowLength={widthOfShadowLength}
      rotateOfShadow={rotateOfShadow}
      leftShadowOffsetWidth={leftShadowOffsetWidth}
      rightShadowOffsetWidth={rightShadowOffsetWidth}
    >
      <Image />
      <Info>
        <TitleBox>
          <Title />
        </TitleBox>
        <MoreBox>
          <More />
        </MoreBox>
      </Info>
    </Box>
  );
};

const Box = styled(Paper)`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 12px 12px 15.5px 12px;
`;

const Image = styled(Skeleton)`
  aspect-ratio: 9 / 7;
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

const Info = styled.div``;

const Title = styled(Skeleton)`
  height: 16px;
  line-height: 21px;
  margin-bottom: 26px;
`;

const TitleBox = styled.div`
  width: 50%;
`;

const More = styled(Skeleton)`
  display: flex;
  justify-content: space-between;
`;

const MoreBox = styled.div`
  width: 25%;
`;

export default LoadingCardSm;
