import { useState } from "react";
import { Button, Card, Container, ContainerInput, Input, LabelButton, LabelError, LabelInput, SublabelButton, Title } from "./styles";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    async function login() {
        try {
            if (email && password) {
                const response = await api.post('auth/login', {
                    email: email,
                    password: password,     
            });
            localStorage.setItem('token', response.data.token);
            setError('');
            navigate('/dashboard');
            } else {
                setError('Dados incompletos');
            }
          } catch (error) {
            setError('Ocorreu um erro ao logar, tente novamente');
        }
    }

    return (
        <Container>
            <Card>
                <Title>Entrar</Title>
                <ContainerInput>
                <LabelInput>Email*</LabelInput>
                <Input placeholder="Digite seu email" onChange={(e) => setEmail(e.target.value)} required/>
                <LabelInput>Senha*</LabelInput>
                <Input placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} required/>
                </ContainerInput>
                <LabelError>{error}</LabelError>
                <Button onClick={() => login()}>
                    <LabelButton>Entrar</LabelButton>
                </Button>
                <SublabelButton href="">Não possui uma conta? Cadastre-se</SublabelButton>
            </Card>
        </Container>
    )
}