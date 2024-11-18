import styled from "styled-components";
import { colors } from "../../styles/colors";

interface Button {
  marginTop?: string;
}

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;  
  width: 100vw;
  background-color: ${colors.background};
`;

export const Sidebar = styled.div`
  display: flex;
  height: 100vh;
  
  width: 15vw;
  background-color: ${colors.background};
  //background-color: black;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const LogoImg = styled.img`
  margin-bottom: 30px;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  height: 40%;
  background-color: ${colors.background};
  align-items: center;
  justify-content: flex-start;
`;

export const ButtonMenu = styled.button<Button>`
  width: 100%;
  height: 6vh;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  border-width: 0px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  margin-top: ${({marginTop}) => marginTop ? marginTop : '5px'};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.backgroundHover};
    color: ${colors.textBlue};
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
    transform: scale(1.05);

    p {
      color: ${colors.textBlue};
    }
  }
`;

export const ButtonLabelMenu = styled.p`
  color: ${colors.text};
  font-size: 16px;
  font-weight: 500;
`;


export const Content = styled.div`
  flex: 1;
  display: flex;
  width: 85vw;
  height: 100vh;
  background-color: ${colors.background};
  justify-content: center;
  align-items: center;
`;

export const ContainerPages = styled.div`
  flex: 1;
  display: flex;
  height: 95vh;
  width: 80vw;
  border-radius: 20px;
  margin-inline: 15px;
  background-color: ${colors.backgroundSecondary};
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
`;