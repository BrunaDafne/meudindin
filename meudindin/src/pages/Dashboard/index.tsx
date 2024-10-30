import { Icon } from "@iconify/react/dist/iconify.js";
import { Container, ContainerBudgets, ContainerButtonCostNext, ContainerCard, ContainerCardItem, ContainerCardsBudgets, ContainerGraphics, ContainerGraphicsItem, ContainerSection, ContainerTitle, SectionCardBudgets, SubtitlePage, TitlePage, icone } from "./styles";
import { CardValues, TypeCard } from "../../components/CardValues";
import { Button } from "../../components/Button";
import { ButtonMoney } from "../../components/ButtonMoney";
import { CardBudgets } from "../../components/CardBudgets";
import { GraphicBar } from "../../components/Graphic";

export default function Dashboard() {
    const orcamentos = [
        {
            title: 'Educação',
            goalValue: 50,
            expenseValue: 35,
        },
        {
            title: 'Entreternimento',
            goalValue: 100,
            expenseValue: 150,
        },
        {
            title: 'Lazer',
            goalValue: 80,
            expenseValue: 40,
        },
        {
            title: 'Assinaturas',
            goalValue: 70,
            expenseValue: 50,
        },
        {
            title: 'Impostos',
            goalValue: 80,
            expenseValue: 15,
        },
        {
            title: 'Casa',
            goalValue: 200,
            expenseValue: 97,
        },
    ];

    const valuesGraphic = [
        {
            categoria: 'Educação',
            porcentagem: 25,
        },
        {
            categoria: 'Alimentação',
            porcentagem: 35,
        },
        {
            categoria: 'Lazer',
            porcentagem: 25,
        },
    ]

    return (
        <Container>
            <ContainerTitle>
                <TitlePage>Bem vindo(a), Bruna Dafne</TitlePage>
                {/* <Icon icon={'line-md:moon-twotone-alt-loop'} width="40" height="40" style={icone}/> */}
            </ContainerTitle>
            <ContainerCard>
            <ContainerCardItem>
            <CardValues title="Receita mensal" subtitle="R$ 5000,00" type={TypeCard.success}/>
            </ContainerCardItem>
            <ContainerCardItem>
            <CardValues title="Despesa mensal" subtitle="R$ 5000,00" type={TypeCard.error}/>
            </ContainerCardItem>
            <ContainerCardItem height="60%">
                <Button title="Adicionar receita" type={TypeCard.success} action={() => {}}/>
            </ContainerCardItem>
            <ContainerCardItem height="60%">
                <Button title="Adicionar despesa" type={TypeCard.error} action={() => {}} />
            </ContainerCardItem>
            </ContainerCard>

            <ContainerGraphics>
            <ContainerGraphicsItem>
            <SubtitlePage>Gastos do mês</SubtitlePage> 
            <ContainerSection>
            <GraphicBar data={valuesGraphic} nomeValor={['porcentagem']} indexLabelHorizontal={'categoria'} legendaVertical='Porcentagem' legendaHorizontal="Categoria"/>
            </ContainerSection>  
            </ContainerGraphicsItem>
            <ContainerGraphicsItem>
            <SubtitlePage>Próximas despesas</SubtitlePage>
            <ContainerSection>
                <ContainerButtonCostNext>
                <ButtonMoney title='Fatura Outubro 2024' value="R$ 350,00" subtitle="Cartão Nubank - 20/08"/>
                </ContainerButtonCostNext>
            </ContainerSection>  
            </ContainerGraphicsItem>
            <ContainerGraphicsItem>
            <SubtitlePage>Saldos</SubtitlePage>
            <ContainerSection>
                teste
            </ContainerSection>  
            </ContainerGraphicsItem>
            </ContainerGraphics>
            <ContainerBudgets>
            <SubtitlePage>Orçamentos</SubtitlePage>
            <ContainerCardsBudgets>
                {
                    orcamentos.map(({title, goalValue, expenseValue}) => {
                        return (
                        <SectionCardBudgets>
                            <CardBudgets title={title} goalValue={goalValue} expenseValue={expenseValue} />
                        </SectionCardBudgets>
                        )
                    })
                }
            </ContainerCardsBudgets>
            </ContainerBudgets>
        </Container>
    )
}