import styled from "styled-components";
import { colors } from "../../styles/colors";

// interface ContainerProps {
//     backgroundColor: string;
// };

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: greenyellow;
  border-width: 0px;
  border-radius: 5px;
`;

export const Label = styled.p`
    color: ${colors.text};
    font-size: 16px;
    font-weight: 600;
`;