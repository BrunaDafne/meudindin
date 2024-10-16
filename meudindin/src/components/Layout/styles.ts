import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;  
  width: 100vw;
  background-color: ${colors.background};
`;

export const Sidebar = styled.div`
  width: 15vw;
  background-color: aqua;
  align-items: center;
  justify-content: center;
`;

export const Menu = styled.div`
  width: 80%;
  height: 50%;
  background-color: yellow;
  align-items: center;
  justify-content: center;
`;

export const ButtonMenu = styled.button`
  width: 100%;
  height: 5vh;
  background-color: red;
  align-items: center;
  justify-content: center;
  border-width: 0px;
  border-radius: 5px;

  
`;

export const ButtonLabelMenu = styled.p`
  color: ${colors.text};
  font-size: 16px;
  font-weight: 500;
`;


export const Content = styled.div`
  flex: 1;
  padding: 20px;
`;