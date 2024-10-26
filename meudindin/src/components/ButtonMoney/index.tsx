import { ContainerButton, ContainerIcon, ContainerTitle, SubtitleLabel, TitleLabel } from "./styles";

interface ButtonMoneyProps {
    title: string;
    subtitle?: string;
    value?: string;
    icon?: string;
    action?: () => void; 
}

export function ButtonMoney({title, value, subtitle}: ButtonMoneyProps) {
    return (
        <ContainerButton>
            <ContainerIcon></ContainerIcon>
            <ContainerTitle>
            <TitleLabel>{title}</TitleLabel>
            {subtitle &&
             <SubtitleLabel>{subtitle}</SubtitleLabel>
            }
            </ContainerTitle>
            <TitleLabel>{value}</TitleLabel>
        </ContainerButton>
    );
}