import React, { useContext } from "react";
import styled from "styled-components";
import { UserDataContext } from "../context/UserDataContext";
import DailyActivity from "./DailyActivity";
import KeyDataCard from "./KeyData/KeyDataCard";
import AverageSessions from "./AverageSessions";
import PerformanceRadar from "./PerformanceRadar";
import ScoreChart from "./ScoreChart";

import calorieIcon from "../assets/calories-icon.png";
import proteinIcon from "../assets/protein-icon.png";
import carbIcon from "../assets/carbs-icon.png";
import lipidIcon from "../assets/fat-icon.png";
import Sidebar from "../Components/Layout/Sidebar";

const MainContent = () => {
  const { userData, userActivity, averageSessions, userPerformance, error } =
    useContext(UserDataContext);

  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
  if (!userData || !userActivity || !averageSessions || !userPerformance)
    return <LoadingMessage>Loading...</LoadingMessage>;

  const { userInfos, todayScore } = userData;

  return (
    <Container>
      <Sidebar />
      <ContainerDashbord>
        <ContainerTitle>
          <Title>
            Bonjour <FirstName>{userInfos.firstName}</FirstName>
          </Title>
          <SubTitle>
            Félicitation ! Vous avez explosé vos objectifs hier 👏
          </SubTitle>
        </ContainerTitle>
        <ContainerData>
          <MainSection>
            <ValueContainer>
              <FullWidthContainer>
                <DailyActivity data={userActivity.sessions} />
              </FullWidthContainer>
              <RowContainer>
                <AverageSessions data={averageSessions.sessions} />
                <PerformanceRadar data={userPerformance} />
                <ScoreChart score={todayScore} />
              </RowContainer>
            </ValueContainer>
          </MainSection>
          <KeyDataCardsContainer>
            <KeyDataCard
              type="calorieCount"
              label="Calories"
              icon={calorieIcon}
            />
            <KeyDataCard
              type="proteinCount"
              label="Protéines"
              icon={proteinIcon}
            />
            <KeyDataCard
              type="carbohydrateCount"
              label="Glucides"
              icon={carbIcon}
            />
            <KeyDataCard type="lipidCount" label="Lipides" icon={lipidIcon} />
          </KeyDataCardsContainer>
        </ContainerData>
      </ContainerDashbord>
    </Container>
  );
};

export default MainContent;

const Container = styled.div`
  display: flex;
  background-color: #fff;
`;

const ContainerDashbord = styled.div`
  width: 100%;
  padding-left: 110px;
`;

const ContainerTitle = styled.div`
  position: relative;
  left: 0;
  padding: 70px 0 70px 0px;
`;

const Title = styled.h1`
  color: #000;
  font-family: Roboto;
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`;

const FirstName = styled.span`
  color: #ff0101;
  font-family: Roboto;
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`;

const SubTitle = styled.p`
  margin-top: 40px;
  color: #000;
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

const ContainerData = styled.div`
  display: flex;
  gap: 40px;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
`;

const ValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

const FullWidthContainer = styled.div`
  width: 100%;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
`;

const LoadingMessage = styled.p`
  color: #666;
  font-style: italic;
  text-align: center;
`;

const KeyDataCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
