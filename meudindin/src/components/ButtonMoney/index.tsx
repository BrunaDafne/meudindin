import { Tooltip } from "@mui/material";
import { ContainerButton, ContainerIcon, ContainerTitle, SubtitleLabel, TitleLabel, ValueLabel } from "./styles";

interface ButtonMoneyProps {
    title: string;
    subtitle?: string;
    value?: string;
    icon?: string;
    action?: () => void; 
}

export function ButtonMoney({title, value, subtitle, action = () => {}}: ButtonMoneyProps) {
    return (
        <Tooltip title={value}>
        <ContainerButton onClick={action}>
            {/* <ContainerIcon></ContainerIcon> */}
            <ContainerTitle>
            <TitleLabel>{title}</TitleLabel>
            {subtitle &&
             <SubtitleLabel>{subtitle}</SubtitleLabel>
            }
            </ContainerTitle>
            <ValueLabel>{value && value?.length > 9 ? `${value.slice(0, 9)}...`: value}</ValueLabel>
        </ContainerButton>
        </Tooltip>
       
    );
}