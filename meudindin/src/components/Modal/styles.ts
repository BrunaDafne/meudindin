import styled from 'styled-components';
import { colors } from '../../styles/colors';

interface ButtonProps {
    backgroundColor?: string;
}

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  flex-direction: column;

  height: 90vh;
  width: 50vw;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Input = styled.input`
    background-color: ${colors.input};
    border-width: 0px;
    border-radius: 5px;
    height: 6vh;
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 10px;

    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
`;

export const Button = styled.button<ButtonProps>`
    background-color: ${({backgroundColor}) => backgroundColor ? backgroundColor : colors.blue};
    border-width: 0px;
    border-radius: 5px;
    height: 70%;
    width: 40%;

    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    &:hover {
        background-color: ${colors.buttonHover};
    }
`;

export const TitleModal = styled.p`
    color: ${colors.text};
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
`;

export const LabelButton = styled.p`
    color: ${colors.textLight};
    font-size: 16px;
    font-weight: 600;
`;

export const ContainerButton = styled.div`
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    //background-color: yellow;
    margin-top: 20px;
`;

export const Label = styled.p`
    color: ${colors.textGray};
    font-size: 14px;
    font-weight: 600;
    margin-top: 10px;
    //margin-bottom: 5px;
`;