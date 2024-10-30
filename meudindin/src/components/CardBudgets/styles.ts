import styled from "styled-components";
import { colors } from "../../styles/colors";

interface ContainerProps {
    backgroundColor: string;
};

interface Label {
  size?: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({backgroundColor}) => backgroundColor ? backgroundColor : colors.backgroundGray};
  border-width: 0px;
  border-radius: 5px;
  padding-bottom: 10px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
`;

export const ContainerGraphic = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60%;
`;

export const Label = styled.p<Label>`
    color: ${colors.text};
    font-size: ${({size}) => size ? size : '14px'};
    font-weight: 600;
`;