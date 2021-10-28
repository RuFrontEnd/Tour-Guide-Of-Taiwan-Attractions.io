import React from "react";
import styled from "styled-components/macro";
import ImageTmp from "assets/image_tmp.png";
import { ReactComponent as CalendarRef } from "assets/calendar.svg";
import { ReactComponent as Ticket } from "assets/ticket.svg";
import { ReactComponent as Clock } from "assets/clock.svg";
import { ReactComponent as Gps } from "assets/gps.svg";
import {
  lightReceivingColor,
  shadowColor,
  blueGreen,
  textColor,
  optionButtonColor,
  shallowMainColor
} from "variable/variable";
import JauntButton from "components/JauntButton";

const ActivityContentCard = (props) => {
  const { className } = props;
  return (
    <Container className={className}>
      <Image src={ImageTmp} />
      <Content>
        <Calendar />
        <Date>2021.06.12~09.21</Date>
        <Ticket />
        <Price>$350</Price>
      </Content>
      <Content>
        <Clock />
        <Time>周一~周日10:00 ~ 18:00(最後入場時間 17:30)</Time>
      </Content>
      <Content
        style={{
          marginBottom: "25px",
          alignItems: "flex-start",
        }}
      >
        <Gps />
        <Place>
          <Location>國立中正紀念堂 1展廳 </Location>
          <Address>(臺北市中正區中山南路21號)</Address>
        </Place>
        <MapButton
          text={"地圖"}
          style={MapButtonStyle}
          textStyle={MapButtonFontStyle}
        />
      </Content>
      <Introduction>
        曾被紐約時報譽為「世界上最偉大的裝飾藝術家」的慕夏，為20世紀新藝術代表人物之一，以女性的優美姿態結合花卉植物的繾綣曲線風靡世界，獨樹一幟的「慕夏風格」更影響後世多國的平面藝術家和設計師，更有「新藝術和現代平面設計之父」的美稱。
      </Introduction>
    </Container>
  );
};

const Container = styled.section`
  width: 500px;
  padding: 32px 32px 64px 32px;
  box-shadow: -3px -2px 2px ${lightReceivingColor}, 0px 2px 8px ${shadowColor};
  background-color: ${shallowMainColor};
`;

const Image = styled.img`
  display: block;
  margin: 0px auto 20px;
`;

const Date = styled.div`
  color: ${textColor};
  margin-right: 95px;
`;

const Calendar = styled(CalendarRef)`
  path {
    fill: ${blueGreen};
  }
`;

const Price = styled.div`
  color: ${textColor};
`;

const Time = styled.div`
  color: ${textColor};
`;

const Place = styled.div`
  color: ${optionButtonColor};
  margin-right: 10px;
`;

const Introduction = styled.p`
  color: ${optionButtonColor};
  font-size: 14px;
  line-height: 21px;
`;

const MapButton = styled(JauntButton)`
  align-self: flex-end;
`;

const MapButtonStyle = {
  padding: "6px 11px",
};

const MapButtonFontStyle = {
  fontSize: "18px",
};

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Location = styled.p`
  line-height: 24px;
`;

const Address = styled.p`
  line-height: 24px;
`;

export default ActivityContentCard;
