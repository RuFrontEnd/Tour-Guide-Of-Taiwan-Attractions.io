import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components/macro";
import {
  lightReceivingColor,
  optionButtonColor,
  textColor,
  notoSans,
} from "variable/variable";
import { withRouter } from "react-router-dom";
import Background from "layouts/Background";
import Space from "layouts/Space";
import Layout from "layouts/Layout";
import NavBar from "components/NavBar";
import SeperateBar from "components/SeperateBar";
import JauntButton from "components/JauntButton";
import ActivityCardRef from "components/ActivityCard";
import ActivityContentCard from "components/ActivityContentCard";
import PopulationTag from "components/PopulationTag";

const buttonSettings = [
  { text: "全部", isSelected: true },
  { text: "藝文", isSelected: false },
  { text: "古蹟", isSelected: false },
  { text: "免費", isSelected: false },
  { text: "收費", isSelected: false },
];

const Attractions = (props) => {
  const { location } = props;
  const { longitude, latitude } = location.state.position;
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .post("activity", { px: longitude, py: latitude, range: 5 })
      .then((res) => setActivities(res.data));
  }, []);

  useEffect(() => {
    console.log("activities", activities);
  }, [activities]);

  return (
    <Background>
      <NavBar />
      <SeperateBar style={SeperateBarStyle} />
      <Space>
        <Layout>
          <Container>
            <OptionButtons>
              {buttonSettings.map((buttonSetting) => (
                <Column>
                  <OptionButton
                    key={buttonSetting.text}
                    text={buttonSetting.text}
                    textStyle={getOptionButtonTextStyle(
                      buttonSetting.isSelected
                    )}
                    isSelected={buttonSetting.isSelected}
                  />
                </Column>
              ))}
            </OptionButtons>
            <Activities>
              <Title>人氣活動</Title>
              <ActivityCards>
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
              </ActivityCards>
            </Activities>
            <Activities>
              <Title>我的附近</Title>
              <ActivityCards>
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
              </ActivityCards>
            </Activities>
            <PopulationTag />
            <ActivityContentCard />
          </Container>
        </Layout>
      </Space>
    </Background>
  );
};

const Container = styled.section`
  /* display: grid; */
  /* justify-content: center; */
`;

const Wrap = styled.div`
  background-color: red;
`;

const OptionButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 42px;
`;

const Column = styled.div``;

const OptionButton = styled(JauntButton)`
  padding: 7.5px 38.25px;
  line-height: 21px;
  margin: 0px 6.5px;
  /* max-width: 120px; */
`;

const ActivityCards = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

const Activities = styled.div`
  margin-bottom: 90px;
`;

const Title = styled.h1`
  color: ${textColor};
  font-family: ${notoSans};
  margin-bottom: 24px;
`;

const ActivityCard = styled(ActivityCardRef)`
  margin: 0px 8px;
`;

const SeperateBarStyle = {
  marginBottom: "38px",
};

const getOptionButtonTextStyle = (isSelected) => {
  return {
    fontSize: "14px",
    fontFamily: `${notoSans}`,
    color: isSelected ? lightReceivingColor : optionButtonColor,
  };
};

export default withRouter(Attractions);
