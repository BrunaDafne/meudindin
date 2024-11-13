import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  height: 88vh;
  max-width: 78vw;
  background-color: yellow;
`;

export const TitlePage = styled.p`
    color: ${colors.text};
    font-size: 24px;
    font-weight: 600;
`;

export const ContainerTable = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 78vh;
  max-width: 78vw;
  overflow: auto;
  justify-content: flex-start;
`;