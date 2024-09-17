import { Button, Card, Container, ContainerInput, Input, LabelButton, LabelInput, SublabelButton, Title } from "./styles";

export default function Login() {
    return (
        <Container>
            <Card>
                <Title>Entrar</Title>
                <ContainerInput>
                <LabelInput>Email*</LabelInput>
                <Input placeholder="Digite seu email"/>
                <LabelInput>Senha*</LabelInput>
                <Input placeholder="Digite sua senha" />
                </ContainerInput>
                <Button>
                    <LabelButton>Entrar</LabelButton>
                </Button>
                <SublabelButton href="">Não possui uma conta? Cadastre-se</SublabelButton>
            </Card>
        </Container>
    )
}