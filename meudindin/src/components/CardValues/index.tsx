import { Container, Label } from "./styles";

export enum TypeCard {
    'success' = 'sucess',
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
        <Container type={type}>
            <Label>
                {title}
            </Label>
            <Label>
                {subtitle}
            </Label>
        </Container>
    )
}