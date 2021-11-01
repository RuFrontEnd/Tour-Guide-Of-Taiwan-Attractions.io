import React from "react";
import styled from "styled-components/macro";
import PaperRef from "components/Paper";
import {
  __ACACAC__,
  __FF1D6C__,
  __007350__,
  __0D0B0C__,
  __FFF__,
} from "variable/variable";
import { ReactComponent as Arrow } from "assets/arrow.svg";
import { ReactComponent as LocationRef } from "assets/location.svg";
import { ReactComponent as ClockRef } from "assets/clock.svg";
import { ReactComponent as StampRef } from "assets/stamp.svg";
import { ReactComponent as TelephoneRef } from "assets/telephone.svg";
import SquareButton from "components/SquareButton";

const DetailCard = (props) => {
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
        <Buttons>
          <LeftSwitchButton>
            <LeftArrow />
          </LeftSwitchButton>
          <RightSwitchButton>
            <RightArrow />
          </RightSwitchButton>
        </Buttons>
        <Info>
          <Title>{info.title}</Title>
          <Intro>{children}</Intro>
          <More>
            <Trait className="detailCard-trait">
              <Clock />
              <Illustrate>{info.time}</Illustrate>
            </Trait>
            <Trait className="detailCard-trait">
              <Stamp />
              <Illustrate>{info.fee}</Illustrate>
            </Trait>
            <Trait className="detailCard-trait">
              <Location />
              <Illustrate>{info.area}</Illustrate>
            </Trait>
            <Trait className="detailCard-trait">
              <Telephone />
              <Illustrate>{info.tel}</Illustrate>
            </Trait>
          </More>
        </Info>
      </Box>
    </Paper>
  );
};

const Paper = styled(PaperRef)`
  padding: 32px;
`;

const Box = styled.section`
  display: grid;
  box-sizing: border-box;
`;

const Image = styled.img`
  background-color: grey;
  width: 612px;
  height: 459px;
  margin-bottom: 22px;
`;

const Buttons = styled.div`
  margin-bottom: 22px;
  justify-self: end;
`;

const LeftArrow = styled(Arrow)``;

const LeftSwitchButton = styled(SquareButton)`
  margin-right: 9px;
`;

const RightArrow = styled(Arrow)`
  transform: rotate(180deg);
  & > path {
    fill: ${__FFF__()};
  }
`;

const RightSwitchButton = styled(SquareButton)`
  margin-left: 9px;
  background-color: ${__0D0B0C__()};
`;

const Info = styled.div``;

const Title = styled.h2`
  font-size: 18px;
  line-height: 26px;
  margin-bottom: 22px;
`;

const Intro = styled.p`
  width: 612px;
  color: ${__0D0B0C__()};
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 14px;
`;

const More = styled.ul`
  display: grid;
  grid-template-areas:
    "a b"
    "c d";

  & > .detailCard-trait:nth-child(1),
  .detailCard-trait:nth-child(2) {
    margin-bottom: 32px;
  }
`;

const Trait = styled.li`
  display: flex;
  align-self: center;
`;

const Location = styled(LocationRef)`
  width: 24px;

  & > path {
    fill: ${__FF1D6C__()};
  }
`;
const Clock = styled(ClockRef)`
  width: 24px;

  & > path {
    fill: ${__FF1D6C__()};
  }
`;

const Stamp = styled(StampRef)`
  width: 24px;

  & > path {
    fill: ${__FF1D6C__()};
  }
`;

const Telephone = styled(TelephoneRef)`
  width: 24px;

  & > path {
    fill: ${__FF1D6C__()};
  }
`;

const Illustrate = styled.p`
  font-size: 14px;
  margin-left: 10px;
  color: ${__0D0B0C__()};
`;

export default DetailCard;
