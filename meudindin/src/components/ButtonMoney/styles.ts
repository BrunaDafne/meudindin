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
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border-width: 0px;
  background-color: ${colors.backgroundCard};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  &:hover {
    background-color: ${colors.backgroundCardHover};
  }
`;

export const ContainerIcon = styled.div<type>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18%;
  border-radius: 50px;
  height: 8vh;
  background-color: green;
  border-width: 0px;
`;

export const ContainerTitle = styled.div<type>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 65%;
  padding-inline: 10px;
`;

export const TitleLabel = styled.p<label>`
    color: ${colors.text};
    font-size: ${({size}) => size ? size: '14px'};
    font-weight: 600;
`;

export const SubtitleLabel = styled.p<label>`
    color: ${colors.textGray};
    font-size: ${({size}) => size ? size: '12px'};
    font-weight: 600;
    margin-top: 5px;
`;

export const ValueLabel = styled.p<label>`
    color: ${colors.text};
    font-size: ${({size}) => size ? size: '14px'};
    font-weight: 600;
    width: 30%;
    padding-right: 5px;
`;
