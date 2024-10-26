import styled from "styled-components";
import { colors } from "../../styles/colors";

interface type {
    type: string;
}

interface label extends type {
  size?: string;
}

export const Container = styled.div<type>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 20px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: ${(type => type?.type === 'success' ? colors.backgroundGreen : type?.type === 'error' ? colors.backgroundRed : colors.backgroundCard)};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const Label = styled.p<label>`
    color: ${(type => type?.type === 'success' ? colors.green : type?.type === 'error' ? colors.redLabel : colors.text)};
    font-size: ${({size}) => size ? size: '14px'};
    font-weight: 600;
`;