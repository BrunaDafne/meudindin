import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 88vh;
  max-width: 78vw;
`;

export const ContainerTitle = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 78vw;
  align-items: center;
`;

export const TitlePage = styled.p`
    color: ${colors.text};
    font-size: 24px;
    font-weight: 550;
`;

export const icone = {
    marginLeft: 10,
    color: colors.iconBlue,
};

export const ContainerCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 15vh;
`;
