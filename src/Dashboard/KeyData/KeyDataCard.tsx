import React, { useContext } from "react";
import { UserDataContext } from "../../context/UserDataContext";
import styled from "styled-components";

interface KeyDataCardProps {
  type: "calorieCount" | "proteinCount" | "carbohydrateCount" | "lipidCount";
  label: string;
  icon: string; // Nouvelle prop pour l'image
}

const KeyDataCard: React.FC<KeyDataCardProps> = ({ type, label, icon }) => {
  const { userData } = useContext(UserDataContext)!;

  if (!userData) return null;

  return (
    <Container>
      <img src={icon} alt={`${label} icon`} className="key-data-icon" />
      <ContainerData className="data">
        <Data>{userData.keyData[type]}g</Data>
        <Name>{label}</Name>
      </ContainerData>
    </Container>
  );
};

export default KeyDataCard;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 226px;
  height: 124px;
  border-radius: 5px;
  background: #fbfbfb;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.02);
  padding-left: 32px;
`;

const ContainerData = styled.div`
  margin-left: 20px;
`;

const Data = styled.p`
  color: #282d30;
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
`;

const Name = styled.p`
  color: #74798c;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`;
