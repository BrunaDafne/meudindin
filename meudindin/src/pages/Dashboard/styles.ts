import styled from "styled-components";
import { colors } from "../../styles/colors";

interface ContainerHeaderItem {
  height?: string;
}

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
    font-weight: 600;
`;

export const icone = {
    marginLeft: 10,
    color: colors.iconBlue,
};

export const ContainerCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 78vw;
  margin-top: 20px;
  height: 12vh;
`;

export const ContainerCardItem = styled.div<ContainerHeaderItem>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 18vw;
  height: ${({height}) => height ? height : '100%'};
`;

export const ContainerGraphics = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 78vw;
  margin-top: 20px;
  height: 40vh;
`;

export const ContainerGraphicsItem = styled.div<ContainerHeaderItem>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  //background-color: yellow;
  min-width: 25vw;
  height: ${({height}) => height ? height : '100%'};
`;

export const SubtitlePage = styled.p`
    color: ${colors.text};
    font-size: 20px;
    font-weight: 600;
`;

export const ContainerSection = styled.div<ContainerHeaderItem>`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  justify-content: flex-start;
  align-items: center;
  padding-top: 15px;
  background-color: ${colors.backgroundGray};
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  min-width: 25vw;
  //background-color: red;
  height: ${({height}) => height ? height : '88%'};
`;

export const ContainerButtonCostNext = styled.div<ContainerHeaderItem>`
  display: flex;
  min-width: 22vw;
  height: 35%;
  justify-content: center;
  align-items: center;
`;

export const ContainerBudgets = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 78vw;
  margin-top: 20px;
  height: 35vh;
  //background-color: pink;
  flex-wrap: wrap;
`;

export const ContainerCardsBudgets = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 78vw;
  height: 83%;
  //background-color: yellow;
`;

export const SectionCardBudgets = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13vw;
  height: 100%;
  //background-color: yellow;
`;