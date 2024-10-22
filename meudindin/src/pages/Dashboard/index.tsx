import { Icon } from "@iconify/react/dist/iconify.js";
import { Container, ContainerCard, ContainerTitle, TitlePage, icone } from "./styles";
import { CardValues, TypeCard } from "../../components/CardValues";

export default function Dashboard() {
    return (
        <Container>
            <ContainerTitle>
                <TitlePage>Bem vindo(a), Bruna Dafne</TitlePage>
                <Icon icon={'line-md:moon-twotone-alt-loop'} width="45" height="45" style={icone}/>
            </ContainerTitle>
            <ContainerCard>
            <CardValues title="Receita Mensal" subtitle="R$ 5000,00" type={TypeCard.success}/>
            </ContainerCard>
        </Container>
    )
}