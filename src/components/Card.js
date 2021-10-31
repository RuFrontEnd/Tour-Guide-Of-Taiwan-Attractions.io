import React from "react";
import styled from "styled-components/macro";
import Paper from "components/Paper";
import { __ACACAC__ } from "variable/variable";
import { ReactComponent as Location } from "assets/location.svg";
import RectButton from "components/RectButton";

const Card = (props) => {
  const {
    className,
    style,
    children,
    info = { src: "", alt: "圖片", title: "標題" },
  } = props;
  return (
    <Paper
      style={style}
      className={className}
      widthOfShadowLength={"50%"}
      rotateOfShadow={8}
    >
      <Box>
        <Image src={info.src} alt={info.alt} />
        <Info>
          <Title>{info.title}</Title>
          <Intro>{children}</Intro>
          <More>
            <Area>
              <Location />
              <District>{info.area} </District>
            </Area>
            <DeatiledButton>活動詳情</DeatiledButton>
          </More>
        </Info>
      </Box>
    </Paper>
  );
};

const Box = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 16px;
`;

const Image = styled.img`
  background-color: grey;
  width: 187px;
  height: 196px;
  margin-right: 16px;
`;

const Info = styled.div``;

const Title = styled.h2`
  font-size: 16px;
  margin-bottom: 14px;
`;

const Intro = styled.p`
  color: ${__ACACAC__()};
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 14px;
`;

const More = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Area = styled.div`
  display: flex;
  align-items: center;
`;

const District = styled.p`
  margin-left: 12px;
`;

const DeatiledButton = styled(RectButton)`
  margin-right: 10px;
`;

export default Card;
