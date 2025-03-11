import React from "react";
import styled from "styled-components";
import LogoImg from "../../assets/LogoImg.png";
import LogoTitle from "../../assets/LogoTitle.png";

const Header = () => {
  return (
    <Container>
      <LogoContainer>
        <img src={LogoImg} alt="logo" />
        <img src={LogoTitle} alt="logo" />
      </LogoContainer>
      <NavContainer>
        <NavList>
          <NavItem>Accueil</NavItem>
          <NavItem>Profil</NavItem>
          <NavItem>Réglage</NavItem>
          <NavItem>Communauté</NavItem>
        </NavList>
      </NavContainer>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 91px;
  margin: 0;
  padding: 0;
  background-color: #020203;
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 18px;
  padding-left: 30px;

  img {
    width: 57px;
  }

  img:nth-child(2) {
    width: 109px;
    height: 24px;
    margin-left: 10px;
  }
`;

const NavContainer = styled.nav`
  padding-right: 30px;
  width: 100%;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  display: flex;
  padding: 0px 90px 0px 140px;
`;

const NavItem = styled.li`
  color: white;
  cursor: pointer;
  font-size: 24px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;

  &:hover {
    color: #ff0000;
  }
`;
