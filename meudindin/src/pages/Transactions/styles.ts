import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 88vh;
  max-width: 78vw;
  background-color: yellow;
`;

export const TitlePage = styled.p`
    color: ${colors.text};
    font-size: 24px;
    font-weight: 600;
`;