import styled from "styled-components";
import { colors } from "../../styles/colors";

interface type {
    type: string;
}

export const Container = styled.div<type>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: ${(type => type?.type === 'success' ? 'green' : 'red')};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const Label = styled.p`
    color: ${colors.text};
    font-size: 18px;
    font-weight: 550;
`;