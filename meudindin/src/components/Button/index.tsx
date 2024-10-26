import { ContainerButton, Label } from "./styles";

interface ButtonProps {
    title: string;
    type?: string;
    action: () => void
}

export function Button({title, type = 'default', action}: ButtonProps) {
    return (
        <ContainerButton type={type} onClick={() => action()}>
            <Label size="18px">{title}</Label>
        </ContainerButton>
    );
}