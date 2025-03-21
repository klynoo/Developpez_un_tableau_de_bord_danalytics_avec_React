import styled from "styled-components";

import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import icon4 from "../../assets/icon4.png";

const Sidebar: React.FC = () => {
  return (
    <Container>
      <ContainerIcon>
        <ContainerImg>
          <Img src={icon1} alt="Icon" />
        </ContainerImg>
        <ContainerImg>
          <Img src={icon2} alt="Icon" />
        </ContainerImg>
        <ContainerImg>
          <Img src={icon3} alt="Icon" />
        </ContainerImg>
        <ContainerImg>
          <Img src={icon4} alt="Icon" />
        </ContainerImg>
      </ContainerIcon>
      <Text>Copyright, SportSee 2020</Text>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 117px;
  height: 1024px;
  background: #020203;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const ContainerIcon = styled.div`
  margin-top: 255px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ContainerImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 64px;
  height: 64px;
`;

const Text = styled.p`
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  color: #fff;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  padding-top: 60px;
`;
