import styled from "styled-components";
import { colors } from "../../styles/colors";

interface type {
    type?: string;
}

interface label {
    size?: string;
}

export const ContainerButton = styled.button<type>`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border-width: 0px;
  background-color: ${(type => type?.type === 'success' ? colors.green : type?.type === 'error' ? colors.redLabel : colors.button)};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  transition: all 0.3s ease;

  &:hover {
    background-color: ${(type => type?.type === 'success' ? colors.greenHover : type?.type === 'error' ? colors.redHover : colors.button)};
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
    transform: scale(1.01);
  }
`;

export const Label = styled.p<label>`
    color: ${colors.textLight};
    font-size: ${({size}) => size ? size: '16px'};
    font-weight: 600;
`;
