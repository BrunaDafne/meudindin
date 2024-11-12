import { Tooltip } from "@mui/material";
import { Container, Label } from "./styles";

export enum TypeCard {
    'success' = 'success',
    'error' = 'error',
    'default' = 'default',
}

interface CardValuesProps {
    title: string;
    subtitle: string;
    type: TypeCard;
}

export function CardValues({title, subtitle, type}: CardValuesProps) {
    return (
        <Tooltip title={subtitle}>
        <Container type={type}>
            <Label type={type}>
                {title}
            </Label>
            <Label type={type} size="30px">
                {subtitle?.length > 8 ? `${subtitle.slice(0, 11)}...` : subtitle}
            </Label>
        </Container>
        </Tooltip>
    )
}