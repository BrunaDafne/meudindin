import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
    display: flex;
    height: 100vh;  
    width: 100vw;
    background: linear-gradient(360deg, #2e80ff, #0A6AFF, #0046b3);
    background-color: ${colors.background};
    justify-content: center;
    align-items: center;
`;

export const Card = styled.div`
    display: flex;
    height: 70vh;  
    width: 30vw;   
    background-color: ${colors.backgroundSecondary};
    border-radius: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const Title = styled.h3`
    color: ${colors.text};
    font-size: 20px;
`;

export const ContainerInput = styled.div`
    display: flex;
    height: 40%;  
    width: 80%;   
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 10px;
`;

export const LabelInput = styled.text`
    color: ${colors.text};
    font-size: 15px;
    margin-top: 10px;
    font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  height: 45px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  font-family: 'Ubuntu';
  font-size: 14px;
  border-width: 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  background-color: ${colors.input};

  &:focus {
    background-color: #cce0ff;
    border-width: 0;
    outline: none;
  }
`;

export const LabelButton = styled.h3`
    color: ${colors.textLight};
    font-size: 16px;
`;

export const LabelError = styled.h4`
    text-align: center;
    color: ${colors.red};
    font-size: 14px;
`;

export const Button = styled.button`
  width: 80%;
  height: 45px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  font-family: 'Ubuntu';
  font-size: 14px;
  border-width: 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  background: linear-gradient(360deg, #2e80ff, #0A6AFF, #0056db);
  background-color: ${colors.button};
  margin-top: 20px;

  &:hover {
    background: linear-gradient(90deg, #0056db, #0A6AFF, #2e80ff);
    background-color: ${colors.buttonHover};
    outline: none;
  }
`;

export const SublabelButton = styled.a`
    color: ${colors.textGray};
    font-weight: 500;
    font-size: 14px;
    margin-top: 10px;
`;




