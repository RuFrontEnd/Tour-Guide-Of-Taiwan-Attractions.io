import React, { useRef } from "react";
import styled from "styled-components/macro";
import Paper from "components/Paper";
import {
  __ACACAC__,
  __FF1D6C__,
  __007350__,
  __F6F7FB__,
} from "variable/variable";
import { ReactComponent as LocationRef } from "assets/location.svg";
import noImg from "assets/noImg-s.png";

const CardSm = (props) => {
  const {
    className,
    style,
    info = { src: "", alt: "", title: "標題", area: "某某市 某某區" },
    onClick = () => {},
    dataId,
  } = props;

  const $image = useRef();
  return (
    <Box
      style={style}
      className={className}
      widthOfShadowLength={"50%"}
      rotateOfShadow={8}
      onClick={onClick}
      dataId={dataId}
    >
      <Image
        src={info.src}
        alt={info.alt}
        ref={$image}
        onError={() => {
          $image.current.src = noImg;
        }}
      />
      <Info>
        <Title>{info.title}</Title>
        <More>
          <Area>
            <Location width="11px" height="13px" />
            <District>{info.area}</District>
          </Area>
        </More>
      </Info>
    </Box>
  );
};

const Box = styled(Paper)`
   width:100%;
  height: 100%;
  box-sizing: border-box;
  padding: 12px 12px 15.5px 12px;
`;

const Image = styled.img`
  aspect-ratio:9 / 7;
  object-fit: cover;
  background-color: ${__F6F7FB__()};
  width:100%;
  height: auto;
  margin-bottom: 10px;
`;

const Info = styled.div`
  /* max-width: 182px; */
`;

const Title = styled.h2`
  font-size: 14px;
  height: 42px;
  line-height: 21px;
  margin-bottom: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

const More = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Area = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Location = styled(LocationRef)`
  & > path {
    fill: ${__FF1D6C__()};
  }
`;

const District = styled.p`
  font-size: 12px;
  margin-left: 5px;
  color: ${__007350__()};
`;

export default CardSm;
